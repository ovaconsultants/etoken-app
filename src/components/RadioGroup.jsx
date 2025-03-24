import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

const RadioGroupComponent = ({ options, selectedId, onSelect }) => {
    return (
        <View style={styles.container}>
            <View style={styles.radioGroupContainer}>
                {options.map((option) => (
                    <View key={option.id} style={styles.optionContainer}>
                        {/* Radio Button */}
                        <TouchableOpacity
                            style={styles.radioButton}
                            onPress={() => onSelect(option.id)}
                        >
                            <View
                                style={[
                                    styles.radioButtonIcon,
                                    selectedId === option.id && styles.radioButtonIconSelected,
                                ]}
                            />
                        </TouchableOpacity>

                        {/* Image */}
                        {option.label === 'Television' && (
                            <Image
                                source={require('../../assets/ads/images/tv.png')}
                                style={styles.icon}
                                resizeMode="contain"
                            />
                        )}
                        {option.label === 'Reception' && (
                            <Image
                                source={require('../../assets/ads/images/reception.png')}
                                style={styles.icon}
                                resizeMode="contain"
                            />
                        )}
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    radioGroupContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20, // Space between options
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10, // Space between radio button and image
    },
    radioButtonIcon: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'transparent',
    },
    radioButtonIconSelected: {
        backgroundColor: '#000', // Selected radio button color
    },
    icon: {
        width: 40, // Adjust size as needed
        height: 40, // Adjust size as needed
    },
});

export default RadioGroupComponent;