import React, { useEffect, useRef } from 'react';
import { StatusBar, Animated, Easing, View } from 'react-native';
import { styles } from './TokenSuccessScreen.style';

const TokenSuccessScreen = ({ route, navigation }) => {
  const { tokenNumber } = route.params;

  // Animation values
  const scaleValue = useRef(new Animated.Value(0.8)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const glowValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 1200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.elastic(1.1)),
        useNativeDriver: true,
      }),
      // Glow effect
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowValue, {
            toValue: 1,
            duration: 800,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(glowValue, {
            toValue: 0,
            duration: 800,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ])
      ).start(),
      // Pulse effect
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseValue, {
            toValue: 1.1,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(pulseValue, {
            toValue: 1,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ])
      ).start(),
    ]).start();

    // Auto navigate back after 10 seconds
    const timer = setTimeout(() => {
      navigation.goBack();
    }, 10000);

    return () => clearTimeout(timer);
  }, [glowValue, navigation, opacityValue, pulseValue, scaleValue]);

  return (
    <View
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.contentWrapper}>
        <Animated.View
          style={[
            styles.circleContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          {/* Glow Effect */}
          <Animated.View
            style={[
              styles.glow,
              { opacity: glowValue },
            ]}
          />
          {/* Token Number */}
          <Animated.Text
            style={[
              styles.tokenText,
              {
                opacity: opacityValue,
                transform: [{ scale: pulseValue }],
              },
            ]}
          >
            {tokenNumber}
          </Animated.Text>
        </Animated.View>
      </View>
    </View>
  );
};

export default TokenSuccessScreen;
