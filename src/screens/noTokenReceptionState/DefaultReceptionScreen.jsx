import {StyleSheet, View, Text} from 'react-native';
import {Tv, Users} from 'lucide-react-native';
import React from 'react';

const DefaultReceptionScreen = ({visibleCause}) => {
  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Tv size={48} color="#007AFF" />
          <Users size={48} color="#007AFF" style={styles.secondIcon} />
        </View>
         <Text style={styles.title}> No {visibleCause} tokens</Text> 
      </View>
    </View>
  );
};

export default DefaultReceptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },


  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  secondIcon: {
    marginLeft: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },

});
