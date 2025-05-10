import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Animated,
} from 'react-native';
import { styles } from './TokenListingTVScreen.styles';
import { TranslateNameToHindi } from '../../services/langTranslationService';

const SCROLL_SPEED = 0.2; // pixels per interval

export const TokenTable = ({ tokens }) => {
  console.log('tokens', tokens);
  const [processedTokens, setProcessedTokens] = useState([]);
  const flatListRef = useRef(null);
  const contentHeight = useRef(0);
  const listHeight = useRef(0);
  const scrollDirection = useRef(1); // 1 for down, -1 for up

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
 console.log('data', data);
  // Auto-scroll logic with Animated
  useEffect(() => {
    if (data.length === 0) return;

    let currentOffset = 0;
    let animationFrameId;

    const animateScroll = () => {
      // Calculate if we need to reverse direction
      if (currentOffset >= contentHeight.current - listHeight.current) {
        scrollDirection.current = -1; // Reverse to scroll up
      } else if (currentOffset <= 0) {
        scrollDirection.current = 1; // Reverse to scroll down
      }

      // Update current offset
      currentOffset += scrollDirection.current * SCROLL_SPEED;
      
      // Apply the scroll
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({
          offset: currentOffset,
          animated: false
        });
      }

      // Continue animation
      animationFrameId = requestAnimationFrame(animateScroll);
    };

    // Start animation
    animationFrameId = requestAnimationFrame(animateScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [data]);

  // Measure content dimensions
  const handleContentSizeChange = (w, h) => {
    contentHeight.current = h;
  };

  const handleLayout = (event) => {
    listHeight.current = event.nativeEvent.layout.height;
  };

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

      {/* Animated FlatList */}
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item, index) => `${item.token_id}-${index}`}
        renderItem={renderItem}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={handleContentSizeChange}
        onLayout={handleLayout}
      />
    </View>
  );
};

// Style helpers remain the same
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