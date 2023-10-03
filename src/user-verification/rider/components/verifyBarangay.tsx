import React, { useState, useRef } from 'react'
import {
    View,
    ActivityIndicator,
} from 'react-native';

import {
    useCameraDevices,
} from 'react-native-vision-camera';

import CaptureImage from '../../../global/captureImage';

export default function VerifyBarangay({ navigation, route }) {

    const {
        ownership,
        owner_deed,
        owner_id,
        medical,
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
                navigation.navigate('VerifyNBI', {
                    ownership: ownership,
                    owner_deed: owner_deed,
                    owner_id: owner_id,
                    medical: medical,
                    barangay: snapshotPath,
                })
            }}
        />
    );
};