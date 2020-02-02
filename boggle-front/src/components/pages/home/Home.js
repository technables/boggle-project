import React from "react";
import Aux from '../../../hoc/_Aux';
import './Home.css';

import {actionList} from '../../../services/store';
import { connect } from "react-redux";


class Home extends React.Component{

  constructor(props){
    super(props);
  

  this.state = {
    boardType: 4
  };

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(e){
  const {value} = e.target;
  this.setState({boardType: value});
}

handleSubmit(e){
  e.preventDefault();
  const {boardType} = this.state;
  const {dispatch} = this.props;
  const history = this.props.history;
  var initObj = {
    boardType: boardType
  };
//console.log(initObj);
  dispatch(actionList.initGame(initObj, history));
  
}

  render(){
  return (
    <Aux>
      <div className="vh-100 primary-color d-flex sfFormWrapper">
       <div className="info-container">
       <div className="header">
        <p className="h3">Boogle Game</p>
        <small className="text-muted">A word game with with react and ruby on rails</small>
      </div>
       <div className="boggle-info">
         <p>
                       <a href = "https://en.wikipedia.org/wiki/Boggle"
            target = "_blank˚" > Boggle </a> is a word game invented by Allan Turoff and originally distributed by Parker Brothers.
             The game is played using a plastic grid of lettered dice, in which players attempt to find words 
             in sequences of adjacent letters.</p>
       </div>
       <div className="row">
       <div className='boggle-first'>
          <p>
            Here are some instruction/rules associated with the game.
          </p>
          <ul className='list-group'>
            <li className='list-group-item'>1. The game begins once the user select the board type. For example 4 * 4, 5 * 5 </li>
            <li className='list-group-item'>2. Based on the selected board type, ramdom letters are selected to fit in the type of board selected. </li>
            <li className='list-group-item'>3. Each player is given two minutes countdown within which he/she has to complete the game. </li>
            <li className="list-group-item">4. Each player searches for words that can be constructed from the letters of sequentially adjacent cubes.</li>
            <li className="list-group-item">5. Adjacent cubes refers the cubes that are horizontally, vertically or diagonally neighbouring to the current cube.</li>
            <li className="list-group-item">6. Words must be at least three letters long, may include singular and plural (or other derived forms) separately, but may not use the same letter cube more than once per word.</li>
            <li className="list-group-item">7. Once user submit each word, application evaluate the word, and displays appropriate message.</li>
            <li className="list-group-item">8. As times hits zero (0), application stops the game and display the result.</li>
            
          </ul>
       </div>
       <div className="boggle-second">
         <p>Points Break Down</p>
         <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">Word Length</th>
              <th scope="col">Point</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row"> &lt;3</td>
              <td>0</td>
              
            </tr>
            <tr>
              <td scope="row">3,4</td>
              <td>1</td>
            </tr>
            <tr>
              <td scope="row">5</td>
              <td>2</td>
            </tr>
            <tr>
              <td scope="row">6</td>
              <td>3</td>
            </tr>
            <tr>
              <td scope="row">7</td>
              <td>5</td>
            </tr>
            <tr>
              <td scope="row">8+</td>
              <td>11</td>
            </tr>

            
          </tbody>
        </table>

          <div className='boggle-game-wrapper'>
            <span className="title">Select Board Type</span>
            <select name='boardType' value={this.state.boardType} className="custom-select custom-select-sm boggleSelect" onChange={this.handleChange}>
              <option vale="4">4 * 4</option>
              <option value="5">5 * 5</option>
            </select>
            <button className="btn btn-primary btnSubmit" onClick={this.handleSubmit}> Let's Play</button> 
          </div>
       </div>
       </div>
      </div> 
      </div>
      </Aux> 
  );
  }
}

function mapStateToProps(state) {
  return state;
}

Home = connect(mapStateToProps)(Home);


export default Home;