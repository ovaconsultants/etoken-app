import {StyleSheet, Platform} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const isTV = Platform.isTV;

export const styles = StyleSheet.create({
  /** BASE STYLES **/
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    margin: moderateScale(10),
    padding: moderateScale(20),
  },

  /** HEADER SECTION **/
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: moderateScale(12),
    marginTop: moderateScale(4),
  },

  /** DOCTOR PROFILE SECTION **/
  doctorSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flex: 0.8,
  },
  profileCircle: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(10),
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(16),
    overflow: 'hidden',
  },
  doctorNameContainer: {
    flexDirection: 'row',
    borderRadius: moderateScale(8),
    marginHorizontal: moderateScale(8),
  },
  leftColumn: {
    flex: 0.3,
    paddingRight: moderateScale(16),
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  rightColumn: {
    flex: 1,
    paddingLeft: moderateScale(16),
    justifyContent: 'space-between',
  },
  doctorName: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: '#2a3f54',
    marginBottom: moderateScale(4),
  },
  qualificationText: {
    fontSize: moderateScale(14),
    color: '#666',
    fontStyle: 'Roboto',
    fontWeight: '800',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(8),
  },
  phoneRow: {
    marginBottom: 0,
  },
  infoLabel: {
    fontSize: moderateScale(16),
    color: '#666',
    marginRight: moderateScale(4),
    fontWeight: '800',
  },
  infoText: {
    fontSize: moderateScale(16),
    color: '#333',
    fontWeight: '500',
  },
  reloadButtonContainer: {
    flex: 0.1,
    flexDirection: 'row',
    alignSelf: 'center',
    marginRight: moderateScale(10),
  },
  reloadButton: {
    marginTop: moderateScale(4),
    marginLeft: moderateScale(12),
    backgroundColor: '#f5f5f5',
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },

  /** TOKEN TABLE **/
  tableContainer: {
    marginTop: moderateScale(10),
    borderRadius: moderateScale(8),
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(12),
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeaderText: {
    flex: 1,
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'flex-start',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableCell: {
    flex: 1,
    fontSize: moderateScale(14),
    color: '#333',
    textAlign: 'flex-start',
  },
  profileImageAndNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  patientName: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  profileImage: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    marginRight: moderateScale(5),
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  statusCell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dot: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(5),
    marginRight: moderateScale(6),
  },
  greenDot: {backgroundColor: '#4CAF50'},
  redDot: {backgroundColor: '#F44336'},
  yellowDot: {backgroundColor: '#FFC107'},
  blueDot: {backgroundColor: '#2196F3'},
  orangeDot: {backgroundColor: '#FF9800'},

  /** ROW COLORS BASED ON STATUS **/
  inProgressRow: {
    backgroundColor: '#f3faf5',
    borderLeftWidth: moderateScale(4),
    borderLeftColor: '#2e7d32',
  },
  hindi: {
    fontSize: moderateScale(12),
    color: '#666',
    marginTop: moderateScale(2),
  },
  notificationInProgress: {
    width: isTV ? moderateScale(700) : moderateScale(600),
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#f3faf5',
    margin: moderateScale(10),
    marginRight: moderateScale(20),
  },
});
