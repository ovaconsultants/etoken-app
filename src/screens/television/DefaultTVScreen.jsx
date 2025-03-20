import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { styles } from './DefaultTVScreen.styles';
import { doctorInfoAtom } from '../../atoms/doctorAtoms/doctorAtom';
import { useAtomValue } from 'jotai';
import { getInitials } from '../../utils/getInitials';
import AdWithRotation from '../../components/advertisement/AdRotation';
import FastImage  from 'react-native-fast-image';
import { useProfileURI } from '../../hooks/useProfileURI';

const DefaultTVScreen = ({ clinicInfo, footerDetails = '' }) => {
  const [isAdShowing, setIsAdShowing] = useState(false);
  const doctorInfo = useAtomValue(doctorInfoAtom);
  const doctorInitials = getInitials(doctorInfo?.doctor_name);

  // Debugging statements
  useEffect(() => {
    console.log('Screen Mounted: DefaultTVScreen');
  }, []);

  // Timer to show the ad after 10 seconds (only runs once on mount)
  useEffect(() => {
    console.log('Ad timer started...');
    const adTimer = setTimeout(() => {
      console.log('Ad Showing: TRUE');
      setIsAdShowing(true);
    }, 10000);

    return () => {
      clearTimeout(adTimer);
      console.log('Ad timer cleared');
    };
  }, []); // Removed `isAdShowing` from dependencies

  // Timer to hide the ad after 5 seconds
  useEffect(() => {
    if (isAdShowing) {
      console.log('Ad is now showing');
      const resetTimer = setTimeout(() => {
        console.log('Ad Hiding: FALSE');
        setIsAdShowing(false);
      }, 5000);

      return () => {
        clearTimeout(resetTimer);
        console.log('Ad hide timer cleared');
      };
    }
  }, [isAdShowing]);

  return (
    <View style={styles.gradientContainer}>
      <View style={{ flex: 1 }}>
        {isAdShowing ? (
          <AdWithRotation doctor_id={doctorInfo.doctor_id} clinic_id={clinicInfo.clinic_id} />
        ) : (
          <DefaultScreenContent clinicInfo={clinicInfo} doctorInfo={doctorInfo} doctorInitials={doctorInitials} />
        )}
      </View>
    </View>
  );
};


const DefaultScreenContent = ({ clinicInfo, doctorInfo, doctorInitials }) => {
  const profileUri = useProfileURI();
  console.log('Profile URI', profileUri);
  console.log('Rendering Default Screen Content');

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.clinicInfo}>
          <Text style={styles.clinicName}>{clinicInfo.clinic_name}</Text>
          <Text style={styles.clinicAddress}>
            {clinicInfo.clinic_address}, {clinicInfo.clinic_city}, {clinicInfo.clinic_state} - {clinicInfo.clinic_zipcode}
          </Text>
        </View>
        <View style={styles.initialsCircle}>
          <Text style={styles.doctorInitials}>{'JD'}</Text>
        </View>
      </View>

      {/* Doctor Profile Section */}
      <View style={styles.profileSection}>
        <FastImage
          source={{ uri: profileUri }}
          style={styles.doctorImage}
          resizeMode="cover"
        />
        <Text style={styles.doctorName}>Dr. John Doe</Text>
        <Text style={styles.doctorTitle}>{doctorInfo?.specialty}</Text>
      </View>

      {/* Doctor Details Section */}
      <View style={styles.detailsSection}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Experience</Text>
          <Text style={styles.detailValue}>{doctorInfo?.experience} Years+</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Languages</Text>
          <Text style={styles.detailValue}>{doctorInfo?.languages.join(', ')}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Specialties</Text>
          <Text style={styles.detailValue}>{doctorInfo?.specialties.join(', ')}</Text>
        </View>
      </View>

      {/* Contact Section */}
      <View style={styles.contactSection}>
        <Text style={styles.contactLabel}>Contact Information</Text>
        <Text style={styles.contactValue}>{doctorInfo?.phone}</Text>
        <Text style={styles.contactValue}>{doctorInfo?.email}</Text>
        <Text style={styles.contactValue}>{doctorInfo?.website}</Text>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerDetails}>
          This is our clinic {clinicInfo?.clinic_name}. We hope you get well soon!
        </Text>
        <Text style={styles.footerNote}>
          © 2025 Designed & Developed by OVA2 Consultants Pvt. Ltd
        </Text>
      </View>
    </View>
  );
};

export default DefaultScreenContent;