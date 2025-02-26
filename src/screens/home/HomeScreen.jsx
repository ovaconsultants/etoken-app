import React, { useState } from 'react';
import { SafeAreaView, View, Button} from 'react-native';
import { styles }  from './HomeScreen.styles';
import CardGrid from '../../components/CardGrid';
import { userTokenAtom } from '../../atoms/authAtoms/authAtom';
import { useSetAtom, useAtomValue } from 'jotai';
import { doctorDetailsAtom, doctorIdAtom } from '../../atoms/doctorAtoms/doctorAtom';
import RadioGroupComponent from '../../components/RadioGroup';
import { ScreenSelectionOptions } from '../../constants/formComponentsData/radioButtonsData';
import ProfileCircle from '../../components/profile';




const HomeScreen = ({ navigation }) => {
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [isSelectedCard, setIsSelectedCard] = useState(null);
  const clinicData = useAtomValue(doctorDetailsAtom);
  const doctor_id = useAtomValue(doctorIdAtom);
  const setUserTokenAtom = useSetAtom(userTokenAtom);

  const handleSignOut = () => {
    setUserTokenAtom(null);
    console.log('Going back to the Login Screen');
  };

  const uniqueClinics = Array.from(
    new Map(clinicData.map(clinic => [clinic.clinic_name, clinic])).values()
  );

  const cards = uniqueClinics.map((clinic, index) => ({
    id: index + 1,
    title: clinic.clinic_name,
    clinic_name: clinic.clinic_name,
    description: `Address: ${clinic.clinic_address}, ${clinic.clinic_city}`,
    state: clinic.clinic_state,
  }));

  const handleCardPress = (clinic_id) => {
    setIsSelectedCard(clinic_id);
    console.log('Clinic ID:', clinic_id);
    navigation.navigate('TokenManagement', { doctor_id, clinic_id });
  };

  return (
    <SafeAreaView  style={styles.container}>
      {/* Profile Icon in Top-Right */}
      <View style={styles.profileContainer}>
          <ProfileCircle
            imageUrl="https://via.placeholder.com/100" // Replace with actual image URL
          />
      </View>

      {/* Clinic Cards Grid */}
      <View style={styles.cardContainer}>
        <CardGrid data={cards} onPress={handleCardPress} isSelectedCard={isSelectedCard} />
      </View>

      {/* Radio Buttons & Navigation Buttons */}
      <View style={styles.bottomContainer}>
        <RadioGroupComponent
          options={ScreenSelectionOptions}
          selectedId={selectedScreen}
          onSelect={setSelectedScreen}
        />
        <Button onPress={handleSignOut} title="Sign Out" color="#D32F2F" />
        <Button onPress={() => navigation.navigate('TokenManagement')} title="Token Management" />
      </View>
    </SafeAreaView>
  );
};




export default HomeScreen;
