import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './DefaultTVScreen.styles';
import { doctorInfoAtom } from '../../atoms/doctorAtoms/doctorAtom';
import { useAtomValue } from 'jotai';
import { getInitials } from '../../utils/getInitials';
import AdWithRotation from '../../components/advertisement/AdRotation';

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
  console.log('Rendering Default Screen Content');
  return (
    <>
      <View style={styles.header}>
        <View style={styles.clinicInfo}>
          <Text style={styles.clinicName}>{clinicInfo.clinic_name}</Text>
          <Text>
            {clinicInfo.clinic_address}, {clinicInfo.clinic_city}, {clinicInfo.clinic_state} - {clinicInfo.clinic_zipcode}
          </Text>
        </View>
        <View style={styles.initialsCircle}>
          <Text style={styles.doctorInitials}>{doctorInitials}</Text>
        </View>
      </View>

      <View style={styles.doctorSection}>
        <View style={styles.detailsContainer}>
          <Text style={styles.doctorName}>Dr {doctorInfo.doctor_name}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerDetails}>
          This is our clinic {clinicInfo.clinic_name}. We hope you get well soon!
        </Text>
      </View>
    </>
  );
};

export default DefaultTVScreen;