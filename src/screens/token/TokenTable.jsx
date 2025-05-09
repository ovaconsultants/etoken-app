import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';
import { styles } from './TokenListingTVScreen.styles';
import { TranslateNameToHindi } from '../../services/langTranslationService';

const SCROLL_DURATION = 100;

export const TokenTable = ({ tokens }) => {
  const [processedTokens, setProcessedTokens] = useState([]);
  // const scrollY = useRef(new Animated.Value(0)).current;
  const listRef = useRef(null);

  useEffect(() => {
    const processTokens = async () => {
      const updatedTokens = await Promise.all(
        tokens.map(async token => {
          if (!token.hindi_name && token.patient_name) {
            try {
              const hindiName = await TranslateNameToHindi(token.patient_name);
              return { ...token, hindi_name: hindiName };
            } catch {
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

  const data = processedTokens.length ? processedTokens : tokens;
  const infiniteData = [...data, ...data]; // for loop illusion

  // Auto-scroll logic
  useEffect(() => {
    let offset = 0;
    const interval = setInterval(() => {
      offset += 1;
      if (listRef.current) {
        listRef.current.scrollToOffset({ offset, animated: false });
      }
      // Reset offset when halfway scrolled
      if (offset > data.length * 90) {
        offset = 0;
      }
    }, SCROLL_DURATION);
    return () => clearInterval(interval);
  }, [data]);

  const renderItem = ({ item }) => (
    <View style={[styles.tableRow, getRowStyle(item.status)]}>
      <View style={[styles.tableCell]}>
        <Text>{item.patient_name}</Text>
        {item.hindi_name && (
          <Text style={styles.hindi}>{item.hindi_name}</Text>
        )}
      </View>
      <Text style={styles.tableCell}>
        {item.mobile_number?.replace(
          /(\d{3})(\d{3})(\d{4})/,
          'xxx-xxx-$3',
        )}
      </Text>
      <Text style={styles.tableCell}>{item.fee_status || 'Not Paid'}</Text>
      <Text style={styles.tableCell}>
        {item.emegency === 'Y' ? 'Yes' : 'No'}
      </Text>
      <View style={[styles.tableCell, styles.statusCell]}>
        {getStatusDot(item.status)}
        <Text>{item.status}</Text>
      </View>
      <Text style={styles.tableCell}>{item.token_no}</Text>
    </View>
  );

  return (
    <View style={styles.tableContainer}>
      {/* Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText]}>Patient</Text>
        <Text style={styles.tableHeaderText}>Phone</Text>
        <Text style={styles.tableHeaderText}>Payment</Text>
        <Text style={styles.tableHeaderText}>Emergency</Text>
        <Text style={styles.tableHeaderText}>Status</Text>
        <Text style={styles.tableHeaderText}>Token</Text>
      </View>

      {/* FlatList with scrollToOffset looping */}
      <FlatList
        ref={listRef}
        data={infiniteData}
        keyExtractor={(item, index) => `${item.token_id}-${index}`}
        renderItem={renderItem}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

// Reuse your style helpers
const getRowStyle = status => {
  switch (status?.toLowerCase()) {
    case 'in progress':
      return {
        backgroundColor: '#f3faf5',
        borderLeftWidth: 4,
        borderLeftColor: '#2e7d32',
      };
    case 'waiting':
      return { backgroundColor: '#fffbf2' };
    case 'on hold':
      return {
        backgroundColor: '#fff5f5',
        borderLeftWidth: 4,
        borderLeftColor: '#d32f2f',
      };
    case 'cancelled':
      return { backgroundColor: '#f3f4f6' };
    case 'completed':
      return { backgroundColor: '#e8f5e9' };
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
