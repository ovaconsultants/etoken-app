import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {
  AdminPanelSettingsIcon,
  RefreshIcon,
} from '../../components/icons/Icons';
import withQueryClientProvider from '../../hooks/useQueryClientProvider';
import {usePatientTokenManager} from '../../hooks/usePatientTokenManager';
import {styles, sidePanelStyles} from './PatientTokenQueueScreen.styles';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import DefaultReceptionScreen from '../noTokenReceptionState/DefaultReceptionScreen';
import {BackIcon} from '../../components/icons/Icons';
import InfoSymbol from '../../components/InfoSymbol';

const PatientTokenQueueScreen = ({navigation, route}) => {
  const {clinic_id, doctor_id} = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [isSidePanelVisible, setSidePanelVisible] = useState(false);
  const doubleTapTimeout = useRef(null);

  const {
    patientTokens,
    selectedTokenId,
    isRecallEnabled,
    isNextDone,
    handleSelectToken,
    handleNext,
    handleRecall,
    handleDone,
  } = usePatientTokenManager(clinic_id, doctor_id);

  const handleRowPress = tokenId => {
    if (doubleTapTimeout.current) {
      clearTimeout(doubleTapTimeout.current);
      doubleTapTimeout.current = null;
      handleSelectToken(tokenId);
    } else {
      // First tap, set a timeout for double tap detection
      doubleTapTimeout.current = setTimeout(() => {
        doubleTapTimeout.current = null;
      }, 300);
    }
  };

  const handleInfoSymbolPress = token => {
    console.log('Patient Info Editor ', token);
    navigation.navigate('PatientInfoEditor', {patientInfo: token});
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{paddingRight: 15}}>
          <Text>{patientTokens?.length || 0}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{paddingRight: 30}}>
          <BackIcon size={28} color="black" />
        </TouchableOpacity>
      ),
    });

    if (patientTokens !== undefined) {
      setIsLoading(false);
    }
  }, [navigation, patientTokens]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (patientTokens.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <DefaultReceptionScreen />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.recallButton,
            !isRecallEnabled && styles.disabledButton,
          ]}
          onPress={handleRecall}
          disabled={!isRecallEnabled}>
          <Text style={styles.buttonText}>Recall</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nextButton]}
          onPress={isNextDone ? handleDone : handleNext}>
          <Text style={styles.buttonText}>{isNextDone ? 'Done' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal contentContainerStyle={styles.scrollContent}>
        <View>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.tableHeader, {width: wp('20%')}]}>Token</Text>
            <Text style={[styles.tableHeader, {width: wp('30%')}]}>
              Pt-Name
            </Text>
            <Text style={[styles.tableHeader, {width: wp('25%')}]}>Status</Text>
            <Text style={[styles.tableHeader, {width: wp('10%')}]}>
              Info
            </Text>{' '}
            {/* Added Info column */}
          </View>
          {(patientTokens ?? []).map(token => (
            <View key={token.token_id}>
              <TouchableOpacity
                style={[
                  styles.tableRow,
                  selectedTokenId === token.token_id && styles.selectedRow,
                ]}
                onPress={() => handleRowPress(token.token_id)}>
                <Text
                  style={[
                    styles.tableCell,
                    {width: wp('20%')},
                    isNextDone &&
                      selectedTokenId === token.token_id &&
                      styles.strikethrough,
                  ]}>
                  {token.token_no}
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    {width: wp('30%')},
                    isNextDone &&
                      selectedTokenId === token.token_id &&
                      styles.strikethrough,
                  ]}>
                  {token.patient_name}
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    {width: wp('25%')},
                    isNextDone &&
                      selectedTokenId === token.token_id &&
                      styles.strikethrough,
                  ]}>
                  {token.status}
                </Text>
                <View style={[styles.tableCell, {width: wp('10%')}]}>
                  <Text>
                    <InfoSymbol onPress={() => handleInfoSymbolPress(token)} />
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => setSidePanelVisible(true)}>
          <AdminPanelSettingsIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <RefreshIcon />
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={isSidePanelVisible}
        onRequestClose={() => setSidePanelVisible(false)}>
        <View style={sidePanelStyles.overlay}>
          <View style={sidePanelStyles.sidePanel}>
            <TouchableOpacity style={sidePanelStyles.sidePanelButton}>
              <Text style={sidePanelStyles.sidePanelButtonText}>List Info</Text>
            </TouchableOpacity>
            <TouchableOpacity style={sidePanelStyles.sidePanelButton}>
              <Text style={sidePanelStyles.sidePanelButtonText}>LogOut</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={sidePanelStyles.closeButton}
              onPress={() => setSidePanelVisible(false)}>
              <Text style={sidePanelStyles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default withQueryClientProvider(PatientTokenQueueScreen);
