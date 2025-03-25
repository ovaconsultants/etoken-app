import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  doctorSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
  profileCircle: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50, 
  },
  doctorInfo: {
    padding: 10,
    borderRadius: 8,
  },
  doctorName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  doctorQualification: {
    fontSize: 16,
    color: '#555',
  },
  reloadButton: {
    backgroundColor: '#009BFF',
    alignItems  : 'center',
    padding: 10,
    height : '50%',
    borderRadius: '40%',
    margin: '2%',
  },
  queueContainer: {
    flex: 1,
    padding: 20,
  },

  inProgress: {
    backgroundColor: '#f3faf5',
    borderWidth: 1,
    borderColor: '#2e7d32',
  },
  waiting: {
    backgroundColor: '#fffbf2',
  },
  onHold: {
    backgroundColor: '#fff5f5',
  },
  leftAlign: {
    textAlign: 'left',
  },
  rightAlign: {
    textAlign: 'right',
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  green: { backgroundColor: 'green' },
  orange: { backgroundColor: 'orange' },
  red: { backgroundColor: 'red' },
  patientName: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: 150,
  },
  hindi: {
    fontSize: 13,
    color: '#555',
  },
  notificationInProgress: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 100,
  },
  tableContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'orange',
    paddingVertical: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tableHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    paddingHorizontal: 4,
  },
  patientCell: {
    flex: 1.5, // Wider column for patient names
    textAlign: 'left',
    paddingLeft: 10,
  },
  statusCell: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
});