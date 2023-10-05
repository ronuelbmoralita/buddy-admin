import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import { IconButton, Button, TextInput, Checkbox, RadioButton } from 'react-native-paper';

export default function VerifyOwner({ navigation, route }) {

    const [ownership, setOwnership] = React.useState('');

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
            backgroundColor: 'white'
        }}>
            <View style={{
                alignSelf: 'center',
                width: '90%',
            }}>
                <FastImage
                    style={{
                        height: 250,
                        width: 250,
                        alignSelf: 'center',
                    }}
                    source={require('../../../images/ownership.png')}
                    priority={FastImage.priority.high}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <View style={{
                    alignSelf: 'center',
                    gap: 10,
                    marginBottom: 20,
                }}>
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
            </View>
            <View style={{
                position: 'absolute',
                width: '100%',
                bottom: 0,
            }}>
                <RadioButton.Group
                    value={ownership}
                    onValueChange={value => {
                        setOwnership(value)
                        console.log(value)
                        setTimeout(() => {
                            if (value === "Owner") {
                                navigation.navigate('VerifyMedical', {//VerifyLicenseExpire
                                    ownership: value,
                                })
                                setOwnership('');
                            }
                            else {
                                navigation.navigate('VerifyOwnerDeed', {//VerifyLicenseExpire
                                    ownership: value,
                                })
                                setOwnership('');
                            }

                        }, 2000);
                    }}>
                    <View style={{ gap: 20, marginBottom: 20, }}>
                        <View style={{
                            width: '90%',
                            borderWidth: 1,
                            alignSelf: 'center',
                            borderRadius: 30,
                            overflow: 'hidden',
                        }}>
                            <RadioButton.Item
                                color='black'
                                disabled={ownership
                                    ?
                                    true
                                    :
                                    false
                                }
                                labelStyle={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    letterSpacing: 2
                                }}
                                label="Owner"
                                value="Owner" />
                        </View>
                        <View style={{
                            width: '90%',
                            borderWidth: 1,
                            alignSelf: 'center',
                            borderRadius: 30,
                            overflow: 'hidden',
                        }}>
                            <RadioButton.Item
                                color='black'
                                disabled={ownership
                                    ?
                                    true
                                    :
                                    false
                                }
                                labelStyle={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    letterSpacing: 2
                                }}
                                label="Second Hand"
                                value="Second Hand" />
                        </View>
                        <View style={{
                            width: '90%',
                            borderWidth: 1,
                            alignSelf: 'center',
                            borderRadius: 30,
                            overflow: 'hidden',
                        }}>
                            <RadioButton.Item
                                color='black'
                                disabled={ownership
                                    ?
                                    true
                                    :
                                    false
                                }
                                labelStyle={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    letterSpacing: 2
                                }}
                                label="Borrowed"
                                value="Second Hand" />
                        </View>
                    </View>
                </RadioButton.Group>
                {ownership
                    ?
                    <ActivityIndicator
                        size="large"
                        color="black"
                    />
                    :
                    null
                }
            </View>
        </View>
    );
};