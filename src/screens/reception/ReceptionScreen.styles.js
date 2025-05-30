import { StyleSheet } from 'react-native';
export const createStyles = (isLandscape) =>  StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding : '2%',
    flex: 1,
    gap : isLandscape ? 0 : '4%',
  },
  contentContainer: {
    flex: 1,
    gap: isLandscape ? '5%' : '4%',
  },
  searchBarContainer: {
    marginVertical: isLandscape ? 0 : 15,

  },
  formContainer: {
    flexDirection : 'column',
    flex: 1,
    justifyContent: 'flex-start',
  },

  inputContainer: {
    marginBottom: isLandscape ? 7 : 15,
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
    flex: isLandscape ? 0.6 : 0.4,
    flexDirection: isLandscape ? 'row' : 'column',
    gap :  isLandscape ? '2%' :   '10%',
    justifyContent: 'center',
    marginTop : isLandscape ? 0 : 5,

  },
  clearButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
  justifyContent: 'center',
  alignItems: 'center',
    borderRadius: 8,
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    borderRadius: 8,
    justifyContent: 'center',
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

