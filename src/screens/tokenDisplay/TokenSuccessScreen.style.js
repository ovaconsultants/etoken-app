import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(93, 101, 208)',
  },
  contentWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  circleContainer: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 12,
  },
  glow: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  tokenText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});
