import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { styles } from '../../../global/styles';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function MerchantDetails({ navigation, route }) {

    const {
        user
    } = route.params;

    const [businessOwner, setBusinessOwner] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [businessNumber, setBusinessNumber] = useState('');
    const [businessFB, setBusinessFB] = useState('');

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
        <View style={[styles.buddyContainer]}>
            <View style={{
                alignItems: 'center',
                gap: 20,
            }}>
                <TextInput
                    style={{
                        width: '90%',
                    }}
                    activeOutlineColor='black'
                    mode="outlined"
                    autoComplete="name"
                    label='Business Owner (Real Name)'
                    value={businessOwner}
                    onChangeText={text => setBusinessOwner(text)}
                />
                <TextInput
                    style={{
                        width: '90%',
                    }}
                    activeOutlineColor='black'
                    mode="outlined"
                    //autoComplete="given-name"
                    label='Business Name'
                    value={businessName}
                    onChangeText={text => setBusinessName(text)}
                />
                <TextInput
                    style={{
                        width: '90%',
                    }}
                    activeOutlineColor='black'
                    mode="outlined"
                    autoComplete="tel-device"
                    label='Business Number'
                    value={businessNumber}
                    onChangeText={text => setBusinessNumber(text)}
                />
                <View style={{
                    width: '100%',
                    alignItems: 'center',
                }}>
                    <TextInput
                        style={{
                            width: '90%',
                        }}
                        activeOutlineColor='black'
                        mode="outlined"
                        //autoComplete="email"
                        label='FB Business Page (Optional)'
                        value={businessFB}
                        onChangeText={text => setBusinessFB(text)}
                    />
                    <Text style={{ fontSize: 12, color: '#0865fe' }}>
                        Providing this information helps us to verify your identity.
                    </Text>
                </View>
            </View>
            <View style={[
                styles.buttonContainer,
                {
                    gap: 20
                },
            ]}>
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
                    disabled={
                        businessOwner && businessName && businessNumber
                            ?
                            loading === false
                                ?
                                false
                                :
                                true
                            :
                            true
                    }
                    loading={loading}
                    //disabled={loading}
                    style={styles.buttonStyle}
                    contentStyle={styles.buttonContentStyle}
                    labelStyle={styles.buttonLabelStyle}
                    onPress={() => {
                        setLoading(true);
                        setTimeout(() => {
                            firestore()
                                .collection('review')
                                .doc(auth().currentUser?.uid)
                                .set({
                                    user_edit: "merchant",
                                    user_merchant_owner: businessOwner,
                                    user_merchant_name: businessName,
                                    user_merchant_number: businessNumber,
                                    user_merchant_fb_page: businessFB,
                                })
                                .then(() => {
                                    editAccount();
                                    setLoading(false);
                                });
                        }, 5000);
                        //edit account pending
                        function editAccount() {
                            firestore()
                                .collection('user')
                                .doc(auth().currentUser?.uid)
                                .update({
                                    user_account: "Merchant-Pending",
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
    );
};