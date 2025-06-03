import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';

import {GetDoctorProfileImageRequest} from '../../services/profileImageService';
import FastImage from 'react-native-fast-image';

import {useOrientation} from '../../hooks/useOrientation';

import {creatStyles} from './DefaultTVScreen.styles';
// Helper to render bullet points conditionally
const BulletPoint = ({children, styles}) => (
  <View style={styles.bulletPoint}>
    <View style={styles.bulletDot} />
    <Text style={styles.bulletText}>{children}</Text>
  </View>
);

// Section wrapper with title
const InfoSection = ({title, children, styles}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

// Contact item row
const ContactItem = ({icon, text, styles}) => (
  <View style={styles.contactItem}>
    <Text style={styles.contactIcon}>{icon}</Text>
    <Text style={styles.contactText}>{text || 'Not available'}</Text>
  </View>
);

export const DefaultTVScreen = ({doctorInfo = {}, clinicInfo = {}}) => {
  const { isLandscape, dimensions} = useOrientation();
  const styles = creatStyles(isLandscape, dimensions);

  const [profileImageUri, setProfileImageUri] = useState('');

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const uri = await GetDoctorProfileImageRequest(doctorInfo?.doctor_id);
        if (uri) {
          setProfileImageUri(uri);
        }
      } catch (error) {
        console.warn('Failed to load profile image:', error);
      }
    };

    if (doctorInfo?.doctor_id) {
      fetchProfileImage();
    }
  }, [doctorInfo?.doctor_id]);

  // Construct full address
  const fullAddress = [
    clinicInfo.address,
    clinicInfo.city,
    clinicInfo.state,
    clinicInfo.zip_code,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={true}>
      {/* Profile Image */}
      <View style={styles.profileImageWrapper}>
        <FastImage
          source={{
            uri: profileImageUri || doctorInfo?.profile_picture_url,
            priority: FastImage.priority.high,
          }}
          style={styles.profileImage}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>

      {/* Doctor Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.doctorName}>
          Dr.{' '}
          {doctorInfo?.first_name + ' ' + doctorInfo?.last_name ||
            'Name Unavailable'}
        </Text>
        <Text style={styles.doctorTitle}>
          {doctorInfo?.qualification || ''}
        </Text>

        {/* Experience Section */}
        {(doctorInfo?.experience_years || doctorInfo?.specialization) && (
          <InfoSection title="EXPERIENCE" styles={styles}>
            {doctorInfo.experience_years && (
              <BulletPoint styles={styles}>
                {doctorInfo.experience_years} years experience
              </BulletPoint>
            )}
            {doctorInfo.specialization && (
              <BulletPoint styles={styles}>{doctorInfo.specialization}</BulletPoint>
            )}
          </InfoSection>
        )}

        {/* Contact Section */}
        <InfoSection title="CONTACT" styles={styles}>
          <ContactItem
            icon="📞"
            text={doctorInfo.phone_number}
            styles={styles}
          />
          <ContactItem icon="✉️" text={doctorInfo.email} styles={styles} />
          <ContactItem icon="📍" text={fullAddress} styles={styles} />
        </InfoSection>
      </View>
    </ScrollView>
  );
};

export default DefaultTVScreen;
