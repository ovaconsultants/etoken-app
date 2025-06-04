import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {RotateCcw} from 'lucide-react-native';

import {styles} from './TokenListingTVScreen.styles';
import {usePatientTokens} from '../../hooks/usePatientTokens';
import withQueryClientProvider from '../../hooks/useQueryClientProvider';
import {FetchDoctorWithIdRequest} from '../../services/doctorService';

import InProgressTokenNotificationScreen from '../notification/InProgressTokenNotificationScreen';
import DefaultTVScreen from '../television/DefaultTVScreen';
import TokenTable from './TokenTable';
import LoadingErrorHandler from '../../components/loadingErrorHandler/LoadingErrorHandler';

import AdWithRotation from '../../components/advertisement/AdRotation';
import {showToast} from '../../components/toastMessage/ToastMessage';
import {DoctorHeader} from './DoctorHeader';

const TokenListingTVScreen = ({route, navigation}) => {
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
    return (
      tokens?.filter(token =>
        ['In Progress', 'Waiting'].includes(token?.status),
      ) ?? []
    );
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
    <View
      style={styles.fullScreenContainer}
      testID="token-listing-screen"
      key={refreshKey}>
      <View style={styles.headerContainer}>
        <View style={styles.doctorHeaderSubContainer}>
          <DoctorHeader doctorData={doctorData} />
        </View>
        <View style={styles.refreshSubContainer}>
          <TouchableOpacity onPress={() => setRefreshKey(prev => prev + 1)}>
            <RotateCcw size={22} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.tokenListContainer}>
        <TokenTable tokens={filteredTokens} doctorId={doctor_id} />
      </View>
      <View style={styles.notificationInProgressContainer}>
        {inProgressPatient && (
          <InProgressTokenNotificationScreen
            inProgressPatient={inProgressPatient}
            isLoading={isLoading}
            isError={isError}
            error={error}
          />
        )}
      </View>
        {/* <AdWithRotation
          doctor_id={doctor_id}
          clinic_id={clinic_id}
          hasInProgressPatient={inProgressPatient !== null}
        /> */}
    </View>
  );
};

export default withQueryClientProvider(TokenListingTVScreen);
