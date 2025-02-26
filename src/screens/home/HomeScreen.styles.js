import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8F9FA',
    },
    profileContainer: {
        justifyContent: 'center', // Center vertically
        alignItems: 'flex-end', // Align items to the right
        position: 'relative',
        height: height * 0.002, // Reduced height
        zIndex: 10,
        backgroundColor: 'white',
        borderRadius: 40, // Rounded edges
        padding: 2, // Reduced padding
        paddingRight: 10, // Ensure spacing from the right edge
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.12,
        shadowRadius: 1.5,
        elevation: 4, // Subtle depth effect on Android
      },
    profileImage: {
      width: 20, // Small profile size
      height: 20,
      borderRadius: 10, // Keeps it circular
      borderWidth: 0.6,
      borderColor: '#ccc', // Light border for smooth effect
    },
    cardContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: width * 0.05,
      paddingTop: height * 0.08, // Enough space for profile icon
    },
  });
