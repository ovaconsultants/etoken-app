import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from 'react-native-paper';

const ConfirmationModal = ({
  visible,
  title = 'Confirm Action',
  messageParts = [], // Array of message parts with formatting info
  actionType = 'neutral', // 'positive', 'negative', or 'neutral'
  confirmText = 'CONFIRM',
  cancelText = 'CANCEL',
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme, actionType);

  // Determine colors based on action type
  const getColors = () => {
    switch (actionType) {
      case 'positive':
        return {
          confirmColor: '#4CAF50', // Green
          highlightColor: '#2E7D32', // Dark green
          titleColor: '#2E7D32',
        };
      case 'negative':
        return {
          confirmColor: '#D32F2F', // Red
          highlightColor: '#D32F2F',
          titleColor: '#D32F2F',
        };
      default: // neutral
        return {
          confirmColor: '#2196F3', // Blue
          highlightColor: '#0D47A1', // Dark blue
          titleColor: theme.colors.text,
        };
    }
  };

  const colors = getColors();

  const renderMessage = () => {
    return (
      <Text style={styles.messageText}>
        {messageParts.map((part, index) => {
          if (part.highlight) {
            return (
              <Text key={index} style={[styles.highlightText, { color: colors.highlightColor }]}>
                {part.text}
              </Text>
            );
          }
          return (
            <Text key={index} style={styles.normalText}>
              {part.text}
            </Text>
          );
        })}
      </Text>
    );
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onCancel}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={[styles.modalTitle, { color: colors.titleColor }]}>
            {title}
          </Text>

          {messageParts.length > 0 && renderMessage()}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: colors.confirmColor },
                isLoading && styles.disabledButton,
              ]}
              onPress={onConfirm}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>{confirmText}</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: '#9E9E9E' },
                isLoading && styles.disabledButton,
              ]}
              onPress={onCancel}
              disabled={isLoading}>
              <Text style={styles.buttonText}>{cancelText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (theme, actionType) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContainer: {
      width: '85%',
      backgroundColor: theme.colors.background,
      borderRadius: 16,
      padding: 24,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 10,
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
    },
    messageText: {
      fontSize: 18,
      marginBottom: 24,
      lineHeight: 26,
      textAlign: 'center',
    },
    normalText: {
      color: theme.colors.text,
    },
    highlightText: {
      fontWeight: 'bold',
    },
    buttonContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    button: {
      flex: 1,
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 6,
    },
    disabledButton: {
      opacity: 0.6,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default ConfirmationModal;