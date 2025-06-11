// DrowsinessDetectionScreen.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import {
  DrowsinessDetector,
  DrowsinessDetectorConfig,
  FaceDetection,
  Point,
} from './DrowsinessDetector';

const { width, height } = Dimensions.get('window');

interface FaceDetectorFace {
  faceID?: number;
  bounds: {
    origin: { x: number; y: number };
    size: { width: number; height: number };
  };
  landmarks?: {
    leftEyePosition?: { x: number; y: number };
    rightEyePosition?: { x: number; y: number };
    mouthPosition?: { x: number; y: number };
    noseBasePosition?: { x: number; y: number };
    leftEarPosition?: { x: number; y: number };
    rightEarPosition?: { x: number; y: number };
  };
}

interface FaceDetectionResult {
  faces: FaceDetectorFace[];
}

const DrowsinessDetectionScreen: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isEyesClosed, setIsEyesClosed] = useState(false);
  const [isYawning, setIsYawning] = useState(false);
  const [isAlarmOn, setIsAlarmOn] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const cameraRef = useRef<Camera>(null);
  const drowsinessDetectorRef = useRef<DrowsinessDetector | null>(null);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    requestPermissions();
  }, []);

  useEffect(() => {
    const config: DrowsinessDetectorConfig = {
      onEyesClosedChange: setIsEyesClosed,
      onYawnChange: setIsYawning,
      onAlarmChange: setIsAlarmOn,
      alarmUrl: 'https://soundbible.com/grab.php?id=2197&type=mp3',
    };

    drowsinessDetectorRef.current = new DrowsinessDetector(config);

    return () => {
      drowsinessDetectorRef.current?.cleanup();
    };
  }, []);

  const handleFacesDetected = useCallback(
    ({ faces }: FaceDetectionResult) => {
      const detector = drowsinessDetectorRef.current;
      if (!detector || !isActive) return;

      if (faces.length > 0) {
        const face = faces[0];
        const detection = convertFaceDetection(face);
        detector.update(detection);

        if (detector.eyesClosedStart && !isAlarmOn) {
          const timeLeft = Math.ceil(
            (detector.eyeDuration - (Date.now() - detector.eyesClosedStart)) / 1000
          );
          setCountdown(Math.max(0, timeLeft));
        } else {
          setCountdown(0);
        }
      } else {
        detector.update(null);
        setCountdown(0);
      }
    },
    [isActive, isAlarmOn]
  );

  const convertFaceDetection = (face: FaceDetectorFace): FaceDetection | null => {
    if (!face.landmarks) return null;

    const landmarks = {
      getLeftEye: (): Point[] => {
        const leftEye = face.landmarks!.leftEyePosition;
        if (!leftEye) return [];
        return [
          { x: leftEye.x - 10, y: leftEye.y },
          { x: leftEye.x - 5, y: leftEye.y - 3 },
          { x: leftEye.x, y: leftEye.y - 3 },
          { x: leftEye.x + 5, y: leftEye.y - 3 },
          { x: leftEye.x + 10, y: leftEye.y },
          { x: leftEye.x, y: leftEye.y + 3 },
        ];
      },
      getRightEye: (): Point[] => {
        const rightEye = face.landmarks!.rightEyePosition;
        if (!rightEye) return [];
        return [
          { x: rightEye.x - 10, y: rightEye.y },
          { x: rightEye.x - 5, y: rightEye.y - 3 },
          { x: rightEye.x, y: rightEye.y - 3 },
          { x: rightEye.x + 5, y: rightEye.y - 3 },
          { x: rightEye.x + 10, y: rightEye.y },
          { x: rightEye.x, y: rightEye.y + 3 },
        ];
      },
      getMouth: (): Point[] => {
        const mouth = face.landmarks!.mouthPosition;
        if (!mouth) return [];
        return [
          { x: mouth.x - 15, y: mouth.y },
          { x: mouth.x - 10, y: mouth.y - 2 },
          { x: mouth.x - 5, y: mouth.y - 5 },
          { x: mouth.x, y: mouth.y - 5 },
          { x: mouth.x + 5, y: mouth.y - 5 },
          { x: mouth.x + 10, y: mouth.y - 2 },
          { x: mouth.x + 15, y: mouth.y },
          { x: mouth.x + 10, y: mouth.y + 2 },
          { x: mouth.x + 5, y: mouth.y + 5 },
          { x: mouth.x, y: mouth.y + 5 },
          { x: mouth.x - 5, y: mouth.y + 5 },
          { x: mouth.x - 10, y: mouth.y + 2 },
        ];
      },
    };

    return { landmarks };
  };

  const toggleCamera = () => {
    setIsActive((prev) => {
      if (!prev) setCountdown(0);
      return !prev;
    });
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Solicitando permissão para a câmera...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Permissão para a câmera negada</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={CameraType.front}
        onFacesDetected={isActive ? handleFacesDetected : undefined}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
          runClassifications: FaceDetector.FaceDetectorClassifications.none,
          minDetectionInterval: 100,
          tracking: true,
        }}
      >
        {isAlarmOn && (
          <View style={styles.alarmAlert}>
            <Text style={styles.alarmText}>⚠️ ALERTA DE SONOLÊNCIA!</Text>
            <Text style={styles.alarmSubtext}>ACORDE!</Text>
          </View>
        )}

        {isEyesClosed && !isAlarmOn && (
          <View style={styles.eyesClosedAlert}>
            <Text style={styles.eyesClosedText}>👁️ OLHOS FECHADOS! 😴</Text>
          </View>
        )}

        {isYawning && (
          <View style={styles.yawnAlert}>
            <Text style={styles.yawnText}>😮 BOCEJO DETECTADO!</Text>
          </View>
        )}

        {countdown > 0 && !isAlarmOn && (
          <View style={styles.countdownAlert}>
            <Text style={styles.countdownText}>Alarme em {countdown}s</Text>
          </View>
        )}
      </Camera>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, isActive && styles.buttonActive]}
          onPress={toggleCamera}
        >
          <Text style={styles.buttonText}>
            {isActive ? 'Parar Detecção' : 'Iniciar Detecção'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface Styles {
  container: ViewStyle;
  camera: ViewStyle;
  text: TextStyle;
  controls: ViewStyle;
  button: ViewStyle;
  buttonActive: ViewStyle;
  buttonText: TextStyle;
  alarmAlert: ViewStyle;
  alarmText: TextStyle;
  alarmSubtext: TextStyle;
  eyesClosedAlert: ViewStyle;
  eyesClosedText: TextStyle;
  yawnAlert: ViewStyle;
  yawnText: TextStyle;
  countdownAlert: ViewStyle;
  countdownText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
  },
  controls: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttonActive: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  alarmAlert: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: '#e53935',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  alarmText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  alarmSubtext: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
  },
  eyesClosedAlert: {
    position: 'absolute',
    top: 120,
    left: 20,
    right: 20,
    backgroundColor: '#FFEB3B',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  eyesClosedText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  yawnAlert: {
    position: 'absolute',
    top: 180,
    left: 20,
    right: 20,
    backgroundColor: '#66BB6A',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  yawnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  countdownAlert: {
    position: 'absolute',
    top: 90,
    left: 20,
    right: 20,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  countdownText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DrowsinessDetectionScreen;
