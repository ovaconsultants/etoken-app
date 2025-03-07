import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from './ReceptionAllPatientTokensScreen.styles';
import { FetchTokensRequest } from '../../services/tokenService';
import { TokenTable } from '../token/TokenTable';

const ReceptionAllPatientTokensScreen = ({ route }) => {
  const { clinic_id, doctor_id } = route.params;
  console.log('route params in Token listing ' , route.params);
  console.log('clinic_id and Doctor-id:', clinic_id, doctor_id);
  const [patientTokens, setPatientTokens] = useState([]);

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchTokens = async () => {
      try {
        // Await the asynchronous token fetch request
        const fetchedPatientTokens = await FetchTokensRequest(doctor_id, clinic_id);
        setPatientTokens(fetchedPatientTokens.tokens);
        console.log(fetchedPatientTokens);
      } catch (error) {
        console.log('Error occurred while fetching all the tokens:', error);
      }
    };

    fetchTokens();
  }, [clinic_id, doctor_id]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reception Patients</Text>
      <TokenTable tokens={patientTokens} />
    </View>
  );
};

export default ReceptionAllPatientTokensScreen;
