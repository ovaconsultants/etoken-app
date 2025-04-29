import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import {createStyles} from './HomeScreen.styles';
import {useAtomValue} from 'jotai';
import CardGrid from '../../components/cardGrid/CardGrid';
import {
  doctorClinicDetailsAtom,
  doctorIdAtom,
} from '../../atoms/doctorAtoms/doctorAtom';
import {useOrientation} from '../../hooks/useOrientation';
import {Tv, Users, Plus} from 'lucide-react-native';

const HomeScreen = ({navigation}) => {
  const {isLandscape, dimensions} = useOrientation();
  console.log('HomeScreen: rendering');
  const styles = createStyles(isLandscape, dimensions);
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [selectedClinicId, setSelectedClinicId] = useState(null);
  const doctorId = useAtomValue(doctorIdAtom);
  const rawClinicData = useAtomValue(doctorClinicDetailsAtom);

  const cards = useMemo(() => {
    if (!Array.isArray(rawClinicData)) {
      return [];
    }
    return rawClinicData.map(clinic => ({
      id: clinic.clinic_id,
      title: clinic.clinic_name,
      description: `${clinic.clinic_address || 'Not specified'}, ${
        clinic.clinic_city || ''
      }`,
      state: clinic.clinic_state,
    }));
  }, [rawClinicData]);

  useEffect(() => {
    setSelectedScreen(null);
    setSelectedClinicId(null);
    navigation.setOptions({
      headerBackTitle: '',
      headerLeft: () => null,
    });
  }, [navigation]);
  const handleCardPress = useCallback(clinicId => {
    setSelectedClinicId(prevClinicId =>
      prevClinicId === clinicId ? null : clinicId,
    );
  }, []);

  const handleAddClinicPress = useCallback(() => {
    navigation.navigate('Clinic', {
      doctor_id: doctorId,
    });
  }, [navigation, doctorId]);

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

  // Render add clinic button if no clinics available
  if (!cards.length) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <TouchableOpacity
            style={styles.addClinicButton}
            onPress={handleAddClinicPress}>
            <Plus size={24} color="#007AFF" />
            <Text style={styles.addClinicText}>Add Clinic</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.selectionContainer}>
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
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <CardGrid
          data={cards}
          onPress={handleCardPress}
          isSelectedCard={selectedClinicId}
          onAddClinicPress={handleAddClinicPress}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, isNextButtonDisabled && styles.buttonDisabled]}
          onPress={handleNextButtonPress}
          disabled={isNextButtonDisabled}
          activeOpacity={0.8}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
