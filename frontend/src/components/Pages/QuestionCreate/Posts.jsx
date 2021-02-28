import React from "react";
import { Button } from "@material-ui/core";

function Posts(props) {
  function handleClick(event) {
    props.onDelete(props.id);
    event.preventDefault();
  }

  return (
    <div className="post">
      <h1>{props.title}</h1>
      {props.content}
      <Button variant="contained" color="primary" onClick={handleClick}>
        Delete
      </Button>
    </div>
  );
}

export default Posts;
