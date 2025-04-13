import React from 'react';
import {View, StyleSheet} from 'react-native';

import FastImage from 'react-native-fast-image';

const ProfileImageRenderer = ({imageUrl}) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <FastImage
          source={{uri: imageUrl}}
          style={styles.profileImage}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  profileImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderColor: 'rgb(93, 101, 208)',
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: 20,
  },
  dropdown: {
    width: 160,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingVertical: 8,
    elevation: 5,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 12,
  },
  signOutText: {
    color: '#D32F2F',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 4,
  },
});

export default ProfileImageRenderer ;
