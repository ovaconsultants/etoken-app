import React,{useState}from 'react';
import {StyleSheet, SafeAreaView, View,  Button} from 'react-native';
import CardGrid from '../../components/CardGrid';
import {userTokenAtom} from '../../atoms/authAtoms/authAtom';
import {useSetAtom, useAtomValue} from 'jotai';
import {doctorDetailsAtom} from '../../atoms/doctorAtoms/doctorAtom';
import RadioGroupComponent from '../../components/RadioGroup';
import { ScreenSelectionOptions } from '../../constants/formComponentsData/radioButtonsData';
import { doctorIdAtom } from '../../atoms/doctorAtoms/doctorAtom';


const HomeScreen = ({navigation}) => {
  const [selectedScreen, setSelectedScreen] = React.useState(null);
  const [isSelectedCard, setIsSelectedCard] = useState(null);
  const clinicData = useAtomValue(doctorDetailsAtom);
  console.log('Clinic Data:', clinicData);
  const doctor_id =  useAtomValue(doctorIdAtom);
  console.log('Clinic Data:', clinicData);
  const setUserTokenAtom = useSetAtom(userTokenAtom);
  const handleSignOut = () => {
    setUserTokenAtom(null);
    console.log('Going back to the Login Screen');
  };
  const uniqueClinics = Array.from(
    new Map(clinicData.map(clinic => [clinic.clinic_name, clinic])).values(),
  );
  const cards = uniqueClinics.map((clinic, index) => ({
    id: index + 1,
    title: `${clinic.clinic_name}`,
    clinic_name: clinic.clinic_name,
    description: `Address:${clinic.clinic_address} in ${clinic.clinic_city}`,
    state: clinic.clinic_state,
  }));

  const handleCardPress = (clinic_id) => {
    setIsSelectedCard(clinic_id);
    console.log('Clinic ID:', clinic_id);
    navigation.navigate('TokenManagement', { doctor_id,clinic_id});
  };
  return (
    <SafeAreaView style={styles.container}>
      <CardGrid data={cards}  onPress={handleCardPress}  isSelectedCard={isSelectedCard ?? null}/>
      <View style={styles.container}>
      <RadioGroupComponent style={styles.radioComponent} options={ScreenSelectionOptions} selectedId={selectedScreen} onSelect={setSelectedScreen} />
      <Button onPress={handleSignOut} title="Go Back to Sign In/Sign Up" />
      <Button onPress={() => navigation.navigate('TokenManagement')} title="Go to Token Management" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        alignItems: 'center', // Align items horizontally
    },
    radioComponent: {
        marginVertical: 10,
        alignSelf: 'stretch',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
