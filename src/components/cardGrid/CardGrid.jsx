import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Card from '../card/Cards';
import { styles } from './CardGrid.styles';

const CardGrid = ({data, onPress, isSelectedCard, isLandscape}) => {
  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        isLandscape && styles.landscapeContainer,
      ]}
      style={styles.scrollView}>
      {data.map(item => (
        <View
          key={item.id.toString()}
          style={[
            styles.cardWrapper,
            isLandscape && styles.landscapeCardWrapper,
            {flexGrow: 1},
          ]}>
          <Card
            title={item.title || 'No Title'}
            description={item.description || 'No Description'}
            state={item.state || 'No Status'}
            isSelected={isSelectedCard === item.id}
            onPress={() => onPress(item.id)}
            cardWidth="100%"
          />
        </View>
      ))}
    </ScrollView>
  );
};
export default CardGrid;
