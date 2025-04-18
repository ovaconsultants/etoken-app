import {StyleSheet} from 'react-native';


export const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
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
  },
  profileCircle: {
    width: 60,
    height: 60,
    overflow: 'hidden',
    borderRadius: (30),
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: (12),
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: (30),
  },
  doctorInfo: {
    justifyContent: 'center',
  },
  doctorName: {
    fontSize: (18),
    fontWeight: 'bold',
    color: '#000',
  },
  doctorQualification: {
    fontSize: (14),
    color: '#444',
    fontWeight: '600',
  },

  /** RELOAD BUTTON **/
  reloadButton: {
    padding: 8,
    borderRadius: (8),
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
});
