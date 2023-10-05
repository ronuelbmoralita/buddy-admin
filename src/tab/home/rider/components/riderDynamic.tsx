import React from 'react';
import { Text, View, Animated } from 'react-native';
import { IconButton, Button } from 'react-native-paper';

export default function RiderDynamic(props) {
    return (
        <Animated.View style={{
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            width: '90%',
            backgroundColor: props.dynamicBackground,
            marginTop: 15,
            borderRadius: 10,
            elevation: 10,
            transform: [{ scale: props.dynamicAnimatedValue }]
        }}>
            <View style={{
                flex: 1,
                marginVertical: 20,
                marginHorizontal: 20,
            }}>
                <Text style={{
                    color: 'white',
                    letterSpacing: 2,
                }}>
                    {props.dynamicValue}
                </Text>
            </View>
            <IconButton
                //icon="close-circle-outline"
                icon={props.dynamicIcon}
                iconColor='white'
                size={40}
                onPress={props.dynamicOnPress}
            />
        </Animated.View>
    );
};