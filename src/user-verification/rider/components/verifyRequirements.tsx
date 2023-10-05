import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { IconButton, Button, TextInput, Checkbox } from 'react-native-paper';

export default function VerifyRequirements({ navigation }) {

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
                        title={`1. Android phone running Android 5.0 or higher`}
                    />
                    <Content
                        title={`2. Verified  GCash Account`}
                    />
                    <Content
                        title={`3. Medical Certificate`}
                    />
                    <Content
                        title={`4. Barangay Clearance`}
                    />
                    <Content
                        title={`5. NBI Clearance`}
                    />
                    <Content
                        title={`6. Driver's License`}
                    />
                    {/*
                    <Content
                        title={
                            `7. Driver's License Details, which consist of:
                       `}
                    />
                    */}
                    <Content
                        title={`7. Official Receipt (OR)`}
                    />
                    <Content
                        title={`8. Certificate of Registration (CR)`}
                    />
                    {/*
                    <Content
                        title={`10. OR and CR Expiry Date`}
                    />
                    */}
                    <Content
                        title={`9. Motorcycle Images (All Sides)`}
                    />
                    <Content
                        title={`10. Motorcycle Details`}
                    />
                    <Content
                        title={`\nDisclaimer: If you are not the real owner of the motorcycle, please submit the following.`}
                    />
                    <Content
                        title={`1. Deed of Sale or Authorization Letter`}
                    />
                    <Content
                        title={`2. Government-issued ID of the real owner of the motorcycle.`}
                    />
                </View>
            </ScrollView>
        </View>
    );
};