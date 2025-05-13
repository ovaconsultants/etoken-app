import React, {useEffect, useState, useCallback, useRef} from 'react';
import {Text, StyleSheet, Animated} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export default function NetworkBanner() {
  const [isOnline, setIsOnline] = useState(true);
  const [isInternetReachable, setIsInternetReachable] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleConnectivityChange = useCallback(
    state => {
      const currentlyOnline = state.isConnected && state.isInternetReachable;

      // Only update state if there's an actual change
      if (
        isOnline !== currentlyOnline ||
        isInternetReachable !== state.isInternetReachable
      ) {
        setIsOnline(state.isConnected);
        setIsInternetReachable(state.isInternetReachable);

        // Animate banner appearance/disappearance
        Animated.timing(fadeAnim, {
          toValue: currentlyOnline ? 0 : 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    },
    [isOnline, isInternetReachable, fadeAnim],
  );

  useEffect(() => {
    // Initial check with more details
    const checkInitialState = async () => {
      const state = await NetInfo.fetch();
      handleConnectivityChange(state);
    };
    checkInitialState();

    // Subscribe to real-time changes
    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);

    return () => {
      unsubscribe();
    };
  }, [handleConnectivityChange]);

  if (isOnline && isInternetReachable) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.banner,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        },
      ]}>
      <Text style={styles.text}>
        {isOnline && !isInternetReachable
          ? 'Connected but no internet access'
          : 'No internet connection'}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: 'red',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
