import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    // backgroundColor: 'black',
  },
  headerText: {
    fontSize: width * 0.01,
    color: '#000',
    fontWeight: '500',
  },
  initialsCircle: {
    width: width * 0.08,
    height: width * 0.08,
    borderRadius: width * 0.05,
    backgroundColor: '#FFE3E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorInitials: {
    fontSize: width * 0.02,
    fontWeight: 'bold',
    color: '#333',
  },
  detailsContainer: {
    alignItems: 'center',
    paddingVertical: height * 0.02,
  },
  doctorName: {
    fontSize: width * 0.03,
    color: '#222',
    fontWeight: 'bold',
  },
  clinicName: {
    fontSize: width * 0.03,
    fontWeight: '600',
    color: '#444',
    marginTop: height * 0.01,
  },
  clinicInfo: {
    flex : 1 ,
    fontSize: width * 0.01,
    color: '#666',
    marginTop: height * 0.01,
  },
  doctorSection: {
    flexDirection:'row',

    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  doctorImage: {
    width: width * 0.3,
    height: height * 0.5,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  footer: {
    margin:height * 0.02,
    marginTop:height * 0.03,
    position: 'relative',
    bottom: height * 0.02,
    alignItems: 'center',
  },
  footerDetails: {
    fontSize: width * 0.02,
    color: '#000',
    textAlign: 'center',
    fontWeight: '500',
  },
  footerNote: {
    fontSize: width * 0.01,
    color: '#888',
    textAlign: 'center',
    marginTop: height * 0.01,
  },
});
