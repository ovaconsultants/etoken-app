import {StyleSheet} from 'react-native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const marginWidth = width * 0.04; 
export const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    margin: marginWidth,
  },

  /** HEADER SECTION **/
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: (10),
  },

  /** DOCTOR PROFILE SECTION **/
  doctorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
    flex: 1,
  },
  infoContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
    margin: 8,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'column',
    marginBottom: 2,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '700',
  },
  reloadButton: {
    padding: 8,
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
    paddingVertical: (10),
    paddingHorizontal: (12),
    backgroundColor: '#f8f8f8',
    borderBottomWidth: (1),
    borderBottomColor: '#ddd',
  },
  tableHeaderText: {
    flex: 1,
    fontSize: (14),
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'flex-start',
  },

  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: (12),
    paddingHorizontal: (12),
    borderBottomWidth: (1),
    borderBottomColor: '#eee',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    textAlign: 'flex-start',
  },

  statusCell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dot: {
    width: (10),
    height: (10),
    borderRadius: (5),
    marginRight: (6),
  },
  greenDot: { backgroundColor: '#4CAF50' },
  redDot: { backgroundColor: '#F44336' },
  yellowDot: { backgroundColor: '#FFC107' },
  blueDot: { backgroundColor: '#2196F3' },
  orangeDot: { backgroundColor: '#FF9800' },

  /** ROW COLORS BASED ON STATUS **/
  inProgressRow: {
    backgroundColor: '#f3faf5',
    borderLeftWidth: 4,
    borderLeftColor: '#2e7d32',
  },

  hindi: {
    fontSize: 12,
    color: '#666',
    marginTop: (2),
  },
  notificationInProgress : {
    width : 200 , 
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#f3faf5',
    margin: 10,
    marginRight: 20,
  },
});
