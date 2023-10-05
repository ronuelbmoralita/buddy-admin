import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import FastImage from 'react-native-fast-image'

export default function DropdownPasakay(props) {
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
                    color: 'black'
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
                onFocus={props.municipalOnFocus}
                search={false}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Municipality"
                data={props.municipalData}
                value={props.municipalValue}
                onChange={props.municipalOnChange}
            />
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
                    color: 'black'
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
                onFocus={props.brgyOnFocus}
                search={false}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Barangay"
                data={props.brgyData}
                value={props.brgyValue}
                onChange={props.brgyOnChange}
            />
        </View>
    );
};
