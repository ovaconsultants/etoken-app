import React, {useState, useEffect , useMemo} from 'react';
import {
  Text,
  TextInput,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {SignUpRequest} from '../../services/authService';
import { FetchAccountRequest } from '../../services/accountService';
import { FetchSpecializationsRequest } from '../../services/accountService'; 
import {showToast} from '../../components/toastMessage/ToastMessage';
import {
  SignUpValidationSchema,
  validateField,
  validateForm,
} from '../../utils/SignUpValidation';
import { useOrientation  } from '../../hooks/useOrientation';
import { createStyles } from './SignUpScreen.styles';



const SignUpScreen = ({navigation}) => {
  const {isLandscape , dimensions } = useOrientation();
  const styles = useMemo(() => createStyles(isLandscape , dimensions),[dimensions, isLandscape]);


  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [isValid , setIsValid] = useState(false);
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
          throw new Error(data.message || 'Failed to load account options');
        }
        setAccounts(
          data.accounts.map(acc => ({
            label: acc.account_name,
            value: acc.account_id,
          })),
        );
      } catch (err) {
        showToast('Failed to load account options. Please try again.', 'error');
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
          showToast(
            'Failed to load specialization options. Please try again.',
            'error',
          );
        }
      } catch (err) {
        showToast(
          'Network error occurred while loading specializations.',
          'error',
        );
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
      showToast('Please complete all required fields marked with *', 'error');
      return;
    }

    const {valid, errors: validationErrors} = await validateForm(
      SignUpValidationSchema,
      formData,
      selectedAccount,
      selectedSpecialization,
    );

    if (!valid) {
      setIsValid(valid);
      setErrors(validationErrors);
      showToast('Please correct the highlighted errors in the form', 'error');
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
        throw new Error(
          data.message ||
            'Registration failed. Please verify your information.',
        );
      }

      showToast('Doctor registration completed successfully!', 'success', {
        duration: 1000,
      });

      // Reset form
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
      setTimeout(
        () =>
          navigation.navigate('DoctorClinicNavigator', {
            screen: 'AddProfilePicture',
            params: {
              doctor_id: data.doctor_id,
            },
          }),
        2000,
      );
    } catch (err) {
      showToast(
        err.message || 'Registration failed. Please try again later.',
        'error',
      );
    } finally {
      setLoading(prev => ({...prev, submit: false}));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Account:</Text>
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
              styles.dropdown,
              touched.accountId && !selectedAccount && styles.errorInput,
            ]}
            placeholderStyle={styles.placeholderText}
            selectedTextStyle={styles.selectedText}
            inputSearchStyle={styles.inputSearch}
          />
          {errors.accountId && (
            <Text style={styles.errorText}>{errors.accountId}</Text>
          )}
        </>
      )}

      <Text style={styles.label}>Specialization:</Text>
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
              styles.dropdown,
              !selectedAccount && styles.disabledDropdown,
              touched.specializationId &&
                !selectedSpecialization &&
                styles.errorInput,
            ]}
            placeholderStyle={styles.placeholderText}
            selectedTextStyle={styles.selectedText}
            inputSearchStyle={styles.inputSearch}
          />
        </>
      )}

      <TextInput
        placeholder="First Name *"
        value={formData.firstName}
        onChangeText={text => handleInputChange('firstName', text)}
        onBlur={() => handleBlur('firstName')}
        style={[
          styles.input,
          touched.firstName && !formData.firstName && styles.errorInput,
          errors.firstName && styles.errorInput,
        ]}
        maxLength={50}
      />
      <TextInput
        placeholder="Last Name *"
        value={formData.lastName}
        onChangeText={text => handleInputChange('lastName', text)}
        onBlur={() => handleBlur('lastName')}
        style={[
          styles.input,
          touched.lastName && !formData.lastName && styles.errorInput,
          errors.lastName && styles.errorInput,
        ]}
        maxLength={50}
      />

      <TextInput
        placeholder="Mobile Number *"
        value={formData.mobileNumber}
        onChangeText={text => {
          const numericText = text.replace(/[^0-9]/g, '');
          const limitedText = numericText.slice(0, 10);
          handleInputChange('mobileNumber', limitedText);
        }}
        onBlur={() => handleBlur('mobileNumber')}
        keyboardType="phone-pad"
        style={[
          styles.input,
          touched.mobileNumber &&
            !formData.mobileNumber &&
            styles.errorInput,
          errors.mobileNumber && styles.errorInput,
        ]}
        maxLength={10}
      />
      <TextInput
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChangeText={text => handleInputChange('phoneNumber', text)}
        keyboardType="phone-pad"
        style={styles.input}
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
          styles.input,
          touched.email && !formData.email && styles.errorInput,
          errors.email && styles.errorInput,
        ]}
      />
      <TouchableOpacity
       style={[styles.button , !isValid && styles.buttonDisabled]}
        title={loading.submit ? 'Submitting...' : 'Submit'}
        onPress={handleSubmit}
        disabled={loading.submit}
      >
       <Text style={styles.buttonText}>{loading.submit ? 'Submitting...' : 'Submit'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignUpScreen;
