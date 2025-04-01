import { StyleSheet } from "react-native";
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
      alignItems: 'center',
      padding: 8,
      borderRadius: 8,
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