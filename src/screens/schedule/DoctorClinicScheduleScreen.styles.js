import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    marginLeft: -width * 0.025,
    marginRight: -width * 0.025,
  },
  labels: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    
  },
  input: {
    height: height * 0.06,
    width: '110%',
    marginLeft: -width * 0.025,
    marginRight: -width * 0.025,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: width * 0.02,
    paddingHorizontal: width * 0.02,
    fontSize: width * 0.04,
    backgroundColor: '#fff',
    marginVertical: 1,
  },
  dropdown: {
    height: height * 0.06,
    width: '105%',
    marginLeft: -width * 0.025,
    marginRight: -width * 0.02,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: width * 0.02,
    paddingHorizontal: width * 0.02,
    fontSize: width * 0.04,
    backgroundColor: '#fff',
    marginVertical: 1,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
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
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
    width: '100%',
  },
});
