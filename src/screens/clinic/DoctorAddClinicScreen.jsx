import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, ScrollView, Alert, ActivityIndicator, Button, TouchableOpacity, FlatList, StyleSheet, Dimensions} from 'react-native';
import {Formik} from 'formik';
import {RefreshCw, Plus} from 'lucide-react-native';
import * as Yup from 'yup';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import {AddClinicRequest, FetchAllClinicRequestForDoctor} from '../../services/clinicService';

const ClinicValidationSchema = Yup.object().shape({
  clinic_name: Yup.string().trim().required('Required').min(3).max(50),
  address: Yup.string().trim().required('Required').min(5).max(100),
  city: Yup.string().trim().required('Required').min(2).max(50),
  state: Yup.string().trim().required('Required').min(2).max(50),
  zip_code: Yup.string().trim().required('Required').matches(/^\d{5}$/, 'Must be 5 digits')
});

const DoctorAddClinicScreen = ({navigation, route}) => {
  const {doctor_id} = route?.params;
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        setLoading(true);
        const fetchedClinics = await FetchAllClinicRequestForDoctor(doctor_id);
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
      const data = await AddClinicRequest({...values, doctor_id, created_by: 'admin'});
      if (data.success) {
        Alert.alert('Success', data.message);
        resetForm();
        setShowForm(false);
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to create clinic');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.container} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!showForm ? (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>Your Clinics</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => setShowForm(true)}>
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
                  <Text style={styles.clinicCityState}>{item.city}, {item.state} {item.zip_code}</Text>
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
              <Button title="Add Your First Clinic" onPress={() => setShowForm(true)} />
            </View>
          )}
        </>
      ) : (
        <Formik
          initialValues={{clinic_name: '', address: '', city: '', state: '', zip_code: ''}}
          validationSchema={ClinicValidationSchema}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={handleSubmit}
        >
          {({handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting, resetForm}) => (
            <>
              <View style={styles.formHeader}>
                <Text style={styles.title}>Add New Clinic</Text>
                <Button title="Cancel" onPress={() => setShowForm(false)} />
              </View>

              {['clinic_name', 'address', 'city', 'state', 'zip_code'].map(key => (
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
                    <ErrorMessage error={errors[key]} visible={touched[key]} />
                  </View>
                </View>
              ))}

              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => resetForm()} style={styles.refreshButton}>
                  <RefreshCw size={24} color="#007AFF" />
                </TouchableOpacity>
                <Button title="Submit" onPress={handleSubmit} disabled={isSubmitting} />
              </View>
            </>
          )}
        </Formik>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flexGrow: 1, padding: 16},
  header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20},
  formHeader: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20},
  title: {fontSize: 24, fontWeight: 'bold'},
  addButton: {flexDirection: 'row', alignItems: 'center', backgroundColor: '#007AFF', padding: 8, borderRadius: 5},
  addButtonText: {color: 'white', marginLeft: 5, fontWeight: 'bold'},
  listContainer: {width: '100%'},
  clinicCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flex: 1,
    minWidth: Dimensions.get('window').width > 600 ? '45%' : '90%',
  },
  clinicName: {fontSize: 18, fontWeight: 'bold', marginBottom: 5},
  clinicAddress: {fontSize: 14, color: '#666', marginBottom: 3},
  clinicCityState: {fontSize: 14, color: '#666'},
  emptyContainer: {flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50},
  emptyText: {fontSize: 18, color: '#666', marginBottom: 20},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    fontSize: 16,
  },
  errorBox: {
    height: 25, // Fixed height for error message
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  refreshButton: {
    marginRight: 20
  }
});

export default DoctorAddClinicScreen;