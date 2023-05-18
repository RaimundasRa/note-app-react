import { useState } from "react";
import { nanoid } from "nanoid";
import NotesList from "./components/NotesList";

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is the note text 1",
      date: "18/05/2023",
    },
    {
      id: nanoid(),
      text: "This is the note text 2",
      date: "29/03/2023",
    },
    {
      id: nanoid(),
      text: "This is the note text 3",
      date: "11/01/2023",
    },
  ]);

  return (
    <div className="container">
      <NotesList notes={notes} />
    </div>
  );
};

export default App;
