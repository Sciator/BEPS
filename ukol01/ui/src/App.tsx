import React, { useState } from "react";
import "./App.css";
import { ClientConnection } from "./logic/ClientConnection";
import { Log } from "./Log";

function App() {
  const [clientID, setClientID] = useState("");
  const [clientSeed, setClientSeed] = useState("");
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState("");

  const [clientConnection, setClientConnection] = useState<ClientConnection>();

  const onLoginCliecked = () => {
    const clientConnection = new ClientConnection(clientID, clientSeed);
    setClientConnection(clientConnection);
    clientConnection
      .initLoginSend()
      .then(() => setNotes(clientConnection.notes));
  };

  const onSendClicked = () => {
    clientConnection
      ?.initLoginSend(newNote)
      .then(() => setNotes(clientConnection.notes));
  };

  return (
    <div className="App">
      <div>
        <div className="log-notes">
          <ul className="notes">
            {notes.map((x) => (
              <li>{x}</li>
            ))}
          </ul>
          <div className="log">
            <Log />
          </div>
        </div>
        <div className="inputs">
          <label>
            ClientID
            <input
              onChange={(v) => setClientID(v.target.value)}
              value={clientID}
            ></input>
          </label>
          <label>
            seed
            <input
              onChange={(v) => setClientSeed(v.target.value)}
              value={clientSeed}
            ></input>
          </label>
          <button onClick={onLoginCliecked}>Login</button>

          <div>
            <label>
              Note
              <input
                onChange={(v) => setNewNote(v.target.value)}
                value={newNote}
              ></input>
            </label>
            <button onClick={onSendClicked}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
