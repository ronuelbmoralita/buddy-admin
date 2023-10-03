import React, { useState, useEffect } from 'react';
import { View, StatusBar } from 'react-native';

import { local_user, user } from '../global/localStorage';

import UserPending from './components/UserPending';
import UserRejected from './components/UserRejected';

export default function UserProgress({navigation}) {

    const getUser = user();

    const [userData, setUserData] = useState(getUser);

    useEffect(() => {
        const listener = local_user.addOnValueChangedListener((changedKey) => {
            const newObject = local_user.getString(changedKey);
            const object = JSON.parse(newObject)
            if (!object?.user_account) 
            {
                navigation.replace("UserLogin");
            }
            if (object?.user_account === "Rider-Verified" || object?.user_account === "Merchant-Verified") 
            {
                navigation.replace("UserLogin");
            }
            else
            {
                navigation.replace("UserProgress");
            }
            setUserData(object);
        })
        return () => {
            listener.remove()
        }
    }, []);

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <StatusBar
                barStyle={'dark-content'}
                translucent
                backgroundColor="transparent"
            />
            {userData?.user_account === "Rider-Pending" || userData?.user_account === "Merchant-Pending"
                ?
                <UserPending />
                :
                <UserRejected />
            }
        </View>
    );
};