import {StyleSheet} from 'react-native';
export const createStyles = (isLandscape) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContainer: {
      paddingBottom: 100,
    },

    sectionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
    sectionButton: {
      padding: 10,
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    },
    activeSectionButton: {
      borderBottomColor: '#007AFF',
    },
    sectionButtonText: {
      fontSize: 16,
    },
    formContainer: {
      padding: 20,
    },
    sectionHeader: {
      marginBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
      paddingBottom: 10,
    },
    sectionHeaderText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    inputGroup: {
      marginBottom: 20,
    },
    label: {
      marginBottom: 8,
      marginHorizontal: 5,
      fontSize: 16,
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 15,
      fontSize: 16,
    },
    dateInput: {
      justifyContent: 'center',
    },
    textArea: {
      height: 100,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 15,
      paddingVertical: 10,
      fontSize: 16,
      textAlignVertical: 'top',
    },
    radioGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
    },
    radioButton: {
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 20,
      borderWidth: 1,
    },
    radioButtonText: {
      fontSize: 14,
    },
    errorText: {
      color: 'red',
      fontSize: 12,
      marginTop: 5,
    },
    submitButton: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
      height: 50,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    submitButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
};
