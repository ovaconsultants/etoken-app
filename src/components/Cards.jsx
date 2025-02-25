// components/Card.js
import React, { useRef, useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useWindowDimensions } from 'react-native';

const Card = ({ title, description, isSelected, onPress,state, cardWidth }) => {
  const styles = useStyles();
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: isSelected ? 1.05 : 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  }, [isSelected, scaleValue]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Animated.View
        style={[
          styles.card,
          { width: cardWidth, height: cardWidth * 0.75, transform: [{ scale: scaleValue }] },
          isSelected && styles.selectedCard,
        ]}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.title}>{state}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const useStyles = () => {
  const { width } = useWindowDimensions();
  const isSmallDevice = width < 375;

  return StyleSheet.create({
    card: {
      backgroundColor: '#fff',
      borderRadius: isSmallDevice ? 4 : 6,
      padding: isSmallDevice ? 8 : 12,
      margin: isSmallDevice ? 4 : 6,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3, // for Android
    },
    selectedCard: {
      borderColor: '#6200ee',
      borderWidth: isSmallDevice ? 1 : 2,
    },
    title: {
      fontSize: isSmallDevice ? 14 : 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    description: {
      fontSize: isSmallDevice ? 12 : 14,
      color: '#666',
      marginTop: isSmallDevice ? 2 : 4,
      textAlign: 'center',
    },
  });
};



export default Card;


