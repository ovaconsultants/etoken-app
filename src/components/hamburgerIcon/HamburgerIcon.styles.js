import { StyleSheet } from 'react-native';
import { responsiveSize, getDeviceType } from '../../utils/fontUtils';

export const createStyles = (isLandscape, dimensions) => {
    const deviceType = getDeviceType();

    return StyleSheet.create({
        container: {


            marginTop: 6,
            ...(deviceType === 'TV' && { marginRight: responsiveSize(5) }),

        },
    });
}