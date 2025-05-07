import {StyleSheet, Platform} from 'react-native';
export const createStyles = (isLandscape, dimensions) => {
  const {width, height} = dimensions;

  // Base spacing units (scaled by screen density)
  const spacing = {
    xs: Math.min(width, height) * 0.01,
    sm: Math.min(width, height) * 0.02,
    md: Math.min(width, height) * 0.03,
    lg: Math.min(width, height) * 0.04,
    xl: Math.min(width, height) * 0.05,
  };

  // Responsive font scaling
  const fontScale = Math.min(width, height) / 400;
  const fontSize = {
    small: Math.max(12, 14 * fontScale),
    medium: Math.max(14, 16 * fontScale),
    large: Math.max(16, 18 * fontScale),
  };

  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.xl,
      gap : spacing.lg,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    formRow: {
      width: '100%',
      marginBottom: spacing.md,
    },
    label: {
      marginBottom: spacing.xs,
      fontSize: fontSize.medium,
      fontWeight: '600',
      color: '#333',
    },
    inputWrapper: {
      width: '100%',
    },
    input: {
      width: '100%',
      height: isLandscape ? spacing.xl * 2 : spacing.xl * 2.5,
      paddingHorizontal: spacing.md,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: spacing.sm,
      backgroundColor: '#fff',
      fontSize: fontSize.medium,
    },
    dropdown: {
      width: '100%',
      height: isLandscape ? spacing.xl * 2 : spacing.xl * 2.5,
      paddingHorizontal: spacing.md,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: spacing.sm,
      backgroundColor: '#fff',
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.1,
          shadowRadius: 2,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    disabled: {
      opacity: 0.6,
    },
    errorBorder: {
      borderColor: '#ff3b30',
    },

    button: {
      width: '100%',
      height: isLandscape ? spacing.xl * 2 : spacing.xl * 2.5,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: isLandscape ? 0 : spacing.lg,
      backgroundColor: '#007AFF',
      padding: isLandscape ? 5 : 15,
      borderRadius: 8,

    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    footerText: {
      marginTop: spacing.lg,
      textAlign: 'center',
      fontSize: fontSize.medium,
    },
    linkText: {
      color: '#007AFF',
      fontWeight: '600',
    },
    buttonDisabled: { 
      backgroundColor: '#add8e6',},
    errorInput: {
      borderColor: '#ff3b30',
    },
  });
};
