import { StyleSheet } from 'react-native';
import { responsiveSize } from '../../utils/fontUtils';

const styles = StyleSheet.create({
  footer: {
    position: 'relative',
    marginTop:responsiveSize(10),
    bottom: responsiveSize(10),
    width: '100%',
    height: responsiveSize(20),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',

},
  copyrightText: {
    color: '#222',
    fontSize: responsiveSize(10),
    fontWeight: '500',
    textAlign: 'center',
    marginTop: responsiveSize(5),
  },
});

export default styles;
