import React,{ReactNode} from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

//@ts-expect-error
const PrivateRoutes2 = ({component:Component, ...rest}) => {

    return (
        <Route {...rest} render={props=>document.cookie? <Component  />: <Redirect to="/"/>}/>
    )
}

export default PrivateRoutes2;
