import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('2%'), // 2% of screen height
    paddingHorizontal: wp('5%'), // 5% of screen width
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  headerText: {
    fontSize: wp('1%'), // 1% of screen width
    color: '#000',
    fontWeight: '500',
  },
  initialsCircle: {
    width: wp('8%'), // 8% of screen width
    height: wp('8%'), // 8% of screen width
    borderRadius: wp('5%'), // 5% of screen width
    backgroundColor: '#FFE3E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorInitials: {
    fontSize: wp('2%'), // 2% of screen width
    fontWeight: 'bold',
    color: '#333',
  },
  detailsContainer: {
    alignItems: 'center',
    paddingVertical: hp('2%'), // 2% of screen height
  },
  doctorName: {
    fontSize: wp('8%'), // 3% of screen width
    color: '#222',
    fontWeight: 'bold',
  },
  clinicName: {
    fontSize: wp('5%'), // 3% of screen width
    fontWeight: '600',
    color: '#444',
    marginTop: hp('1%'), // 1% of screen height
  },
  clinicInfo: {
    flex: 1,
    fontSize: wp('1%'), // 1% of screen width
    color: '#666',
    marginTop: hp('1%'), // 1% of screen height
  },
  doctorSection: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  doctorImage: {
    margin: hp('1%'),
    width: wp('40%'), // 30% of screen width
    height: hp('28%'), // 50% of screen height
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
    margin: hp('2%'), 
    position: 'absolute',
    bottom: 0, 
    alignItems: 'flex-start',
  },
  footerDetails: {
    fontSize: wp('3%'), 
    color: '#000',
    textAlign: 'flex-start',
    fontWeight: '500',
  },
  footerNote: {
    fontSize: wp('1%'), // 1% of screen width
    color: '#888',
    textAlign: 'center',
    marginTop: hp('1%'), // 1% of screen height
  },
});
