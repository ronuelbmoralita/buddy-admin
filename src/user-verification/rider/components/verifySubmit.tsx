import React, { useState } from 'react';
import { Text, View, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import FastImage from 'react-native-fast-image';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export default ({ navigation, route }) => {

    const {
        ownership,
        owner_deed,
        owner_id,
        medical,
        barangay,
        nbi,
        license,
        motorOr,
        motorCr,
        motorFront,
        motorBack,
        motorLeft,
        motorRight,
        plateNumber,
        engineNumber,
        chassisNumber,
        color,
        series,
        piston,
        brand,
        yearModel,
        transmission,
    } = route.params;

    const [loading, setLoading] = useState(false);

    const hasUnsavedChanges = Boolean(loading);

    React.useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {
                if (hasUnsavedChanges === true) {
                    e.preventDefault();
                }
                else {
                    return;
                }
                console.log(hasUnsavedChanges)
            }),

        [hasUnsavedChanges, navigation]
    );

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <View style={{
                alignSelf: 'center',
                width: '90%',
            }}>
                <Text style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: 'black',
                    letterSpacing: 2,
                    alignSelf: 'center',
                }}>
                    Thank you for using Büddy!
                </Text>
                <FastImage
                    style={{
                        height: 250,
                        width: 250,
                        alignSelf: 'center',
                    }}
                    source={require('../../../images/thank-you.png')}
                    priority={FastImage.priority.high}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={{
                    fontSize: 20,
                    color: 'black',
                    letterSpacing: 2,
                    alignSelf: 'center',
                }}>
                    Start to earn with Pasakay and Pabili.
                </Text>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{
                    position: 'absolute',
                    bottom: 20,
                    width: '90%',
                    alignSelf: 'center',
                    gap: 20,
                }}>
                    {loading === true
                        ?
                        <Text style={{
                            color: 'salmon',
                            letterSpacing: 2,
                            alignSelf: 'center',
                        }}>
                            Please do not exit the app while in the process of submitting your requirements.
                        </Text>
                        :
                        null
                    }
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
                            setLoading(true);
                            if (ownership === "Owner")
                            //owner
                            {
                                const pathMedical = medical.split("/").pop();
                                const pathBarangay = barangay.split("/").pop();
                                const pathNBI = nbi.split("/").pop();
                                const pathLicense = license.split("/").pop();
                                const pathMotorOr = motorOr.split("/").pop();
                                const pathMotorCr = motorCr.split("/").pop();
                                const pathMotorFront = motorFront.split("/").pop();
                                const pathMotorLeft = motorLeft.split("/").pop();
                                const pathMotorRight = motorRight.split("/").pop();

                                let imgArray = [
                                    { path: pathMedical, local: medical },
                                    { path: pathBarangay, local: barangay },
                                    { path: pathNBI, local: nbi },
                                    { path: pathLicense, local: license },
                                    { path: pathMotorOr, local: motorOr },
                                    { path: pathMotorCr, local: motorCr },
                                    { path: pathMotorFront, local: motorFront },
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
                                        console.log(obj)
                                        setTimeout(() => {
                                            if (obj[8]) {
                                                firestore()
                                                    .collection('review')
                                                    .doc(auth().currentUser?.uid)
                                                    .set({
                                                        user_edit: 'driver',
                                                        user_type: "Rider",
                                                        user_driver_medical: obj[0],
                                                        user_driver_barangay: obj[1],
                                                        user_driver_nbi: obj[2],
                                                        user_driver_license: obj[3],
                                                        //licenseType: licenseType,
                                                        //licenseNumber: licenseNumber,
                                                        //licenseExpiry: licenseExpiry,
                                                        user_motor_or: obj[4],
                                                        user_motor_cr: obj[5],
                                                        //orCrExpiry: orCrExpiry,
                                                        user_motor_image_front: obj[6],
                                                        user_motor_image_left: obj[7],
                                                        user_motor_image_right: obj[8],
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
                                                        /**/
                                                    })
                                                    .then(() => {
                                                        editAccount();
                                                        setLoading(false);
                                                    });

                                            }
                                        }, 15000);//10 seconds
                                    });
                                });
                            }
                            else
                            //second hand
                            {
                                const pathMedical = medical.split("/").pop();
                                const pathBarangay = barangay.split("/").pop();
                                const pathNBI = nbi.split("/").pop();
                                const pathLicense = license.split("/").pop();
                                const pathMotorOr = motorOr.split("/").pop();
                                const pathMotorCr = motorCr.split("/").pop();
                                const pathMotorFront = motorFront.split("/").pop();
                                const pathMotorBack = motorBack.split("/").pop();
                                const pathMotorLeft = motorLeft.split("/").pop();
                                const pathMotorRight = motorRight.split("/").pop();
                                const pathOwnerDeed = owner_deed.split("/").pop();
                                const pathOwnerID = owner_id.split("/").pop();

                                let imgArray = [
                                    { path: pathMedical, local: medical },
                                    { path: pathBarangay, local: barangay },
                                    { path: pathNBI, local: nbi },
                                    { path: pathLicense, local: license },
                                    { path: pathMotorOr, local: motorOr },
                                    { path: pathMotorCr, local: motorCr },
                                    { path: pathMotorFront, local: motorFront },
                                    { path: pathMotorBack, local: motorBack },
                                    { path: pathMotorLeft, local: motorLeft },
                                    { path: pathMotorRight, local: motorRight },
                                    { path: pathOwnerDeed, local: owner_deed },
                                    { path: pathOwnerID, local: owner_id },
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
                                        console.log(obj)
                                        setTimeout(() => {
                                            if (obj[11]) {
                                                firestore()
                                                    .collection('review')
                                                    .doc(auth().currentUser?.uid)
                                                    .set({
                                                        user_edit: 'driver',
                                                        user_type: "Rider",
                                                        user_driver_medical: obj[0],
                                                        user_driver_barangay: obj[1],
                                                        user_driver_nbi: obj[2],
                                                        user_driver_license: obj[3],
                                                        user_motor_or: obj[4],
                                                        user_motor_cr: obj[5],
                                                        user_motor_image_front: obj[6],
                                                        user_motor_image_back: obj[7],
                                                        user_motor_image_left: obj[8],
                                                        user_motor_image_right: obj[9],
                                                        //ownership
                                                        user_ownership_deed: obj[10],
                                                        user_ownership_id: obj[11],
                                                        user_ownership: ownership,
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
                                                        setLoading(false);
                                                    });

                                            }
                                        }, 15000);//10 seconds
                                    });
                                });
                            }
                            //edit account pending
                            function editAccount() {
                                firestore()
                                    .collection('user')
                                    .doc(auth().currentUser?.uid)
                                    .update({
                                        user_account: "Rider-Pending"
                                    })
                                    .then(() => {
                                        console.log('User updated!');
                                        setLoading(false);
                                    });
                            }
                        }}>
                        Submit
                    </Button>
                </View>
            </View>
        </View>
    );
};