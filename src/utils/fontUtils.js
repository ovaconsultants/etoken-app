import { Dimensions, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const { width } = Dimensions.get('window');

export function getDeviceType() {
  if (Platform.isTV) return 'TV';
  if (DeviceInfo.isTablet()) return 'Tablet';
  return 'Mobile';
}

export function fontSize(base) {
  const deviceType = getDeviceType();
  if (deviceType === 'TV') return base * 2.2;
  if (deviceType === 'Tablet') return base * 1.8;
  return base;
}

// Responsive width utility
export function responsiveWidth(base) {
  const deviceType = getDeviceType();
  if (deviceType === 'TV') return base * 2.2;
  if (deviceType === 'Tablet') return base * 1.8;
  return base;
} 

// Responsive height utility
export function responsiveHeight(base) {
  const deviceType = getDeviceType();
  if (deviceType === 'TV') return base * 2.2;
  if (deviceType === 'Tablet') return base * 1.8;
  return base;
}