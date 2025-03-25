import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './TokenManagementTVScreen.styles';

export const TokenTable = ({ tokens }) => {
  const getRowStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'in progress': return { backgroundColor: '#f3faf5', borderLeftWidth: 4, borderLeftColor: '#2e7d32' };
      case 'waiting': return { backgroundColor: '#fffbf2' };
      case 'on hold': return { backgroundColor: '#fff5f5', borderLeftWidth: 4, borderLeftColor: '#d32f2f' };
      default: return {};
    }
  };

  const getStatusDot = (status) => {
    switch (status?.toLowerCase()) {
      case 'in progress': return <View style={[styles.dot, styles.green]} />;
      case 'waiting': return <View style={[styles.dot, styles.orange]} />;
      case 'on hold': return <View style={[styles.dot, styles.red]} />;
      default: return null;
    }
  };

  return (
    <View style={styles.tableContainer}>
      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, styles.patientCell]}>Patient</Text>
        <Text style={styles.tableHeaderText}>Phone</Text>
        <Text style={styles.tableHeaderText}>Payment</Text>
        <Text style={styles.tableHeaderText}>Status</Text>
        <Text style={styles.tableHeaderText}>Token</Text>
      </View>

      {/* Table Rows */}
      {tokens.map((token) => (
        <View key={token.token_id} style={[styles.tableRow, getRowStyle(token.status)]}>
          <View style={[styles.tableCell, styles.patientCell]}>
            <Text>{token.patient_name}</Text>
            {token.hindi_name && (
              <Text style={styles.hindi}>{token.hindi_name}</Text>
            )}
          </View>
          <Text style={styles.tableCell}>
            {token.mobile_number?.replace(/(\d{3})(\d{3})(\d{4})/, 'xxx-xxx-$3')}
          </Text>
          <Text style={styles.tableCell}>
            {token.fee_status || 'Not Paid'}
          </Text>
          <View style={[styles.tableCell, styles.statusCell]}>
            {getStatusDot(token.status)}
            <Text>{token.status}</Text>
          </View>
          <Text style={styles.tableCell}>
            {token.token_no}
          </Text>
        </View>
      ))}
    </View>
  );
};