import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Linking,
    Image,
    Dimensions
} from 'react-native';
import { Divider } from 'react-native-paper';
import FastImage from 'react-native-fast-image'

import { useNavigation } from '@react-navigation/native';

import { merchantData } from '../../../../../../global/merchantData';

export default function FlatlistMerchant() {

    const navigation = useNavigation();

    const Item = ({ item }) => {
        return (
            <View style={{
                flex: 1,
                borderRadius: 5,
                elevation: 5,
                marginVertical: 20,
                backgroundColor: 'white',
                //backgroundColor: 'rgba(0,0,0,0.04)',
                width: 300,
                //height: 200,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <View style={{ alignItems: 'center', gap: 20 }}>
                    <FastImage
                        style={{
                            width: 150,
                            height: 150,
                            marginVertical: 10,
                        }}
                        source={item.imageUrl}
                        priority={FastImage.priority.high}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </View>
            </View>
        );
    }

    //random objects algorithm
    function shuffle(sourceArray) {
        for (var i = 0; i < sourceArray.length - 1; i++) {
            var j = i + Math.floor(Math.random() * (sourceArray.length - i));

            var temp = sourceArray[j];
            sourceArray[j] = sourceArray[i];
            sourceArray[i] = temp;
        }
        return sourceArray;
    }

    //distinct objects algorithm
    const distinctMerchant = [...new Map(merchantData.map(item =>
        [item['merchant'], item])).values()];

    const width = Dimensions.get('window').width;

    return (
        <View style={{
            flex: 1
        }}>
            <View style={{
                marginHorizontal: 20,
            }}>
                <Text
                    style={{
                        fontSize: 15,
                        color: 'black',
                        fontWeight: 'bold',
                        letterSpacing: 2,
                    }}>
                    Our Merchants
                </Text>
            </View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={shuffle(distinctMerchant)}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.key}
                ListHeaderComponent={() => {
                    return (
                        <View style={{ width: 20 }} />
                    )
                }}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={{ width: 20 }} />
                    )
                }}
                ListFooterComponent={() => {
                    return (
                        <View style={{ width: 20 }} />
                    )
                }}
                ListEmptyComponent={() => {
                    return (
                        <View style={{
                            flex: 1,
                        }}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                width: width * 0.89,
                                height: 200,
                                borderRadius: 10,
                                elevation: 5,
                                marginVertical: 20,
                            }}>
                                <FastImage
                                    style={{
                                        width: 100,
                                        height: 100,
                                    }}
                                    //source={{uri: item.imageUrl}}
                                    source={require("../../../../../../images/merchant.png")}
                                    priority={FastImage.priority.high}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                                <View style={{ marginHorizontal: 20 }}>
                                    <Text style={{
                                        color: 'black',
                                        letterSpacing: 2,
                                        textAlign: 'center',
                                    }}>
                                        Introducing  Merchant for your local business.
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    );
};
