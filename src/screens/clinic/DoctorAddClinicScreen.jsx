import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {Formik} from 'formik';
import {RefreshCw, Plus, Home} from 'lucide-react-native';
import {
  AddClinicRequest,
  FetchAllClinicForDoctorRequest,
} from '../../services/clinicService';
import {ClinicValidationSchema} from '../../utils/formFields/validationSchemas/clinicSchemas';
import {styles} from './DoctorAddClinicScreen.styles';
import {showToast} from '../../components/toastMessage/ToastMessage';
import {globalStyles} from '../../styles/globalStyles';
import FooterNavigation from '../../components/tabNavigationFooter/TabNavigationFooter';

const DoctorAddClinicScreen = ({navigation, route}) => {
  console.log('navigation  : ', navigation.getParent().getState());
  const {doctor_id, fromSignUpRoute} = route?.params;
  console.log('fromSignUpRoute', fromSignUpRoute);
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        setLoading(true);
        const fetchedClinics =
          (await FetchAllClinicForDoctorRequest(doctor_id)) || [];
        setClinics(fetchedClinics);
      } catch (error) {
        showToast('Failed to fetch clinics', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchClinics();
  }, [doctor_id, showForm]);

  const handleSubmit = async (values, {resetForm, setSubmitting}) => {
    try {
      const data = await AddClinicRequest({
        ...values,
        doctor_id,
        created_by: 'admin',
      });
      if (data.success) {
        showToast('Clinic added successfully', {
          type: 'success',
          duration: 3000,
        });
        navigation.navigate('DoctorClinicScheduleScreen', {
          doctor_id,
          clinic_id: data.clinic.clinic_id,
          fromSignUp: true,
        });
        resetForm();
        setShowForm(false);
      }
    } catch (err) {
      showToast('Failed to create clinic', 'error');
    } finally {
      setSubmitting(false);
    }
  };
  const handleClinicCardPress = clinicId => {
    console.log('Clinic ID:', clinicId);
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.container} />;
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {!showForm ? (
          <>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowForm(true)}>
                <Plus size={24} color="white" />
                <Text style={styles.addButtonText}>Add Schedule </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowForm(true)}>
                <Plus size={24} color="white" />
                <Text style={styles.addButtonText}>Add Clinic</Text>
              </TouchableOpacity>
            </View>

            {clinics.length > 0 ? (
              <FlatList
                data={clinics}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.clinicCard}
                    onPress={() => handleClinicCardPress(item.clinic_id)}>
                    <Text style={styles.clinicName}>{item.clinic_name}</Text>
                    <Text style={styles.clinicAddress}>{item.address}</Text>
                    <Text style={styles.clinicCityState}>
                      {item.city}, {item.state} {item.zip_code}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.clinic_id.toString()}
                numColumns={Dimensions.get('window').width > 600 ? 2 : 1}
                contentContainerStyle={styles.listContainer}
                onPress={handleClinicCardPress}
                scrollEnabled={false}
              />
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No clinics found</Text>
                <Button
                  title="Add Your First Clinic"
                  onPress={() => setShowForm(true)}
                />
              </View>
            )}
          </>
        ) : (
          <Formik
            initialValues={{
              clinic_name: '',
              address: '',
              city: '',
              state: '',
              zip_code: '',
            }}
            validationSchema={ClinicValidationSchema}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={handleSubmit}>
            {({
              handleChange,
              handleBlur,
              handleSubmit: formikHandleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
              resetForm,
            }) => (
              <>
                <View style={styles.formHeader}>
                  <Text style={styles.title}>Add New Clinic</Text>
                  <Button title="Cancel" onPress={() => setShowForm(false)} />
                </View>

                {['clinic_name', 'address', 'city', 'state', 'zip_code'].map(
                  key => (
                    <View
                      key={key}
                      style={[
                        styles.inputWrapper,
                        touched[key] && errors[key] && styles.errorInput,
                      ]}>
                      <TextInput
                        style={styles.input}
                        value={values[key]}
                        onChangeText={handleChange(key)}
                        onBlur={handleBlur(key)}
                        placeholder={`Enter ${key.replace(/_/g, ' ')}`}
                        keyboardType={
                          key === 'zip_code' ? 'numeric' : 'default'
                        }
                      />
                    </View>
                  ),
                )}

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => resetForm()}
                    style={styles.refreshButton}>
                    <RefreshCw size={24} color="#007AFF" />
                  </TouchableOpacity>
                  <Button
                    title="Submit"
                    onPress={formikHandleSubmit}
                    disabled={isSubmitting}
                    styles={[
                      styles.button,
                      isSubmitting && globalStyles.disabledButton,
                    ]}
                  />
                </View>
              </>
            )}
          </Formik>
        )}
      </ScrollView>
      {fromSignUpRoute === undefined && (
  <View>
  <FooterNavigation
    navigation={navigation}
    currentRoute="DoctorAddClinic"
    routes={[
      {
        id: 'home',
        icon: Home,
        screen: 'AppNavigator', // This will take you to the root
        params: {
          screen: 'DrawerNavigator', // Then to the drawer
          params: {
            screen: 'HomeNavigator', // Then to the home navigator
            params: {
              screen: 'Home', // Finally to the Home screen
            }
          }
        },
        label: 'Home',
      },
    ]}
  />
</View>
      )}
    </>
  );
};

export default DoctorAddClinicScreen;
