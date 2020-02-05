import React from 'react'
import {
    connect
} from 'react-redux';
import './wordlistcard.css'


class WordListCard extends React.Component {
   

    render() {
        const {
            wordList
        } = this.props;
        let score = 0;
        let words = [],
            scores = [];
        let wordListHtml = '',
            scoreHtml = '';

        if (wordList) {
            score = Object.values(wordList).reduce(
                (score, next) => {
                    return score + next;
                },0
            );
            words = Object.keys(wordList);
            wordListHtml = words.map(function(word,index){
                return <li  key={index}>{word}</li>;
            });

            scores = Object.values(wordList);
            scoreHtml = scores.map(function(score,index){
                return <li  key={index}>{score}</li>;
            });
        }

        return (
            <div >
                <div className="word-list-wrapper row">
                    <div className="words-list col-6">
                        <span className="h5">Words</span>
                        <ul className="list-group">{wordListHtml}</ul>
                    </div>
                    <div className="scores-list col-6">
                        <span className="h5">Scores</span>
                        <ul >{scoreHtml}</ul>
                    </div>
                </div>
                <div className="total-score">
                    <span className="h5 col-6">Total Score</span>
                    <span className="col-6 h5 score-title">{score}</span>
                </div>
            </div>
        );
    }
}

function mapStatetoProps(state) {
    const {
        wordList
    } = state.game;
    return {wordList};
}

WordListCard = connect(mapStatetoProps)(WordListCard);

export default WordListCard;