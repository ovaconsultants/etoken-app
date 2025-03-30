import React from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { styles } from './DefaultTVScreen.styles';
import { useAtomValue } from 'jotai';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient'; // For gradient background
import { doctorInfoAtom } from '../../atoms/doctorAtoms/doctorAtom';
import { useProfileURI } from '../../hooks/useProfileURI';

export const DefaultTVScreen = ({ clinicInfo }) => {
  const doctorInfo = useAtomValue(doctorInfoAtom);
  const profileUri = useProfileURI();

  // Animation for the image container
  const scaleValue = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.elastic(1.2),
      useNativeDriver: true,
    }).start();
  });

  return (
    <View style={styles.container}>
      {/* Left Section - Doctor Profile */}
      <View style={styles.leftSection}>
        <Animated.View
          style={[
            styles.imageContainer,
            {
              transform: [{ scale: scaleValue }], // Apply scale animation
            },
          ]}
        >
          <LinearGradient
            colors={['#98D8EF', '#98D8EF', '#98D8EF']} // Green gradient
            style={styles.gradientBackground}
          >
            <FastImage
              source={{ uri: profileUri }}
              style={styles.doctorImage}
              resizeMode="cover"
            />
          </LinearGradient>
        </Animated.View>
        <Text style={styles.doctorName}>Dr. {doctorInfo?.doctor_name}</Text>
        <Text style={styles.doctorTitle}>{doctorInfo?.specialty || 'Dentist Surgeon'}</Text>
        <Text style={styles.doctorTitle}>{clinicInfo?.clinic_name || 'ABC Hospital'}</Text>
      </View>

      {/* Right Section - Clinic and Doctor Details */}
      <View style={styles.rightSection}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.clinicName}>{clinicInfo.clinic_name}</Text>
          <Text style={styles.clinicAddress}>{clinicInfo.clinic_address}</Text>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Experience:</Text>
            <Text style={styles.detailValue}>{doctorInfo?.experience} Years</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Languages:</Text>
            <Text style={styles.detailValue}>{doctorInfo?.languages}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Specialties:</Text>
            <Text style={styles.detailValue}>{doctorInfo?.specialties}</Text>
          </View>
        </View>

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <Text style={styles.contactLabel}>Contact Information</Text>
          <Text style={styles.contactValue}>{doctorInfo?.phone}</Text>
          <Text style={styles.contactValue}>{doctorInfo?.email}</Text>
          <Text style={styles.contactValue}>{doctorInfo?.website}</Text>
        </View>
      </View>
    </View>
  );
};

export default DefaultTVScreen;