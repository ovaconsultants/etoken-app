// PatientTokenQueueScreen.js
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Modal, StyleSheet } from 'react-native';
import { AdminPanelSettingsIcon , RefreshIcon } from '../../components/icons/Icons';
import withQueryClientProvider from '../../hooks/useQueryClientProvider';
import { usePatientTokenManager } from '../../hooks/usePatientTokenManager';
import { styles } from './PatientTokenQueueScreen.styles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const PatientTokenQueueScreen = ({ route }) => {
  const { clinic_id, doctor_id } = route.params;
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

  const [isSidePanelVisible, setSidePanelVisible] = useState(false);

  if (!patientTokens) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
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
            <Text style={[styles.tableHeader, { width: wp('10%') }]}>S.No</Text>
            <Text style={[styles.tableHeader, { width: wp('15%') }]}>Select</Text>
            <Text style={[styles.tableHeader, { width: wp('20%') }]}>Token</Text>
            <Text style={[styles.tableHeader, { width: wp('30%') }]}>Pt-Name</Text>
            <Text style={[styles.tableHeader, { width: wp('25%') }]}>Status</Text>
          </View>
          {(patientTokens ?? []).map((token, index) => (
            <View key={token.token_id} style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: wp('10%') }]}>{index + 1}</Text>
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