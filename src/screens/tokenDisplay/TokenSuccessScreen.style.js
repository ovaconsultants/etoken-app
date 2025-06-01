import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderColor: 'blue',
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
  },
  tokenText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: 'rgba(93, 0, 255, 0.3)',
    textAlign: 'center',
    textShadowColor: 'rgba(135, 0, 254, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});
