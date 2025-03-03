import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TimePicker = ({ value, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleTimeChange = (event, selectedTime) => {
    if (Platform.OS === 'android') {
      setShowPicker(false); // Close picker automatically
    }

    if (selectedTime) {
      onChange(selectedTime); // Update parent state
    }
  };

  return (
    <View onResponderGrant={() => setShowPicker(prev => !prev)}>
      {/* Button to trigger the time picker */}
      <TouchableOpacity 
        onPress={() => setShowPicker(prev => !prev)}   
        style={styles.button}
      >
        <Text style={styles.timeText}>
          {value
            ? value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) 
            : 'Select Time'}
        </Text>
      </TouchableOpacity>

      {/* Time Picker (Only visible when showPicker is true) */}
      {showPicker && (
        <DateTimePicker
          value={value || new Date()} // Ensure fallback time
          mode="time"
          is24Hour={false} // Set to true for 24-hour format
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  timeText: {
    fontSize: 16,
    color: '#007AFF',
  },
});

export default TimePicker;
