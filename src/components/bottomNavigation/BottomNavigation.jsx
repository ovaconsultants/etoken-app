// components/BottomNavigation.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Home, Users, RefreshCcw, Eraser, Settings } from 'lucide-react-native';
import DeviceInfo from 'react-native-device-info';
import { styles } from './BottomNavigation.styles';

const iconMap = {
  Home: Home,
  Tokens: Users,
  Refresh: RefreshCcw,
  Clear: Eraser,
  Settings: Settings,
};

const screenConfig = {
  Home: ['Tokens', 'Settings'],
  Reception: ['Home', 'Refresh', 'Tokens'],
  Settings: ['Home'],
};

const BottomNavigation = ({ screenName, route, handleRefresh }) => {
  const navigation = useNavigation();
  const isTablet = DeviceInfo.isTablet();
  const buttons = screenConfig[screenName] || [];

  const handlePress = (label) => {
    switch (label) {
      case 'Home':
        navigation.navigate('Home');
        break;
      case 'Tokens':
        navigation.navigate('TokenListing', { ...route?.params });
        break;
      case 'Settings':
        navigation.navigate('Settings');
        break;
      case 'Refresh':
        console.log('Refresh triggered');
        handleRefresh();
        break;
      case 'Clear':
        console.log('Clear triggered');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.footer}>
      {buttons.map((label) => {
        const Icon = iconMap[label];
        return (
          <TouchableOpacity key={label} style={styles.button} onPress={() => handlePress(label)}>
            <Icon style={styles.icon} size={styles.icon.fontSize} color={styles.icon.color} />
            <Text style={styles.label}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigation;
