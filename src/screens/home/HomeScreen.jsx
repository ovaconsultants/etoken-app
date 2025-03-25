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
import {Tv, Users} from 'lucide-react-native';

const HomeScreen = ({navigation}) => {
  useOrientationLocker('PORTRAIT');
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [selectedClinicId, setSelectedClinicId] = useState(null);
  const doctorId = useAtomValue(doctorIdAtom);
  const rawClinicData = useAtomValue(doctorClinicDetailsAtom);

  const cards = useMemo(() => {
    if (!Array.isArray(rawClinicData)) return [];

    const uniqueClinics = Array.from(
      new Map(
        rawClinicData.map(c => [`${c.clinic_name}_${c.clinic_address}`, c]),
      ).values(),
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

  const handleCardPress = useCallback(clinicId => {
    setSelectedClinicId(prevClinicId =>
      prevClinicId === clinicId ? null : clinicId,
    );
  }, []);
  const isNextButtonDisabled = useMemo(
    () => !(selectedScreen && selectedClinicId),
    [selectedScreen, selectedClinicId],
  );

  const handleNextButtonPress = useCallback(() => {
    if (isNextButtonDisabled) {
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

      <View style={styles.selectionContainer}>
        <Text style={styles.selectionTitle}>Select Display Mode:</Text>

        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedScreen === '1' && styles.selectedOption,
            ]}
            onPress={() => setSelectedScreen('1')}>
            <View style={styles.optionContent}>
              <Tv
                size={32}
                color={selectedScreen === '1' ? '#007AFF' : '#333'}
              />
              <Text
                style={[
                  styles.optionText,
                  selectedScreen === '1' && styles.selectedOptionText,
                ]}>
                TV Display
              </Text>
              <Text style={styles.optionDescription}>
                For waiting room screens
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedScreen === '2' && styles.selectedOption,
            ]}
            onPress={() => setSelectedScreen('2')}>
            <View style={styles.optionContent}>
              <Users
                size={32}
                color={selectedScreen === '2' ? '#007AFF' : '#333'}
              />
              <Text
                style={[
                  styles.optionText,
                  selectedScreen === '2' && styles.selectedOptionText,
                ]}>
                Reception
              </Text>
              <Text style={styles.optionDescription}>
                For Patient Registration
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, isNextButtonDisabled && styles.buttonDisabled]}
        onPress={handleNextButtonPress}
        disabled={isNextButtonDisabled}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
