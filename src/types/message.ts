import {User} from "./user";

export type Message = {
    content : string,
    author  : User,
    date    : Date
}