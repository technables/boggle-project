import {User_Data} from '../data/constants'

export function getUserData(){
    var user = localStorage.getItem(User_Data);
    try{
        user = user? JSON.parse(user):null;
    }
    catch (e) {
        user = null;
    }

    return user;
}