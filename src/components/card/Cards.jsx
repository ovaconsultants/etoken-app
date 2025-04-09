import React, { useRef, useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet, Animated, View } from 'react-native';
import { useWindowDimensions } from 'react-native';

const Card = ({ title, description, isSelected, onPress, state, cardWidth }) => {
  const styles = useStyles();
  const scaleValue = useRef(new Animated.Value(1)).current;
  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: isSelected ? 1.03 : 1,
        tension: 100,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(borderAnim, {
        toValue: isSelected ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      })
    ]).start();
  }, [borderAnim, isSelected, scaleValue]);

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255,255,255,0)', '#6200ee']
  });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Animated.View
        style={[
          styles.card,
          { 
            width: cardWidth, 
            transform: [{ scale: scaleValue }] 
          },
        ]}
      >
        <Animated.View style={[styles.borderHighlight, { borderColor }]} />
        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.title}>{title}</Text>

          {/* Description */}
          <Text style={styles.description}>{description}</Text>

          {/* Status Badge */}
          <View>
            <Text style={styles.stateText}>{state}</Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const useStyles = () => {
  const { width , height } = useWindowDimensions();
  const isSmallDevice = width < 375;
  const isLandscapeMode = width > height ;

  return StyleSheet.create({
    card: {
      backgroundColor: 'rgba(217, 223, 249, 0.9)',
      borderRadius: 16,
      padding: isSmallDevice ? 12 : 16,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 5,
      position: 'relative',
      overflow: 'hidden',
      marginBottom: 16,
      height:  isLandscapeMode ? 120 : 250,
    },
    borderHighlight: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderWidth: 2,
      borderRadius: 16,
    },
    content: {
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'left',
      width: '100%',
      padding: isSmallDevice ? 12 : 16,
    },
    title: {
      fontSize: isSmallDevice ? 22 : 26, 
      fontWeight: 'bold',
      color: '#1E293B',
      textAlign: 'left',
      marginBottom: 8,
      letterSpacing: 0.5,
    },
    description: {
      alignSelf: 'flex-start',
      fontSize: isSmallDevice ? 15 : 17,
      color: '#4A5568',
      textAlign: 'left',
      lineHeight: isSmallDevice ? 22 : 24,
      marginBottom: 12,
      fontWeight: '500',
      letterSpacing: 0.3,
    },
    stateBadge: {
      paddingHorizontal: 14,
      borderRadius: 12,
      marginTop: 10,
    },
    stateText: {
      fontSize: isSmallDevice ? 13 : 15,
      fontWeight: '500',
      color: '#718096',
      textTransform: 'none',
      textAlign : 'left',
      letterSpacing: 0.3,
    },
  });
};

export default Card;
