import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { IconButton, Button, TextInput, Checkbox } from 'react-native-paper';

export default function MerchantRequirements({ navigation }) {

    function Content(props) {
        return (
            <View>
                <Text style={{
                    //fontSize: 18,
                    //fontWeight: 'bold',
                    color: 'black',
                    letterSpacing: 2,
                }}>
                    {props.title}
                </Text>
            </View>
        )
    }

    return (
        <View style={{
            flex: 1,
            //justifyContent: 'center',
            backgroundColor: 'white'
        }}>
            <ScrollView>
                <View style={{
                    alignSelf: 'center',
                    width: '90%',
                    gap: 10,
                    marginBottom: 20,
                }}>
                     <Content
                        title={`1. Business Owner (Real Name)`}
                    />
                    <Content
                        title={`2. Business Name`}
                    />
                    <Content
                        title={`3. Business Phone Number`}
                    />
                    <Content
                        title={`4. Link to Facebook Business Page (Optional)`}
                    />
                </View>
            </ScrollView>
        </View>
    );
};