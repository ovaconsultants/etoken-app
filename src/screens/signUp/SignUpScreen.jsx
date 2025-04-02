import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {SignUpRequest} from '../../services/authService';
import SignUpStyles from './SignUpStyles';
import {FetchAccountRequest} from '../../services/accountService';
import {FetchSpecializationsRequest} from '../../services/accountService';
import { showToast } from '../../components/toastMessage/ToastMessage';
import { SignUpValidationSchema , validateField , validateForm } from '../../utils/SignUpValidation';

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
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState({
    accounts: true,
    specializations: false,
    submit: false,
  });

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
        showToast('Network error!', 'error');
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
          showToast('error', 'Error', 'Failed to load specializations');
        }
      } catch (err) {
        showToast('error', 'Error', err.message);
        setSpecializations([]);
      } finally {
        setLoading(prev => ({ ...prev, specializations: false }));
      }
    };

    loadSpecializations();
  }, [selectedAccount]);

  const handleInputChange = async (fieldName, value) => {
    const validation = await validateField(
      SignUpValidationSchema,
      fieldName,
      value,
      formData,
      selectedAccount,
      selectedSpecialization
    );
    
    if (!validation.isValid) {
      setErrors(prev => ({...prev, [fieldName]: validation.message}));
    } else {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[fieldName];
        return newErrors;
      });
    }
    
    setFormData(prev => ({...prev, [fieldName]: value}));
  };
  
  const handleSubmit = async () => {
    const requiredFields = [
      formData.firstName,
      formData.lastName,
      selectedSpecialization,
      formData.mobileNumber,
      formData.email,
    ];

    if (requiredFields.some(field => !field)) {
      showToast('error', 'Validation Error', 'Please fill all required fields');
      return;
    }

    const { isValid, errors: validationErrors } = await validateForm(
      SignUpValidationSchema,
      formData,
      selectedAccount,
      selectedSpecialization
    );
    
    if (!isValid) {
      setErrors(validationErrors);
      showToast('error', 'Validation Error', 'Please fix the errors in the form');
      return;
    }

    setLoading(prev => ({...prev, submit: true}));

    try {
      const dataObject = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        specialization_id: selectedSpecialization,
        mobile_number: formData.mobileNumber,
        phone_number: formData.phoneNumber,
        email: formData.email.toLowerCase().trim(),
        created_by: 'Receptionist', 
      };

      const data = await SignUpRequest(dataObject);

      if (!data.success) {
        throw new Error(data.message || 'Failed to submit form');
      }

      showToast('success', 'success', 'Doctor registered successfully!');
      
      setSelectedAccount(null);
      setSelectedSpecialization(null);
      setFormData({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        phoneNumber: '',
        email: '',
      });
      setErrors({});
      
       navigation.navigate('AddProfilePicture', { 
        doctor_id: data.doctor_id 
      });
      
    } catch (err) {
      showToast('error', 'Error', err.message);
    } finally {
      setLoading(prev => ({...prev, submit: false}));
    }
  };  

  return (
    <ScrollView contentContainerStyle={SignUpStyles.container}>
      <Text style={SignUpStyles.label}>Account:</Text>
      {loading.accounts ? (
        <ActivityIndicator />
      ) : (
        <>
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
          {errors.accountId && <Text style={SignUpStyles.errorText}>{errors.accountId}</Text>}
        </>
      )}

      <Text style={SignUpStyles.label}>Specialization:</Text>
      {loading.specializations ? (
        <ActivityIndicator />
      ) : (
        <>
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
          {errors.specializationId && <Text style={SignUpStyles.errorText}>{errors.specializationId}</Text>}
        </>
      )}

      <TextInput
        placeholder="First Name *"
        value={formData.firstName}
        onChangeText={text => handleInputChange('firstName', text)}
        style={[
          SignUpStyles.input,
          errors.firstName && SignUpStyles.errorInput
        ]}
        maxLength={50}
      />
      {errors.firstName && <Text style={SignUpStyles.errorText}>{errors.firstName}</Text>}

      <TextInput
        placeholder="Last Name *"
        value={formData.lastName}
        onChangeText={text => handleInputChange('lastName', text)}
        style={[
          SignUpStyles.input,
          errors.lastName && SignUpStyles.errorInput
        ]}
        maxLength={50}
      />
      {errors.lastName && <Text style={SignUpStyles.errorText}>{errors.lastName}</Text>}

      <TextInput
        placeholder="Mobile Number *"
        value={formData.mobileNumber}
        onChangeText={text => handleInputChange('mobileNumber', text)}
        keyboardType="phone-pad"
        style={[
          SignUpStyles.input,
          errors.mobileNumber && SignUpStyles.errorInput
        ]}
        maxLength={10}
      />
      {errors.mobileNumber && <Text style={SignUpStyles.errorText}>{errors.mobileNumber}</Text>}

      <TextInput
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChangeText={text => handleInputChange('phoneNumber', text)}
        keyboardType="phone-pad"
        style={[
          SignUpStyles.input,
          errors.phoneNumber && SignUpStyles.errorInput
        ]}
        maxLength={10}
      />
      {errors.phoneNumber && <Text style={SignUpStyles.errorText}>{errors.phoneNumber}</Text>}

      <TextInput
        placeholder="Email *"
        value={formData.email}
        onChangeText={text => handleInputChange('email', text)}
        keyboardType="email-address"
        autoCapitalize="none"
        style={[
          SignUpStyles.input,
          errors.email && SignUpStyles.errorInput
        ]}
      />
      {errors.email && <Text style={SignUpStyles.errorText}>{errors.email}</Text>}

      <Button
        title={loading.submit ? 'Submitting...' : 'Submit'}
        onPress={handleSubmit}
        disabled={loading.submit}
      />
    </ScrollView>
  );
};

export default SignUpScreen;