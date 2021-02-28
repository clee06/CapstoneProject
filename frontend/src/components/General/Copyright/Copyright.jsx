import React from "react";
import { Typography } from "@material-ui/core";

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      color="inherit"
      style={{ padding: "1em 0" }}
    >
      {"Copyright © "}
      ClassroomX {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
