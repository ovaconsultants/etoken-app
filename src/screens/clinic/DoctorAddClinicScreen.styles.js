import {Dimensions, StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
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
errorInput : {
  color : 'red' ,
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