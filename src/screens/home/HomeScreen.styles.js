import { StyleSheet} from 'react-native';
import { fontSize } from '../../utils/fontUtils';

export const createStyles = (isLandscape , dimensions) => { 
  const fontscale = (fontsize) => {
    if (isLandscape) {
      return fontsize * (dimensions.width / 640);
    }
    return fontsize * (dimensions.width / 300);
  }
  const marginscale = (margin) => {
    if (isLandscape) {
      return margin * (dimensions.width / 640);
    }
    return margin * (dimensions.width / 300);
  }

  return  StyleSheet.create({
  container: {
    flex: 1,
    margin :  marginscale(5),
    backgroundColor :' rgb(251, 251, 251)',
    gap : 5 ,
    marginTop :  marginscale(0),
  },

  selectionContainer: {
    flex: isLandscape ? 0.7 : 0.5,
    flexDirection: 'row',
  },
  cardContainer: {
    flex: isLandscape ? 3 : 4,
    width: '100%',
    minHeight: 0,
  },
  buttonContainer: {
    flex:  isLandscape ? 0.5 : 0.7 ,
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
   selectedIconColor: {
      color: '#007AFF',
    },
    unselectedIconColor: {
      color: '#333',
    },
  optionText: {
    fontSize: fontscale(16),
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
    fontSize: fontscale(16),
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
    fontSize: fontSize(18), // Use utility
    fontWeight: '600',
  },
  // Handling Empty Clinic Case 
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  addClinicButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    backgroundColor: 'white',
  },
  addClinicText: {
    color: '#007AFF',
    fontSize: 16,
    marginLeft: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    marginBottom: marginscale(16),
    marginTop: marginscale(16),
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: marginscale(10),
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    minWidth: 0,
    height: marginscale(40),
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    marginLeft: marginscale(8),
    fontSize:
      isLandscape && dimensions.width > 700
        ? fontSize(13) // smaller in landscape on tablet
        : fontSize(18),
    color: '#888',
    fontWeight: '500',
    flexShrink: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});
}