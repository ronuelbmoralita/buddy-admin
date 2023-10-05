import React, { useState } from 'react';
import { View, Dimensions, StatusBar } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';
import { Button, IconButton, RadioButton, Text } from 'react-native-paper';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export default function RiderGCash({ navigation, route }) {

    const [snapshotPath, setSnapshotPath] = useState(null);

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    const [loading, setLoading] = React.useState(false);

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#007dfe',
        }}>
            {snapshotPath === null
                ?
                <View style={{
                    alignItems: 'center',
                }}>
                    <IconButton
                        icon="receipt"
                        iconColor="white"
                        size={200}
                    />
                    <Text style={{
                        color: 'white',
                        letterSpacing: 2,
                        textAlign: 'center'
                    }}>
                        You need to upload your GCash receipt using Express Send.</Text>
                </View>
                :
                <View style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    borderRadius: 15,
                    elevation: 10,
                    width: width * 0.6,
                    overflow: 'hidden'
                }}>
                    <FastImage
                        style={{
                            marginHorizontal: 16,
                            width: width * 0.6,
                            height: height * 0.6,
                            borderRadius: 20,
                        }}
                        source={{ uri: snapshotPath }}
                        priority={FastImage.priority.high}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </View>
            }
            <View style={{
                alignItems: 'center',
                marginTop: 20
            }}>
                <Button
                    mode="outlined"
                    textColor='white'
                    style={{
                        borderRadius: 100,
                        borderColor: 'white'
                    }}
                    labelStyle={{
                        //fontSize:20,
                        letterSpacing: 2
                    }}
                    onPress={() => {
                        setSnapshotPath(null)
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
                    }}>
                    {snapshotPath === null
                        ?
                        "Upload"
                        :
                        "Re-upload"
                    }
                </Button>
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
                    loading={loading === true
                        ?
                        true
                        :
                        false}
                    disabled={snapshotPath === null
                        ?
                        true
                        :
                        loading === true
                            ?
                            true
                            :
                            false
                    }
                    onPress={() => {
                        setLoading(true);
                        setTimeout(() => {
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
                                        navigation.replace("RiderHome");
                                    });
                            })
                        }, 5000);
                    }}>
                    Submit
                </Button>
            </View>
        </View>
    );
};