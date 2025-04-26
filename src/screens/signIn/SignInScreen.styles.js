import {StyleSheet} from 'react-native';

export const createStyles = isLandscape =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: '#fff',
      gap: 16,
    },
    titleContainer: {
      flex: isLandscape ? 0.3 : 0.3,
      justifyContent:  isLandscape ? 'flex-end' : 'flex-end',
      alignItems: 'center',
    },
    formContainer: {
      flex: isLandscape ? 0.7 : 0.5,
    },
    footerContainer: {
      flex: isLandscape ? 0.1 : 0.3,
    },

    header: {
      flex: isLandscape ? 0.1 : 0.2, // Flex-based proportions
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24, // Fixed size (could use Platform.select for different sizes)
      fontWeight: 'bold',
      marginBottom: '5%', // Percentage-based margin
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
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: '3%',
      backgroundColor: '#red',
      margin : '3%',
    },
    inputError: {
      borderColor: 'red',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      gap: 16, // Gap between buttons
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
    // Additional layout helpers
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
