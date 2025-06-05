import React from 'react';
import { View, useWindowDimensions, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const ResponsiveLayout = ({ children }) => {
  const { width, height } = useWindowDimensions();
  const isTablet = DeviceInfo.isTablet();
  const isTv = Platform.isTV; // <-- Use Platform.isTV
  const isLandscape = width > height;
  const deviceType = isTv ? 'TV' : isTablet ? 'Tablet' : 'Mobile';

  return children({ deviceType, isLandscape, dimensions: { width, height } });
};

export default ResponsiveLayout;