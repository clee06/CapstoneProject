import io from 'socket.io-client';
import React, { Component } from 'react';
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

class Notebox extends Component {
    constructor() {
        super()
        this.state = {
            text: "",
            socket: io("http://localhost:8080/", { transports: ['websocket'], reconnect: true }),
            socketConnected: false,
        }
    }

    componentDidMount() {
        console.log("mount");

        const { socket } = this.state;

        socket.on('connect', () => {
            console.log("connected", socket.connected)
            console.log(socket.id)
            this.setState({ socketConnected: socket.connected })
        })

        socket.on('disconnect', () => {
            console.log("disconnected")
            this.setState({ socketConnected: socket.connected })
        })

        socket.on('notesUpdated', (x) => {
            let output = JSON.parse(x)
            console.log("output", output)
            this.setState({ text: output.text })
        })

    }

    async onChangeField(field, e) {
        let state = { text: e }
        this.setState(state, async () => {
            await this.state.socket.emit("newUpdate", state)
        })
    }


    render() {
        return (
            <div>
                <h2>Here's the Notebox</h2>
                <ReactQuill
                    name="NoteBox"
                    value={this.state.text}
                    onChange={this.onChangeField.bind(this, "text")}
                    placeholder={
                        "Please Enter Notes"
                    }
                    style={{
                        border: "1px solid #6d6875",
                    }}
                />
                <Link to="/saveNote" style={{ textDecoration: "none" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        style={{ marginTop: "2rem" }}
                    >
                        Save
                      </Button>
                </Link>
            </div>
        );
    }
}

export { Notebox };
