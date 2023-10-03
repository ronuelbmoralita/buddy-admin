import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import VerifyStart from './components/verifyStart';
import VerifyRequirements from './components/verifyRequirements';
//new
import VerifyMedical from './components/verifyMedical';
import VerifyBrgy from './components/verifyBarangay';
import VerifyNBI from './components/verfiyNBI';
import VerifyLicense from './components/verifyLicense';
//not owner
import VerifyOwner from './components/verifyOwner';
import VerifyOwnerDeed from './components/verifyOwnerDeed';
import VerifyOwnerID from './components/verifyOwnerID';
//
import VerifyMotorOr from './components/verifyMotorOr';
import VerifyMotorCr from './components/verifyMotorCr';

import VerifyMotorFront from './components/verifyImageFront';
import VerifyMotorBack from './components/verifyImageBack';
import VerifyMotorLeft from './components/verifyImageLeft';
import VerifyMotorRight from './components/verifyImageRight';

import VerifyMotorcycle from './components/verifyMotorcycle';
import VerifySubmit from './components/verifySubmit';

const Stack = createNativeStackNavigator();

export default function VerificationNavigator() {
    return (
        <Stack.Navigator initialRouteName="VerifyStart">
            <Stack.Screen name="VerifyStart" component={VerifyStart}
                options={{
                    headerTitle: '',
                    headerShadowVisible: false,
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen name="VerifyRequirements" component={VerifyRequirements}
                options={{
                    headerTitle: 'Rider Requirements',
                    headerShadowVisible: false,
                    animation: "slide_from_right",
                }}
            />
            {/*New*/}
            <Stack.Screen name="VerifyMedical" component={VerifyMedical}
                options={{
                    headerTitle: 'Medical',
                    headerShadowVisible: false,
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen name="VerifyBrgy" component={VerifyBrgy}
                options={{
                    headerTitle: 'Barangay Clearance',
                    headerShadowVisible: false,
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen name="VerifyNBI" component={VerifyNBI}
                options={{
                    headerTitle: 'NBI',
                    headerShadowVisible: false,
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen name="VerifyLicense" component={VerifyLicense}
                options={{
                    headerTitle: 'Driver License',
                    headerShadowVisible: false,
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen name="VerifyOwner" component={VerifyOwner}
                options={{
                    headerTitle: 'Vehical Ownership',
                    headerShadowVisible: false,
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen name="VerifyOwnerDeed" component={VerifyOwnerDeed}
                options={{
                    headerTitle: 'Deed of Sale or Authorization Letter',
                    headerShadowVisible: false,
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen name="VerifyOwnerID" component={VerifyOwnerID}
                options={{
                    headerTitle: 'Real Owner Valid ID',
                    headerShadowVisible: false,
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen name="VerifyMotorOr" component={VerifyMotorOr}
                options={{
                    headerTitle: 'Official Receipt (OR)',
                    headerShadowVisible: false,
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen name="VerifyMotorCr" component={VerifyMotorCr}
                options={{
                    headerTitle: 'Certificate of Registration (CR)',
                    headerShadowVisible: false,
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen name="VerifyMotorFront" component={VerifyMotorFront}
                options={{
                    headerTitle: 'Motorcycle Image Front',
                    headerShadowVisible: false,
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen name="VerifyMotorBack" component={VerifyMotorBack}
                options={{
                    headerTitle: 'Motorcycle Image Back',
                    headerShadowVisible: false,
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen name="VerifyMotorLeft" component={VerifyMotorLeft}
                options={{
                    headerTitle: 'Motorcycle Image Left',
                    headerShadowVisible: false,
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen name="VerifyMotorRight" component={VerifyMotorRight}
                options={{
                    headerTitle: 'Motorcycle Image Right',
                    headerShadowVisible: false,
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen name="VerifyMotorcycle" component={VerifyMotorcycle}
                options={{
                    headerTitle: 'Motorcycle Details',
                    headerShadowVisible: false,
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen name="VerifySubmit" component={VerifySubmit}
                options={{
                    headerTitle: '',
                    headerShadowVisible: false,
                    animation: "slide_from_right",
                }}
            />
        </Stack.Navigator>
    );
}

