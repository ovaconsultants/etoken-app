import React from 'react';
import {View, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './DefaultTVScreen.styles';
import {doctorInfoAtom} from '../../atoms/doctorAtoms/doctorAtom';
import {useAtomValue} from 'jotai';
import AdWithRotation from '../../components/advertisement/AdRotation';

const DefaultTVScreen = ({
  clinicInfo,
  footerDetails = '',
}) => {
  const doctorInfo = useAtomValue(doctorInfoAtom);


  const doctorInitials = doctorInfo?.doctor_name
    ?.split(' ') // Split the name
    .map(word => word[0]) // Take initials
    .join('') // Join them together
    .toUpperCase();

  return (

        <LinearGradient
          colors={['#FFF5E4', '#FFE3E1']} // Gradient background
          style={styles.gradientContainer}>
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.clinicInfo}>
              <Text style={styles.clinicName}>{clinicInfo.clinic_name}</Text>
              <Text>
                {' '}
                {clinicInfo.clinic_address}, {clinicInfo.clinic_city},{' '}
                {clinicInfo.clinic_state} - {clinicInfo.clinic_zipcode}
              </Text>
            </View>

            <View style={styles.initialsCircle}>
              <Text style={styles.doctorInitials}>{doctorInitials}</Text>
            </View>
          </View>

          {/* Doctor and Clinic Details Section */}

          {/* Doctor's Image Section */}
          <View style={styles.doctorSection}>
            <View style={styles.detailsContainer}>
              <Text style={styles.doctorName}>
                {' '}
                Dr {doctorInfo.doctor_name}
              </Text>
            </View>
            <AdWithRotation /> 
          </View>

          {/* Footer Section */}
          <View style={styles.footer}>
            <Text style={styles.footerDetails}>This is our clinic {clinicInfo.clinic_name}. we hope you get well soon !</Text>
          </View>
        </LinearGradient>
  );
};

export default DefaultTVScreen;
