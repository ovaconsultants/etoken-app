
import { StyleSheet } from 'react-native';
import { responsiveSize } from '../../utils/fontUtils';

export const createStyles = (isLandscape, dimensions) => {

    return StyleSheet.create({
        container: {
            marginLeft: 15,
            marginTop: 6,
            paddingRight: responsiveSize(5),
        },
    });
}