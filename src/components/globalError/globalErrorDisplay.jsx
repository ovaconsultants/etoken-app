import React from 'react';
import {View, Text} from 'react-native';
import {useAtom} from 'jotai';
import {errorAtom} from '../atoms/errorAtoms/errorAtom';
import {styles} from './globalErrorDisplay.styles';

const GlobalErrorDisplay = () => {
  const [error] = useAtom(errorAtom);

  if (!error) {
    return null;
  }

  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorTitle}>{error.message}</Text>
      <Text style={styles.errorDescription}>
        {error.description || 'An error occurred'}
      </Text>
    </View>
  );
};

export default GlobalErrorDisplay;
