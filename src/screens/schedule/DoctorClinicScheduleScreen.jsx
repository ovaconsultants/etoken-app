import React from 'react';
import { View, Text, StyleSheet , Button} from 'react-native';
import { userTokenAtom,isAuthenticatedAtom} from '../../atoms/authAtoms/authAtom';
import { useSetAtom , useAtomValue} from 'jotai';


const DoctorClinicScheduleScreen = ({navigation}) => {
    const setIsAuthenticated = useSetAtom(userTokenAtom);
    console.log(navigation.getParent().getState());
    console.log('this is value in DCSS' ,useAtomValue(isAuthenticatedAtom));
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Doctor Clinic Schedule Screen</Text>
            <Button title="Go to Sign in" onPress={() => {setIsAuthenticated(null); navigation.navigate('AppNavigator')}} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default DoctorClinicScheduleScreen;
