import React, { useEffect, useRef } from 'react';
import { Text, View, ActivityIndicator, Animated } from 'react-native';
import { IconButton, Button, TextInput } from "react-native-paper";
import FastImage from 'react-native-fast-image';

export default function PassengerRider(props) {

    //animation
    const scaleValue = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
        Animated.loop(
            Animated.spring(scaleValue, {
                toValue: 1,
                friction: 1,
                useNativeDriver: true,
            }),
            { iterations: 1000 },
        ).start();
    }, [scaleValue]);

    return (
        props.riderStatus === "search"
            ?
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Animated.View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: [{ scale: scaleValue }]
                }}>
                    <FastImage
                        style={{
                            width: 250,
                            height: 250,
                        }}
                        source={require("../../../../../images/search.png")}
                        priority={FastImage.priority.high}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </Animated.View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                }}>
                    <Text style={{ fontSize: 20, color: 'black', letterSpacing: 2 }}>Searching for a Rider</Text>
                    <ActivityIndicator size="large" color="black" />
                </View>
            </View>
            :
            props.riderStatus === "success"
                ?
                <View style={{
                    flex: 1,
                    width: '100%',
                    bottom: 0,
                    backgroundColor: 'white',
                    elevation: 20,
                    //transform: [{ scale: props.animatedValue }],
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 20,
                }}>
                    {/*DRIVER*/}
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        alignItems: 'center',
                        width: '90%',
                        gap: 10,
                    }}>
                        <FastImage
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 100,
                            }}
                            source={{ uri: props.riderImage }}
                            priority={FastImage.priority.low}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        <Text style={{
                            flex: 1,
                            fontSize: 30,
                            fontWeight: 'bold',
                            color: 'black',
                            letterSpacing: 2,
                        }}>
                            {props.riderName}
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        alignItems: 'center',
                        width: '90%',
                        gap: 10,
                    }}>
                        <Text style={{
                            color: 'black',
                            fontSize: 20,
                            fontWeight: 'bold',
                            letterSpacing: 2
                        }}>Distance: {props.distance}km</Text>
                        <View style={{ flex: 1 }} />
                        <Text style={{
                            color: 'black',
                            fontSize: 20,
                            fontWeight: 'bold',
                            letterSpacing: 2
                        }}>Fare: {props.fare}</Text>
                    </View>
                    <TextInput
                        style={{
                            width: '90%',
                            alignSelf: 'center',
                        }}
                        activeOutlineColor='black'
                        numberOfLines={4}
                        maxLength={80}
                        multiline
                        mode='outlined'
                        label="Note to Rider"
                        right={<TextInput.Affix text="/80" />}
                        left={<TextInput.Icon icon="notebook-edit-outline" />}
                        value={props.noteValue}
                        onChangeText={props.noteOnChangeText}
                    />
                    <Button
                        style={{
                            marginBottom: 20,
                            alignSelf: 'center',
                            width: '90%',
                            borderRadius: 50,
                        }}
                        contentStyle={{
                            padding: 10,
                        }}
                        labelStyle={{
                            letterSpacing: 2
                        }}
                        mode='contained'
                        buttonColor='black'
                        textColor='white'
                        loading={props.buttonLoadingSuccess}
                        onPress={props.buttonPressSuccess}>
                        {props.buttonTitleSuccess}
                    </Button>
                </View>
                :
                props.riderStatus === "fail"
                    ?
                    <View style={{
                        flex: 1,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 20,
                    }}>
                        <FastImage
                            style={{
                                width: 250,
                                height: 250,
                            }}
                            source={require("../../../../../images/no-driver.png")}
                            priority={FastImage.priority.high}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        <Text style={{ color: 'black', letterSpacing: 2 }}>No driver Found</Text>
                        <Button
                            style={{
                                marginBottom: 20,
                                alignSelf: 'center',
                                width: '90%',
                                borderRadius: 50,
                            }}
                            contentStyle={{
                                padding: 10,
                            }}
                            labelStyle={{
                                letterSpacing: 2
                            }}
                            mode='contained'
                            buttonColor='black'
                            textColor='white'
                            loading={props.buttonLoading}
                            onPress={props.buttonPressFail}>
                            Try Again
                        </Button>
                    </View>
                    :
                    null
    );
};