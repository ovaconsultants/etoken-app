import React, {useMemo} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Home, FileText, UserPlus, RefreshCw, Users} from 'lucide-react-native';
import { styles } from './TabNavigationFooter.styles';

const FooterButton = React.memo(({icon: Icon, label, onPress, active}) => {
  return (
    <TouchableOpacity
      style={[styles.footerButton, active && styles.activeFooterButton]}
      onPress={onPress}>
      <Icon size={20} color={active ? '#fff' : '#333'} />
      {label && <Text style={styles.footerButtonText}>{label}</Text>}
    </TouchableOpacity>
  );
});

export const FooterNavigation = React.memo(
  ({navigation, routes, currentRoute, showLabels = true , handleRefresh}) => {
    const combinedRoutes = routes ;

    const handlePress = item => {
      if (item.action === 'refresh') {
         handleRefresh();
      } else if (item.screen) {
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
            active={currentRoute === item.screen}
          />
        ))}
      </View>
    );
  },
);



export default FooterNavigation;
