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
      marginTop: '5%',
    },
    footer: {
      flex: isLandscape ? 0.1 : 0.2,
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: '5%',
    },
    footerText: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
    },
    link: {
      color: '#007bff',
      fontWeight: 'bold',
    },
    disabledButton: {
      backgroundColor: '#cccccc',
      opacity: 0.7,
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
