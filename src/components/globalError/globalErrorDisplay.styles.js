import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'red',
    padding: 10,
    zIndex: 1000,
  },
  errorTitle: {
    fontWeight: 'bold',
    color: 'white',
  },
  errorDescription: {
    color: 'white',
  },
});
