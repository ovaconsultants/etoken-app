import { StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');
const isLandscape = width > height;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding : '1%',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  searchBarContainer: {
    marginVertical: isLandscape ? 5 : 15,
  },
  formContainer: {
    marginVertical: isLandscape ? 5 : 0,
    flexDirection : 'column',
    flex: 1,
    justifyContent: 'flex-start',
  },

  inputContainer: {
    marginBottom: isLandscape ? 7 : 10,
  },
  input: {
    height: isLandscape ?  30 : 50,
    paddingLeft : '2%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  clearButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: isLandscape ? 10 : 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: isLandscape ? 10 : 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  disabledButton: {
    backgroundColor: 'rgba(0, 122, 255, 0.6)',
  },
  clearButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerContainer: {
    flex: isLandscape ? 0.2 : 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;