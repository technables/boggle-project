import React from 'react'
import { connect } from 'react-redux';
import Aux from '../../../hoc/_Aux';
import {actionList} from '../../../services/store'


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
        let totalIncorrect = 0;

        if(wordList){
            totalScore = Object.values(wordList).reduce((totalScore,next)=>{
                return totalScore+next;
            },0);

            totalCorrect = Object.keys(wordList).length;
            totalIncorrect = wrongAttempt;
        }

        return (
            <Aux>
                <div className="boggle-score">
                    <div className="">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Total Trials:</th>
                                    <td>{trials}</td>
                                </tr>
                                <tr>
                                    <th>Total Points:</th>
                                    <td>{totalScore}</td>
                                </tr>
                                <tr>
                                    <th>Total Correct:</th>
                                    <td>{totalCorrect}</td>
                                </tr>
                                <tr>
                                    <th>Total Incorrect:</th>
                                    <td>{totalIncorrect}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="boggle-action">
                        <button className="btn btn-secondary"
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