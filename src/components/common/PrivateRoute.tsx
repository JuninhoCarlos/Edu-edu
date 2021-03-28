import React from "react"
import { Route, Redirect } from "react-router-dom";

import {useSelector} from "react-redux";

import {RootState} from "../../app/store"

interface PrivateRouteInterface{    
    path : string
    children: any
}


 const PrivateRoute = ({ children, ...rest }: PrivateRouteInterface) => { 
    const auth = useSelector((state: RootState) => state.auth);   
    
    return (
      <Route
        {...rest}
        render={() =>
          auth.isLogged ? (
            children
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  }


 export default PrivateRoute;