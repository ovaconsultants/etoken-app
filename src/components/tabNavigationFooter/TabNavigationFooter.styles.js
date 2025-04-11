import { StyleSheet , Dimensions } from 'react-native';
const { width , height }   = Dimensions.get('window');
const isLandscape = width > height;
export const styles = StyleSheet.create({
    footerNavigation: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingVertical: 10,
      backgroundColor: '#f8f9fa',
      borderTopWidth: 1,
      borderTopColor: '#e0e0e0',
    },
    footerButton: {
      flex: 1,
      flexDirection : isLandscape ? 'row' : 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 8,
      borderRadius: 8,
      gap : '2%',
    },
    activeFooterButton: {
      backgroundColor: '#007bff',
    },
    footerButtonText: {
      fontSize: 12,
      marginTop: 4,
      color: '#333',
    },
  });