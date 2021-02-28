import React, { useState } from "react";
import {
  Container,
  Typography,
  InputBase,
  Grid,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ReactQuill from "react-quill";
// import { useQuill } from "react-quilljs  ";
import "quill/dist/quill.snow.css";
import "./CreateQuestion.css";
import { Link } from "react-router-dom";

import { Notebox } from "../Class/Notebox";
// -------------------------------------------------------
// import { WithContext as ReactTags } from "react-tag-input";

// const KeyCodes = {
//   comma: 188,
//   enter: 13,
// };
// const delimiters = [KeyCodes.comma, KeyCodes.enter];
// --------------------------------------------------------

function CreateQuestion(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      [theme.breakpoints.up("xs")]: {
        padding: "0 2rem",
        fontSize: "11px",
      },
      [theme.breakpoints.up("sm")]: {
        padding: "0 2rem",
        fontSize: "12px",
      },
      [theme.breakpoints.up("md")]: {
        padding: "0 3rem",
        fontSize: "14px",
      },
      [theme.breakpoints.up("lg")]: {
        padding: "0 4rem",
        fontSize: "16px",
      },
    },
  }));

  const classes = useStyles();

  const [state, setState] = useState({ title: "", content: "" });

  function handleTitleChange(event) {
    const { name, value } = event.target;
    setState((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  function handleContentChange(value) {
    setState((prevValue) => {
      return { ...prevValue, content: value };
    });
  }

  function submitPost() {
    props.onAdd(state);
    setState({
      title: "",
      content: "",
    });
  }

  // -------------------------------------------- Tags ----------------------------------------------------------

  // const [tagsState, setTagsState] = useState({
  //   tags: [
  //     { id: 1, text: "javascript" },
  //     { id: 2, text: "nodejs" },
  //   ],
  //   suggestions: [
  //     { id: 1, text: "react" },
  //     { id: 2, text: "adobe" },
  //     { id: 3, text: "python" },
  //   ],
  // });

  // const handleDelete = (i) => {
  //   // const { tags } = tagsState;
  //   setTagsState({
  //     tags: tags.filter((tag, index) => index !== i),
  //   });
  // };

  // const handleAddition = (tag) => {
  //   let { tags } = tagsState;
  //   setTagsState({ tags: [...tags, { id: tags.length + 1, text: tag }] });
  // };

  // const handleDrag = (tag, currPos, newPos) => {
  //   const tags = [...tagsState.tags];

  //   tags.splice(currPos, 1);
  //   tags.splice(newPos, 0, tag);

  //   setTagsState({ tags });
  // };

  // const { tags, suggestions } = tagsState;
  // ----------------------------------------------------------------------------------------------------------------
  return (
    <div>
      <Container maxWidth="xl" className={classes.root}>
        <Grid container justify="center">
          <Grid item md={10} sm={12}>
            <Grid item>
              <Typography
                variant="h2"
                align="center"
                style={{
                  fontWeight: 500,
                  fontSize: "5em",
                  marginBottom: "4rem",
                }}
              >
                Ask a new Question
              </Typography>
            </Grid>
            <Grid
              container
              style={{
                padding: "2rem",
                border: "1px solid #fff",
                borderRadius: "10px",
              }}
              justify="center"
            >
              <div className="question-container">
                <form>
                  <Typography variant="body1">Title</Typography>
                  <InputBase
                    onChange={handleTitleChange}
                    name="title"
                    value={state.title}
                    style={{
                      width: "100%",
                      marginBottom: "2rem",
                      border: "1px solid #6d6875",
                      paddingLeft: "10px",
                    }}
                    placeholder={
                      "Example: How to trigger checkbox onChange event through function in React?"
                    }
                  />

                  <Typography variant="body1">Body</Typography>
                  <ReactQuill
                    name="content"
                    value={state.content}
                    onChange={handleContentChange}
                    placeholder={
                      "Explain your question in detail like you're explaining it to someone"
                    }
                    modules={CreateQuestion.modules}
                    formats={CreateQuestion.formats}
                    style={{
                      border: "1px solid #6d6875",
                    }}
                  />

                  <Typography variant="body1" style={{ marginTop: "2rem" }}>
                    Tags
                  </Typography>
                  <InputBase
                    name="tags"
                    style={{
                      width: "100%",
                      marginBottom: "3rem",
                      border: "1px solid #6d6875",
                      paddingLeft: "10px",
                    }}
                    placeholder={"Example: javascript, nodejs, express"}
                  />

                  {/* ---------------------------------- */}
                  {/* <ReactTags
                    tags={tags}
                    suggestions={suggestions}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    delimiters={delimiters}
                  /> */}
                  {/* ----------------------------------- */}
                  <div style={{ textAlign: "right" }}>
                    <Link to="/postquestion" style={{ textDecoration: "none" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        style={{ marginTop: "2rem" }}
                        onClick={submitPost}
                      >
                        Post
                      </Button>
                    </Link>
                  </div>
                </form>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

CreateQuestion.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "code-block"],
    [{ background: [] }, { color: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

CreateQuestion.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "code-block",
  "background",
  "color",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "clean",
];

export default CreateQuestion;