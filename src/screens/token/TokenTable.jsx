import React, {useEffect, useRef, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {styles} from './TokenListingTVScreen.styles';
import {TranslateNameToHindi} from '../../services/langTranslationService';

const SCROLL_DURATION = 30000; // 30 seconds for full scroll
const PAUSE_DURATION = 2000; // 2 second pause at bottom

const TokenTable = ({tokens}) => {
  const scrollViewRef = useRef(null);
  const [processedTokens, setProcessedTokens] = useState([]);
  const [contentHeight, setContentHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const timeout = useRef(null);
  const isMounted = useRef(false);

  // Process tokens data
  useEffect(() => {
    const processTokens = async () => {
      const updatedTokens = await Promise.all(
        tokens.map(async token => {
          if (!token.hindi_name && token.patient_name) {
            try {
              const hindiName = await TranslateNameToHindi(token.patient_name);
              return {...token, hindi_name: hindiName};
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
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, [tokens]);

  const data = processedTokens.length ? processedTokens : tokens;

  // Auto-scroll logic with improved measurement handling
  useEffect(() => {
    if (
      !isMounted.current ||
      !data.length ||
      contentHeight <= 0 ||
      containerHeight <= 0
    ) {
      return;
    }

    const scrollDistance = contentHeight - containerHeight;

    if (scrollDistance <= 0) {
      console.log(
        'Not enough content to scroll. Content height:',
        contentHeight,
        'Container height:',
        containerHeight,
      );
      return;
    }

    console.log('Starting animation with scroll distance:', scrollDistance);

    let start = null;
    const duration = SCROLL_DURATION;
    let animationFrame = null;

    const step = timestamp => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);
      const y = scrollDistance * percentage;

      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({x: 0, y, animated: false});
      }

      if (progress < duration && isMounted.current) {
        animationFrame = requestAnimationFrame(step);
      } else if (isMounted.current) {
        // Pause at bottom before restarting
        timeout.current = setTimeout(() => {
          if (isMounted.current) {
            start = null;
            scrollViewRef.current.scrollTo({x: 0, y: 0, animated: false});
            animationFrame = requestAnimationFrame(step);
          }
        }, PAUSE_DURATION);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => {
      if (animationFrame) {cancelAnimationFrame(animationFrame);}
      if (timeout.current) {clearTimeout(timeout.current);}
    };
  }, [data, contentHeight, containerHeight]);

  // Improved measurement handling
  const handleContentSizeChange = (w, h) => {
    if (h !== contentHeight) {
      console.log('Content height updated:', h);
      setContentHeight(h);
    }
  };

  const handleLayout = e => {
    const height = e.nativeEvent.layout.height;
    if (height !== containerHeight) {
      console.log('Container height updated:', height);
      setContainerHeight(height);
    }
  };

  const renderItem = (item, index) => (
    <View
      key={`${item.token_id}-${index}`}
      style={[styles.tableRow, getRowStyle(item.status)]}>
      <View style={styles.tableCell}>
        <Text>{item.patient_name}</Text>
      </View>
      <Text style={styles.tableCell}>
        {item.mobile_number?.replace(/(\d{3})(\d{3})(\d{4})/, 'xxx-xxx-$3')}
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
    <View style={[styles.tableContainer, {flex: 1}]}>
      {/* Fixed Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Patient</Text>
        <Text style={styles.tableHeaderText}>Phone</Text>
        <Text style={styles.tableHeaderText}>Payment</Text>
        <Text style={styles.tableHeaderText}>Emergency</Text>
        <Text style={styles.tableHeaderText}>Status</Text>
        <Text style={styles.tableHeaderText}>Token</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        ref={scrollViewRef}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={handleContentSizeChange}
        onLayout={handleLayout}
        bounces={false}
        style={{flex: 1}}>
        {data.map(renderItem)}
        {/* Add extra space to ensure proper scrolling */}
        <View style={{height: 20}} />
      </ScrollView>
    </View>
  );
};

// Style helpers
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

export default TokenTable;