import React, { useState, useRef } from 'react'
import {
    View,
    ActivityIndicator,
} from 'react-native';

import {
    useCameraDevices,
} from 'react-native-vision-camera';

import CaptureImage from '../../global/captureImage';

export default function EditMotorRight({ navigation, route }) {

    const {
        motorFront,
        motorBack,
        motorLeft,
    } = route.params;

    const camera = useRef(null);

    const devices = useCameraDevices();
    const cameraDevice = devices.back;

    const [snapshotPath, setSnapshotPath] = useState(null);

    const handleTakeSnapshot = async () => {
        try {
            const snapshot = await camera?.current?.takeSnapshot({
                quality: 100,
                skipMetadata: true,
            });
            console.log(snapshot)
            setSnapshotPath(`file://${snapshot.path}`);
            console.log(snapshotPath)
            //
        } catch (e) {
            console.log(e);
        }
    };

    if (cameraDevice == null) {
        return <View style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <ActivityIndicator size="large" color="black" />
        </View>;
    }

    return (
        <CaptureImage
            camera={camera}
            cameraDevice={cameraDevice}
            check={snapshotPath}
            imageCategory={'document'}
            imageUri={snapshotPath}
            onPressSnap={() => {
                handleTakeSnapshot();
            }}
            //retake
            titleRetake="Retake"
            onPressRetake={() => {
                setSnapshotPath(null);
            }}
            //next
            disabledNext={snapshotPath === null
                ?
                true
                :
                false
            }
            titleNext="Next"
            onPressNext={() => {
                navigation.navigate('EditMotorcycle', {
                    motorFront: motorFront,
                    motorBack: motorBack,
                    motorLeft: motorLeft,
                    motorRight: snapshotPath,
                })
            }}
        />
    );
};