import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // For gradient background
import {
  CheckCircleIcon,
  PersonIcon,
  BadgeIcon,
} from '../../components/icons/Icons';
import {styles} from './TokenSuccessScreen.style';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window'); // Get screen dimensions

const TokenSuccessScreen = ({route}) => {
  const {tokenNumber, patientName, patientId} = route.params; // Destructure route params
  const navigation = useNavigation();

  // Automatically navigate back after 20 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.goBack();
    }, 20000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']} // Gradient colors
      style={styles.container}>
      <StatusBar barStyle="light-content" /> {/* Light status bar text */}
      <View style={styles.content}>
        {/* Header with icon */}
        <View style={styles.headerContainer}>
          <CheckCircleIcon />
          <Text style={styles.header}>Token Generated Successfully</Text>
        </View>

        {/* Patient Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <PersonIcon />
            <Text style={styles.detailLabel}>Patient ID:</Text>
            <Text style={styles.detailValue}>{patientId}</Text>
          </View>
          <View style={styles.detailRow}>
            <BadgeIcon />
            <Text style={styles.detailLabel}>Patient Name:</Text>
            <Text style={styles.detailValue}>{patientName}</Text>
          </View>
        </View>

        {/* Token Number */}
        <View style={styles.tokenContainer}>
          <Text style={styles.tokenText}>Token No: {tokenNumber}</Text>
        </View>

        {/* Close Button */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default TokenSuccessScreen;
