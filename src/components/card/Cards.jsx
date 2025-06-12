import React, {useRef, useEffect} from 'react';
import {Text, TouchableOpacity, Animated, View} from 'react-native';
import {fontSize} from '../../utils/fontUtils';
import {getCardStyles} from './Cards.styles';

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

  const styles = getCardStyles(deviceType, isLandscape, cardWidth);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Animated.View style={styles.cardContainer}>
        <Animated.View
          style={[
            styles.animatedBorder,
            {borderColor},
          ]}
        />
        <View style={{width: '100%'}}>
          <Text
            style={styles.title}
            numberOfLines={1}
            ellipsizeMode="tail">
            {title}
          </Text>
          <Text
            style={styles.description}
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
