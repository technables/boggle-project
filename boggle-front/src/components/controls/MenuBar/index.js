import React from 'react';
import ReactToolTip from 'react-tooltip'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import ReactStopWatch from 'react-stopwatch';

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
            <div className="menu-wrapper">
                <div className="menu-bar">
                <button className="btn" title="Back to Home"
                    onClick={
                        ()=>this.props.onClick? this.props.onClick("home"):null
                    }
                    >
                    <i className="fa fa-home"></i> 
                    Back to Home
                </button>

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
                                    if(minutes>=1 && seconds>30)
                                        timerClass="timer-red";
                                    else if (minutes>=1)
                                        timerClass="timer-yellow";

                                    return(
                                        <span className={"boggle-stopwatch "+ timerClass}>
                                            Elapsed: {formatted}
                                        </span>
                                    )
                                }
                            }
                        />
                    </React.Fragment>
                }
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
