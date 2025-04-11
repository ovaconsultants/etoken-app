import { StyleSheet} from 'react-native';

export const createStyles = (isLandscape , dimensions) => { 
  console.log('dimensions', dimensions);
  const height = dimensions.height;
  const verticalScale = (size) => Math.round((height / 812) * size);
  return  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(240, 240, 246)',
    gap: 12,
  },
  cardContainer: {
    flex: 3,
    height: isLandscape ? verticalScale(135) : verticalScale(270),
    marginBottom: verticalScale(18),
  },
  selectionContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: verticalScale(24),
  },
  buttonContainer: {
    flex: 1,
    justifyContent : 'flex-end',
  },
  optionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    flex: 2,
    marginHorizontal: 4,
    padding: 6,
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#FFF',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedOption: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F7FF',
  },
  optionContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  optionText: {
    fontSize: isLandscape ? 16 : 20,
    fontWeight: '500',
    color: '#333',
    marginTop: 6,
    marginHorizontal: isLandscape ? 0 : 8,
    marginBottom: 3,
  },
  selectedOptionText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    flex:  isLandscape ?   0.6 : 0.5,
    marginVertical:  isLandscape ? 0 : 12,
    marginHorizontal: 4,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontSize: isLandscape ? 18 : 24,
    fontWeight: '600',
  },
});
}