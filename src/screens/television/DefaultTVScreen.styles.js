import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp('5%'),
    backgroundColor: '#F9FAFB', // Light background for contrast
  },
  leftSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: wp('50%'),
    height: wp('50%'),
    borderRadius: wp('25%'),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorImage: {
    width: wp('45%'),
    height: wp('45%'),
    borderRadius: wp('22.5%'),
    borderWidth: 4,
    borderColor: '#FFF',
  },
  doctorName: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginTop: hp('2%'),
    textAlign: 'center',
  },
  doctorTitle: {
    fontSize: wp('4%'),
    color: '#4B5563',
    marginTop: hp('1%'),
    textAlign: 'center',
    fontStyle: 'italic',
  },
  header: {
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  clinicName: {
    fontSize: wp('7%'),
    fontWeight: 'bold',
    color: '#1E3A8A',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  clinicAddress: {
    fontSize: wp('4%'),
    color: '#4B5563',
    marginTop: hp('0.5%'),
    textAlign: 'center',
  },
  mainContent: {
    width: '100%',
    paddingVertical: hp('3%'),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1%'),
    paddingHorizontal: wp('5%'),
  },
  detailLabel: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  detailValue: {
    fontSize: wp('4.5%'),
    color: '#374151',
    fontWeight: '500',
  },
  contactSection: {
    width: '90%',
    alignItems: 'center',
    marginVertical: hp('2%'),
    backgroundColor: '#E0F2FE',
    padding: hp('2%'),
    borderRadius: wp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  contactLabel: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: hp('1%'),
    textTransform: 'uppercase',
  },
  contactValue: {
    fontSize: wp('4.5%'),
    color: '#1F2937',
    marginBottom: hp('0.5%'),
  },
});
