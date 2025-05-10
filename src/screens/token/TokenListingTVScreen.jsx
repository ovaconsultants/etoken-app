import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import {useLayoutEffect} from 'react';
import {styles} from './TokenListingTVScreen.styles';
import Orientation from 'react-native-orientation-locker';
import {usePatientTokens} from '../../hooks/usePatientTokens';
import InProgressTokenNotificationScreen from '../notification/InProgressTokenNotificationScreen';
import DefaultTVScreen from '../television/DefaultTVScreen';
import {TokenTable} from './TokenTable';
import withQueryClientProvider from '../../hooks/useQueryClientProvider';
import ProfileImageRenderer from '../../components/profileImage/ProfileImage';
import {
  doctorClinicDetailsAtom,
  doctorInfoAtom,
} from '../../atoms/doctorAtoms/doctorAtom';
import {useAtomValue} from 'jotai';
import {useProfileURI} from '../../hooks/useProfileURI';
import {RotateCcw} from 'lucide-react-native';
import {showToast} from '../../components/toastMessage/ToastMessage';
import LoadingErrorHandler from '../../components/loadingErrorHandler/LoadingErrorHandler';
import DrawerLeftNavigationButton from '../../components/drawerNavigation/drawerNavigation';
const TokenListingTVScreen = ({route, navigation}) => {
  const {doctor_id = null, clinic_id = null} = route.params ?? {};
  const profileUri = useProfileURI();
  const clinicData = useAtomValue(doctorClinicDetailsAtom);
  const doctorData = useAtomValue(doctorInfoAtom);
  const [isRefreshReloading, setIsRefreshReloading] = useState(false);
  const {
    data: tokens = [],
    isLoading,
    isError,
    error,
    refetch,
  } = usePatientTokens(doctor_id, clinic_id);
  const currentClinicData = clinicData.find(
    clinic => clinic.clinic_id === clinic_id,
  );
  const [inProgressPatient, setInProgressPatient] = useState(null);
useLayoutEffect(() => {
  // eslint-disable-next-line react/no-unstable-nested-components
  const HeaderRightButtons = () => (
    <View style={styles.headerRightContainer}>
      <ReloadButton
        handleReloadPress={handleReloadPress}
        isRefreshReloading={isRefreshReloading}
      />
      <DrawerLeftNavigationButton navigation={navigation} />
    </View>
  );

  navigation.setOptions({
    headerRight: HeaderRightButtons,
  });
}, [navigation, isRefreshReloading, handleReloadPress]);

  // Find the in-progress patient
  useEffect(() => {
    Orientation.lockToLandscape();
    const inProgress =
      tokens.find(token => token.status === 'In Progress') ||
      tokens.find(token => token.recall === true);
    setInProgressPatient(inProgress || null);
    return () => {
      Orientation.lockToPortrait();
    };
  }, [tokens]);

  // Reload button handler
  const handleReloadPress = useCallback(async () => {
    try {
      setIsRefreshReloading(true);
      await refetch();
      showToast('Tokens refreshed successfully');
    } catch (err) {
      console.error('Refresh error:', err);
      showToast('Failed to refresh tokens', 'error');
    } finally {
      setIsRefreshReloading(false);
    }
  }, [refetch]);

  if (isLoading || isRefreshReloading || isError) {
    isError && showToast('Error loading tokens', 'error');
    return (
      <LoadingErrorHandler
        isLoading={isLoading || isRefreshReloading}
        isError={isError}
        error={error}
        isLandscape
      />
    );
  }

  if (!tokens || tokens.length === 0) {
    return (
      <DefaultTVScreen doctorInfo={doctorData} clinicInfo={currentClinicData} />
    );
  }

  return (
    <View style={styles.fullScreenContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.doctorSection}>
          <View style={styles.profileCircle}>
            <ProfileImageRenderer imageUrl={profileUri} />
          </View>

          <View style={styles.doctorNameContainer}>
            <View style={styles.leftColumn}>
              <Text style={styles.doctorName}>
                Dr. {doctorData.doctor_name}
              </Text>
              <Text style={styles.qualificationText}>
                {doctorData.qualification}
              </Text>
            </View>

            <View style={styles.rightColumn}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Specialization: </Text>
                <Text style={styles.infoText}>{doctorData.specialization}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Experience: </Text>
                <Text style={styles.infoText}>
                  {doctorData.experience_years} years
                </Text>
              </View>

              <View style={[styles.infoRow, styles.phoneRow]}>
                <Text style={styles.infoLabel}>Ph: </Text>
                <Text style={styles.infoText}>{doctorData.phone_number}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <TokenTable tokens={tokens} />
      <View style={styles.notificationInProgress}>
        {inProgressPatient && (
          <InProgressTokenNotificationScreen
            inProgressPatient={inProgressPatient}
            isLoading={isLoading}
            isError={isError}
            error={error}
          />
        )}
      </View>
    </View>
  );
};

export default withQueryClientProvider(TokenListingTVScreen);

const ReloadButton = ({handleReloadPress, isRefreshReloading}) => (
  <View style={{marginRight: 12}}>
    <TouchableOpacity
      onPress={handleReloadPress}
      disabled={isRefreshReloading}
      style={{padding: 6}}>
      {isRefreshReloading ? (
        <ActivityIndicator size="small" color="#007BFF" />
      ) : (
        <RotateCcw color="#007BFF" />
      )}
    </TouchableOpacity>
  </View>
);
