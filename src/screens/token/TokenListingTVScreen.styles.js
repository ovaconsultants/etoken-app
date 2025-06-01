import {StyleSheet , Dimensions} from 'react-native';
const {width: screenWidth} = Dimensions.get('window');
const isTV = screenWidth > 600; 

export const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    padding : 20 ,
  },

  /** HEADER SECTION **/
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
    headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 4,
  },

  /** DOCTOR PROFILE SECTION **/
  doctorSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flex: 0.8,
  },
  profileCircle: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },

  doctorNameContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    marginHorizontal: 8,
  },
  leftColumn: {
    flex: 0.3,
    paddingRight: 16,
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  rightColumn: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: 'space-between',
  },
  doctorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2a3f54',
    marginBottom: 4,
  },
  qualificationText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'Roboto',
    fontWeight: '800',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  phoneRow: {
    marginBottom: 0,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
    marginRight: 4,
    fontWeight: '800',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  reloadButtonContainer: {
    flex: 0.1,
    flexDirection: 'row',
    alignSelf: 'center',
    marginRight: 10,
  },
  reloadButton: {
    marginTop: 4,
    marginLeft: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
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

  profileImageAndNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  patientName : {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection : 'column',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  statusCell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  greenDot: {backgroundColor: '#4CAF50'},
  redDot: {backgroundColor: '#F44336'},
  yellowDot: {backgroundColor: '#FFC107'},
  blueDot: {backgroundColor: '#2196F3'},
  orangeDot: {backgroundColor: '#FF9800'},

  /** ROW COLORS BASED ON STATUS **/
  inProgressRow: {
    backgroundColor: '#f3faf5',
    borderLeftWidth: 4,
    borderLeftColor: '#2e7d32',
  },

  hindi: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  notificationInProgress: {
    width:   isTV ? 700 : 600,
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#f3faf5',
    margin: 10,
    marginRight: 20,
  },
});
