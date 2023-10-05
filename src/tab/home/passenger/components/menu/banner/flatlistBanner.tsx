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

import { bannerData } from './bannerData';

export default function FlatlistBanner() {

    const navigation = useNavigation();

    const Item = ({ item }) => {
        return (
            <View style={{
                flex: 1,
                borderRadius: 5,
                marginVertical: 20,
                //width: width * 0.89,
                width: 300,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: item.color
            }}>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <FastImage
                        style={{
                            width: 150,
                            height: 150,
                            zIndex: 1,
                        }}
                        source={item.imageUrl}
                        priority={FastImage.priority.low}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        marginRight: 10,
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            letterSpacing: 2,
                            color: 'black',
                        }}>{item.title}</Text>
                    </View>
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
                    Discover
                </Text>
            </View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={shuffle(bannerData)}
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
                        <View style={{ width: 20 }} />
                    )
                }}
            />
        </View>
    );
};
