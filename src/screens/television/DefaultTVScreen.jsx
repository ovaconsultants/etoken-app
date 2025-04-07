import React from 'react';
import { View, Text, Animated, Easing, ScrollView } from 'react-native';
import { useAtomValue } from 'jotai';
import FastImage from 'react-native-fast-image';
import { doctorInfoAtom } from '../../atoms/doctorAtoms/doctorAtom';
import { useProfileURI } from '../../hooks/useProfileURI';
import { styles } from './DefaultTVScreen.styles';

export const DefaultTVScreen = ({ clinicInfo }) => {
  const doctorInfo = useAtomValue(doctorInfoAtom);
  const profileUri = useProfileURI();

  const scaleValue = new Animated.Value(0);
  React.useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.elastic(1.2),
      useNativeDriver: true,
    }).start();
  });

  const formattedSpecialization = doctorInfo?.specialization_description
    ? doctorInfo.specialization_description
        .split(',')
        .map(item => `\u2022 ${item.trim()}`)
        .join('\n')
    : 'No specialties listed';

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Section */}
      <View style={styles.profileCard}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <View style={styles.rainbowBorder}>
            <View style={styles.imageContainer}>
              <FastImage
                source={{
                  uri: profileUri || doctorInfo?.profile_picture_url,
                  priority: FastImage.priority.high,
                }}
                style={styles.doctorImage}
                resizeMode={FastImage.resizeMode.cover}
                fallback
              />
            </View>
          </View>
        </Animated.View>

        <Text style={styles.doctorName}>Dr. {doctorInfo?.doctor_name || 'Name Not Available'}</Text>
        <Text style={styles.doctorTitle}>{doctorInfo?.specialization_name || 'Dental Surgeon'}</Text>
        <Text style={styles.clinicName}>{clinicInfo?.clinic_name || 'Clinic Name'}</Text>
        <Text style={styles.clinicAddress}>{clinicInfo?.clinic_address || 'Clinic Address'}</Text>
      </View>

      {/* Details Section */}
      <View style={styles.detailsCard}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Profile:</Text>
          <Text style={styles.detailValue}>
            Dr. {doctorInfo?.doctor_name || 'Name Not Available'}, {doctorInfo?.specialization_name}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Experience:</Text>
          <Text style={styles.detailValue}>{doctorInfo?.experience_years || 'N/A'} Years+</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Languages:</Text>
          <Text style={styles.detailValue}>{doctorInfo?.languages || 'Not listed'}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Types of:</Text>
          <Text style={styles.detailValue}>{doctorInfo?.doctor_type || 'Surgeon'}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Specialties:</Text>
          <Text style={styles.detailValue}>{formattedSpecialization}</Text>
        </View>

        {doctorInfo?.qualification && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Qualifications:</Text>
            <Text style={styles.detailValue}>{doctorInfo.qualification}</Text>
          </View>
        )}

        {doctorInfo?.biography && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>About:</Text>
            <Text style={styles.detailValue}>{doctorInfo.biography}</Text>
          </View>
        )}

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Registration No.:</Text>
          <Text style={styles.detailValue}>{doctorInfo?.registration_number || 'Not Available'}</Text>
        </View>

        <View style={styles.contactBox}>
          <Text style={styles.contactText}>{clinicInfo?.clinic_phone || '0123 456 789'}</Text>
          <Text style={styles.contactText}>{clinicInfo?.clinic_email || 'clinic@email.com'}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default DefaultTVScreen;
