import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', //F8F9FA
  },
  profileContainer: {
    // justifyContent: 'cent',
    // alignItems: 'center',
    position: 'absolute',
    top: Platform.OS === 'ios' ? height * 0.02 : height * 0.02,
    right: width * 0.05,
    height: height * 0.07,
    width: height * 0.08,
    zIndex: 10,
    backgroundColor: 'white',
    borderRadius: height * 0.05,
    padding: width * 0.01,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: height * 0.03,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.12,
  },
  card: {
    width: width * 0.9,
    height: height * 0.6,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: width * 0.05,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    fontSize: width * 0.05,
    color: '#333',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.02,
    borderRadius: 10,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: width * 0.04,
    fontWeight: '600',
  },
});