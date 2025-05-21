import React, {useCallback, useState, useMemo} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {
  Phone,
  Nfc,
  Home,
  FileText,
  UserPlus,
  RefreshCw,
} from 'lucide-react-native';
import withQueryClientProvider from '../../hooks/useQueryClientProvider';
import LoadingErrorHandler from '../../components/loadingErrorHandler/LoadingErrorHandler';
import {usePatientTokenManager} from '../../hooks/usePatientTokenManager';
import {useOrientation} from '../../hooks/useOrientation';
import DefaultReceptionScreen from '../noTokenReceptionState/DefaultReceptionScreen';
import {TranslateNameToHindi} from '../../services/langTranslationService';
import FooterNavigation from '../../components/tabNavigationFooter/TabNavigationFooter';
import {TokenCard} from './PatientTokenCardUI';
import {createStyles} from './PatientTokenManagementScreen.styles';

const PatientTokenManagementScreen = ({navigation, route}) => {
  const {isLandscape} = useOrientation();
  const styles = createStyles(isLandscape);
  const {clinic_id, doctor_id} = route.params;

  const [activeFilter, setActiveFilter] = useState('all');

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
      case 'onHold':
        return patientTokens.filter(t => t.status === 'On Hold');
      case 'all':
        return patientTokens.filter(t => ['Waiting', 'In Progress', 'On Hold'].includes(t.status));  
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

  if (patientTokens.length === 0) {
    return <DefaultReceptionScreen navigation={navigation} />;
  }

  return (
    <View style={styles.fullScreenContainer}>
      <SafeAreaView style={styles.fullScreenContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.headerBadges}>
            <View style={styles.badge}>
              <TouchableOpacity onPress={() => handleBadgePress('all')}>
                <Text style={styles.badgeText}>Total: {total}</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.badge, styles.greenBadge]}>
              <TouchableOpacity onPress={() => handleBadgePress('attended')}>
                <Text style={styles.badgeText}>Attended: {attended}</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.badge, styles.yellowBadge]}>
              <TouchableOpacity onPress={() => handleBadgePress('inQueue')}>
                <Text style={styles.badgeText}>In Queue: {inQueue}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.dropdownContainer}>
              <TouchableOpacity style={[styles.badge, styles.redBadge]}>
                <TouchableOpacity onPress={() => handleBadgePress('onHold')}>
                  <Text style={styles.badgeText}>On Hold: {onHold}</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        { activeFilter !== 'attended' &&
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
}

        <ScrollView style={styles.tokenListContainer}>
          {filteredTokens.map(token => (
            <TokenCard
              key={token.token_id}
              token={token}
              isSelected={selectedTokenId === token.token_id}
              translateNameToHindi={TranslateNameToHindi}
              onPress={() => handleRowPress(token.token_id)}
              onLongPress={() => handleLongPress(token)}
              styles={styles}
              updateToken={updateToken}
            />
          ))}
        </ScrollView>

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
