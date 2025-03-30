import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  searchContainer: {
    width: wp('95%'),
    alignSelf: 'center',
    marginBottom: hp('2%'),
    position: 'relative',
    zIndex: 100,
  },
  searchBox: {
    width: '100%',
    height: hp('6%'),
    fontSize: hp('2%'),
    color: '#333',
    backgroundColor: '#F0F0F0',
    borderRadius: hp('3%'),
    paddingHorizontal: wp('4%'),
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
  },
  dropdown: {
    position: 'absolute',
    top: hp('6.5%'),
    left: 0,
    width: '100%',
    backgroundColor: 'white',
    maxHeight: hp('50%'),
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: hp('1%'),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  dropdownItem: {
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemText: {
    fontSize: hp('2%'),
    color: '#333',
  },
});

export default styles;
