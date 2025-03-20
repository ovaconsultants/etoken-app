import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: wp('5%'),
    backgroundColor: '#FFF5E4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  clinicInfo: {
    flex: 1,
  },
  clinicName: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: '#333',
  },
  clinicAddress: {
    fontSize: wp('3.5%'),
    color: '#666',
    marginTop: hp('0.5%'),
  },
  initialsCircle: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    backgroundColor: '#FFE3E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('2%'),
  },
  doctorInitials: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#333',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: hp('5%'),
  },
  doctorImage: {
    width: wp('40%'),
    height: wp('40%'),
    borderRadius: wp('20%'),
    borderWidth: 3,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  doctorName: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#222',
    marginTop: hp('2%'),
  },
  doctorTitle: {
    fontSize: wp('4%'),
    color: '#666',
    marginTop: hp('1%'),
  },
  detailsSection: {
    marginVertical: hp('2%'),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1%'),
  },
  detailLabel: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#333',
  },
  detailValue: {
    fontSize: wp('4%'),
    color: '#666',
  },
  contactSection: {
    marginVertical: hp('2%'),
  },
  contactLabel: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: hp('1%'),
  },
  contactValue: {
    fontSize: wp('4%'),
    color: '#666',
    marginBottom: hp('0.5%'),
  },
  footer: {
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  footerDetails: {
    fontSize: wp('4%'),
    color: '#444',
    textAlign: 'center',
    fontWeight: '500',
  },
  footerNote: {
    fontSize: wp('3%'),
    color: '#888',
    textAlign: 'center',
    marginTop: hp('1%'),
  },
});