import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import withQueryClientProvider from '../../hooks/useQueryClientProvider';
import LoadingErrorHandler from '../../components/loadingErrorHandler/LoadingErrorHandler';
import {
  Phone,
  Nfc,
  RefreshCw,
  Home,
  FileText,
  UserPlus,
} from 'lucide-react-native';
import {usePatientTokenManager} from '../../hooks/usePatientTokenManager';
import {useOrientation} from '../../hooks/useOrientation';
import DefaultReceptionScreen from '../noTokenReceptionState/DefaultReceptionScreen';
import {TranslateNameToHindi} from '../../services/langTranslationService';
import FooterNavigation from '../../components/tabNavigationFooter/TabNavigationFooter';
import {UpdateTokenRequest} from '../../services/tokenService';
import {showToast} from '../../components/toastMessage/ToastMessage';
import {createStyles} from './PatientTokenQueueScreen.styles';
import { TokenCard } from './PatientTokenCardUI';

const PatientTokenQueueScreen = ({navigation, route}) => {
  // Orientation hook
  const {isLandscape} = useOrientation();
  const styles = createStyles(isLandscape);
  // State initialization
  const {clinic_id, doctor_id} = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const doubleTapTimeout = useRef(null);

  // Token management
  const {
    patientTokens,
    selectedTokenId,
    handleSelectToken,
    handleNext,
    handleRecall,
    handleDone,
    refetchTokens,
    isFetching,
    isError,
    error,
  } = usePatientTokenManager(clinic_id, doctor_id);

  const {totalPatients, attendedPatients, inQueue, onHold, hasTokenInProgress} =
    useMemo(() => { const inProgressTokens = patientTokens.filter(t => t.status === 'In Progress');
      return {
        totalPatients: patientTokens.length,
        attendedPatients: inProgressTokens.length,
        inQueue: patientTokens.filter(t => t.status === 'Waiting').length,
        onHold: patientTokens.filter(t => t.status === 'On Hold').length,
        hasTokenInProgress: inProgressTokens.length > 0,
      };
    }, [patientTokens]);

  // Event handlers
  const handleRowPress = useCallback(
    tokenId => {
      if (doubleTapTimeout.current) {
        clearTimeout(doubleTapTimeout.current);
        doubleTapTimeout.current = null;
        handleSelectToken(tokenId);
      } else {
        doubleTapTimeout.current = setTimeout(() => {
          doubleTapTimeout.current = null;
        }, 300);
      }
    },
    [handleSelectToken],
  );

  const handleLongPress = useCallback(
    token => {
      navigation.navigate('PatientInfoEditor', {patientInfo: token});
    },
    [navigation],
  );

  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    try {
      await refetchTokens();
      showToast('Tokens refreshed successfully');
      setIsLoading(false);
    } catch (refreshError) {
      console.error('Error refreshing tokens:', refreshError);
      showToast('Failed to refresh tokens', 'error');
    }
  }, [refetchTokens]);

  const handleTokenUpdate = useCallback(
    async updatedTokenStatusDataObj => {
      try {
        await UpdateTokenRequest(updatedTokenStatusDataObj);
        await refetchTokens();
        showToast('Token updated successfully');
      } catch (updateError) {
        console.error('Error updating token status:', updateError);
        showToast('Failed to update token', 'error');
      }
    },
    [refetchTokens],
  );

  // Side effects
  useEffect(() => {
    if (patientTokens && patientTokens.length > 0){
      setIsLoading(false);
    }
  }, [patientTokens, patientTokens.length]);

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

  if (patientTokens.length === 0) {
    return <DefaultReceptionScreen navigation={navigation} />;
  }

  return (
    <SafeAreaView style={styles.fullScreenContainer}>
      <LoadingErrorHandler
        isLoading={isLoading && isFetching && patientTokens.length > 0}
        isInline={true}
      />
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerBadges}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Total: {totalPatients}</Text>
          </View>
          <View style={[styles.badge, styles.greenBadge]}>
            <Text style={styles.badgeText}>Attended: {attendedPatients}</Text>
          </View>
          <View style={[styles.badge, styles.yellowBadge]}>
            <Text style={styles.badgeText}>In Queue: {inQueue}</Text>
          </View>
          <View style={styles.dropdownContainer}>
            <TouchableOpacity style={[styles.badge, styles.redBadge]}>
              <Text style={styles.badgeText}>On Hold: {onHold}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={hasTokenInProgress ? handleDone : handleNext}>
          <Phone size={16} color="white" />
          <Text style={styles.buttonText}>
            {hasTokenInProgress ? 'Done' : 'Call Next'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleRecall}
          disabled={!hasTokenInProgress}>
          <Nfc size={16} color="#333" />
          <Text style={styles.secondaryButtonText}>Recall</Text>
        </TouchableOpacity>
      </View>

      {/* Token List */}
      <ScrollView style={styles.tokenListContainer}>
        {patientTokens.map(token => (
          <TokenCard
            key={token.token_id}
            token={token}
            isSelected={selectedTokenId === token.token_id}
            translateNameToHindi={TranslateNameToHindi}
            onPress={() => handleRowPress(token.token_id)}
            onLongPress={() => handleLongPress(token)}
            handleTokenUpdate={handleTokenUpdate}
            styles={styles}
          />
        ))}
      </ScrollView>

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
              params: {doctor_id, clinic_id},
            },
            {
              id: 'home',
              icon: Home,
              label: 'Home',
              screen: 'Home',
            },
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
  );
};


export default withQueryClientProvider(PatientTokenQueueScreen);
