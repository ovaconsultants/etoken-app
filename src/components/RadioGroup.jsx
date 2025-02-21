// components/form/RadioGroup.js
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';

const RadioGroupComponent = ({options, selectedId, onSelect}) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Choose a screen</Text>
            </View>
            <View style={styles.radioGroupContainer}>
                <RadioGroup
                    radioButtons={options}
                    onPress={onSelect}
                    selectedId={selectedId}
                    layout="row"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {marginVertical: 10},
    text: {fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginVertical: 20},
    radioGroupContainer: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'},
});

export default RadioGroupComponent;
