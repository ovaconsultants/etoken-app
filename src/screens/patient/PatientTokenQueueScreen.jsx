// PatientTokenQueueScreen.js
import React, { useState , useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Modal, StyleSheet } from 'react-native';
import { AdminPanelSettingsIcon , RefreshIcon } from '../../components/icons/Icons';
import withQueryClientProvider from '../../hooks/useQueryClientProvider';
import { usePatientTokenManager } from '../../hooks/usePatientTokenManager';
import { styles } from './PatientTokenQueueScreen.styles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const PatientTokenQueueScreen = ({navigation , route }) => {
  const { clinic_id, doctor_id } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [isSidePanelVisible, setSidePanelVisible] = useState(false);
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
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Text>Total Patients: {patientTokens.length}</Text>,
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
        <Text style={styles.emptyText}>No tokens are available</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.recallButton, !isRecallEnabled && styles.disabledButton]}
          onPress={handleRecall}
          disabled={!isRecallEnabled}
        >
          <Text style={styles.buttonText}>Recall</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nextButton]}
          onPress={isNextDone ? handleDone : handleNext}
        >
          <Text style={styles.buttonText}>{isNextDone ? 'Done' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal contentContainerStyle={styles.scrollContent}>
        <View>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.tableHeader, { width: wp('15%') }]}>Select</Text>
            <Text style={[styles.tableHeader, { width: wp('20%') }]}>Token</Text>
            <Text style={[styles.tableHeader, { width: wp('30%') }]}>Pt-Name</Text>
            <Text style={[styles.tableHeader, { width: wp('25%') }]}>Status</Text>
          </View>
          {(patientTokens ?? []).map((token, index) => (
            <View key={token.token_id} style={styles.tableRow}>
              <TouchableOpacity
                style={[styles.tableCell, { width: wp('15%') }]}
                onPress={() => handleSelectToken(token.token_id)}
              >
                <View
                  style={[
                    styles.radioCircle,
                    selectedTokenId === token.token_id && styles.radioCircleSelected,
                  ]}
                />
              </TouchableOpacity>
              <Text
                style={[
                  styles.tableCell,
                  { width: wp('20%') },
                  isNextDone && selectedTokenId === token.token_id && styles.strikethrough,
                ]}
              >
                {token.token_no}
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  { width: wp('30%') },
                  isNextDone && selectedTokenId === token.token_id && styles.strikethrough,
                ]}
              >
                {token.patient_name}
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  { width: wp('25%') },
                  isNextDone && selectedTokenId === token.token_id && styles.strikethrough,
                ]}
              >
                {token.status}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => setSidePanelVisible(true)}>
         < AdminPanelSettingsIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
        <RefreshIcon />
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={isSidePanelVisible}
        onRequestClose={() => setSidePanelVisible(false)}
      >
        <View style={sidePanelStyles.overlay}>
          <View style={sidePanelStyles.sidePanel}>
            <TouchableOpacity style={sidePanelStyles.sidePanelButton}>
              <Text style={sidePanelStyles.sidePanelButtonText}>List Info</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={sidePanelStyles.sidePanelButton}>
              <Text style={sidePanelStyles.sidePanelButtonText}>Turn On/Off Applicant</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={sidePanelStyles.sidePanelButton}>
              <Text style={sidePanelStyles.sidePanelButtonText}>LogOut</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={sidePanelStyles.closeButton}
              onPress={() => setSidePanelVisible(false)}
            >
              <Text style={sidePanelStyles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const sidePanelStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  sidePanel: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
  },
  sidePanelButton: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sidePanelButtonText: {
    fontSize: 18,
  },
  closeButton: {
    borderRadius : 20 ,
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f00',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

// Wrap the component using the custom hook
export default withQueryClientProvider(PatientTokenQueueScreen);
