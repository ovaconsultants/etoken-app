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
import { Check } from 'lucide-react-native';

export const ConfirmationModal = ({
  visible,
  title = 'Confirm Action',
  message,
  statusText,
  confirmText = 'CONFIRM',
  cancelText = 'CANCEL',
  onConfirm,
  onCancel,
  confirmButtonColor = '#4CAF50',
  cancelButtonColor = '#9E9E9E',
  isLoading = false,
  showStatus = false,
  paymentStatus,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  // Determine button configuration based on payment status
  const getButtonConfig = () => {
    if (paymentStatus === 'Not Paid') {
      return {
        confirmText: 'YES',
        cancelText: 'CANCEL',
        confirmColor: '#4CAF50',
      };
    } else if (paymentStatus === 'paid') {
      return {
        confirmText: 'YES',
        cancelText: 'NO',
        confirmColor: '#FF5252' ,
      };
    }
    return {
      confirmText,
      cancelText,
      confirmColor: confirmButtonColor,
    };
  };

  const buttonConfig = getButtonConfig();

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onCancel}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {paymentStatus === 'Not Paid' && (
            <View style={styles.statusIcon}>
              <Check size={60} color="#4CAF50" />
            </View>
          )}

          <Text style={styles.modalTitle}>{title}</Text>

          {message && <Text style={styles.messageText}>{message}</Text>}

          {showStatus && statusText && (
            <Text style={[
              styles.statusText,
              paymentStatus === 'paid' && styles.paidStatusText
            ]}>
              Current Status: {statusText}
            </Text>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: buttonConfig.confirmColor },
                isLoading && styles.disabledButton,
              ]}
              onPress={onConfirm}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>{buttonConfig.confirmText}</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: cancelButtonColor },
                isLoading && styles.disabledButton,
              ]}
              onPress={onCancel}
              disabled={isLoading}>
              <Text style={styles.buttonText}>{buttonConfig.cancelText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      width: '80%',
      backgroundColor: theme.colors.background,
      borderRadius: 12,
      padding: 24,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    statusIcon: {
      marginBottom: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
      color: theme.colors.text,
      textAlign: 'center',
    },
    messageText: {
      fontSize: 16,
      marginBottom: 16,
      color: theme.colors.text,
      textAlign: 'center',
    },
    statusText: {
      fontSize: 16,
      marginBottom: 24,
      color: theme.colors.secondaryText,
      textAlign: 'center',
    },
    paidStatusText: {
      color: '#4CAF50',
      fontWeight: 'bold',
    },
    buttonContainer: {
      width: '100%',
      gap: 12,
    },
    button: {
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
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