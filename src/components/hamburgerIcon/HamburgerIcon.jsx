import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Menu } from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import { useOrientation } from '../../hooks/useOrientation';
import DeviceInfo, { isTablet } from 'react-native-device-info';
import { createStyles } from './HamburgerIcon.styles';

const HamburgerIcon = () => {
  const navigation = useNavigation();
  const isTablet = DeviceInfo.isTablet();
    const {isLandscape} = useOrientation();
    const styles = createStyles(isLandscape);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.toggleDrawer();
        }}>
        <View>
        <Menu size={isTablet ? 40 : 24}  color="#333"  />
        </View>
      </TouchableOpacity>
    </View>
  );
};


export default HamburgerIcon;
