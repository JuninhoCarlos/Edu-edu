//React imports
import React from "react";

//Redux imports
import { Provider } from "react-redux";

//React-router
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { useEffect } from "react";
import firebase from "firebase";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";

import { store } from "../app/store";

//My components
import Dashboard from "./layout/Dashboard";
import Login from "./login/Login";
import PrivateRoute from "./common/PrivateRoute";

const App = (): JSX.Element => {
    useEffect(() => {
        const firebaseConfig = {
            apiKey: "AIzaSyDlk0pX_K6umly_gL6FujzeongqkXIELRY",
            authDomain: "edu-edu-f02e3.firebaseapp.com",
            projectId: "edu-edu-f02e3",
            storageBucket: "edu-edu-f02e3.appspot.com",
            messagingSenderId: "675734729669",
            appId: "1:675734729669:web:5345f875f61db0e246d1ac",
            measurementId: "G-Z8D0DCL7RM",
        };

        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />

                    <PrivateRoute path="/dashboard">
                        <Dashboard />
                    </PrivateRoute>
                </Switch>
            </Router>
        </Provider>
    );
};

export default App;
