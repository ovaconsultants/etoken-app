import React from 'react';
import { Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const Draggable = ({ children }) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const panGesture = Gesture.Pan()
    .onUpdate((event) => {
        // Ensure the component stays within the screen boundaries
        translateX.value = Math.min(Math.max(event.translationX, -SCREEN_WIDTH / 2), SCREEN_WIDTH / 2);
        translateY.value = Math.min(Math.max(event.translationY, -SCREEN_HEIGHT / 2), SCREEN_HEIGHT / 2);
    })
        .onEnd(() => {
            translateX.value = withSpring(translateX.value);
            translateY.value = withSpring(translateY.value);
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
        ],
    }));

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View style={animatedStyle}>
                {children}
            </Animated.View>
        </GestureDetector>
    );
};

export default Draggable;
