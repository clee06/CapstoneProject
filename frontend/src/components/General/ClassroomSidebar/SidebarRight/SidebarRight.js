import React from 'react';
import { Button } from "@material-ui/core";
import { Avatar } from "@material-ui/core";

import "./SidebarRight.css";
import { Link } from "react-router-dom";

function SidebarRight() {
    return (
        <div className="sidebarRight">
    
            <div className="sidebar__memberList">
                {/* Members List hardcoded.. */}
                <h3> ADMIN - 2 </h3>
                <div className="sidebar__profile">
                    <Avatar />
                    <div className="sidebar__profileInfo">
                        <h4> @Samo Shanessy </h4>
                        <p> Instructor </p>
                    </div>                
                </div>

                <div className="sidebar__profile">
                    <Avatar />
                    <div className="sidebar__profileInfo">
                        <h4> @Lesley C </h4>
                        <p> Instructor </p>
                    </div>                
                </div>

                <h3> ONLINE - 3 </h3>
                <div className="sidebar__profile">
                    <Avatar />
                    <div className="sidebar__profileInfo">
                        <h4> Curtis </h4>
                        <p> Student </p>
                    </div>                
                </div>

                <div className="sidebar__profile">
                    <Avatar />
                    <div className="sidebar__profileInfo">
                        <h4> Bibek </h4>
                        <p> Student </p>
                    </div>                
                </div>

                <div className="sidebar__profile">
                    <Avatar />
                    <div className="sidebar__profileInfo">
                        <h4> Ieuan </h4>
                        <p> Student </p>
                    </div>                
                </div>
            </div>

            <div className="sidebar__chatroom">
                <div className="sidebar__chatroomInfo">
                    <h5> Answer Questions Realtime! </h5>
                    <Link to="/chatroom">
                        <Button variant="contained"> JOIN CHAT </Button>
                    </Link>
                </div>               
            </div>
        </div>
    )
}

export default SidebarRight