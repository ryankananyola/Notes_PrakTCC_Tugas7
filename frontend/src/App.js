import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotesList from './components/NotesList';
import AddNotes from './components/AddNotes';
import EditNotes from './components/EditNotes';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<NotesList />} />
        <Route path="/add-notes" element={<AddNotes />} />
        <Route path="/notes/:id" element={<EditNotes />} />
      </Routes>
    </Router>
  );
}

export default App;
