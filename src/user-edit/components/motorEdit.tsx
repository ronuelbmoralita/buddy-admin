import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function VerifyMotorcycle({ navigation, route }) {

    const {
        motorFront,
        motorLeft,
        motorRight,
        motorBack,
    } = route.params;

    function RenderDropdown(props) {
        return (
            <Dropdown
                style={{
                    height: 50,
                    borderColor: 'black',
                    borderWidth: 2,
                    borderRadius: 8,
                    paddingHorizontal: 8,
                    marginBottom: 20,
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
                search={false}
                maxHeight={300}
                labelField="label"
                valueField="value"
                data={props.data}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
        )
    }

    //textinput
    const [plateNumber, setPlateNumber] = useState("");
    const [engineNumber, setEngineNumber] = useState("");
    const [chassisNumber, setChassisNumber] = useState("");
    const [color, setColor] = useState("");
    const [series, setSeries] = useState("");
    //dropdown
    const [piston, setPiston] = useState(null);
    const [brand, setBrand] = useState(null);
    const [yearModel, setYearModel] = useState(null);
    const [transmission, setTransmission] = useState(null);

    var currentYear = new Date().getFullYear();
    const yearsArray = []
    var startYear = 2010;

    for (var i = startYear; i <= currentYear; i++) {
        yearsArray.push({
            label: "" + i + "",
            value: "" + i + "",
        });
    }

    //console.log(yearsArray)

    const brandArray = [
        { label: 'Bristol', value: 'Bristol' },
        { label: 'Honda', value: 'Honda' },
        { label: 'Kawasaki', value: 'Kawasaki' },
        { label: 'Kymco', value: 'Kymco' },
        { label: 'MotorStar', value: 'MotorStar' },
        { label: 'Rusi', value: 'Rusi' },
        { label: 'Suzuki', value: 'Suzuki' },
        { label: 'SYM', value: 'SYM' },
        { label: 'Vespa', value: 'Vespa' },
        { label: 'Yamaha', value: 'Yamaha' },
        { label: 'Others', value: 'Others' },
    ];

    const pistonArray = [
        { label: '100', value: '100' },
        { label: '110', value: '110' },
        { label: '115', value: '115' },
        { label: '125', value: '125' },
        { label: '135', value: '135' },
        { label: '150', value: '150' },
        { label: '155', value: '155' },
        { label: '160', value: '160' },
        { label: '170', value: '170' },
        { label: '175', value: '175' },
        { label: '180', value: '180' },
        { label: '190', value: '190' },
        { label: '200', value: '200' },
    ];

    const transmissionArray = [
        { label: 'Manual', value: 'Manual' },
        { label: 'Automatic', value: 'Automatic' },
    ];

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'white',
        }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{
                alignSelf: 'center',
                width: '90%',
                //backgroundColor:'red'
            }}>
                <Text style={{
                    color: 'black',
                    letterSpacing: 2,
                }}>
                    Check the Certificate of Registration or Official Receipt of your motor vehicle for the following:
                </Text>
                <View style={{
                    marginTop: 20,
                    marginBottom: 5,
                }}>
                    <TextInput
                        style={{
                            marginBottom: 15,
                        }}
                        activeOutlineColor='black'
                        mode='outlined'
                        label="Plate Number"
                        value={plateNumber}
                        onChangeText={text => setPlateNumber(text)}
                    />
                    <TextInput
                        style={{
                            marginBottom: 15,
                        }}
                        activeOutlineColor='black'
                        mode='outlined'
                        label="Engine Number"
                        value={engineNumber}
                        onChangeText={text => setEngineNumber(text)}
                    />
                    <TextInput
                        style={{
                            marginBottom: 15,
                        }}
                        activeOutlineColor='black'
                        mode='outlined'
                        label="Chassis Number"
                        value={chassisNumber}
                        onChangeText={text => setChassisNumber(text)}
                    />
                    <TextInput
                        style={{
                            marginBottom: 15,
                        }}
                        activeOutlineColor='black'
                        mode='outlined'
                        label="Color"
                        value={color}
                        onChangeText={text => setColor(text)}
                    />
                    <TextInput
                        style={{
                            marginBottom: 15,
                        }}
                        activeOutlineColor='black'
                        mode='outlined'
                        label="Motorcycle Model (series Number)"
                        value={series}
                        onChangeText={text => setSeries(text)}
                    />
                </View>
                <RenderDropdown
                    data={yearsArray}
                    placeholder="Motorcycle Year Model"
                    value={yearModel}
                    onChange={item => {
                        setYearModel(item.value);
                    }}
                />
                <RenderDropdown
                    data={brandArray}
                    placeholder="Motorcycle brand"
                    value={brand}
                    onChange={item => {
                        setBrand(item.value);
                    }}
                />
                <RenderDropdown
                    data={pistonArray}
                    placeholder="Piston Displacement"
                    value={piston}
                    onChange={item => {
                        setPiston(item.value);
                    }}
                />
                <RenderDropdown
                    data={transmissionArray}
                    placeholder="Transmission Type"
                    value={transmission}
                    onChange={item => {
                        setTransmission(item.value);
                    }}
                />
                <Button style={{
                    borderRadius: 100,
                    marginBottom: 20,
                }}
                    contentStyle={{
                        padding: 10,
                        borderRadius: 100
                    }}
                    labelStyle={{
                        letterSpacing: 2
                    }}
                    buttonColor='black'
                    mode="contained"
                    /*
                    disabled={
                        plateNumber &&
                            engineNumber &&
                            chassisNumber &&
                            series &&
                            piston &&
                            brand &&
                            yearModel &&
                            transmission
                            ? false : true
                    }
                    */
                    onPress={() => {
                        navigation.navigate('EditSubmit', {
                            //
                            motorFront: motorFront,
                            motorBack: motorBack,
                            motorLeft: motorLeft,
                            motorRight: motorRight,
                            //
                            plateNumber: plateNumber,
                            engineNumber: engineNumber,
                            chassisNumber: chassisNumber,
                            color: color,
                            series: series,
                            //
                            piston: piston,
                            brand: brand,
                            yearModel: yearModel,
                            transmission: transmission,
                            //
                            edit: 'motorcycle',
                        });
                    }}>
                    Next
                </Button>
            </ScrollView>
        </View>
    );
};

