import { StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { fontSize } from '../../utils/fontUtils';

const isTablet = DeviceInfo.isTablet();

export const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
    paddingVertical: isTablet ? 16 : 10,
    height: isTablet ? 80 : 60,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  label: {
    fontSize: fontSize(12),
    color: '#000',
  },
  icon: {
    color: '#000',
    fontSize: isTablet ? 28 : 22,
  },
});
