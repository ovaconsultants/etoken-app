// src/styles/globalStyles.js
import { StyleSheet, Dimensions } from 'react-native';

const MAX_CONTENT_WIDTH = 500; // Set your preferred max width

export const globalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
    maxWidth: MAX_CONTENT_WIDTH,
    width: '100%',
    alignSelf: 'center',
  },
  contentContainer: {
    width: '100%',
    maxWidth: MAX_CONTENT_WIDTH,
    alignSelf: 'center',
  },
 disabledButton : {
    backgroundColor: '#add8e6',
  },
 enabledButton :{
    backgroundColor: '#007BFF',
  },
  // Add other common styles here
});