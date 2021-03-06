import React from "react"
import { connect } from "react-redux";
import BoardLayout from '../../controls/BoardLayout';
import CurrentWord from '../../controls/CurrentWord';
import ScoreBoard from '../../controls/ScoreBoard';
import {actionList} from '../../../services/store';
import {shuffleBoard,
areCellEqual,
areAdjacent,
toggleHints,
clearHints,
copyBoard} from '../../../settings/boardUtil';
import {Route_ScoreBoard} from '../../../data/constants';
import {confirmAlert} from 'react-confirm-alert';
import MenuBar from '../../controls/MenuBar';

import Aux from '../../../hoc/_Aux';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

import './board.css';

import {MessageType} from '../../../data/constants';
import {ShowMessage} from '../../../settings/showMessage';
import {MessageHelper} from '../../../settings/messageHelper';


class Board extends React.Component{
    constructor(props){
        super(props);
        let {data, boardType} = props.currentUser;
        let boardData = data.board_data;

        this.initGameBoard = shuffleBoard(boardData, boardType);

        this.state = {
            board: this.initGameBoard,
            currentWord : "",
            currentWordPosition: []
        }
        //this.handleClick = this.handleSubmit.bind(this);
    this.onEndButtonClick = this.onEndButtonClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onUserAction = this.onUserAction.bind(this);
        
    }

    onUserAction(action){
        switch(action){
            case "home":
                this.backtoHome();
                //window.location.reload();
                //this.props.history.push('/');
                break;
            default:
                alert("no action defined");
        }
    };

    backtoHome = () => {
        const { dispatch } = this.props;
        dispatch(actionList.clearBoard());
    };

    handleclick(row, column) {
            const currentCell = this.state.board[row][column];
            const lastCell = this.state.currentWordPosition[
                this.state.currentWordPosition.length-1];
            if(currentCell.selected){
                    
                //checking if clicked on same cell, if so setting state as unselected
                if(areCellEqual(currentCell, lastCell)){
                    let newBoard = copyBoard(this.state.board);
                    newBoard[row][column].selected = false;
                    let currentPosition = this.state.currentWordPosition.slice(0,-1);
                    if(currentPosition<=0){
                        newBoard = clearHints(newBoard);
                    } else {
                        let currentRow = currentPosition[currentPosition.length-1].row;
                        let currentColumn = currentPosition[currentPosition.length-1].column;
                        newBoard = toggleHints(newBoard, currentRow,currentColumn);
                    }

                    //updating state
                    this.setState({
                        currentWord: this.state.currentWord.slice(0,-1),
                        board:newBoard,
                        currentWordPosition : currentPosition
                    })

                } 
            }
            else {
                if(!lastCell || areAdjacent(currentCell, lastCell)){
                    var newBoard = copyBoard(this.state.board);
                    newBoard[row][column].selected = true;

                    newBoard = toggleHints(newBoard, row, column);

                    this.setState({
                        currentWord: this.state.currentWord.concat(
                            newBoard[row][column].letter
                        ),
                        board:newBoard,
                        currentWordPosition : this.state.currentWordPosition.concat({
                            row:row,
                            column: column
                        })
                    });
                }
            }
        
      }

      handleSubmit(){
        let currentWord = this.state.currentWord;
        let currentWordList = this.props.wordList;
        if(currentWord.length<3)
            return;
         if(currentWordList && currentWordList[currentWord]){
            ShowMessage(MessageType.EXISTS,
                MessageHelper(MessageType.EXISTS));
            this.clearCurrentAction();
         } 
         else {
         const {dispatch} = this.props;
         dispatch(actionList.processWord(
             {
                 word: currentWord
             },
             () =>{
                 this.clearCurrentAction();
             }
         ));
            }

      }

      clearCurrentAction(){
        const newBoard = this.initGameBoard;
        this.setState({
            currentWord: '',
            currentWordPosition: [],
            board: newBoard
        });
      };

      onEndButtonClick(){
        var props = this.props;
        confirmAlert({
          title: "Quit Game",
          message: "Are you sure you want to end current game ?",
          buttons: [
            {
              label: "Yes",
              onClick: () => {
                props.history.push(Route_ScoreBoard);
              }
            },
            {
              label: "No! I want to stay in the game ",
              onClick: () => console.log("stay in the game")
            }
          ]
        });
      }


    render(){
        return (
            <Aux>
                <MenuBar onClick={this.onUserAction}/>
            <div className='row board-wrapper'>
                <div className="col-7">
                <div className="row word-container">
                    <div className="col-7 text-left">
                    <CurrentWord currentWord={this.state.currentWord}/>

                    </div>
                    <div className="col-5 text-center">
                        <button className="btn btn-primary" onClick={this.handleSubmit}>
                                <span>Submit Word</span>
                            </button>
                        
                    </div>
                </div>

                <BoardLayout board={this.state.board}
                 handleclick = {this.handleclick.bind(this)}
                 />
            </div>
            <div className="col-4">
                    <ScoreBoard/>
                    <button 
                    className="btn btn-danger btn-end col-12 btn-leave"
                    onClick= {this.onEndButtonClick}
                    >
                        <span>Leave Game</span>
                    </button>
            </div>
            </div>
</Aux>
           
        )
    }
}

function mapStateToProps(state) {
    const { currentUser, wordList } = state.game;
    return { currentUser, wordList };
  }
  
  Board = connect(mapStateToProps)(Board);

export default Board;