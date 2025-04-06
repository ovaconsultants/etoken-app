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
import {showToast} from '../../components/toastMessage/ToastMessage';
import {
  SignUpValidationSchema,
  validateField,
  validateForm,
} from '../../utils/SignUpValidation';

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
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    mobileNumber: false,
    email: false,
    accountId: false,
    specializationId: false,
  });
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

      if (!selectedAccount) {
        return;
      }

      setLoading(prev => ({...prev, specializations: true}));

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
        setLoading(prev => ({...prev, specializations: false}));
      }
    };

    loadSpecializations();
  }, [selectedAccount]);

  const handleInputChange = async (fieldName, value) => {
    if (!touched[fieldName]) {
      setTouched(prev => ({...prev, [fieldName]: true}));
    }

    const validation = await validateField(
      SignUpValidationSchema,
      fieldName,
      value,
      formData,
      selectedAccount,
      selectedSpecialization,
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

  const handleBlur = fieldName => {
    if (!touched[fieldName]) {
      setTouched(prev => ({...prev, [fieldName]: true}));
    }
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

    const {isValid, errors: validationErrors} = await validateForm(
      SignUpValidationSchema,
      formData,
      selectedAccount,
      selectedSpecialization,
    );

    if (!isValid) {
      setErrors(validationErrors);
      showToast(
        'error',
        'Validation Error',
        'Please fix the errors in the form',
      );
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
      setTouched({
        firstName: false,
        lastName: false,
        mobileNumber: false,
        email: false,
        accountId: false,
        specializationId: false,
      });

      navigation.navigate('AddProfilePicture', {
        doctor_id: data.doctor_id,
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
            onChange={item => {
              setTouched(prev => ({...prev, accountId: true}));
              setSelectedAccount(item.value);
            }}
            style={[
              SignUpStyles.dropdown,
              touched.accountId && !selectedAccount && SignUpStyles.errorInput,
            ]}
            placeholderStyle={SignUpStyles.placeholderText}
            selectedTextStyle={SignUpStyles.selectedText}
            inputSearchStyle={SignUpStyles.inputSearch}
          />
          {errors.accountId && (
            <Text style={SignUpStyles.errorText}>{errors.accountId}</Text>
          )}
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
            onChange={item => {
              setTouched(prev => ({...prev, specializationId: true}));
              setSelectedSpecialization(item.value);
            }}
            disabled={!selectedAccount}
            style={[
              SignUpStyles.dropdown,
              !selectedAccount && SignUpStyles.disabledDropdown,
              touched.specializationId &&
                !selectedSpecialization &&
                SignUpStyles.errorInput,
            ]}
            placeholderStyle={SignUpStyles.placeholderText}
            selectedTextStyle={SignUpStyles.selectedText}
            inputSearchStyle={SignUpStyles.inputSearch}
          />
          {errors.specializationId && (
            <Text style={SignUpStyles.errorText}>
              {errors.specializationId}
            </Text>
          )}
        </>
      )}

      <TextInput
        placeholder="First Name *"
        value={formData.firstName}
        onChangeText={text => handleInputChange('firstName', text)}
        onBlur={() => handleBlur('firstName')}
        style={[
          SignUpStyles.input,
          touched.firstName && !formData.firstName && SignUpStyles.errorInput,
          errors.firstName && SignUpStyles.errorInput,
        ]}
        maxLength={50}
      />
      {errors.firstName && (
        <Text style={SignUpStyles.errorText}>{errors.firstName}</Text>
      )}

      <TextInput
        placeholder="Last Name *"
        value={formData.lastName}
        onChangeText={text => handleInputChange('lastName', text)}
        onBlur={() => handleBlur('lastName')}
        style={[
          SignUpStyles.input,
          touched.lastName && !formData.lastName && SignUpStyles.errorInput,
          errors.lastName && SignUpStyles.errorInput,
        ]}
        maxLength={50}
      />
      {errors.lastName && (
        <Text style={SignUpStyles.errorText}>{errors.lastName}</Text>
      )}

      <TextInput
        placeholder="Mobile Number *"
        value={formData.mobileNumber}
        onChangeText={text => handleInputChange('mobileNumber', text)}
        onBlur={() => handleBlur('mobileNumber')}
        keyboardType="phone-pad"
        style={[
          SignUpStyles.input,
          touched.mobileNumber &&
            !formData.mobileNumber &&
            SignUpStyles.errorInput,
          errors.mobileNumber && SignUpStyles.errorInput,
        ]}
        maxLength={10}
      />
      {errors.mobileNumber && (
        <Text style={SignUpStyles.errorText}>{errors.mobileNumber}</Text>
      )}

      <TextInput
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChangeText={text => handleInputChange('phoneNumber', text)}
        keyboardType="phone-pad"
        style={SignUpStyles.input}
        maxLength={10}
      />

      <TextInput
        placeholder="Email *"
        value={formData.email}
        onChangeText={text => handleInputChange('email', text)}
        onBlur={() => handleBlur('email')}
        keyboardType="email-address"
        autoCapitalize="none"
        style={[
          SignUpStyles.input,
          touched.email && !formData.email && SignUpStyles.errorInput,
          errors.email && SignUpStyles.errorInput,
        ]}
      />
      {errors.email && (
        <Text style={SignUpStyles.errorText}>{errors.email}</Text>
      )}

      <Button
        title={loading.submit ? 'Submitting...' : 'Submit'}
        onPress={handleSubmit}
        disabled={loading.submit}
      />
    </ScrollView>
  );
};

export default SignUpScreen;
