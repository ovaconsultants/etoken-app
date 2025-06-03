import React, {useState, useCallback, useMemo} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import {createStyles} from './HomeScreen.styles';
import {globalStyles} from '../../styles/globalStyles';
import {useAtomValue} from 'jotai';
import {doctorIdAtom} from '../../atoms/doctorAtoms/doctorAtom';

import {useOrientation} from '../../hooks/useOrientation';
import {Tv, Users, Plus} from 'lucide-react-native';
import {homeRefreshKeyAtom} from '../../atoms/refreshAtoms/homePageRefreshAtom';

import {FetchAllClinicForDoctorRequest} from '../../services/clinicService';

import CardGrid from '../../components/cardGrid/CardGrid';
import LoadingErrorHandler from '../../components/loadingErrorHandler/LoadingErrorHandler';

const HomeScreen = ({navigation}) => {
  const {isLandscape, dimensions} = useOrientation();
  const styles = useMemo(
    () => createStyles(isLandscape, dimensions),
    [dimensions, isLandscape],
  );

  const refreshKey = useAtomValue(homeRefreshKeyAtom);
  const doctorId = useAtomValue(doctorIdAtom);

  const [selectedScreen, setSelectedScreen] = useState(0);
  const [selectedClinicId, setSelectedClinicId] = useState(null);
  const [clinicData, setClinicData] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchClinics = async () => {
        try {
          const fetchedClinics = await FetchAllClinicForDoctorRequest(doctorId);
          setClinicData(fetchedClinics);
          setRefreshing(false);
          setSelectedClinicId(fetchedClinics[0]?.clinic_id || null);
        } catch (error) {
          console.error('Failed to fetch clinics:', error);
          setSelectedClinicId(null);
        }
      };
      if (doctorId) {
        fetchClinics();
      }
      navigation.setOptions({
        headerBackTitle: '',
        headerLeft: () => null,
      });
      setSelectedScreen('2');
      return () => {
        setSelectedClinicId(null);
        setSelectedScreen(null);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doctorId, navigation, refreshKey]),
  );

  const cards = !Array.isArray(clinicData)
    ? []
    : clinicData.map(clinic => ({
        id: clinic.clinic_id,
        title: clinic.clinic_name,
        description: `${clinic.address || 'Not specified'}, ${
          clinic.city || ''
        }`,
        state: clinic.state || 'Not specified',
      }));

  const handleCardPress = clinicId => {
    setSelectedClinicId(prev => (prev === clinicId ? null : clinicId));
  };

  const handleAddClinicPress = () => {
    navigation.navigate('DoctorClinicNavigator', {
      screen: 'DoctorAddClinic',
      params: {
        doctor_id: doctorId,
      },
    });
  };

  const isNextButtonDisabled = !(selectedScreen && selectedClinicId);
  const isEmptyClinicList =
    !Array.isArray(clinicData) || clinicData.length === 0;
  const handleNextButtonPress = () => {
    if (isNextButtonDisabled) {
      return;
    }

    navigation.navigate(
      selectedScreen === '1' ? 'TokenManagement' : 'Reception',
      {
        doctor_id: doctorId,
        clinic_id: selectedClinicId,
        selectedClinic:
          selectedScreen === '1'
            ? clinicData.find(clinic => clinic.clinic_id === selectedClinicId)
            : undefined,
      },
    );
  };
  
  if (refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingErrorHandler isLoading={refreshing} />
      </SafeAreaView>
    );
  }
  if (!refreshing && isEmptyClinicList) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <TouchableOpacity
            onPress={handleAddClinicPress}
            style={styles.addClinicButton}>
            <Plus size={24} color={styles.selectedIconColor.color} />
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
                color={
                  selectedScreen === '1'
                    ? styles.selectedIconColor.color
                    : styles.unselectedIconColor.color
                }
              />
              <Text
                style={[
                  styles.optionText,
                  selectedScreen === '1' && styles.selectedOptionText,
                ]}>
                TV
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
                color={
                  selectedScreen === '2'
                    ? styles.selectedIconColor.color
                    : styles.unselectedIconColor.color
                }
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
          style={[
            styles.button,
            isNextButtonDisabled && globalStyles.disabledButton,
          ]}
          onPress={handleNextButtonPress}
          disabled={isNextButtonDisabled}
          activeOpacity={0.8}>
          <Text style={styles.buttonText}>Go</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
