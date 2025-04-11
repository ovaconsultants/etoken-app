import React from 'react';
import {View, Text, TouchableOpacity, useWindowDimensions, StyleSheet, ScrollView} from 'react-native';
import Card from '../card/Cards';
import {Plus} from 'lucide-react-native';

const CardGrid = ({data, onPress, isSelectedCard, onAddClinicPress}) => {
  const {width, height} = useWindowDimensions();
  const isLandscape = width > height;

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

  const validData = data.filter(item => item?.id != null);

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
    <ScrollView contentContainerStyle={[styles.container, isLandscape && styles.landscapeContainer]}>
      {validData.map(item => (
        <View 
          key={item.id.toString()} 
          style={[styles.cardWrapper, isLandscape && styles.landscapeCardWrapper]}
        >
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  landscapeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '100%',
    padding: 4,
    marginBottom: 8,
  },
  landscapeCardWrapper: {
    width: '48%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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