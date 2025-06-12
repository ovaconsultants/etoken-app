import React from 'react';
import { View, FlatList } from 'react-native';
import Card from '../card/Cards';
import { styles } from './CardGrid.styles';

const CardGrid = ({
  data,
  onPress,
  isSelectedCard,
  isLandscape,
  deviceType, // Pass this prop from parent
}) => {
  const renderItem = ({ item }) => (
    <View
      style={[
        styles.cardWrapper,
        isLandscape && styles.landscapeCardWrapper,
        { flexGrow: 1 },
      ]}
    >
      <Card
        title={item.title || 'No Title'}
        description={item.description || 'No Description'}
        state={item.state || 'No Status'}
        isSelected={isSelectedCard === item.id}
        onPress={() => onPress(item.id)}
        cardWidth="100%"
        deviceType={deviceType}
        isLandscape={isLandscape}
      />
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={[
        styles.container,
        isLandscape && styles.landscapeContainer,
      ]}
      style={styles.scrollView}
      numColumns={isLandscape && deviceType === 'Tablet' ? 2 : 1}
      keyboardShouldPersistTaps="handled"
    />
  );
};

export default CardGrid;
