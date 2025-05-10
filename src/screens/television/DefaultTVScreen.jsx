import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useProfileURI } from '../../hooks/useProfileURI';
import { styles } from './DefaultTVScreen.styles';

export const DefaultTVScreen = ({ doctorInfo, clinicInfo }) => {
  const profileUri = useProfileURI();

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Left: Profile Image */}
      <View style={styles.profileImageWrapper}>
        <FastImage
          source={{
            uri: profileUri || doctorInfo?.profile_picture_url,
            priority: FastImage.priority.high,
          }}
          style={styles.profileImage}
        />
      </View>

      {/* Right: Info Sections */}
      <View style={styles.infoContainer}>
        <Text style={styles.doctorName}>Dr. {doctorInfo?.doctor_name || 'Name Unavailable'}</Text>
        <Text style={styles.doctorTitle}>{doctorInfo?.qualification}</Text>
        {/* Experience Section */}
        {(doctorInfo?.experience_years || doctorInfo?.specialization) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EXPERIENCE</Text>
            {doctorInfo?.experience_years && (
              <View style={styles.bulletPoint}>
                <View style={styles.bulletDot} />
                <Text style={styles.bulletText}>{doctorInfo.experience_years} years experience</Text>
              </View>
            )}
            {doctorInfo?.specialization && (
              <View style={styles.bulletPoint}>
                <View style={styles.bulletDot} />
                <Text style={styles.bulletText}>{doctorInfo.specialization}</Text>
              </View>
            )}
          </View>
        )}

        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CONTACT</Text>
          {doctorInfo?.phone_number && (
            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>📞</Text>
              <Text style={styles.contactText}>{doctorInfo.phone_number}</Text>
            </View>
          )}
          {doctorInfo?.email && (
            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>✉️</Text>
              <Text style={styles.contactText}>{doctorInfo.email}</Text>
            </View>
          )}
          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>📍</Text>
            <Text style={styles.contactText}>
              {[
                clinicInfo?.clinic_address,
                clinicInfo?.clinic_city,
                clinicInfo?.clinic_state,
                clinicInfo?.clinic_zipcode,
              ]
                .filter(Boolean)
                .join(', ') || 'Clinic address not available'}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DefaultTVScreen;
