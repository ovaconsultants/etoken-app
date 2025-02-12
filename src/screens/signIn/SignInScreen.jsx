import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import {userTokenAtom} from '../../atoms/authAtoms/authAtom';
import {useSetAtom} from 'jotai';
import {doctorDetailsAtom} from '../../atoms/doctorAtoms/doctorAtom';
import { styles } from './SignInScreen.styles';

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Jotai state management
  const [setUserToken] = useSetAtom(userTokenAtom);
  const [setDoctorDetails] = useSetAtom(doctorDetailsAtom);
  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const apiBaseUrl = 'http://localhost:3001';
      const  apiMethod = '/api/doctor/signin';
      const  response = await fetch( apiBaseUrl + apiMethod, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_or_mobile: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Sign-in failed');
      }

      console.log('Sign-in successful:', data);

      setUserToken(data.token);
      setDoctorDetails(data.doctor);
    } catch (error) {
      console.error('Error signing in:', error);
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <Button title="Log In" onPress={handleSignIn} />

      <Text style={styles.footerText}>
        Don't have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

export default SignInScreen;
