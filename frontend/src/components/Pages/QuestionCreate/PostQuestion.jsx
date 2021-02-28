import React, { useState } from "react";
import Posts from "./Posts";
import CreateQuestion from "./CreateQuestion";

function PostQuestion() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes((prevValue) => {
      return [...prevValue, newNote];
    });
  }

  function deleteNote(id) {
    setNotes((prevValue) => {
      return prevValue.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <CreateQuestion onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Posts
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
    </div>
  );
}

export default PostQuestion;
