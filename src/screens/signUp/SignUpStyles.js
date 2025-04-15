import { StyleSheet,Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const SignUpStyles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginVertical: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dropdown: {
    height: height * 0.07,
    width: '105%',
    marginLeft: -width * 0.025,
    marginRight: -width * 0.025,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: width * 0.03,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  disabledDropdown: {
    opacity: 0.6,
  },
  placeholderText: {
    color: '#999',
  },
  selectedText: {
    color: '#333',
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
    marginVertical: 10,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginVertical: 10,
  },
});

export default SignUpStyles;