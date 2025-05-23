import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotesList from './components/NotesList';
import AddNotes from './components/AddNotesjsx';
import EditNotes from './components/EditNotes';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NotesList />} />
        <Route path="/add" element={<AddNotes />} />
        <Route path="/edit/:id" element={<EditNotes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
