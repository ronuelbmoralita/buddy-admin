import React from 'react';
import { Text, View, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { styles } from '../../global/styles';

export default function UserSelect({ navigation }) {

    function RenderUser(props) {
        return (
            <View style={{ gap: 20 }}>
                <TouchableOpacity style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    borderRadius: 1000,
                }}
                    onPress={props.onPress}>
                    <FastImage
                        style={{
                            height: 200,
                            width: 200,
                            margin: 20,
                        }}
                        //source={{uri: item.imageUrl}}
                        source={props.source}
                        priority={FastImage.priority.high}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </TouchableOpacity>
                <Button
                    mode="contained"
                    buttonColor='black'
                    style={{
                        borderRadius: 100
                    }}
                    contentStyle={{
                        padding: 10,
                    }}
                    labelStyle={{
                        letterSpacing: 2
                    }}
                    onPress={props.onPress}>
                    {props.title}
                </Button>
            </View>
        )
    }

    const [ownership, setOwnership] = React.useState('');

    return (
        <View style={[styles.buddyContainer, {
        }]}>
            <StatusBar
                barStyle={'dark-content'}
                translucent
                backgroundColor="transparent"
            />
            <View style={{
                flex: 1,
            }}>
                <FastImage
                    style={{
                        height: 250,
                        width:'100%',
                    }}
                    source={require('../../images/buddy-user.png')}
                    priority={FastImage.priority.high}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={{
                    fontSize: 25,
                    //fontWeight: 'bold',
                    alignSelf: 'center',
                    letterSpacing: 2,
                    color:'black'

                }}>Are you a Buddy rider or passenger?</Text>
             <View style={{
                position: 'absolute',
                bottom: 20,
                marginTop:20,
                width: '100%',
            }}>
                <RadioButton.Group
                    value={ownership}
                    onValueChange={value => {
                        setOwnership(value)
                        console.log(value)
                        setTimeout(() => {
                            navigation.navigate("UserName", {
                                user: value
                            })
                            setOwnership('');
                        }, 2000);
                    }}>
                    <View style={{ gap: 20, marginBottom: 20, }}>
                        <View style={{
                            width: '90%',
                            borderWidth: 1,
                            alignSelf: 'center',
                            borderRadius: 30,
                            overflow: 'hidden',
                        }}>
                            <RadioButton.Item
                                color='black'
                                disabled={ownership
                                    ?
                                    true
                                    :
                                    false
                                }
                                labelStyle={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    letterSpacing: 2
                                }}
                                label="I'm a Rider"
                                value="Rider" />
                        </View>
                        <View style={{
                            width: '90%',
                            borderWidth: 1,
                            alignSelf: 'center',
                            borderRadius: 30,
                            overflow: 'hidden',
                        }}>
                            <RadioButton.Item
                                color='black'
                                disabled={ownership
                                    ?
                                    true
                                    :
                                    false
                                }
                                labelStyle={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    letterSpacing: 2
                                }}
                                label="I'm a Passenger"
                                value="Passenger" />
                        </View>
                    </View>
                </RadioButton.Group>
                {ownership
                    ?
                    <ActivityIndicator
                        size="large"
                        color="black"
                    />
                    :
                    null
                }
            </View>
            </View>
        </View>
    );
};