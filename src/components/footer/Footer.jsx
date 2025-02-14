import React from 'react';
import { View, Text } from 'react-native';
import styles from './Footer.styles';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.copyrightText}>
        © {new Date().getFullYear()} Designed & Developed by OVA2 Consultants Pvt. Ltd.
      </Text>
    </View>
  );
};

export default Footer;
