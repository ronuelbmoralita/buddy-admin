import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { styles } from '../../global/styles';

export default function UserGCash({ navigation, route }) {

  const [gCash, setGCash] = useState('');

  return (
    <View style={[styles.buddyContainer]}>
      <View style={{
        alignItems: 'center',
        gap: 20,
      }}>
        <TextInput
          style={{
            width: '90%',
          }}
          activeOutlineColor='black'
          mode="outlined"
          autoComplete="tel-device"
          keyboardType='numeric'
          label='Mobile Number'
          value={gCash}
          onChangeText={text => setGCash(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          buttonColor='black'
          style={styles.buttonStyle}
          contentStyle={styles.buttonContentStyle}
          labelStyle={styles.buttonLabelStyle}
          onPress={() => {
            navigation.navigate('EditSubmit', {
              gcashNumber: gCash,
              edit: 'gcash',
            })
          }}>
          Update
        </Button>
      </View>
    </View>
  );
};