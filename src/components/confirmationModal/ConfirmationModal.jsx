import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
} from 'react-native';
import { useTheme } from 'react-native-paper';
export const ConfirmationModal = ({
  visible,
  title = 'Confirm Action',
  message,
  icon,
  statusText,
  confirmText = 'CONFIRM',
  cancelText = 'CANCEL',
  onConfirm,
  onCancel,
  confirmButtonColor = '#4CAF50',
  cancelButtonColor = '#9E9E9E',
  isLoading = false,
  showStatus = false,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <Modal
      transparent={true}
      animationType="fade"
      supportedOrientations={['portrait', 'landscape']}
      visible={visible}
      onRequestClose={onCancel}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {icon && (
            <Image
              source={icon}
              style={styles.statusIcon}
              resizeMode="contain"
            />
          )}

          <Text style={styles.modalTitle}>{title}</Text>

          {message && <Text style={styles.messageText}>{message}</Text>}

          {showStatus && statusText && (
            <Text style={styles.statusText}>Current Status: {statusText}</Text>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: confirmButtonColor}]}
              onPress={onConfirm}
              disabled={isLoading}>
              <Text style={styles.buttonText}>{confirmText}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, {backgroundColor: cancelButtonColor}]}
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
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    statusIcon: {
      width: 60,
      height: 60,
      marginBottom: 16,
      tintColor: theme.colors.primary,
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
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default ConfirmationModal;
