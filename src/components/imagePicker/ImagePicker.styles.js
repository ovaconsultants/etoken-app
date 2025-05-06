// ImagePickerComponent.styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  placeholder: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 75,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
  },
});