import React, {useState, useCallback, useMemo} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useAtomValue} from 'jotai';
import {styles} from './HomeScreen.styles';
import CardGrid from '../../components/CardGrid';
import useOrientationLocker from '../../hooks/useOrientationLocker';
import RadioGroupComponent from '../../components/RadioGroup';
import {
  doctorClinicDetailsAtom,
  doctorIdAtom,
} from '../../atoms/doctorAtoms/doctorAtom';
import {ScreenSelectionOptions} from '../../constants/formComponentsData/radioButtonsData';

const HomeScreen = ({navigation}) => {
  useOrientationLocker('PORTRAIT');
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [selectedClinicId, setSelectedClinicId] = useState(null);
  const doctorId = useAtomValue(doctorIdAtom);
  const rawClinicData = useAtomValue(doctorClinicDetailsAtom);

  const cards = useMemo(() => {
    if (!Array.isArray(rawClinicData)) return [];

    const uniqueClinics = Array.from(
      new Map(rawClinicData.map(c => [`${c.clinic_name}_${c.clinic_address}`, c])).values(),
    );

    return uniqueClinics.map(clinic => ({
      id: clinic.clinic_id,
      title: clinic.clinic_name,
      description: `Address: ${clinic.clinic_address || 'Not specified'}, ${
        clinic.clinic_city || ''
      }`,
      state: clinic.clinic_state,
    }));
  }, [rawClinicData]);

  const handleCardPress = useCallback(
    clinicId => setSelectedClinicId(clinicId),
    [],
  );
  const isNextButtonDisabled = useMemo(
    () => !(selectedScreen && selectedClinicId),
    [selectedScreen, selectedClinicId],
  );

  const handleNextButtonPress = useCallback(() => {
    if (isNextButtonDisabled) {
      // Optionally show a toast or alert here
      return;
    }

    navigation.navigate(
      selectedScreen === '1' ? 'TokenManagement' : 'Reception',
      {
        doctor_id: doctorId,
        clinic_id: selectedClinicId,
      },
    );
  }, [
    selectedScreen,
    selectedClinicId,
    navigation,
    doctorId,
    isNextButtonDisabled,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        <CardGrid
          data={cards}
          onPress={handleCardPress}
          isSelectedCard={selectedClinicId}
        />
      </View>
      <View style={styles.bottomContainer}>
        <RadioGroupComponent
          options={ScreenSelectionOptions}
          selectedId={selectedScreen}
          onSelect={setSelectedScreen}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, isNextButtonDisabled && styles.buttonDisabled]}
        onPress={handleNextButtonPress}
        disabled={isNextButtonDisabled}
        activeOpacity={0.8}
        accessibilityLabel="Next Button"
        accessibilityRole="button"
        accessibilityHint="Navigates to the next screen">
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
