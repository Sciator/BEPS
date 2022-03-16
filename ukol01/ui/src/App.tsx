import React, { useCallback, useState } from "react";
import "./App.css";
import { ClientConnection } from "./logic/ClientConnection";
import { Log } from "./Log";

const useNotes = (clientID: string, clientSeed: string) => {
  const [notes, setNotes] = useState<string[]>([]);

  const pushLoad = useCallback(
    (note?: string) => {
      const clientConnection = new ClientConnection(clientID, clientSeed);
      clientConnection
        .initLoginSend(note)
        .then(() => setNotes(clientConnection.notes));
    },
    [clientID, clientSeed, setNotes]
  );

  return [notes, pushLoad] as const;
};

function App() {
  const [clientID, setClientID] = useState("");
  const [clientSeed, setClientSeed] = useState("");
  const [newNote, setNewNote] = useState("");

  const [notes, pushLoad] = useNotes(clientID, clientSeed);

  const onLoadCliecked = () => {
    pushLoad();
  };

  const onSendClicked = () => {
    pushLoad(newNote);
  };

  return (
    <div className="App">
      <div>
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
          <button onClick={onLoadCliecked}>Load</button>

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
        <div className="log-notes">
          <ul className="notes">
            {[...notes].reverse().map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
          <div className="log">
            <Log />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
