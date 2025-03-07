import React, { useState, useMemo, useCallback } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useAtomValue } from 'jotai';
import { styles } from './HomeScreen.styles';
import CardGrid from '../../components/CardGrid';
import RadioGroupComponent from '../../components/RadioGroup';
import { doctorClinicDetailsAtom, doctorIdAtom } from '../../atoms/doctorAtoms/doctorAtom';
import { ScreenSelectionOptions } from '../../constants/formComponentsData/radioButtonsData';
import { Button } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [selectedClinicId, setSelectedClinicId] = useState(null);

  const clinicData = useAtomValue(doctorClinicDetailsAtom);
  const doctorId = useAtomValue(doctorIdAtom);

  const uniqueClinics = useMemo(
    () => Array.from(new Map(clinicData.map(clinic => [clinic.clinic_name, clinic])).values()),
    [clinicData]
  );

  const cards = uniqueClinics.map(({ clinic_id, clinic_name, clinic_address, clinic_city, clinic_state }) => ({
    id: clinic_id,
    title: clinic_name,
    description: `Address: ${clinic_address}, ${clinic_city}`,
    state: clinic_state,
  }));

  const handleCardPress = useCallback((clinicId) => setSelectedClinicId(clinicId), []);
  
  const isNextButtonDisabled = useMemo(() => !(selectedScreen && selectedClinicId), [selectedScreen, selectedClinicId]);

  const handleNextButtonPress = useCallback(() => {
    if (isNextButtonDisabled) {return;}

    navigation.navigate(selectedScreen === '1' ? 'TokenManagement' : 'Reception', {
      doctor_id: doctorId,
      clinic_id: selectedClinicId,
    });
  }, [selectedScreen, selectedClinicId, navigation, doctorId, isNextButtonDisabled]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        <CardGrid data={cards} onPress={handleCardPress} isSelectedCard={selectedClinicId} />
      </View>
      <View style={styles.bottomContainer}>
        <RadioGroupComponent options={ScreenSelectionOptions} selectedId={selectedScreen} onSelect={setSelectedScreen} />
      </View>
      <View>
        <Button  style={[styles.button, { opacity: isNextButtonDisabled ? 0.7 : 1 }]}onPress={handleNextButtonPress} disabled={isNextButtonDisabled}>
          Next
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
