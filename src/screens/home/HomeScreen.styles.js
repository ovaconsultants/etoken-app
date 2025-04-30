import { StyleSheet} from 'react-native';

export const createStyles = (isLandscape , dimensions) => { 
  const fontscale = (fontsize) => {
    if (isLandscape) {
      return fontsize * (dimensions.width / 640);
    }
    return fontsize * (dimensions.width / 360);
  }

  return  StyleSheet.create({
  container: {
    flex: 1,
    margin : 10,
    backgroundColor :' rgb(251, 251, 251)',
    gap : 5 ,
  },

  selectionContainer: {
    flex: isLandscape ? 0.7 : 0.5,
    flexDirection: 'row',
  },
  cardContainer: {
    flex: isLandscape ? 3 : 4,
    width : '100%',
  },
  buttonContainer: {
    flex: 0.5 ,
    justifyContent : 'center',
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
    borderRadius: 6,
    backgroundColor : 'rgba(236, 238, 255, 0.7)',
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
    fontSize: fontscale(14),
    fontWeight: '500',
    color: '#333',
    alignSelf: 'center',
    marginHorizontal: 8,
  },
  selectedOptionText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  optionDescription: {
    fontSize: fontscale(14),
    color: '#666',
    textAlign: 'center',
  },
  button: {
    flex: 1,
    marginVertical:  isLandscape ? 1 : 12,
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
    fontSize: fontscale(16),
    fontWeight: '600',
  },
});
}