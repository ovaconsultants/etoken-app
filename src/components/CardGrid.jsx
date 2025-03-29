// components/CardGrid.js
import React from 'react';
import { FlatList,StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Card from './Cards';

const CardGrid = ({ data , onPress,isSelectedCard}) => {
  const cardWidth = (wp);
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
