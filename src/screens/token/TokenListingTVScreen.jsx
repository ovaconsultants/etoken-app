import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { RotateCcw } from 'lucide-react-native';

import { styles } from './TokenListingTVScreen.styles';
import { usePatientTokens } from '../../hooks/usePatientTokens';
import { useProfileURI } from '../../hooks/useProfileURI';
import InProgressTokenNotificationScreen from '../notification/InProgressTokenNotificationScreen';
import DefaultTVScreen from '../television/DefaultTVScreen';
import TokenTable from './TokenTable';
import LoadingErrorHandler from '../../components/loadingErrorHandler/LoadingErrorHandler';
import DrawerLeftNavigationButton from '../../components/drawerNavigation/drawerNavigation';
import ProfileImageRenderer from '../../components/profileImage/ProfileImage';
import withQueryClientProvider from '../../hooks/useQueryClientProvider';
import { FetchDoctorWithIdRequest } from '../../services/doctorService';
import { FetchAllClinicForDoctorRequest } from '../../services/clinicService';
import { showToast } from '../../components/toastMessage/ToastMessage';



const TokenListingTVScreen = ({ route, navigation }) => {
  // Safely extract params with defaults
  const { doctor_id = null, clinic_id = null } = route.params ?? {};
  const profileUri = useProfileURI();

  const [clinicData, setClinicData] = useState([]);
  const [doctorData, setDoctorData] = useState({});
  const [inProgressPatient, setInProgressPatient] = useState(null);
  const [isRefreshReloading, setIsRefreshReloading] = useState(false);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);

  const {
    data: tokens = [],
    isLoading,
    isError,
    error,
    refetch,
  } = usePatientTokens(doctor_id, clinic_id);

  // Memoized derived data
  const currentClinicData = React.useMemo(() => 
    clinicData.find(clinic => clinic.clinic_id === clinic_id) || {},
    [clinicData, clinic_id]
  );

  // Handle reload with better error handling
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

  // Set up header buttons
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

  // Fetch doctor and clinic details with better error handling
  useEffect(() => {
    if (!doctor_id || !clinic_id) return;

    const fetchDetails = async () => {
      setIsFetchingDetails(true);
      try {
        const [clinicApiData, doctorApiData] = await Promise.all([
          FetchAllClinicForDoctorRequest(clinic_id).catch(() => []),
          FetchDoctorWithIdRequest(doctor_id).catch(() => {}),
        ]);
        setClinicData(clinicApiData ?? []);
        setDoctorData(doctorApiData ?? {});
        console.log('Fetched clinic details:', clinicApiData);
        console.log('Fetched doctor details:', doctorApiData);
      } catch (fetchDataError) {
        console.error('Error fetching data:', fetchDataError);
        showToast('Failed to fetch clinic and doctor details', 'error');
      } finally {
        setIsFetchingDetails(false);
      }
    };

    fetchDetails();
  }, [doctor_id, clinic_id]);

  // Handle orientation and in-progress patient
  useEffect(() => {
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
      ? tokens.find(token => token?.status === 'In Progress' || token?.recall === true)
      : null;
    setInProgressPatient(inProgress || null);

    return () => {
      try {
        Orientation.lockToPortrait();
      } catch (err) {
        console.warn('Orientation reset error:', err);
      }
    };
  }, [tokens]);

  // Show error toast when there's an error
  useEffect(() => {
    if (isError) {
      showToast('Error loading tokens', 'error');
    }
  }, [isError]);

  // Loading state
  if (isLoading || isRefreshReloading || isFetchingDetails || isError) {
    return (
      <LoadingErrorHandler
        isLoading={isLoading || isRefreshReloading || isFetchingDetails}
        isError={isError}
        error={error}
        isLandscape
      />
    );
  }

  // Empty state
  if (!Array.isArray(tokens) || tokens.length === 0) {
    return (
      <DefaultTVScreen
        doctorInfo={doctorData}
        clinicInfo={currentClinicData}
      />
    );
  }

  return (
    <View style={styles.fullScreenContainer} testID="token-listing-screen">
      <View style={styles.headerContainer}>
        <DoctorHeader 
          doctorData={doctorData} 
          profileUri={profileUri} 
        />
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

// Extracted component for better readability
const DoctorHeader = ({ doctorData, profileUri }) => (
  <View style={styles.doctorSection}>
    <View style={styles.profileCircle}>
      <ProfileImageRenderer imageUrl={profileUri ?? ''} />
    </View>

    <View style={styles.doctorNameContainer}>
      <View style={styles.leftColumn}>
        <Text style={styles.doctorName}>
          Dr. { doctorData?.first_name + ' ' + doctorData?.last_name ?? 'N/A'}
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
);

const ReloadButton = ({ handleReloadPress, isRefreshReloading }) => (
  <View style={styles.reloadButton}>
    <TouchableOpacity
      onPress={handleReloadPress}
      disabled={isRefreshReloading}
      accessibilityLabel="Reload token list"
      testID="reload-button"
    >
      {isRefreshReloading ? (
        <ActivityIndicator size="small" color="#007BFF" />
      ) : (
        <RotateCcw size={22} color="#000" />
      )}
    </TouchableOpacity>
  </View>
);

export default withQueryClientProvider(TokenListingTVScreen);