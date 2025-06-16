import { StyleSheet } from 'react-native';
import { responsiveSize } from '../../utils/fontUtils';

const styles = StyleSheet.create({
  footer: {
    position: 'relative',
    bottom: responsiveSize(8),
    width: '100%',
    height: responsiveSize(15),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',

},
  copyrightText: {
    color: '#222',
    fontSize: responsiveSize(10),
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default styles;
