import {User} from "./user";

export type State = {
    currentActivity:number,
    currentUser:User,
    tracks:Array<string>
}