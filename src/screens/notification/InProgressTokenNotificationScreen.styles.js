import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  notificationBox: {
    position: 'relative',
    width: width * 0.2,
    borderRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    padding: width * 0.002,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  tableCell: {
    fontSize: width * 0.012,
    marginBottom: 6,
    fontFamily: 'Roboto',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
});


