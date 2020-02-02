import React from 'react';
import "./currentword.css";


const CurrentWord = props => {
    const {currentWord} = props;
    return (
        <div className="word-wrapper">
            <span className="word-title">Current Word : </span>
            <span className="word-text">{currentWord}</span>
        </div>
    )
}

export default CurrentWord;

