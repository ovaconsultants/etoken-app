import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,

  },

  /** HEADER SECTION **/
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 10,
  },

  /** DOCTOR PROFILE SECTION **/
  doctorSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  doctorInfo: {
    justifyContent: 'center',
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  doctorQualification: {
    fontSize: 14,
    color: '#444',
    fontWeight: '600',
  },

  /** RELOAD BUTTON **/
  reloadButton: {
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /** TOKEN TABLE **/
  tableContainer: {
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'flex-start',
  },
  // patientCell: {
  //   flex: 2,
  //   textAlign: 'left',
  // },

  /** TOKEN ROWS **/
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    textAlign: 'flex-start',
  },

  /** STATUS STYLES **/
  statusCell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    marginRight: 6,
  },
  green: { backgroundColor: '#2e7d32' },
  orange: { backgroundColor: '#f9a825' },
  red: { backgroundColor: '#d32f2f' },

  /** ROW COLORS BASED ON STATUS **/
  inProgressRow: {
    backgroundColor: '#f3faf5',
    borderLeftWidth: 4,
    borderLeftColor: '#2e7d32',
  },
  waitingRow: {
    backgroundColor: '#fffbf2',
    borderLeftWidth: 4,
    borderLeftColor: '#f9a825',
  },
  onHoldRow: {
    backgroundColor: '#fff5f5',
    borderLeftWidth: 4,
    borderLeftColor: '#d32f2f',
  },
  notificationInProgress : {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#f3faf5',
    margin: 10,
    marginRight: 20,
  },
  hindi: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Your-Hindi-Font', // Add a Hindi font if needed
    marginTop: 2,
  },
});
