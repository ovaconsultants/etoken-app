import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  successContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  successText: {
    fontSize: 18,
    color: 'green',
    marginBottom: 20,
  },
  errorContainer: {
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
  footer: {
    marginTop: 20,
  },
});