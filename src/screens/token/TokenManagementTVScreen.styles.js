import {StyleSheet} from 'react-native';
import {
  scaleSize,
  scaleFont,
  responsivePadding,
  responsiveBorderRadius,
  isTV,
  isLandscape,
  isTablet,
} from '../../utils/responsiveConfig.js';

export const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: responsivePadding(20),
    paddingVertical: responsivePadding(10),
  },

  /** HEADER SECTION **/
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scaleSize(15),
    paddingHorizontal: responsivePadding(10),
  },

  /** DOCTOR PROFILE SECTION **/
  doctorSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileCircle: {
    width: scaleSize(60) * (isTV ? 1.5 : 1),
    height: scaleSize(60) * (isTV ? 1.5 : 1),
    borderRadius: responsiveBorderRadius(30),
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleSize(12),
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: responsiveBorderRadius(30),
  },
  doctorInfo: {
    justifyContent: 'center',
  },
  doctorName: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    color: '#000',
  },
  doctorQualification: {
    fontSize: scaleFont(14),
    color: '#444',
    fontWeight: '600',
  },

  /** RELOAD BUTTON **/
  reloadButton: {
    padding: scaleSize(8),
    borderRadius: responsiveBorderRadius(8),
    alignItems: 'center',
    justifyContent: 'center',
  },

  /** TOKEN TABLE **/
  tableContainer: {
    marginTop: scaleSize(10),
    borderRadius: responsiveBorderRadius(8),
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: responsivePadding(10),
    paddingHorizontal: responsivePadding(12),
    backgroundColor: '#f8f8f8',
    borderBottomWidth: scaleSize(1),
    borderBottomColor: '#ddd',
  },
  tableHeaderText: {
    flex: 1,
    fontSize: scaleFont(14),
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'flex-start',
  },

  /** TOKEN ROWS **/
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsivePadding(12),
    paddingHorizontal: responsivePadding(12),
    borderBottomWidth: scaleSize(1),
    borderBottomColor: '#eee',
  },
  tableCell: {
    flex: 1,
    fontSize: scaleFont(14),
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
    width: scaleSize(10),
    height: scaleSize(10),
    borderRadius: scaleSize(5),
    backgroundColor: 'red',
    marginRight: scaleSize(6),
  },

  /** ROW COLORS BASED ON STATUS **/
  inProgressRow: {
    backgroundColor: '#f3faf5',
    borderLeftWidth: scaleSize(4),
    borderLeftColor: '#2e7d32',
  },

  hindi: {
    fontSize: scaleFont(12),
    color: '#666',
    marginTop: scaleSize(2),
  },

  // TV Specific Overrides
  ...(isTV
    ? {
        fullScreenContainer: {
          paddingHorizontal: responsivePadding(40),
          paddingVertical: responsivePadding(20),
        },
        tableRow: {
          paddingVertical: responsivePadding(20),
        },
        doctorName: {
          fontSize: scaleFont(24),
        },
      }
    : {}),

  // Tablet Landscape Optimizations
  ...(isTablet && isLandscape
    ? {
        tableContainer: {
          marginHorizontal: responsivePadding(40),
        },
        profileCircle: {
          width: scaleSize(70),
          height: scaleSize(70),
        },
      }
    : {}),
});
