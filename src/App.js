import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";

const App = () => {
  const [notes, setNotes] = useState(getNotes, [
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

  const [searchText, setSearchText] = useState("");

  const [darkMode, setDarkMode] = useState(getTheme);

  // saving theme settings
  useEffect(() => {
    localStorage.setItem("set-dark-mode", JSON.stringify(darkMode));
  }, [darkMode]);

  // retrieving theme settings
  function getTheme() {
    const getTheme = localStorage.getItem("set-dark-mode");
    return getTheme ? JSON.parse(getTheme) : darkMode;
  }
  // retrieving from local storage
  // this works tho
  function getNotes() {
    const savedNotes = localStorage.getItem("react-notes-app-data");
    return savedNotes ? JSON.parse(savedNotes) : notes;
  }

  //doesn't save to local storage for some reason
  // useEffect(() => {
  //   const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));

  //   if (savedNotes) {
  //     setNotes(savedNotes);
  //   }
  // }, []);

  //saving to local storage
  useEffect(() => {
    localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLocaleLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
};

export default App;
