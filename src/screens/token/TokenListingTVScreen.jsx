import React, { useCallback, useEffect, useLayoutEffect, useState, useMemo } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { RotateCcw } from 'lucide-react-native';

import { styles } from './TokenListingTVScreen.styles';
import { usePatientTokens } from '../../hooks/usePatientTokens';
import withQueryClientProvider from '../../hooks/useQueryClientProvider';
import { FetchDoctorWithIdRequest } from '../../services/doctorService';

import InProgressTokenNotificationScreen from '../notification/InProgressTokenNotificationScreen';
import DefaultTVScreen from '../television/DefaultTVScreen';
import TokenTable from './TokenTable';
import LoadingErrorHandler from '../../components/loadingErrorHandler/LoadingErrorHandler';
import DrawerLeftNavigationButton from '../../components/drawerNavigation/drawerNavigation';
import ProfileImageRenderer from '../../components/profileImage/ProfileImage';
import AdWithRotation from '../../components/advertisement/AdRotation';
import { showToast } from '../../components/toastMessage/ToastMessage';

const TokenListingTVScreen = ({ route, navigation }) => {
  const {
    doctor_id = null,
    clinic_id = null,
    selectedClinic: clinicData = [],
  } = route.params ?? {};

  const [doctorData, setDoctorData] = useState({});
  const [inProgressPatient, setInProgressPatient] = useState(null);
  const [isRefreshReloading, _] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const {
    data: tokens = [],
    isLoading,
    isError,
    error,
    refetch: refetchTokens,
  } = usePatientTokens(doctor_id, clinic_id);


  const filteredTokens = useMemo(() => {
    return tokens?.filter(token => ['In Progress', 'Waiting'].includes(token?.status)) ?? [];
  }, [tokens]);
  const loadData = useCallback(async () => {
    try {
      if (!doctor_id) {
        return;
      }
      const [doctorDataApi] = await Promise.all([
        FetchDoctorWithIdRequest(doctor_id),
        refetchTokens(),
      ]);

      setDoctorData(doctorDataApi ?? {});
    } catch (err) {
      console.error('Refresh error:', err);
      showToast('Refresh failed', 'error');
    } finally {
    }
  }, [doctor_id, refetchTokens]);

  // Modified refresh handler
  const handleReloadPress = useCallback(() => {
    setRefreshKey(prev => prev + 1);
    loadData();
    showToast('Refreshing ...');
  }, [loadData]);
  useLayoutEffect(() => {
    // eslint-disable-next-line react/no-unstable-nested-components
    const HeaderRightButtons = () => (
      <View style={styles.headerRightContainer}>
        {/* <ReloadButton
          handleReloadPress={handleReloadPress}
          isRefreshReloading={isRefreshReloading}
        /> */}
        <DrawerLeftNavigationButton navigation={navigation} />
      </View>
    );

    navigation.setOptions({
      headerRight: HeaderRightButtons,
    });
  }, [navigation, isRefreshReloading, handleReloadPress]);

  // Handle orientation and in-progress patient
  useEffect(() => {
    loadData();
    const handleOrientation = () => {
      try {
        Orientation.lockToLandscape();
      } catch (err) {
        console.warn('Orientation error:', err);
      }
    };
    handleOrientation();

    // Find in-progress patient safely
    const inProgress = Array.isArray(tokens)
      ? tokens.find(
        token => token?.status === 'In Progress' || token?.recall === true,
      )
      : null;
    setInProgressPatient(inProgress || null);

    return () => {
      try {
        Orientation.lockToPortrait();
      } catch (err) {
        console.warn('Orientation reset error:', err);
      }
    };
  }, [loadData, tokens]);

  // Loading state
  if (isLoading || isRefreshReloading || isError) {
    return (
      <LoadingErrorHandler
        isLoading={isLoading || isRefreshReloading}
        isError={isError}
        error={error}
        isLandscape
      />
    );
  }

  // Empty state
  if (!Array.isArray(filteredTokens) || filteredTokens.length === 0) {
    return <DefaultTVScreen doctorInfo={doctorData} clinicInfo={clinicData} />;
  }

  return (
    <View style={styles.fullScreenContainer} testID="token-listing-screen" key={refreshKey} >
      <View style={styles.headerContainer} >
        <DoctorHeader doctorData={doctorData} /><View>
          <TouchableOpacity onPress={() => setRefreshKey(prev => prev + 1)}>
            <RotateCcw size={22} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <TokenTable tokens={filteredTokens} doctorId={doctor_id}  />
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
      <AdWithRotation
        doctor_id={doctor_id}
        clinic_id={clinic_id}
        hasInProgressPatient={inProgressPatient !== null}
      />
    </View >
  );
};

// Extracted component for better readability
const DoctorHeader = ({ doctorData }) => {
  return (
    <>
      <View style={styles.doctorSection}>
        <View style={styles.profileCircle}>
          <ProfileImageRenderer doctor_id={doctorData?.doctor_id ?? ''} />
        </View>

        <View style={styles.doctorNameContainer}>
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

// const ReloadButton = ({ handleReloadPress, isRefreshReloading }) => (
//   <View style={styles.reloadButton}>
//     <TouchableOpacity
//       onPress={handleReloadPress}
//       disabled={isRefreshReloading}
//       accessibilityLabel="Reload token list"
//       testID="reload-button">
//       {isRefreshReloading ? (
//         <ActivityIndicator size="small" color="#007BFF" />
//       ) : (
//         <RotateCcw size={22} color="#000" />
//       )}
//     </TouchableOpacity>
//   </View>
// );

export default withQueryClientProvider(TokenListingTVScreen);
