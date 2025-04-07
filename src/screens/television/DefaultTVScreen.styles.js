// Updated styles for colorful rainbow profile layout and reordered clinic info
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const isLandscape = width > height;
const isTablet = width >= 600;

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: isLandscape ? 'row' : 'column',
    backgroundColor: '#f0f4fa',
    padding: isTablet ? 24 : 16,
    gap: isLandscape ? 24 : 16,
  },

  profileCard: {
    flex: isLandscape ? 0.4 : null,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: isTablet ? 20 : 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },

  rainbowBorder: {
    padding: 4,
    borderRadius: 100,
    backgroundColor: 'transparent',
    backgroundImage: 'linear-gradient(135deg, #ff6b6b, #feca57, #48dbfb, #1dd1a1)',
    overflow: 'hidden',
    marginBottom: 16,
  },

  imageContainer: {
    width: isTablet ? 180 : 140,
    height: isTablet ? 180 : 140,
    borderRadius: 90,
    overflow: 'hidden',
  },

  doctorImage: {
    width: '100%',
    height: '100%',
  },

  doctorName: {
    fontSize: isTablet ? 24 : 20,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
  },

  doctorTitle: {
    fontSize: isTablet ? 18 : 16,
    color: '#34495e',
    textAlign: 'center',
    marginBottom: 4,
  },

  clinicName: {
    fontSize: isTablet ? 16 : 14,
    color: '#3498db',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '500',
  },

  clinicAddress: {
    fontSize: isTablet ? 14 : 12,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 12,
  },

  detailsCard: {
    flex: isLandscape ? 0.6 : null,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: isTablet ? 24 : 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 12,
    flexWrap: 'wrap',
  },

  detailLabel: {
    fontSize: isTablet ? 16 : 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginRight: 8,
    width: isTablet ? 160 : 120,
  },

  detailValue: {
    flex: 1,
    fontSize: isTablet ? 16 : 14,
    color: '#2c3e50',
    lineHeight: 22,
  },

  contactBox: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    paddingTop: 16,
  },

  contactText: {
    fontSize: isTablet ? 16 : 14,
    color: '#2c3e50',
    marginBottom: 4,
  },
});
