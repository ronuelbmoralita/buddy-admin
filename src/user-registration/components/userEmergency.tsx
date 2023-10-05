import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { styles } from '../../global/styles';

export default function UserGCash({ navigation, route }) {

    const {
        user,
        firstName,
        lastName,
        gCash,
    } = route.params;

    const [emergency, setEmergency] = useState('');

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
                    //autoComplete="tel-device"
                    keyboardType='numeric'
                    label='Enter Mobile Number'
                    value={emergency}
                    onChangeText={text => setEmergency(text)}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    mode="contained"
                    buttonColor='black'
                    disabled={emergency
                        ?
                        false
                        :
                        true
                    }
                    style={styles.buttonStyle}
                    contentStyle={styles.buttonContentStyle}
                    labelStyle={styles.buttonLabelStyle}
                    onPress={() => {
                        navigation.navigate("UserImage", {
                            user: user,
                            firstName: firstName,
                            lastName: lastName,
                            gCash: gCash,
                            emergency: emergency,
                        });
                    }}>
                    Next
                </Button>
            </View>
        </View>
    );
};