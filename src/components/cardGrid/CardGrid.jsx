import React from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import Card from '../card/Cards';

const CardGrid = ({data, onPress, isSelectedCard}) => {
  const cardWidth = '100%';

  // Handle null/undefined data or empty array
  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No clinics registered yet</Text>
      </View>
    );
  }

  // Filter out any null/undefined items
  const validData = data.filter(item => item?.id != null);

  // If all items were invalid
  if (validData.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No valid clinic data available</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={validData}
      numColumns={2}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <Card
          title={item.title || 'No Title'}
          description={item.description || 'No Description'}
          state={item.state || 'No Status'}
          isSelected={isSelectedCard === item.id}
          onPress={() => onPress(item.id)}
          cardWidth={cardWidth}
        />
      )}
      contentContainerStyle={styles.container}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No clinics to display</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default CardGrid;