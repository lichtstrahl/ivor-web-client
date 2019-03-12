import {User} from "./user";

export type Message = {
    content : string,
    author  : User|null,
    date    : Date
}