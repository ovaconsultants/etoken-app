import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  footerText: {
    marginTop: 20,
    color: '#666',
  },
  link: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#add8e6', // Light blue color for disabled state
    opacity: 0.7,
  },
});