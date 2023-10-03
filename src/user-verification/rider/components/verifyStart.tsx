import React from 'react';
import { Text, View, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { IconButton, Button, TextInput, Checkbox } from 'react-native-paper';

export default function VerifyStart({ navigation }) {

    return (
        <View style={{
            flex: 1,
            //justifyContent: 'center',
            backgroundColor: 'white'
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
                    Kumita ng higit sa Provincial Rate!
                </Text>
                <FastImage
                    style={{
                        height: 300,
                        width: 300,
                        alignSelf: 'center',
                    }}
                    source={require('../../../images/pasakay-variant.png')}
                    priority={FastImage.priority.high}
                    resizeMode={FastImage.resizeMode.contain}
                />
                {/*}
                <Text style={{
                    //fontSize: 16,
                    color: 'black',
                    letterSpacing: 2,
                    alignSelf:'center',
                }}>
                    In order to avoid registration rejection, kindly ensure that all requirements are fully completed and have a valid date.
                </Text>
            */}
                <Text style={{
                    color: 'gray',
                    letterSpacing: 2,
                }}>
                    Our team will conduct a background check to verify the authenticity of our Büddy Riders. 
                    {" "}
                    <Text style={{
                        color: 'red',
                        letterSpacing: 2,
                    }}>        
                    Providing incorrect information or inappropriate images will result in the immediate deletion of your account.
                    </Text>
                    {/*}
                    By continuing, you accept the
                    {" "}
                    <Text style={{
                        fontWeight: 'bold',
                        color: 'black',
                        letterSpacing: 2,
                    }}
                        onPress={() => {
                            navigation.navigate("UserTermsConditions");
                        }}>
                        Terms and Conditions,
                    </Text>
                    {" "}
                    as well as the Buddy App
                    {" "}
                    <Text style={{
                        fontWeight: 'bold',
                        color: 'black',
                        letterSpacing: 2,
                    }}
                        onPress={() => {
                            navigation.navigate("UserPrivacyPolicy");
                        }}>
                        Privacy Policy.
                    </Text>
                    */}
                </Text>
            </View>
            <View style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                alignItems: 'center',
            }}>
                <Button style={{
                    width: '90%',
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
                    //disabled={props.disabled}
                    //loading={props.loading}
                    //buttonColor='black'
                    //icon={props.icon}
                    textColor='black'
                    mode="outlined"
                    onPress={() => {
                        navigation.navigate("VerifyRequirements");
                    }}>
                    View Requirements
                </Button>
                <Button style={{
                    width: '90%',
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
                    //disabled={props.disabled}
                    //loading={props.loading}
                    buttonColor='black'
                    //icon={props.icon}
                    mode="contained"
                    onPress={() => {
                        navigation.navigate("VerifyOwner");
                    }}>
                    Let's Start
                </Button>
            </View>
        </View>
    );
};