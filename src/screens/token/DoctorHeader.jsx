import React from 'react';
import { View, Text } from 'react-native';
import ProfileImageRenderer from '../../components/profileImage/ProfileImage';
import { styles } from './TokenListingTVScreen.styles';
export const DoctorHeader = ({ doctorData }) => {
  return (
    <>
      <View style={styles.doctorSection}>
        <View style={styles.profileCircleSection}>
          <ProfileImageRenderer doctor_id={doctorData?.doctor_id ?? ''} />
        </View>
        <View style={styles.doctorDetailSubsection}>
          <View style={styles.leftColumn}>
            <Text style={styles.doctorName}>
              Dr.{' '}
              {doctorData?.first_name + ' ' + doctorData?.last_name ?? 'N/A'}
            </Text>
            <Text style={styles.qualificationText}>
              {doctorData?.qualification ?? 'N/A'}
            </Text>
          </View>

          <View style={styles.rightColumn}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Specialization: </Text>
              <Text style={styles.infoText}>
                {doctorData?.specialization ?? 'N/A'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Experience: </Text>
              <Text style={styles.infoText}>
                {doctorData?.experience_years ?? 0} years
              </Text>
            </View>

            <View style={[styles.infoRow, styles.phoneRow]}>
              <Text style={styles.infoLabel}>Ph: </Text>
              <Text style={styles.infoText}>
                {doctorData?.phone_number ?? 'N/A'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};