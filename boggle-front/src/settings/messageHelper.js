import {
    MessageType
} from '../data/constants';

export function MessageHelper(type) {
    if (type) {
        switch (type) {
            case MessageType.WELCOME:
                    return "welcome to boggle. you have 2 minutes to find as many words";
            case MessageType.SUCCESS:
                return "congratulations!! you got it right";
            case MessageType.WRONG:
                return "oops!! we could not find the word.";
            case MessageType.EXISTS:
                return "you already have this word in your list";
            case MessageType.END:
                return "thank you for playing";
            default:
                return "you have no choices";
        }
    }

    return "";
}