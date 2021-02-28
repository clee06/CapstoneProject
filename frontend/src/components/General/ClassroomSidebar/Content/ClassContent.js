import React from 'react';
import "./ClassContent.css";
import NoteCard from "../../Cards/NoteCard";
// import Grid from "@material-ui/core/Grid";
import {Notebox} from "../../../Pages/Class/Notebox"

function ClassContent() {
    return (
        <div className="content__container">   
            <div className="content__header">        
                <h3> My Notes </h3>  
            </div>
            <div className="notes__container">
                <Notebox/>
            </div>
            
        </div>         
    )
}

export default ClassContent;