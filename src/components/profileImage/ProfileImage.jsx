import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Menu } from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';

const DrawerLeftNavigationButton = () => {
  const navigation = useNavigation(); 
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          console.log('pressed');
          navigation.toggleDrawer();
        }}>
        <View>
        <Menu size={24} color="#333" />
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginLeft: 15,  // Adjust as needed
    marginTop: 14,
  }
});


export default DrawerLeftNavigationButton;
