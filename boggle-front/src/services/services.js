import EndPoint from '../data/endpoints';
import {User_Data} from '../data/constants';

export const service = {
    initGame,
    processWord,
    back
};

function initGame(data) {
    var urlParam = '?type=' + data.boardType;
    return fetch(EndPoint.BOGGLE.NEW_GAME + urlParam)
        .then(res => {
            debugger;
            return res.json();
        })
        .then(response => {
            if (response && response.success && response.data) {

                var responseData = {
                    ...response,
                    boardType: data.boardType
                };
                localStorage.setItem(User_Data, JSON.stringify(responseData));
                return responseData;
            } else {
                return response;
            }
        })
        .catch(err => {
            return {
                success: false,
                message: err
            };
        });
}

function processWord(data) {
    let param = '?word=' + data.word;
    let requestUrl = EndPoint.BOGGLE.PROCESS_WORD + param;

    return fetch(requestUrl)
        .then(res => {
            debugger;
            return res.json();
        }).then(res => {
            if (res && res.success && res.data) {
                var response = {
                    ...res,
                    word: data.word
                };
                return response;
            } else {
                return res;
            }
        })
        .catch(err => {return {success:false, message: err};});

}

function back(){
    localStorage.removeItem(User_Data);
}