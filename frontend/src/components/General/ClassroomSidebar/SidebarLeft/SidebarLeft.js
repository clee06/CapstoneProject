import React from 'react';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import AddIcon from "@material-ui/icons/Add";
import QuestionAnswerSharpIcon from '@material-ui/icons/QuestionAnswerSharp';

import "./SidebarLeft.css";
import SidebarNotes from "../SidebarNotes/SidebarNotes";
import NoteCard from "../../Cards/NoteCard";

import { Link } from "react-router-dom";

function SidebarLeft() {

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <h3>COHORT 13</h3>
                <ExpandMoreIcon />
            </div>
            
            {/* Start of Note's Section */}
            <div className="sidebar__notes">
                <div className="sidebar__sectionHeader">
                    <div className="sidebar__header">                      
                        <ExpandMoreIcon />
                        <h4>Add Notes</h4>
                    </div>
                    <AddIcon className="sidebar__addNotes" />
                </div>

                {/* sidebar__ChannelsList reference */}
                <div className="sidebar__notesList" >  
                    <NoteCard />
                    <NoteCard />
                    <NoteCard />
                    <NoteCard />
                </div>
            </div> 

            <div className="sidebar__info">
                <InfoOutlinedIcon  
                    className="sidebar__infoIcon"
                    fontsize="large"
                />
                <div className="sidebar__infoDetails">
                    <h3> Information </h3>
                    <p> Please wear a mask at all times at campus </p>
                    <br />
                    <p> Have Fun Coding! </p>            
                </div>
            </div>

            <div className="sidebar__questions">
                <Link to="/askquestion">
                    <QuestionAnswerSharpIcon 
                        className="sidebar__questionsIcon"
                        fontsize="large"
                    />
                </Link>
                <div className="sidebar__questionsInfo">
                    <h3> Are you stuck? </h3>
                    <p> Ask a Question! </p>
                </div>
            </div>
            
        </div>
    )
}

export default SidebarLeft
