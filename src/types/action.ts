import {User} from "./user";

export enum ActionType {
    ACTION_SET_USER,
    ACTION_SET_ACTIVITY,
    ACTION_ADD_TRACK
}

export type Action<T> = {
    type: ActionType,
    data: T
}



export function setCurrentUser(user: User):Action<User> {
    return {
        type: ActionType.ACTION_SET_USER,
        data: user
    };
}

export function parseSetCurrentUserAction(action: Action<any>):User {
    return action.data;
}


export function setCurrentActivity(activity: number):Action<number> {
    return {
        type: ActionType.ACTION_SET_ACTIVITY,
        data: activity
    };
}

export function parseSetCurrentActivity(action: Action<any>) :number {
    return action.data;
}

export function addNewTrack(name: string):Action<string> {
    return {
        type: ActionType.ACTION_ADD_TRACK,
        data: name
    }
}

export function parseAddTrackAction(action: Action<any>) :string {
    return action.data;
}