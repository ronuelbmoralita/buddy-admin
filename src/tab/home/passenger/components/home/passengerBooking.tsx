import { View, FlatList, ScrollView, Text, Animated } from "react-native";
import { IconButton, Button, TextInput } from "react-native-paper";
import { Switch } from 'react-native-paper';

export default function PassengerBooking(props) {
    return (
        <Animated.View style={{
            //flex: 1,
            width: '100%',
            bottom: 0,
            backgroundColor: 'white',
            elevation: 20,
            transform: [{ scale: props.animatedValue }]
        }}>
            <View style={{
                marginVertical: 20,
            }}>
                <Text style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    letterSpacing: 2,
                    color: 'black',
                    alignSelf: 'center',
                }}>
                    {props.fare}
                </Text>
            </View>
            {/*)}
            <ScrollView
                showsVerticalScrollIndicator={true}
                persistentScrollbar
                indicatorStyle="black"
                style={{
                    //backgroundColor: 'white',
                    //backgroundColor: 'red',
                    //borderTopLeftRadius: 20,
                    //borderTopRightRadius: 20,
                    //elevation: 20,
                }}>
            */}
            <View style={{
                marginHorizontal: 20,
            }}>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    gap: 20,
                    alignItems: 'center',
                }}>
                    <IconButton
                        style={{
                            padding: 0,
                            margin: -10,
                        }}
                        icon="crosshairs-gps"
                        iconColor='black'
                        size={30} />
                    <View style={{ flex: 1 }}>
                        <Text style={{
                            color: 'gray',
                            letterSpacing: 2,
                        }}>
                            Pick-up Location
                        </Text>
                        <Text style={{
                            fontWeight: 'bold',
                            color: 'black',
                            letterSpacing: 2,
                        }}>
                            {props.pickUp}
                        </Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    gap: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                }}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                    }}>
                        <View style={{
                            justifyContent: 'center',
                            height: 30,
                            width: 1,
                            borderWidth: 1,
                            borderColor: 'black',
                            borderStyle: 'dashed'
                        }} />
                    </View>
                    <View style={{ flex: 11, backgroundColor: 'red' }}>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    gap: 20,
                    alignItems: 'center',
                }}>
                    <IconButton
                        style={{
                            padding: 0,
                            margin: -10,
                        }}
                        icon="map-marker"
                        iconColor='red'
                        size={30} />
                    <View style={{ flex: 1 }}>
                        <Text style={{
                            color: 'gray',
                            letterSpacing: 2,
                        }}>
                            Drop-off Location
                        </Text>
                        <Text style={{
                            fontWeight: 'bold',
                            color: 'black',
                            letterSpacing: 2,
                        }}>
                            {props.dropOff}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{
                width: '90%',
                backgroundColor: 'white',
                borderRadius: 10,
                marginVertical: 20,
                alignSelf: 'center',
                elevation: 5,
            }}>
                <View style={{
                    marginVertical: 20,
                    marginHorizontal: 20,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 20,
                        marginBottom: 10,
                    }}>
                        <IconButton
                            style={{
                                padding: 0,
                                margin: -10,
                            }}
                            icon="ticket-percent"
                            iconColor='black'
                            size={50} />
                        <View>
                            <Text style={{
                                flex: 1,
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: 'black',
                                letterSpacing: 2,
                            }}>
                                {props.promoCode}
                            </Text>
                            <Text style={{
                                flex: 1,
                                color: 'gray',
                                letterSpacing: 2,
                            }}>
                                {props.promoPercent} discount
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    width: '90%',
                    marginBottom: 20,
                    gap: 10,
                    alignItems: 'center',
                }}>
                    <Button
                        mode="outlined"
                        textColor="black"
                        style={{
                            flex: 1
                        }}
                        labelStyle={{
                            letterSpacing: 2
                        }}
                        disabled={props.promoDisabled}
                        onPress={props.promoOnPress}>
                        {props.buttonTitle}
                    </Button>
                </View>
            </View>
            <View style={{
                flexDirection: 'row',
                alignSelf: 'center',
                gap: 20,
                alignItems: 'center',
                marginBottom: 20,
            }}>
                <View style={{
                    padding: 10,
                    backgroundColor: '#FED141',
                    borderRadius: 100
                }}>
                    <Text style={{
                        color: 'black',
                        letterSpacing: 2,
                    }}>₱ {props.coin}</Text>
                </View>
                <Text style={{ color: 'black', letterSpacing: 2 }}>Redeem coins</Text>
                <Switch
                    color="black"
                    value={props.coinValue}
                    onValueChange={props.coinValueChange}
                    disabled={props.coinDisabled}
                />
            </View>
            <Button
                style={{
                    marginBottom: 20,
                    alignSelf: 'center',
                    width: '90%',
                    borderRadius: 50,
                }}
                contentStyle={{
                    padding: 10,
                }}
                labelStyle={{
                    letterSpacing: 2
                }}
                mode='contained'
                buttonColor='black'
                textColor='white'
                loading={props.buttonLoading}
                onPress={props.buttonOnPress}>
                {props.buttonBook}
            </Button>
        </Animated.View>
    )
};