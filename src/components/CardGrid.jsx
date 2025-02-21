// components/CardGrid.js
import React, { useState } from 'react';
import { FlatList, Dimensions, StyleSheet, } from 'react-native';
import Card from './Cards';

const CardGrid = ({ data }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  // Calculate card width based on screen width (2 cards per row)
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - 40) / 2;

  const handleCardPress = (cardId) => {
    setSelectedCard(cardId);
  };

  return (
    <FlatList
      data={data}
      numColumns={2} // Display 2 cards per row
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Card
          title={item.title}
          description={item.description}
          isSelected={selectedCard === item.id}
          onPress={() => handleCardPress(item.id)}
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
