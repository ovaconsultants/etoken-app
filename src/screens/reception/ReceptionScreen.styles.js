import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 20,
    backgroundColor: '#fff',
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: height * 0.02,
  },
  input: {
    height: height * 0.06,
    width: '105%',
    marginLeft: -width * 0.025,
    marginRight: -width * 0.025,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: width * 0.03,
    paddingHorizontal: width * 0.03,
    fontSize: width * 0.04,
    backgroundColor: '#fff',
    marginVertical: 1,
  },

  errorText: {
    color: 'red',
    fontSize: width * 0.03,
    marginTop: height * 0.005,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },

  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  disabledButton: {
    backgroundColor: 'grey',
    opacity: 0.6,
  },

  clearButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footerNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default styles;