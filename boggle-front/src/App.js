import React, {Suspense} from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import Logo from './boggle.png';
import {defaultRoute, internalRoutes } from "./routes";
import "./App.css";
import Aux from './hoc/_Aux';
import  LazyLoader from './components/controls/LazyLoader';

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import InternalRoute from './components/controls/internalRoute/InternalRoute';
class App extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        
        const dRoute = defaultRoute.map((route, index)=>{
            return route.component ? (
      
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => <route.component {...props} />}
                />
              ) : null;
            });

            const intRoutes = internalRoutes.map((route, index) => {
                return route.component ? (
                  <InternalRoute
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    component={route.component}
                  />
                ) : null;
              });
        

        return (
           <Aux>
             <Suspense fallback={<LazyLoader/>}>
                <Switch>
                    <React.Fragment>
                        <div className="container">
                            <div className="logo-wrapper">
                                <img src={Logo} className='logo' alt='boggle'/>
                            </div>
                            {dRoute}
                            {intRoutes}
                            <ToastContainer/>
                        </div>
                    </React.Fragment>
                </Switch>
                </Suspense>
          </Aux>
        )
    }
}

function mapStateToProps(state) {
  const { currentUser } = state.game;
  return { currentUser };
}

App = connect(mapStateToProps)(App);

export default App;
