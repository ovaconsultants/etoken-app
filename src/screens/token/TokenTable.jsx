import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {styles} from './TokenListingTVScreen.styles';
import {TranslateNameToHindi} from '../../services/langTranslationService';
export const TokenTable = ({tokens}) => {
  const [processedTokens, setProcessedTokens] = useState([]);

  useEffect(() => {
    const processTokens = async () => {
      const updatedTokens = await Promise.all(
        tokens.map(async token => {
          // Only translate if hindi_name doesn't exist
          if (!token.hindi_name && token.patient_name) {
            try {
              const hindiName = await TranslateNameToHindi(token.patient_name);
              return {...token, hindi_name: hindiName};
            } catch (error) {
              return token;
            }
          }
          return token;
        }),
      );
      setProcessedTokens(updatedTokens);
    };

    processTokens();
  }, [tokens]);

  const getRowStyle = status => {
    switch (status?.toLowerCase()) {
      case 'in progress':
        return {
          backgroundColor: '#f3faf5',
          borderLeftWidth: 4,
          borderLeftColor: '#2e7d32',
        };
      case 'waiting':
        return {backgroundColor: '#fffbf2'};
      case 'on hold':
        return {
          backgroundColor: '#fff5f5',
          borderLeftWidth: 4,
          borderLeftColor: '#d32f2f',
        };
      case 'cancelled':
        return {backgroundColor: '#f3f4f6'};
      case 'completed':
        return {backgroundColor: '#e8f5e9'};
      default:
        return {};
    }
  };

  const getStatusDot = status => {
    switch (status?.toLowerCase()) {
      case 'in progress':
        return <View style={[styles.dot, styles.greenDot]} />;
      case 'waiting':
        return <View style={[styles.dot, styles.yellowDot]} />;
      case 'on hold':
        return <View style={[styles.dot, styles.orangeDot]} />;
      case 'cancelled':
        return <View style={[styles.dot, styles.red]} />;
      case 'completed':
        return <View style={[styles.dot, styles.blueDot]} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.tableContainer}>
      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText]}>Patient</Text>
        <Text style={styles.tableHeaderText}>Phone</Text>
        <Text style={styles.tableHeaderText}>Payment</Text>
        <Text style={styles.tableHeaderText}>Emergency</Text>
        <Text style={styles.tableHeaderText}>Status</Text>
        <Text style={styles.tableHeaderText}>Token</Text>
      </View>

      {/* Table Rows */}
      <ScrollView>
        {(processedTokens.length > 0 ? processedTokens : tokens).map(token => (
          <View
            key={token.token_id}
            style={[styles.tableRow, getRowStyle(token.status)]}>
            <View style={[styles.tableCell]}>
              <Text>{token.patient_name}</Text>
              {token.hindi_name && (
                <Text style={styles.hindi}>{token.hindi_name}</Text>
              )}
            </View>
            <Text style={styles.tableCell}>
              {token.mobile_number?.replace(
                /(\d{3})(\d{3})(\d{4})/,
                'xxx-xxx-$3',
              )}
            </Text>
            <Text style={styles.tableCell}>
              {token.fee_status || 'Not Paid'}
            </Text>
            <Text style={styles.tableCell}>
              {token.emegency === 'Y' ? 'Yes' : 'No'}
            </Text>
            <View style={[styles.tableCell, styles.statusCell]}>
              {getStatusDot(token.status)}
              <Text>{token.status}</Text>
            </View>
            <Text style={styles.tableCell}>{token.token_no}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
