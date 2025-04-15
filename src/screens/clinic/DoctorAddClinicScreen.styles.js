// ClinicScreen.styles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: -width * 0.020,
    marginRight: -width * 0.40,
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
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  refreshButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
