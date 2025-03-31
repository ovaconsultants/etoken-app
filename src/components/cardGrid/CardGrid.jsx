// components/CardGrid.js
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Card from '../card/Cards';

const CardGrid = ({data, onPress, isSelectedCard}) => {
  const cardWidth = '100%';
  return (
    <FlatList
      data={data}
      numColumns={2}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <Card
          title={item.title}
          description={item.description}
          state={item.state}
          isSelected={isSelectedCard === item.id}
          onPress={() => onPress(item.id)}
          cardWidth={cardWidth}
        />
      )}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default CardGrid;
