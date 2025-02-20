import React from 'react';
import { View, Text, StyleSheet,Button} from 'react-native';
import { userTokenAtom } from '../../atoms/authAtoms/authAtom';
import { useSetAtom } from 'jotai';
import  useDebugAtoms  from '../../hooks/useDebugAtoms';

const HomeScreen = ({navigation}) => {
    useDebugAtoms();
    const  setAuthentication  = useSetAtom(userTokenAtom);
    const  handleSignOut = () => {
        setAuthentication(null);
        console.log('Going back to the Login Screen');
    };
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to the Home Screen!</Text>
            <Button onPress={handleSignOut} title="Go Back to Sign In/Sign Up" />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
