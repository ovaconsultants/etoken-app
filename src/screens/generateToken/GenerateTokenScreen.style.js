import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
    elevation: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  tokenText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
});

export default styles;
