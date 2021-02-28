import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SidebarLeft from "../../General/ClassroomSidebar/SidebarLeft/SidebarLeft";
import SidebarRight from "../../General/ClassroomSidebar/SidebarRight/SidebarRight";
import ClassContent from "../../General/ClassroomSidebar/Content/ClassContent";
import "./Classroom.css";

function Classroom() {
  return (
    <div className="ClassroomApp">
      <SidebarLeft />
      <ClassContent />
      <SidebarRight />

    </div>
  )
}

export default Classroom;