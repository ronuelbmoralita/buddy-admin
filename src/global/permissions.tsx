import { Platform, PermissionsAndroid } from "react-native";

export async function GetAllPermissions() {
    try {
        if (Platform.OS === "android") {
            const userResponse = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
            ]);
            console.log(userResponse);
            return userResponse;
        }
    } catch (err) {
        console.log(err);
    }
    return null;
};