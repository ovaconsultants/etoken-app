import {StyleSheet} from 'react-native';

export const createStyles = isLandscape =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 10,
      backgroundColor: '#fff',
    },

    formContainer: {
      flex:  1,
      justifyContent:  'center',
    },

    header: {
      flex: isLandscape ? 0.1 : 0.2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      alignSelf: 'center',
      margin : isLandscape ? '1%' : '3%',
    },
    content: {
      flex: isLandscape ? 0.7 : 0.6,
      gap: 16,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 0.1,
      minHeight: 48,
      maxHeight: 55,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: '3%',
      backgroundColor: '#fff',
      margin : '3%',
    },
    inputError: {
      borderColor: 'red',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      margin: '3%',
    },

    footerText: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      margin: '3%',
    },
    link: {
      color: '#007bff',
      fontWeight: 'bold',
    },
    disabledButton: {
      backgroundColor: '#cccccc',
      opacity: 0.7,
    },

    button: {
      backgroundColor: '#007AFF',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: isLandscape ? '3%' : '3%',
    },
    buttonDisabled: {
      backgroundColor: '#add8e6',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },

    row: {
      flexDirection: 'row',
      gap: 16,
    },
    column: {
      flexDirection: 'column',
      gap: 16,
    },
    flex1: {flex: 1},
    flex2: {flex: 2},
    flex3: {flex: 3},
  });
