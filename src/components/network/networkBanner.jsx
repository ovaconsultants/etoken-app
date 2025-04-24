import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export default function NetworkBanner() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Initial check
    NetInfo.fetch().then(state => {
      setIsOnline(state.isConnected);
    });

    // Subscribe to real-time changes (event listener)
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(prev => {
        if (prev !== state.isConnected) {
          return state.isConnected;
        }
        return prev;
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isOnline) {return null;}

  return (
    <View style={styles.banner}>
      <Text style={styles.text}>No Internet Connection</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: 'red',
    padding: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  text: { color: 'white' },
});
