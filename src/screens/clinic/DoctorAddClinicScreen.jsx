import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {Formik} from 'formik';
import {RefreshCw, Plus} from 'lucide-react-native';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import {
  AddClinicRequest,
  FetchAllClinicForDoctorRequest,
} from '../../services/clinicService';
import {ClinicValidationSchema} from '../../utils/formFields/validationSchemas/clinicSchemas';
import {styles} from './DoctorAddClinicScreen.styles';
import { showToast } from '../../components/toastMessage/ToastMessage';

const DoctorAddClinicScreen = ({navigation, route}) => {
  const {doctor_id} = route?.params;
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        setLoading(true);
        const fetchedClinics = await FetchAllClinicForDoctorRequest(doctor_id);
        setClinics(fetchedClinics);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch clinics');
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
      Alert.alert('Error', 'Failed to create clinic');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.container} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!showForm ? (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>Your Clinics</Text>
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
                <View style={styles.clinicCard}>
                  <Text style={styles.clinicName}>{item.clinic_name}</Text>
                  <Text style={styles.clinicAddress}>{item.address}</Text>
                  <Text style={styles.clinicCityState}>
                    {item.city}, {item.state} {item.zip_code}
                  </Text>
                </View>
              )}
              keyExtractor={item => item.clinic_id.toString()}
              numColumns={Dimensions.get('window').width > 600 ? 2 : 1}
              contentContainerStyle={styles.listContainer}
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
                  <View key={key} style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      value={values[key]}
                      onChangeText={handleChange(key)}
                      onBlur={handleBlur(key)}
                      placeholder={`Enter ${key.replace(/_/g, ' ')}`}
                      keyboardType={key === 'zip_code' ? 'numeric' : 'default'}
                    />
                    <View style={styles.errorBox}>
                      <ErrorMessage
                        error={errors[key]}
                        visible={touched[key]}
                      />
                    </View>
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
                />
              </View>
            </>
          )}
        </Formik>
      )}
    </ScrollView>
  );
};

export default DoctorAddClinicScreen;
