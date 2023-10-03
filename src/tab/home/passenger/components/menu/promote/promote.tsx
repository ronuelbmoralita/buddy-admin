import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { Button, Title } from 'react-native-paper';
import FastImage from 'react-native-fast-image';

export default function Promote(props) {

    const width = Dimensions.get('window').width;

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
            marginBottom: 20,
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                width: width * 0.9,
                gap: 10,
                padding: 10,
            }}>
                <FastImage
                    style={{
                        width: 100,
                        height: 100,
                    }}
                    source={require("../../../../../../images/pasakay-variant.png")}
                    priority={FastImage.priority.high}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <View style={{
                    flex: 1,
                    marginRight: 10,
                    gap: 5,
                }}>

                    <Text style={{
                        color: 'black',
                        letterSpacing: 2,
                    }}>
                        We are looking for aspiring Riders who may want to be part of our family.
                    </Text>
                    <Button
                        icon='chevron-double-right'
                        mode='outlined'
                        textColor='black'
                        style={{
                            borderRadius: 100,
                            alignSelf: 'center',
                        }}
                        labelStyle={{
                            letterSpacing: 2
                        }}
                        contentStyle={{
                            flexDirection: 'row-reverse'
                        }}
                        onPress={props.riderPress}>
                        Register Now
                    </Button>
                </View>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                width: width * 0.9,
                gap: 10,
                padding: 10,
            }}>
                <FastImage
                    style={{
                        width: 100,
                        height: 100,
                    }}
                    source={require("../../../../../../images/merchant.png")}
                    priority={FastImage.priority.high}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <View style={{
                    flex: 1,
                    marginRight: 10,
                    gap: 5,
                }}>

                    <Text style={{
                        color: 'black',
                        letterSpacing: 2,
                    }}>
                      We support local businesses by making their services accessible to everyone.
                    </Text>
                    <Button
                        icon='chevron-double-right'
                        mode='outlined'
                        textColor='black'
                        style={{
                            borderRadius: 100,
                            alignSelf: 'center',
                        }}
                        labelStyle={{
                            letterSpacing: 2
                        }}
                        contentStyle={{
                            flexDirection: 'row-reverse'
                        }}
                        onPress={props.merchantPress}>
                        Register Now
                    </Button>
                </View>
            </View>
        </View>
    );
};