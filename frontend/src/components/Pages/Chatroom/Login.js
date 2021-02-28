import React from 'react';
import "./Login.css";

import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";

function Login() {
    const signIn = () => {
        // do clever Google Auth shit
        auth.signInWithPopup(provider).catch(error => alert(error.message));
    };


    return (
        <div className="login">

            <div className="login__logo">
                <h2> CLASSROOM X </h2>
            </div> 

            <Button onClick={signIn}>Join Chatroom</Button>           
        </div>
    )
}

export default Login;
