import React from 'react'
import  './scoreboard.css';
import WordListCard from '../WordListCard';

const ScoreBoard = props =>{
    return (
        <div className="score-board">
            <WordListCard/>
        </div>
    );
}

export default ScoreBoard;