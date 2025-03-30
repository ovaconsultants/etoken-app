import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {SignUpRequest} from '../../services/authService';
import SignUpStyles from './SignUpStyles';
import {FetchAccountRequest} from '../../services/accountService';
import {FetchSpecializationsRequest} from '../../services/accountService';

const SignUpScreen = ({navigation}) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    phoneNumber: '',
    email: '',
    createdBy: '',
  });
  const [loading, setLoading] = useState({
    accounts: true,
    specializations: false,
    submit: false,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await FetchAccountRequest();
        if (!data.success) {
          throw new Error(data.message || 'Failed to load accounts');
        }
        setAccounts(
          data.accounts.map(acc => ({
            label: acc.account_name,
            value: acc.account_id,
          })),
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(prev => ({...prev, accounts: false}));
      }
    };
    fetchAccounts();
  }, []);

  useEffect(() => {
    const loadSpecializations = async () => {
   
      setSpecializations([]);
      setSelectedSpecialization(null);
  
      if (!selectedAccount) return;
  
      setLoading(prev => ({ ...prev, specializations: true }));
      
      try {
        const data = await FetchSpecializationsRequest(selectedAccount);
        const fetchedSpecializations = await data.specializations;
        if (data.success) {
          setSpecializations(
            fetchedSpecializations.map(spec => ({
              label: spec.specialization_name,
              value: spec.specialization_id,
            })),
          );
        } else {
          setError('Failed to load specializations');
        }
      } catch (err) {
        setError(err.message);
        setSpecializations([]);
      } finally {
        setLoading(prev => ({ ...prev, specializations: false }));
      }
    };

    loadSpecializations();
  }, [selectedAccount]);
  
  const handleSubmit = async () => {
    const requiredFields = [
      formData.firstName,
      formData.lastName,
      selectedSpecialization,
      formData.mobileNumber,
      formData.email,
      formData.createdBy,
    ];

    if (requiredFields.some(field => !field)) {
      setError('Please fill all required fields');
      return;
    }

    setLoading(prev => ({...prev, submit: true}));
    setError('');

    try {
      const dataObject = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        specialization_id: selectedSpecialization,
        mobile_number: formData.mobileNumber,
        phone_number: formData.phoneNumber,
        email: formData.email,
        // profile_picture_url: formData.profilePictureUrl,
        created_by: formData.createdBy,
      };

      const data = await SignUpRequest(dataObject);

      if (!data.success) {
        throw new Error(data.message || 'Failed to submit form');
      }

      Alert.alert('Success', 'Doctor registered successfully!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('AddProfilePicture');
          },
        },
      ]);

      setSelectedAccount(null);
      setSelectedSpecialization(null);
      setFormData({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        phoneNumber: '',
        email: '',
        createdBy: '',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(prev => ({...prev, submit: false}));
    }
  };
  return (
    <ScrollView contentContainerStyle={SignUpStyles.container}>
      {/* Account Dropdown */}
      <Text style={SignUpStyles.label}>Account:</Text>
      {loading.accounts ? (
        <ActivityIndicator />
      ) : (
        <Dropdown
          data={accounts}
          labelField="label"
          valueField="value"
          placeholder="Select Account"
          value={selectedAccount}
          onChange={item => setSelectedAccount(item.value)}
          style={SignUpStyles.dropdown}
          placeholderStyle={SignUpStyles.placeholderText}
          selectedTextStyle={SignUpStyles.selectedText}
          inputSearchStyle={SignUpStyles.inputSearch}
        />
      )}

      {/* Specialization Dropdown */}
      <Text style={SignUpStyles.label}>Specialization:</Text>
      {loading.specializations ? (
        <ActivityIndicator />
      ) : (
        <Dropdown
          data={specializations}
          labelField="label"
          valueField="value"
          placeholder="Select Specialization"
          value={selectedSpecialization}
          onChange={item => setSelectedSpecialization(item.value)}
          disabled={!selectedAccount}
          style={[
            SignUpStyles.dropdown,
            !selectedAccount && SignUpStyles.disabledDropdown,
          ]}
          placeholderStyle={SignUpStyles.placeholderText}
          selectedTextStyle={SignUpStyles.selectedText}
          inputSearchStyle={SignUpStyles.inputSearch}
        />
      )}

      <TextInput
        placeholder="First Name *"
        value={formData.firstName}
        onChangeText={text => setFormData(prev => ({...prev, firstName: text}))}
        style={SignUpStyles.input}
      />
      <TextInput
        placeholder="Last Name *"
        value={formData.lastName}
        onChangeText={text => setFormData(prev => ({...prev, lastName: text}))}
        style={SignUpStyles.input}
      />
      <TextInput
        placeholder="Mobile Number *"
        value={formData.mobileNumber}
        onChangeText={text =>
          setFormData(prev => ({...prev, mobileNumber: text}))
        }
        keyboardType="phone-pad"
        style={SignUpStyles.input}
      />
      <TextInput
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChangeText={text =>
          setFormData(prev => ({...prev, phoneNumber: text}))
        }
        keyboardType="phone-pad"
        style={SignUpStyles.input}
      />
      <TextInput
        placeholder="Email *"
        value={formData.email}
        onChangeText={text => setFormData(prev => ({...prev, email: text}))}
        keyboardType="email-address"
        autoCapitalize="none"
        style={SignUpStyles.input}
      />

      <TextInput
        placeholder="Created By *"
        value={formData.createdBy}
        onChangeText={text => setFormData(prev => ({...prev, createdBy: text}))}
        style={SignUpStyles.input}
      />

      {error ? <Text style={SignUpStyles.errorText}>{error}</Text> : null}

      <Button
        title={loading.submit ? 'Submitting...' : 'Submit'}
        onPress={handleSubmit}
        disabled={loading.submit}
      />
      <Button title=" Go to profile picture" onPress={() =>  navigation.navigate('AddProfilePicture')} />
    </ScrollView>
  );
};

export default SignUpScreen;
