import React from 'react'
import {
    connect
} from 'react-redux';


class WordListCard extends React.Component {
    constructor(props) {
        super(props);
    }

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
                return <li key={index}>{word}</li>;
            });

            scores = Object.values(wordList);
            scoreHtml = scores.map(function(score,index){
                return <li key={index}>{score}</li>;
            });
        }

        return (
            <div >
                <div className="word-list-wrapper">
                    <div className="words">
                        <span className="h4">WORDS</span>
                        <ul>{wordListHtml}</ul>
                    </div>
                    <div className="scores">
                        <span className="h4">SCORES</span>
                        <ul>{scoreHtml}</ul>
                    </div>
                </div>
                <div className="total-score">
                    <span className="h4">Total Score</span>
                    <span className="h4">{score}</span>
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