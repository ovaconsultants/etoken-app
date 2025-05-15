import React from 'react';
import { Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const AppVersion = () => {
  const version = DeviceInfo.getVersion();
  return (
    <View>
      <Text>App Version: {version}</Text>
    </View>
  );
};

export default AppVersion;