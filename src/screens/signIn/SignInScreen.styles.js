import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: height * 0.06,
    width: '105%',
    marginLeft: -width * 0.025,
    marginRight: -width * 0.025,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: width * 0.02,
    paddingHorizontal: width * 0.03,
    fontSize: width * 0.04,
    backgroundColor: '#fff',
    marginVertical: 10,
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
    backgroundColor: '#007bfft', 
    opacity: 0.7,
  },
});