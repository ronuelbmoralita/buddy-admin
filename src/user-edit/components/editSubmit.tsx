import React, { useState } from 'react';
import { Text, View, Alert } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import FastImage from 'react-native-fast-image';

export default function EditSubmit({ navigation, route }) {

    const {
        //name
        firstName,
        lastName,
        //mobile
        gcashNumber,
        //civil status
        civilStatus,
        //driver's license
        license,
        //orcr
        motorOr,
        motorCr,
        //motor
        motorFront,
        motorBack,
        motorLeft,
        motorRight,
        //
        plateNumber,
        engineNumber,
        chassisNumber,
        color,
        series,
        piston,
        brand,
        yearModel,
        transmission,
        edit,
    } = route.params;

    const [loading, setLoading] = useState(false);

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
        }}>
            <View style={{
                alignSelf: 'center',
                alignItems: 'center',
                width: '90%',
            }}>
                <FastImage
                    style={{
                        height: 300,
                        width: 300,
                        alignSelf: 'center',
                    }}
                    source={require('../../images/edit.png')}
                    priority={FastImage.priority.high}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={{
                    color: 'gray',
                    letterSpacing: 2,
                }}>
                    By continuing, you agree not to change your profile settings for the next 14 days.
                    {" "}
                    <Text style={{
                        color: 'red',
                        letterSpacing: 2,
                    }}>
                        Providing incorrect information or inappropriate images will result in the immediate deletion of your account.
                    </Text>
                </Text>
            </View>
            <View style={{
                position: 'absolute',
                bottom: 20,
                width: '90%',
                alignSelf: 'center'
            }}>
                <Button
                    mode="contained"
                    buttonColor='black'
                    loading={loading}
                    disabled={loading}
                    style={{
                        borderRadius: 100
                    }}
                    contentStyle={{
                        padding: 10,
                    }}
                    labelStyle={{
                        letterSpacing: 2
                    }}
                    onPress={() => {
                        Alert.alert('Edit Account', 'Your account may be disabled while we verify your edit.', [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            {
                                text: 'OK', onPress: () => {
                                    //Buddy edit
                                    if (
                                        edit === "name"
                                        ||
                                        edit === "gcash"
                                        ||
                                        edit === "civil"
                                    ) {
                                        setLoading(true)
                                        setTimeout(() => {
                                            firestore()
                                                .collection('review')
                                                .doc(auth().currentUser?.uid)
                                                .set(
                                                    edit === "name"
                                                        ?
                                                        {
                                                            user_edit: "profile",
                                                            user_name_first: firstName,
                                                            user_name_last: lastName,
                                                            user_name: `${firstName} ${lastName}`,
                                                        }
                                                        :
                                                        edit === "gcash"
                                                            ?
                                                            {
                                                                user_edit: "profile",
                                                                user_gcash: gcashNumber,
                                                            }
                                                            :
                                                            {
                                                                user_edit: "profile",
                                                                user_civil: civilStatus,
                                                            }
                                                )
                                                .then(() => {
                                                    //navigation.navigate("UserProfile");
                                                    setLoading(false);
                                                });
                                            editAccount();
                                        }, 5000);
                                    }
                                    //license
                                    if (edit === "license") {
                                        setLoading(true);

                                        const pathLicense = license.split("/").pop();

                                        let imgArray = [
                                            { path: pathLicense, local: license },
                                        ];

                                        const obj = {}

                                        imgArray.forEach(async function (image, index) {
                                            const path = image.path;
                                            const local = image.local;
                                            const FrontImageReference = storage().ref(`buddyImage/${path}`);
                                            const FrontImageTask = FrontImageReference.putFile(local);
                                            FrontImageTask.then(async () => {
                                                console.log('BackID uploaded to the bucket!');
                                                const url = await FrontImageReference.getDownloadURL();
                                                //console.log(url, "++++++++++++++++++++");
                                                obj[index] = url;
                                                setTimeout(() => {
                                                    if (obj[0]) {
                                                        firestore()
                                                            .collection('review')
                                                            .doc(auth().currentUser?.uid)
                                                            .set({
                                                                user_edit: "profile",
                                                                user_driver_license: obj[0],
                                                            })
                                                            .then(() => {
                                                                editAccount();
                                                                //navigation.navigate("UserProfile");
                                                                setLoading(false);
                                                            });
                                                    }
                                                }, 10000);//10 seconds
                                            });
                                        });
                                    }
                                    //orcr
                                    if (edit === "orcr") {
                                        setLoading(true);

                                        const pathMotorOr = motorOr.split("/").pop();
                                        const pathMotorCr = motorCr.split("/").pop();

                                        let imgArray = [
                                            { path: pathMotorOr, local: motorOr },
                                            { path: pathMotorCr, local: motorCr },
                                        ];

                                        const obj = {}

                                        imgArray.forEach(async function (image, index) {
                                            const path = image.path;
                                            const local = image.local;
                                            const FrontImageReference = storage().ref(`buddyImage/${path}`);
                                            const FrontImageTask = FrontImageReference.putFile(local);
                                            FrontImageTask.then(async () => {
                                                console.log('BackID uploaded to the bucket!');
                                                const url = await FrontImageReference.getDownloadURL();
                                                console.log(url, "++++++++++++++++++++");
                                                obj[index] = url;
                                                setTimeout(() => {
                                                    if (obj[1]) {
                                                        firestore()
                                                            .collection('review')
                                                            .doc(auth().currentUser?.uid)
                                                            .set({
                                                                user_edit: "profile",
                                                                user_motor_or: obj[0],
                                                                user_motor_cr: obj[1],
                                                            })
                                                            .then(() => {
                                                                editAccount();
                                                                //navigation.navigate("UserProfile");
                                                                setLoading(false);
                                                            });
                                                    }
                                                }, 10000);//10 seconds
                                            });
                                        });
                                    }
                                    //motorcycle
                                    if (edit === "motorcycle") {
                                        setLoading(true);

                                        const pathMotorFront = motorFront.split("/").pop();
                                        const pathMotorBack = motorBack.split("/").pop();
                                        const pathMotorLeft = motorLeft.split("/").pop();
                                        const pathMotorRight = motorRight.split("/").pop();

                                        let imgArray = [
                                            { path: pathMotorFront, local: motorFront },
                                            { path: pathMotorBack, local: motorBack },
                                            { path: pathMotorLeft, local: motorLeft },
                                            { path: pathMotorRight, local: motorRight },
                                        ];

                                        const obj = {}

                                        imgArray.forEach(async function (image, index) {
                                            const path = image.path;
                                            const local = image.local;
                                            const FrontImageReference = storage().ref(`buddyImage/${path}`);
                                            const FrontImageTask = FrontImageReference.putFile(local);
                                            FrontImageTask.then(async () => {
                                                console.log('BackID uploaded to the bucket!');
                                                const url = await FrontImageReference.getDownloadURL();
                                                //console.log(url, "++++++++++++++++++++");
                                                obj[index] = url;
                                                setTimeout(() => {
                                                    if (obj[3]) {
                                                        firestore()
                                                            .collection('review')
                                                            .doc(auth().currentUser?.uid)
                                                            .set({
                                                                user_edit: "profile",
                                                                user_motor_image_front: obj[0],
                                                                user_motor_image_back: obj[1],
                                                                user_motor_image_left: obj[2],
                                                                user_motor_image_right: obj[3],
                                                                //
                                                                user_motor_plate_number: plateNumber,
                                                                user_motor_engine_number: engineNumber,
                                                                user_motor_chassis_number: chassisNumber,
                                                                user_motor_color: color,
                                                                user_motor_series: series,
                                                                //
                                                                user_motor_piston: piston,
                                                                user_motor_brand: brand,
                                                                user_motor_year_model: yearModel,
                                                                user_motor_transmission: transmission,
                                                            })
                                                            .then(() => {
                                                                editAccount();
                                                                //navigation.navigate("UserProfile");
                                                                setLoading(false);
                                                            });
                                                    }
                                                }, 10000);//10 seconds
                                            });
                                        });
                                    }
                                    function formatDateToYYYYMMDD(date) {
                                        const year = date.getFullYear();
                                        const month = String(date.getMonth()).padStart(2, '0'); // Months are zero-based
                                        const day = String(date.getDate()).padStart(2, '0');
                                        return `${year}-${month}-${day}`;
                                    }

                                    // Example usage:
                                    const today = new Date();

                                    const exp = new Date(today);
                                    exp.setMonth(today.getMonth() + 1);

                                    function editAccount() {
                                        firestore()
                                            .collection('user')
                                            .doc(auth().currentUser?.uid)
                                            .update(
                                                {
                                                    user_account: "Rider-Pending",
                                                    //user_edit_date: today.toLocaleDateString(),
                                                    user_edit_date: formatDateToYYYYMMDD(exp),
                                                }
                                            )
                                            .then(() => {
                                                setLoading(false);
                                            });
                                    }
                                }
                            },
                        ]);
                    }}>
                    Submit
                </Button>
            </View>
        </View>
    );
};
