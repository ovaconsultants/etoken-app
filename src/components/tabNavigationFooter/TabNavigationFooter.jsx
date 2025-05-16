import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import { styles } from './TabNavigationFooter.styles';

const FooterButton = React.memo(({icon: Icon, label, onPress,}) => {
  return (
    <TouchableOpacity
      style={[styles.footerButton]}
      onPress={onPress}>
      <Icon size={20} color={ '#333'} />
      {label && <Text style={styles.footerButtonText}>{label}</Text>}
    </TouchableOpacity>
  );
});

export const FooterNavigation = React.memo(
  ({navigation, routes, currentRoute, showLabels = true , handleRefresh , handleClear}) => {
    const combinedRoutes = routes ;

    const handlePress = item => {
      if (item.action === 'refresh') {
         handleRefresh();
      }
      else if ( item.action === 'clear') {
           handleClear();
      }
      else if (item.screen) {
        navigation.navigate(item.screen, item.params || {});
      }
    };

    return (
      <View style={styles.footerNavigation}>
        {combinedRoutes.map(item => (
          <FooterButton
            key={item.id}
            icon={item.icon}
            label={showLabels ? item.label : null}
            onPress={() => handlePress(item)}
          />
        ))}
      </View>
    );
  },
);



export default FooterNavigation;
