import React, { useState } from 'react';
import { Text, View, Linking } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default function UserContact() {

    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    return (
        <View
            style={{
                flex: 1,
                //justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
            }}>
            <View style={{
                width: '90%',
            }}>
                <TextInput
                    style={{
                        marginBottom: 20
                    }}
                    mode='outlined'
                    activeOutlineColor='black'
                    label="Subject"
                    value={subject}
                    onChangeText={text => setSubject(text)}
                />
                <TextInput
                    mode='outlined'
                    activeOutlineColor='black'
                    label="Message"
                    numberOfLines={8}
                    maxLength={300}
                    multiline
                    value={message}
                    onChangeText={text => setMessage(text)}
                />
            </View>
            <View style={{
                position: 'absolute',
                bottom: 20,
                width: '90%',
                alignSelf: 'center'
            }}>
                <Button
                    disabled={
                        subject && message
                            ?
                            false
                            :
                            true
                    }
                    mode="contained"
                    buttonColor='black'
                    style={{
                        borderRadius: 100
                    }}
                    contentStyle={{
                        padding: 10,
                    }}
                    labelStyle={{
                        letterSpacing: 2
                    }}
                    onPress={() => {
                        Linking.openURL(`http://m.me/buddyAppCommunity?text=Hello%20and%20Welcome`)
                        //http://m.me/PAGE-NAME?text=Hello%20and%20Welcome
                        //Linking.openURL(`http://m.me/buddyAppCommunity`)
                        //Linking.openURL(`mailto:buddy.suporta@gmail.com?subject=${subject}&body=${message}`)
                    }}>
                    Send Message
                </Button>
            </View>
        </View>
    );
};
