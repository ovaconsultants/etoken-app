import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 6,
    minHeight: 1,
  },
  landscapeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '100%',
    marginBottom: 8,
  },
  landscapeCardWrapper: {
    width: '49.1%',
  },
});