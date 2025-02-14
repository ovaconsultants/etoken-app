import { StyleSheet } from 'react-native';

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
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // For Android shadow
  },
  disabledDropdown: {
    opacity: 0.6, // Fade effect when disabled
  },
  placeholderText: {
    color: '#999',
  },
  selectedText: {
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    marginVertical: 10,
  },
});

export default SignUpStyles;
