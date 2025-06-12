import React, {useCallback, useState, useMemo} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  Phone,
  Nfc,
  Home,
  FileText,
  UserPlus,
  RefreshCw,
} from 'lucide-react-native';
import {useAtomValue} from 'jotai';
import withQueryClientProvider from '../../hooks/useQueryClientProvider';
import LoadingErrorHandler from '../../components/loadingErrorHandler/LoadingErrorHandler';
import {usePatientTokenManager} from '../../hooks/usePatientTokenManager';
import {useOrientation} from '../../hooks/useOrientation';
import DefaultReceptionScreen from '../noTokenReceptionState/DefaultReceptionScreen';
import {TranslateNameToHindi} from '../../services/langTranslationService';
import FooterNavigation from '../../components/tabNavigationFooter/TabNavigationFooter';
import {TokenCard} from './PatientTokenCardUI';
import {createStyles} from './PatientTokenManagementScreen.styles';
import {homeRefreshKeyAtom} from '../../atoms/refreshAtoms/homePageRefreshAtom';

const PatientTokenManagementScreen = ({navigation, route}) => {
  const {isLandscape} = useOrientation();
  const styles = createStyles(isLandscape);
  const {clinic_id, doctor_id} = route.params;

  const [activeFilter, setActiveFilter] = useState('all');
   const refreshKey = useAtomValue(homeRefreshKeyAtom);


  const {
    patientTokens,
    selectedTokenId,
    handleSelectToken,
    handleNext,
    handleDone,
    handleRecall,
    handleRefresh,
    updateToken,
    isError,
    isMutating,
    isLoading,
    error,
    hasTokenInProgress,
    total,
    attended,
    inQueue,
    onHold,
  } = usePatientTokenManager(clinic_id, doctor_id);

  const filteredTokens = useMemo(() => {
    switch (activeFilter) {
      case 'attended':
        return patientTokens.filter(t => t.status === 'Completed');
      case 'inQueue':
        return patientTokens.filter(t => t.status === 'Waiting');
      case 'all':
        return patientTokens.filter(t =>
          ['Waiting', 'In Progress', 'On Hold'].includes(t.status),
        );
      default:
        return patientTokens;
    }
  }, [patientTokens, activeFilter]);
  const handleBadgePress = useCallback(filterType => {
    setActiveFilter(filterType);
  }, []);
  const handleRowPress = useCallback(
    tokenId => {
      handleSelectToken(tokenId);
    },
    [handleSelectToken],
  );

  const handleLongPress = useCallback(
    token => {
      navigation.navigate('PatientInfoEditor', {patientInfo: token});
    },
    [navigation],
  );

  if (isLoading || isError) {
    return (
      <LoadingErrorHandler
        isLoading={isLoading}
        isError={isError}
        error={error}
        isLandscape={isLandscape}
      />
    );
  }

  return (
    <View style={styles.fullScreenContainer} key={refreshKey}>
      <SafeAreaView style={styles.safeArea}>
        {activeFilter !== 'attended' && (
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={hasTokenInProgress ? handleDone : handleNext}>
              <Phone size={30} color="white" />
              <Text style={styles.buttonText}>
                {hasTokenInProgress ? 'Done' : 'Call Next'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleRecall}
              disabled={!hasTokenInProgress}>
              <Nfc size={30} color="#333" />
              <Text style={styles.secondaryButtonText}>Recall</Text>
            </TouchableOpacity>
          </View>
        )}

        {filteredTokens.length !== 0 ? (
          <ScrollView style={styles.tokenListContainer}>
            {filteredTokens.map(token => (
              <TokenCard
                key={token.token_id}
                token={token}
                isSelected={selectedTokenId === token.token_id}
                translateNameToHindi={TranslateNameToHindi}
                onPress={() => handleRowPress(token.token_id)}
                onLongPress={() => handleLongPress(token)}              
                updateToken={updateToken}
                doctorId={doctor_id}
              />
            ))}
          </ScrollView>
        ) : (
          <DefaultReceptionScreen
            visibleCause={activeFilter}
          />
        )}

        <View style={styles.footerContainer}>
          <FooterNavigation
            navigation={navigation}
            currentRoute="PatientTokenQueue"
            handleRefresh={handleRefresh}
            routes={[
              {
                id: 'new',
                icon: UserPlus,
                label: 'New',
                screen: 'Reception',
                params: route.params,
              },
              {id: 'home', icon: Home, label: 'Home', screen: 'Home'},
              {
                id: 'report',
                icon: FileText,
                label: 'Report',
                screen: 'ReportsScreen',
              },
              {
                id: 'refresh',
                icon: RefreshCw,
                label: 'Refresh',
                action: 'refresh',
              },
            ]}
          />
        </View>
      </SafeAreaView>
      {isMutating && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#007BFF" />
        </View>
      )}
    </View>
  );
};

export default withQueryClientProvider(PatientTokenManagementScreen);
