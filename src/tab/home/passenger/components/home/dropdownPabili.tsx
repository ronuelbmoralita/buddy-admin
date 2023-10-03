import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Dropdown } from 'react-native-element-dropdown';

import { merchantData } from '../../../../../global/merchantData';

export default function DropdownPabili(props) {

    const renderItem = item => {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
            }}>
                <FastImage
                    style={{
                        width: 60,
                        height: 60,
                        margin: 10
                    }}
                    source={item.imageUrl}
                    priority={FastImage.priority.low}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={{ fontWeight: 'bold', color: 'black', letterSpacing: 2 }}>{item.label}</Text>
            </View>
        );
    };

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

    return (
        <View>
            <Dropdown
                style={{
                    height: 50,
                    borderColor: 'black',
                    borderWidth: 2,
                    borderRadius: 8,
                    paddingHorizontal: 8,
                    marginBottom: 10,
                    width: '90%',
                    alignSelf: 'center',
                    backgroundColor: 'white'
                }}
                containerStyle={{
                    //borderRadius: 20,
                }}
                placeholderStyle={{
                    fontSize: 16,
                    color: 'black',
                }}
                itemTextStyle={{
                    color: 'black',
                }}
                selectedTextStyle={{
                    fontSize: 16,
                    color: 'black',
                }}
                inputSearchStyle={{
                    height: 40,
                    fontSize: 16,
                    color: 'black'
                }}
                onFocus={props.onFocus}
                search={true}
                //maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Merchant"
                data={shuffle(merchantData)}
                value={props.merchantValue}
                onChange={props.merchantOnChange}
                renderItem={renderItem}
                renderLeftIcon={() => (
                    props.merchantImageVisible === false
                        ?
                        <FastImage
                            style={{
                                width: 30,
                                height: 30,
                                marginRight: 10,
                            }}
                            source={require("../../../../../images/merchant.png")}
                            priority={FastImage.priority.low}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        :
                        <FastImage
                            style={{
                                width: 30,
                                height: 30,
                                marginRight: 10,
                            }}
                            source={props.merchantImage}
                            priority={FastImage.priority.low}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                )}
            />
        </View>
    );
};
