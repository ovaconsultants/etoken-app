import React from 'react';
import {StyleSheet, SafeAreaView, View, Text, Button, ScrollView} from 'react-native';
import CardGrid from '../../components/CardGrid';
import {userTokenAtom} from '../../atoms/authAtoms/authAtom';
import {useSetAtom, useAtomValue} from 'jotai';
import {doctorDetailsAtom} from '../../atoms/doctorAtoms/doctorAtom';
import RadioGroupComponent from '../../components/RadioGroup';
import { ScreenSelectionOptions } from '../../constants/formComponentsData/radioButtonsData';

const HomeScreen = ({navigation}) => {
  const [selectedScreen, setSelectedScreen] = React.useState(null);
  const clinicData = useAtomValue(doctorDetailsAtom);
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
    title: `Card ${clinic.clinic_name}`,
    clinic_name: clinic.clinic_name,
    description: `Doctor:${clinic.doctor_name}.`,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView bounces={false}>
      <CardGrid data={cards} />
      <View style={styles.container}>
      <RadioGroupComponent style={styles.radioComponent} options={ScreenSelectionOptions} selectedId={selectedScreen} onSelect={setSelectedScreen} />
      <Button onPress={handleSignOut} title="Go Back to Sign In/Sign Up" />
      </View>
      </ScrollView>
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
