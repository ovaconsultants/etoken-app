import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: width * 0.04, // ~4% of screen width
  },
  formContainer: {
    marginBottom: height * 0.05, // ~5% of screen height
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.03, // ~3% of screen height
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    borderRadius: width * 0.02, // ~2% of screen width
    height: height * 0.06, // ~6% of screen height
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width * 0.025, // ~2.5% of screen width
  },
  clearButtonText: {
    color: '#333',
    fontSize: width * 0.04, // ~4% of screen width
    fontWeight: '500',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: width * 0.02, // ~2% of screen width
    height: height * 0.06, // ~6% of screen height
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: width * 0.04, // ~4% of screen width
    fontWeight: '500',
  },
  footerNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginBottom: height * 0.02, // ~2% of screen height
    height: height * 0.07, // ~7% of screen height
  },
  errorText: {
    color: 'red',
    fontSize: width * 0.03, // ~3% of screen width
    marginBottom: height * 0.005, // ~0.5% of screen height
    height: height * 0.02, // ~2% of screen height
  },
  input: {
    height: height * 0.06, // ~6% of screen height
    borderWidth: 1, // Can't be percentage
    borderColor: '#ccc',
    borderRadius: width * 0.02, // ~2% of screen width
    paddingHorizontal: width * 0.03, // ~3% of screen width
    fontSize: width * 0.04, // ~4% of screen width
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
});