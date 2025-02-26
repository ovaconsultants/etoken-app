// components/CardGrid.js
import React from 'react';
import { FlatList, Dimensions, StyleSheet} from 'react-native';
import Card from './Cards';

const CardGrid = ({ data , onPress,isSelectedCard}) => {
  // Calculate card width based on screen width (2 cards per row)
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - 50) / 2;

  return (
    <FlatList
      data={data}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
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
    padding: 8,
  },
});

export default CardGrid;
