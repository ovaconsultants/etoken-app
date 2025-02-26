import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  notificationBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  tableCell: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
});


