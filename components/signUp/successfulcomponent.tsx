import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  Dimensions,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Button from '../ui/Button';

const { width, height } = Dimensions.get('window');

interface SignUpSuccessProps {
  onContinue: () => void;
}

const SignUpSuccess: React.FC<SignUpSuccessProps> = ({ onContinue }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      // First: Scale and rotate the check icon
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      // Then: Fade in the text content
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Animated Check Icon */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [
                { scale: scaleAnim },
                { rotate: rotateInterpolate },
              ],
            },
          ]}
        >
          <View style={styles.iconBackground}>
            <AntDesign name="checkcircleo" size={80} color="#10B981" />
          </View>
        </Animated.View>

        {/* Success Content */}
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.title}>Bem-vindo!</Text>
          <Text style={styles.subtitle}>
            Seu cadastro foi realizado com sucesso
          </Text>
          <Text style={styles.description}>
            Agora você pode aproveitar todos os recursos da nossa plataforma
          </Text>

          <Button
            className="mt-8 w-full px-8"
            variant="default"
            size="default"
            onPress={onContinue}
            title="Ir ao Login"
          />
        </Animated.View>
      </View>

      {/* Decorative Background Elements */}
      <View style={styles.backgroundDecoration}>
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
        <View style={[styles.circle, styles.circle3]} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  content: {
    alignItems: 'center',
    zIndex: 2,
  },
  iconContainer: {
    marginBottom: 32,
  },
  iconBackground: {
    backgroundColor: '#F0FDF4',
    borderRadius: 60,
    padding: 20,
    shadowColor: '#10B981',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#10B981',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  backgroundDecoration: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  circle: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.1,
  },
  circle1: {
    width: 200,
    height: 200,
    backgroundColor: '#10B981',
    top: height * 0.1,
    right: -100,
  },
  circle2: {
    width: 150,
    height: 150,
    backgroundColor: '#3B82F6',
    bottom: height * 0.2,
    left: -75,
  },
  circle3: {
    width: 100,
    height: 100,
    backgroundColor: '#F59E0B',
    top: height * 0.3,
    left: width * 0.1,
  },
});

export default SignUpSuccess;