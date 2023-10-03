import React, { useState } from 'react';
import { View, Dimensions, StatusBar } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';
import { Button, IconButton, RadioButton, Text } from 'react-native-paper';

import { Slider } from '@miblanchard/react-native-slider';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export default function RiderGCash({ navigation, route }) {

    const [snapshotPath, setSnapshotPath] = useState(null);

    const [value, setValue] = React.useState(350);
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#007dfe',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <StatusBar
                barStyle={'dark-content'}
                translucent
                backgroundColor="transparent"
            />
            <View style={{
                flex: 1,
                alignItems: 'center',
            }}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    elevation:10,
                    width: width * 0.6,
                    overflow:'hidden'
                }}>
                    <FastImage
                        style={{
                            marginHorizontal: 16,
                            width: width * 0.6,
                            height: height * 0.6,
                            borderRadius: 20,
                        }}
                        source={{ uri: snapshotPath }}
                        //source={require("../images/buddy.png")}
                        priority={FastImage.priority.high}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    {snapshotPath === null
                        ?
                        <IconButton
                            style={{
                                position: 'absolute',
                            }}
                            icon="receipt"
                            iconColor="black"
                            size={150}
                            onPress={() => {
                                ImagePicker.openPicker({
                                    width: width,
                                    height: height,
                                    cropping: true
                                }).then(image => {
                                    console.log(image);
                                    setSnapshotPath(image?.path)
                                })
                                    .catch(err => {
                                        return;
                                        // Here you handle if the user cancels or any other errors
                                    });
                            }}
                        />
                        :
                        null
                    }
                </View>
            </View>
            <View style={{
                position: 'absolute',
                bottom: 20,
                width: '90%',
                alignSelf: 'center',
            }}>
                <Button
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
                    disabled={snapshotPath === null
                        ?
                        true
                        :
                        false}
                    onPress={() => {
                        const FrontImagePath = snapshotPath.split("/").pop();
                        const FrontImageReference = storage().ref(`buddyImage/${FrontImagePath}`);
                        const FrontImageTask = FrontImageReference.putFile(snapshotPath);

                        FrontImageTask.then(async () => {
                            console.log('BackID uploaded to the bucket!');

                            const FrontImageUrl = await FrontImageReference.getDownloadURL();

                            firestore()
                                .collection('topUp')
                                .doc(auth().currentUser?.uid)
                                .set({
                                    user_wallet: 0,
                                    topUp_image: FrontImageUrl,
                                    topUp_dateTime: firestore.Timestamp.fromDate(new Date()),
                                })
                                .then(() => {
                                    console.log('User added!');
                                });
                        })
                    }}>
                    Upload
                </Button>
            </View>
        </View>
    );
};