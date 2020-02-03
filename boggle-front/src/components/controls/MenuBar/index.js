import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import ReactStopWatch from 'react-stopwatch';
import './menu.css';

class MenuBar extends React.Component{
    constructor(props){
        super(props);
    }

    routeChange(){
        this.props.history.push("/scoreboard");
    }

    render() {
        let {timeLimit} = this.props;

        return (
            <div class="card text-center menu-wrapper">
                <div class="card-header">
                    <ul class="nav nav-pills card-header-pills">
                    <li class="nav-item">
                        
                        <button className="nav-link active" title="Back to Home"
                    onClick={
                        ()=>this.props.onClick? this.props.onClick("home"):null
                    }
                    >
                    
                    Back to Home
                    </button>
                    </li>
                    
                    <li class="nav-item">
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
                                        timerClass="timer-red";
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

//MenuBar = connect(mapStateToProps)(MenuBar);

export default compose(withRouter, connect(mapStateToProps))(MenuBar);
