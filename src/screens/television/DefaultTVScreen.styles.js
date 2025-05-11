import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const isTablet = width >= 600;
const isLandscape = width > height;

export const styles = StyleSheet.create({
  container: {
    flexDirection: isLandscape ? 'row' : 'column',
    backgroundColor: '#ffffff',
    padding: isTablet ? 32 : 20,
    gap: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileImageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: isLandscape ? 0.4 : null,
  },

  profileImage: {
    width: isTablet ? 260 : 200,
    height: isTablet ? 260 : 200,
    borderRadius: 20 ,
    resizeMode: 'cover',
  },

  infoContainer: {
    flex: isLandscape ? 0.6 : null,
    flexDirection: 'column',
    width: '100%',
  },

  doctorName: {
    fontSize: isTablet ? 34 : 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },

  doctorTitle: {
    fontSize: isTablet ? 20 : 16,
    color: '#7f8c8d',
    marginBottom: 10,
  },

  section: {
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: isTablet ? 20 : 17,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },

  sectionText: {
    fontSize: isTablet ? 16 : 14,
    color: '#2c3e50',
    lineHeight: 22,
  },

  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },

  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#000',
    marginRight: 10,
    marginTop: 6,
  },

  bulletText: {
    fontSize: isTablet ? 16 : 14,
    color: '#2c3e50',
    flex: 1,
    lineHeight: 22,
  },

  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },

  contactIcon: {
    marginRight: 10,
    fontSize: isTablet ? 18 : 16,
    color: '#2c3e50',
  },

  contactText: {
    fontSize: isTablet ? 16 : 14,
    color: '#2c3e50',
    flex: 1,
  },
});
