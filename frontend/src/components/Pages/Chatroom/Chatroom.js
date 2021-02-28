import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Chatroom.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login";

import { selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import { login, logout } from "./features/userSlice";

function Chatroom() {
  const dispatch = useDispatch();            // dispatches info to data layer
  const users = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // the user is logged in
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,
        }))      
      } else {
        // the user is logged out
        dispatch(logout())
      }
    });
  }, [dispatch]);

  return (
    <div className="chatroom">   
      {/* Ternary Operator - If user is logged in, render fragment else redirect to login* */}
      {users ? (
        <>
          <Sidebar />      
          <Chat />
        </>
      ) : (
        <Login />
      )}
      
    </div>
  );
}

export default Chatroom;