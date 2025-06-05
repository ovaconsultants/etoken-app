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
import ResponsiveLayout from '../../components/ResponsiveLayout';

const HomeScreen = ({navigation}) => (
  <ResponsiveLayout>
    {({deviceType, isLandscape, dimensions}) => {
      const styles = React.useMemo(
        () => createStyles(isLandscape, dimensions, deviceType),
        [isLandscape, dimensions, deviceType],
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
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[
                  styles.tab,
                  selectedScreen === '1' && styles.activeTab,
                ]}
                onPress={() => setSelectedScreen('1')}>
                <Tv
                  size={isLandscape && dimensions.width > 700 ? 18 : 24}
                  color={
                    selectedScreen === '1'
                      ? styles.selectedIconColor.color
                      : styles.unselectedIconColor.color
                  }
                />
                <Text
                  style={[
                    styles.tabText,
                    selectedScreen === '1' && styles.activeTabText,
                  ]}>
                  TV
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tab,
                  selectedScreen === '2' && styles.activeTab,
                ]}
                onPress={() => setSelectedScreen('2')}>
                <Users
                  size={isLandscape && dimensions.width > 700 ? 18 : 24}
                  color={
                    selectedScreen === '2'
                      ? styles.selectedIconColor.color
                      : styles.unselectedIconColor.color
                  }
                />
                <Text
                  style={[
                    styles.tabText,
                    selectedScreen === '2' && styles.activeTabText,
                  ]}>
                  Reception
                </Text>
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
      <Text style={styles.buttonText}>NEXT</Text>
    </TouchableOpacity>
  </View>
        </SafeAreaView>
      );
    }}
  </ResponsiveLayout>
);

export default HomeScreen;
