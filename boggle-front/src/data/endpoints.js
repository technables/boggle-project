import {
    API_HOST_URL,
    API_ROOT,
    API_INIT_BOARD,
    API_PROCESS_WORD
} from '../data/constants';

export default {
    BOGGLE: {
        INIT: GenerateURI(API_ROOT),
        NEW_GAME: GenerateURI(API_INIT_BOARD),
        PROCESS_WORD: GenerateURI(API_PROCESS_WORD)
    }
};

function GenerateURI(uri) {
    return API_HOST_URL + '/v1/' + uri;
}