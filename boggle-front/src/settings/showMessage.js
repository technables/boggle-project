import {toast} from 'react-toastify';
import {MessageType} from '../data/constants';

export function ShowMessage(type, msg){

        var options = {
            position: toast.POSITION.TOP_RIGHT
        };
        switch(type){
            case MessageType.WELCOME: 
            case MessageType.SUCCESS:
                case MessageType.END:
                toast.success(msg, options);
                break;
            case MessageType.EXISTS:
                toast.warn(msg, options);
                break;
            case MessageType.WRONG:
                toast.error(msg, options);
                break;
            case MessageType.ERROR:
                toast.error(msg, options);
                break;
            default:
                break;
            
        }

}