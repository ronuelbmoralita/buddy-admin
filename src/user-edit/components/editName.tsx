import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { styles } from '../../global/styles';

export default function UserName({ navigation, route }) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

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
                    autoComplete="given-name"
                    label='First Name'
                    value={firstName}
                    onChangeText={text => setFirstName(text)}
                />
                <TextInput
                    style={{
                        width: '90%',
                    }}
                    activeOutlineColor='black'
                    mode="outlined"
                    autoComplete="name-family"
                    label='Last Name'
                    value={lastName}
                    onChangeText={text => setLastName(text)}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    mode="contained"
                    buttonColor='black'
                    disabled={firstName && lastName
                        ?
                        false
                        :
                        true
                    }
                    style={styles.buttonStyle}
                    contentStyle={styles.buttonContentStyle}
                    labelStyle={styles.buttonLabelStyle}
                    onPress={() => {
                        navigation.navigate('EditSubmit', {
                            firstName: firstName,
                            lastName: lastName,
                            edit: 'name',
                        })
                    }}>
                    Update
                </Button>
            </View>
        </View>
    );
};