import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { IconButton, Button } from 'react-native-paper';
import FastImage from 'react-native-fast-image';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { local_user, user } from '../../global/localStorage';

export default function UserPending() {

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const json = local_user.getString('local_user') // { 'username': 'Marc', 'age': 21 }
        if (json) {
            const object = JSON.parse(json)
            setUserData(object)
        }
        const listener = local_user.addOnValueChangedListener((changedKey) => {
            const newObject = local_user.getString(changedKey);
            const object = JSON.parse(newObject)
            setUserData(object);
        })
        return () => {
            listener.remove()
        }
    }, []);

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            gap: 20,
        }}>
            <FastImage
                style={{
                    height: 300,
                    width: 300,
                }}
                source={require('../../images/cancel.png')}
                priority={FastImage.priority.high}
                resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'red',
                letterSpacing: 2
            }}>
                Your account is suspended due to the following:
            </Text>
            <Text style={{
                color: 'black',
                letterSpacing: 2
            }}>
                {userData?.user_rejected
                ?
                userData?.user_rejected.replace(/(\d+)/g, "\n$1")
                :
                null
                }
            </Text>
            <Button
                mode='outlined'
                textColor='black'
                style={{
                    borderColor: 'black',
                    borderWidth: 2,
                    borderRadius: 100
                }}
                contentStyle={{
                    padding: 10,
                }}
                labelStyle={{
                    letterSpacing: 2
                }}
                onPress={() => {
                    //setVerificationModal(true);
                    firestore()
                        .collection('user')
                        .doc(auth().currentUser?.uid)
                        .update({
                            user_account: "Merchant-Verified",
                        })
                        .then(() => {
                            console.log('User updated!');
                        });
                }}>
                Okay
            </Button>
            {/*}
            <View style={{
                width: '90%',
                alignSelf: 'center',
                gap: 20,
            }}>
                <Button
                    mode='outlined'
                    textColor='black'
                    style={{
                        borderColor: 'black',
                        borderWidth: 2,
                        borderRadius: 100
                    }}
                    contentStyle={{
                        padding: 10,
                    }}
                    labelStyle={{
                        letterSpacing: 2
                    }}
                    onPress={() => {
                        //setVerificationModal(true);
                        firestore()
                            .collection('user')
                            .doc(auth().currentUser?.uid)
                            .update({
                                user_account: "Rider-Verified",
                            })
                            .then(() => {
                                console.log('User updated!');
                            });
                    }}>
                    Verify Rider
                </Button>
                <Button
                    mode='outlined'
                    textColor='black'
                    style={{
                        borderColor: 'black',
                        borderWidth: 2,
                        borderRadius: 100
                    }}
                    contentStyle={{
                        padding: 10,
                    }}
                    labelStyle={{
                        letterSpacing: 2
                    }}
                    onPress={() => {
                        //setVerificationModal(true);
                        firestore()
                            .collection('user')
                            .doc(auth().currentUser?.uid)
                            .update({
                                user_account: "Merchant-Verified",
                            })
                            .then(() => {
                                console.log('User updated!');
                            });
                    }}>
                    Verify Merchant
                </Button>
            </View>
                */}
        </View>
    );
};
