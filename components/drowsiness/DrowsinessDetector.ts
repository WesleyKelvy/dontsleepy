// DrowsinessDetector.ts
import { Audio } from 'expo-av';
import { Alert } from 'react-native';

export interface FaceLandmarks {
  getLeftEye(): Point[];
  getRightEye(): Point[];
  getMouth(): Point[];
}

export interface Point {
  x: number;
  y: number;
}

export interface FaceDetection {
  landmarks: FaceLandmarks;
}

export interface DrowsinessDetectorConfig {
  eyeClosedThreshold?: number;
  eyeInstantThreshold?: number;
  mouthOpenThreshold?: number;
  eyeDuration?: number;
  yawnDuration?: number;
  alarmUrl?: string;
  onEyesClosedChange?: (closed: boolean) => void;
  onYawnChange?: (yawning: boolean) => void;
  onAlarmChange?: (alarm: boolean) => void;
}

export class DrowsinessDetector {
  private eyeClosedThreshold: number;
  private eyeInstantThreshold: number;
  private mouthOpenThreshold: number;
  private eyeDuration: number;
  private yawnDuration: number;
  private alarmUrl?: string;

  // Callbacks para atualizar a UI do React Native
  private onEyesClosedChange?: (closed: boolean) => void;
  private onYawnChange?: (yawning: boolean) => void;
  private onAlarmChange?: (alarm: boolean) => void;

  public eyesClosedStart: number | null = null;
  private yawnStart: number | null = null;
  private isAlarmOn: boolean = false;
  private isYawning: boolean = false;
  private isEyesClosed: boolean = false;

  private alarmSound: Audio.Sound | null = null;

  constructor(config: DrowsinessDetectorConfig = {}) {
    this.eyeClosedThreshold = config.eyeClosedThreshold ?? 0.299;
    this.eyeInstantThreshold = config.eyeInstantThreshold ?? 0.299;
    this.mouthOpenThreshold = config.mouthOpenThreshold ?? 0.6;
    this.eyeDuration = config.eyeDuration ?? 3000;
    this.yawnDuration = config.yawnDuration ?? 2000;
    this.alarmUrl = config.alarmUrl;

    this.onEyesClosedChange = config.onEyesClosedChange;
    this.onYawnChange = config.onYawnChange;
    this.onAlarmChange = config.onAlarmChange;

    this._setupAudio();
  }

  private async _setupAudio(): Promise<void> {
    try {
      if (this.alarmUrl) {
        const { sound } = await Audio.Sound.createAsync(
          { uri: this.alarmUrl },
          { shouldPlay: false, isLooping: true }
        );
        this.alarmSound = sound;
      }
    } catch (error) {
      console.warn('Erro ao carregar áudio de alarme:', error);
    }
  }

  public update(detection: FaceDetection | null): void {
    if (!detection?.landmarks) {
      this._reset();
      return;
    }

    const leftEye = detection.landmarks.getLeftEye();
    const rightEye = detection.landmarks.getRightEye();
    const mouth = detection.landmarks.getMouth();

    if (!leftEye || !rightEye || !mouth) {
      this._reset();
      return;
    }

    const ear = (this._ear(leftEye) + this._ear(rightEye)) / 2;
    const mar = this._mar(mouth);

    console.log(`EAR: ${ear.toFixed(3)} | MAR: ${mar.toFixed(3)}`);

    // Feedback instantâneo para olhos fechados
    const eyesCurrentlyClosed = ear < this.eyeInstantThreshold;
    if (eyesCurrentlyClosed !== this.isEyesClosed) {
      this.isEyesClosed = eyesCurrentlyClosed;
      this.onEyesClosedChange?.(this.isEyesClosed);
    }

    // Detecção de bocejo
    if (mar > this.mouthOpenThreshold) {
      if (!this.yawnStart) {
        this.yawnStart = Date.now();
      }
      const elapsedYawn = Date.now() - this.yawnStart;
      if (elapsedYawn >= this.yawnDuration && !this.isYawning) {
        this.isYawning = true;
        this.onYawnChange?.(true);
      }
    } else {
      this.yawnStart = null;
      if (this.isYawning) {
        this.isYawning = false;
        this.onYawnChange?.(false);
      }
    }

    // Alarme principal para olhos fechados prolongados
    if (ear < this.eyeClosedThreshold) {
      if (!this.eyesClosedStart) this.eyesClosedStart = Date.now();
      const elapsedEye = Date.now() - this.eyesClosedStart;
      if (elapsedEye >= this.eyeDuration && !this.isAlarmOn) {
        this._triggerAlarm();
      }
    } else {
      this.eyesClosedStart = null;
      if (this.isAlarmOn) {
        this._resetAlarm();
      }
    }
  }

  // Calcula o Eye Aspect Ratio (EAR)
  private _ear(eye: Point[]): number {
    const dist = (a: Point, b: Point): number => 
      Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    
    if (eye.length < 6) return 0;
    
    const v1 = dist(eye[1], eye[5]);
    const v2 = dist(eye[2], eye[4]);
    const h = dist(eye[0], eye[3]);
    
    return h === 0 ? 0 : (v1 + v2) / (2.0 * h);
  }

  // Calcula o Mouth Aspect Ratio (MAR)
  private _mar(mouth: Point[]): number {
    const dist = (a: Point, b: Point): number => 
      Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    
    if (mouth.length < 12) return 0;
    
    const v1 = dist(mouth[2], mouth[10]);
    const v2 = dist(mouth[3], mouth[9]);
    const v3 = dist(mouth[4], mouth[8]);
    const h = dist(mouth[0], mouth[6]);
    
    return h === 0 ? 0 : (v1 + v2 + v3) / (3.0 * h);
  }

  private async _triggerAlarm(): Promise<void> {
    this.isAlarmOn = true;
    this.onAlarmChange?.(true);
    
    // Mostrar alerta nativo
    Alert.alert(
      '⚠️ ALERTA DE SONOLÊNCIA!',
      'ACORDE! Você está apresentando sinais de sonolência.',
      [{ text: 'OK', onPress: () => this._resetAlarm() }]
    );

    // Tocar som de alarme
    try {
      if (this.alarmSound) {
        await this.alarmSound.playAsync();
      }
    } catch (error) {
      console.warn('Erro ao tocar alarme:', error);
    }
  }

  private async _resetAlarm(): Promise<void> {
    this.isAlarmOn = false;
    this.onAlarmChange?.(false);
    
    try {
      if (this.alarmSound) {
        await this.alarmSound.stopAsync();
        await this.alarmSound.setPositionAsync(0);
      }
    } catch (error) {
      console.warn('Erro ao parar alarme:', error);
    }
  }

  private _reset(): void {
    this.eyesClosedStart = null;
    this.yawnStart = null;
    
    if (this.isYawning) {
      this.isYawning = false;
      this.onYawnChange?.(false);
    }
    
    if (this.isEyesClosed) {
      this.isEyesClosed = false;
      this.onEyesClosedChange?.(false);
    }
    
    if (this.isAlarmOn) {
      this._resetAlarm();
    }
  }

  // Método para limpeza quando o componente for desmontado
  public async cleanup(): Promise<void> {
    try {
      if (this.alarmSound) {
        await this.alarmSound.unloadAsync();
      }
    } catch (error) {
      console.warn('Erro ao limpar recursos de áudio:', error);
    }
  }
}