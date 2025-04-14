import { StyleSheet} from 'react-native';

export const createStyles = (isLandscape , dimensions) => { 
  return  StyleSheet.create({
  container: {
    flex: 1,
    margin : 10,
    backgroundColor :' rgb(240, 240, 246)',
  },

  selectionContainer: {
    flex: isLandscape ? 0.7 : 0.5,
    flexDirection: 'row',
  },
  cardContainer: {

    flex: isLandscape ? 3 : 4,
    width : '100%',
    marginVertical : isLandscape ? 5 : 10,
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
    backgroundColor : 'rgba(217, 223, 249, 0.9)',
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
    flex: 1,
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
    fontSize: 16,
    fontWeight: '600',
  },
});
}