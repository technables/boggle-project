import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import ReactStopWatch from 'react-stopwatch';
import './menu.css';

import {MessageType} from '../../../data/constants';
import {ShowMessage} from '../../../settings/showMessage';
import {MessageHelper} from '../../../settings/messageHelper'


class MenuBar extends React.Component{
    
    routeChange(){
        this.props.history.push("/scoreboard");
        ShowMessage(MessageType.END,
            MessageHelper(MessageType.END));
    }

    render() {
        let {timeLimit} = this.props;

        return (
            <div className="card text-center menu-wrapper">
                <div className="card-header">
                    <ul className="nav nav-pills card-header-pills">
                    <li className="nav-item">
                        
                        <button className="nav-link active" title="Back to Home"
                    onClick={
                        ()=>this.props.onClick? this.props.onClick("home"):null
                    }
                    >
                    
                    Back to Home
                    </button>
                    </li>
                    
                    <li className="nav-item">
                    {
                    timeLimit && <React.Fragment>
                        <ReactStopWatch
                            seconds={0}
                            minutes={0}
                            hours={0}
                            limit={timeLimit}
                            onChange={({ hours, minutes, seconds }) => {

                            }}
                            onCallback={() => this.routeChange()}
                            render={
                                ({formatted,hours, minutes,seconds})=>{
                                    var timerClass="timer-green";
                                    if(minutes>=1 && seconds>=30)
                                    {
                                        timerClass="timer-red";
                                        ShowMessage(MessageType.EXISTS, "Hurry up!! Last 30 secs left.");
                                    }
                                    else if (minutes>=1)
                                        timerClass="timer-yellow";

                                    return(
                                        <span className={"nav-link disabled boggle-stopwatch "+ timerClass}>
                                            Elapsed: {formatted}
                                        </span>
                                    )
                                }
                            }
                        />
                    </React.Fragment>
                }
                    </li>
                    </ul>
                </div>
            </div>

            
        )
    }
}

function mapStateToProps(state){
    const {timeLimit} = state.game;
    return {timeLimit};
}


export default compose(withRouter, connect(mapStateToProps))(MenuBar);
