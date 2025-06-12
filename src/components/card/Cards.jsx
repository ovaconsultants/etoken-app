import React, {useRef, useEffect} from 'react';
import {Text, TouchableOpacity, StyleSheet, Animated, View, useWindowDimensions} from 'react-native';
import {fontSize} from '../../utils/fontUtils';

const Card = ({
  title,
  description,
  isSelected,
  onPress,
  state,
  cardWidth,
  deviceType = 'Mobile',
  isLandscape = false,
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: isSelected ? 1.01 : 1,
        tension: 100,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(borderAnim, {
        toValue: isSelected ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [borderAnim, isSelected, scaleValue]);

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255,255,255,0)', '#007AFF'],
  });

  // Responsive font and padding
  const baseFont = deviceType === 'Tablet' ? 22 : 18;
  const descFont = deviceType === 'Tablet' ? 18 : 15;
  const cardPad = deviceType === 'Tablet' ? (isLandscape ? 20 : 18) : 14;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Animated.View
        style={[
          {
            backgroundColor: 'rgba(236, 238, 255, 0.7)',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'flex-start',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 4},
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 5,
            position: 'relative',
            overflow: 'hidden',
            marginBottom: 10,
            width: cardWidth,
            padding: cardPad,
          },
        ]}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderWidth: 2,
            borderRadius: 10,
            borderColor,
          }}
        />
        <View style={{width: '100%'}}>
          <Text
            style={{
              fontSize: fontSize(baseFont),
              fontWeight: 'bold',
              color: '#1E293B',
              textAlign: 'left',
              marginBottom: 6,
              letterSpacing: 0.5,
              alignSelf: 'flex-start',
            }}
            numberOfLines={1}
            ellipsizeMode="tail">
            {title}
          </Text>
          <Text
            style={{
              fontSize: fontSize(descFont),
              color: '#555',
              textAlign: 'left',
              lineHeight: fontSize(descFont + 6),
              marginBottom: 8,
              fontWeight: '500',
              letterSpacing: 0.3,
              alignSelf: 'flex-start',
            }}
            numberOfLines={2}
            ellipsizeMode="tail">
            {description} - {state}
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Card;
