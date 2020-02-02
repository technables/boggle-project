import React from "react";
import { Route, Redirect } from "react-router-dom";
import {getUserData} from '../../../datastore';

function InternalRoute({ component: Component, ...rest }) {
  const userData = getUserData();
  return (
    <Route
      {...rest}
      render={props =>
        userData?(
          <Component {...props} />
        ): (
            <Redirect
            to={{
                pathname: "/",
                state: {
                    from: props.location
                },
                children: props.children 
            }}
            />
        )
      }
    />
  );
}

export default InternalRoute;
