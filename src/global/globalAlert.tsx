import React, { createContext, useContext, useState, useRef } from 'react';
import { Text, View, TouchableOpacity, Modal, Animated } from 'react-native';
import { Button } from 'react-native-paper';
// Create a context for the global alert
const GlobalAlertContext = createContext();

export const useGlobalAlert = () => useContext(GlobalAlertContext);

export const GlobalAlertProvider = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('');
    const translateY = new Animated.Value(0);


    //animation
    const animatedValue = useRef(new Animated.Value(1)).current;

    function spring() {
        animatedValue.setValue(0)
        Animated.spring(animatedValue, {
            toValue: 1,
            useNativeDriver: true,
            friction: 5
        }).start()
    }

    const showAlert = (msg) => {
        spring();
        setMessage(msg);
        setIsVisible(true);
    };

    const closeAlert = () => {
        setIsVisible(false);
        setMessage('');
        spring();
    };

    return (
        <GlobalAlertContext.Provider value={showAlert}>
            {children}
            <Modal statusBarTranslucent visible={isVisible} transparent animationType="fade">
                <TouchableOpacity style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                }}
                    activeOpacity={1}
                //onPress={closeAlert}
                >
                    <Animated.View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            backgroundColor: 'white',
                            //transform: [{ translateY }],
                            width: '90%',
                            margin: 20,
                            alignSelf: 'center',
                            alignItems: 'center',
                            elevation: 20,
                            transform: [{ scale: animatedValue }],
                            borderRadius: 20,
                        }}>
                        <View style={{
                            marginVertical: 20,
                            gap:20,
                        }}>
                            <Text style={{ color: 'black', fontSize: 18 }}>{message}</Text>
                            <View style={{
                                //flexDirection:'row',
                                gap:20,
                                }}>
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
                                onPress={() => {
                                    closeAlert();
                                }}>
                                Okay
                            </Button>
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
                                onPress={() => {
                                    closeAlert();
                                }}>
                                Cancel
                            </Button>
                            </View>
                        </View>
                    </Animated.View>
                </TouchableOpacity>
            </Modal>
        </GlobalAlertContext.Provider>
    );
};
