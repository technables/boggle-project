import React from 'react'
import { connect } from 'react-redux';
import Aux from '../../../hoc/_Aux';
import {actionList} from '../../../services/store';
import './scoreboard.css'


class ScoreBoard extends React.Component{
    constructor(props){
        super(props);
        this.state = {};

        if(this.props.trails<=0 && !this.props.wordList){
            this.backtoHome();
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(){
        this.backtoHome();
    }

    backtoHome=()=>{
        const { dispatch } = this.props;
        dispatch(actionList.clearBoard());
    }

    render(){
        let {trials, wordList, wrongAttempt} = this.props;

        let totalScore = 0;
        let totalCorrect = 0;


        

        
        let remarks = "Oops!! There seems you fail to find any word";

        
        let remarkClass = "timer-red"
        if(wordList){
            totalScore = Object.values(wordList).reduce((totalScore,next)=>{
                return totalScore+next;
            },0);

            totalCorrect = Object.keys(wordList).length;

            if(totalScore<10){
                remarkClass = 'timer-yellow';
                let remarkArray = [
                    "Oops!! Low score. You can always do better",
                    "Oops!! Low score. Better luck next time"
                ];
                var randomChoice = Math.floor(Math.random() * remarkArray.length);
                remarks = remarkArray[randomChoice];
            }
            else if(totalScore>10){
                remarkClass="timer-green";
                let remarkArray = [
                    "Congratulations!! You are better with puzzle",
                    "Congratulations!! You did an amazing job",
                    "Congratulations!! You are amazing"
                ];
                var randomChoice = Math.floor(Math.random() * remarkArray.length);
                remarks = remarkArray[randomChoice];
            }
        }

        return (
            <Aux>
                <div className=" score-board-wrapper text-center">
                    <p className="text-left scoreboard-title" >Your scorecard looks like this: </p>
                    <div className="col-12">
                        <table className="table table-striped">
                            <tbody>
                                <tr>
                                    <th>Total Correct:</th>
                                    <td> {totalCorrect} ( out of {trials} trials)</td>
                                </tr>
                                <tr>
                                    <th>Total Points:</th>
                                    <td>{totalScore}</td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <span className={remarkClass}>{remarks}</span>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                    <div className="boggle-action col-12 text-center">
                        <button className="btn btn-primary"
                        onClick={this.handleSubmit}>
                            Back to Home
                        </button>

                    </div>
                </div>
            </Aux>
        )

    }

   
}

function mapStatetoProps(state){
    const {wordList, trials, wrongAttempt} = state.game;
    return {wordList,trials,wrongAttempt};
}

ScoreBoard = connect(mapStatetoProps)(ScoreBoard);
export default ScoreBoard;