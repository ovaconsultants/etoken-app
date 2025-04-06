import React from 'react';
import {FlatList, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Card from '../card/Cards';
import {Plus} from 'lucide-react-native';

const CardGrid = ({data, onPress, isSelectedCard, onAddClinicPress}) => {
  const cardWidth = '100%';

  // Handle null/undefined data or empty array
  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <TouchableOpacity
          style={styles.addClinicButton}
          onPress={onAddClinicPress}>
          <Plus size={24} color="#007AFF" />
          <Text style={styles.addClinicText}>Add Clinic</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Filter out any null/undefined items
  const validData = data.filter(item => item?.id != null);

  // If all items were invalid
  if (validData.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <TouchableOpacity
          style={styles.addClinicButton}
          onPress={onAddClinicPress}>
          <Plus size={24} color="#007AFF" />
          <Text style={styles.addClinicText}>Add Clinic</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={validData}
      numColumns={1}
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
          <TouchableOpacity
            style={styles.addClinicButton}
            onPress={onAddClinicPress}>
            <Plus size={24} color="#007AFF" />
            <Text style={styles.addClinicText}>Add Clinic</Text>
          </TouchableOpacity>
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
  addClinicButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    backgroundColor: 'white',
  },
  addClinicText: {
    color: '#007AFF',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default CardGrid;