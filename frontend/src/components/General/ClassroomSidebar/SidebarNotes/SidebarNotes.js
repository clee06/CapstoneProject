import React from 'react';
import NoteCard from "../../Cards/NoteCard";
import "./SidebarNotes.css";

// add id / notes from database?
function SidebarNotes({ id, notes }) {
    return (
        <div className="sidebarNotes">
            <h4>
                <span className="sidebarNote__hash">#</span>
                Here's the Notebox
            </h4>
                 
        </div>
    )
}

export default SidebarNotes
