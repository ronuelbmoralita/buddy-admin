import { MMKV } from 'react-native-mmkv'

export const local_user = new MMKV({
    id: `userID`,
})

export const local_activity = new MMKV({
    id: `activityID`,
})

export const local_controller = new MMKV({
    id: `controllerID`,
})

export const local_launch = new MMKV({
    id: `launchID`,
})

export function user() {
    const json = local_user.getString('local_user')

    if (json) {
        return JSON.parse(json);//for each data
    }
    else {
        return [];
    }
}

export function controller() {
    const json = local_controller.getString('local_controller')
    if (json) {
        return JSON.parse(json);//for each data
    }
    else {
        return [];
    }
}

