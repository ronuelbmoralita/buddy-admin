import React, { useState, useRef } from 'react'
import {
    View,
    StatusBar,
    Dimensions,
} from 'react-native';

import {
    Camera,
} from 'react-native-vision-camera';
import { IconButton, Button, Text } from 'react-native-paper';
import FastImage from 'react-native-fast-image';

import openCV from './openCV';

export default function CaptureImage(props) {

    const windowWidth = Dimensions.get('window').width;

    const width = windowWidth * 0.9;
    const height = props.imageCategory === "license"
        ?
        200
        :
        props.imageCategory === "motor" || props.imageCategory === "selfie"
            ?
            320
            :
            400;

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
        }}>
            <StatusBar
                barStyle={'dark-content'}
                translucent
                backgroundColor="transparent"
            />
            {props.check === null
                ?
                <View style={{
                    alignItems: 'center',
                    overflow: 'hidden',
                    borderRadius: props.imageCategory === "selfie"
                        ?
                        500
                        :
                        10
                    ,
                }}>
                    <Camera
                        ref={props.camera}
                        style={{
                            width: width,
                            height: height,
                        }}
                        device={props.cameraDevice}
                        isActive
                        photo
                    />
                </View>
                :
                <FastImage
                    style={{
                        marginHorizontal: 16,
                        paddingTop: 8,
                        width: width,
                        height: height,
                        borderRadius: props.imageCategory === "selfie"
                            ?
                            1000
                            :
                            10
                        ,
                    }}
                    source={{ uri: props.imageUri }}
                    priority={FastImage.priority.high}
                    resizeMode={FastImage.resizeMode.contain}
                />
            }
            <View style={{
                position: 'absolute',
                bottom: 20,
                width: '90%',
                alignSelf: 'center',
                alignItems: 'center',
                borderRadius: 20,
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
            }}>
                <View style={{
                    width: '90%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Button
                        mode="text"
                        textColor='black'
                        labelStyle={{
                            letterSpacing: 2
                        }}
                        disabled={props.disabledRetake}
                        onPress={props.onPressRetake}>
                        {props.titleRetake}
                    </Button>
                    <View style={{ flex: 1 }}>
                        <IconButton
                            style={{
                                alignSelf: 'center',
                            }}
                            icon="circle-slice-8"
                            iconColor='black'
                            size={70}
                            onPress={props.onPressSnap}
                        />
                    </View>
                    <Button
                        mode="text"
                        textColor='black'
                        labelStyle={{
                            letterSpacing: 2
                        }}
                        disabled={props.disabledNext}
                        onPress={props.onPressNext}>
                        {props.titleNext}
                    </Button>
                </View>
            </View>
        </View>
    )
}