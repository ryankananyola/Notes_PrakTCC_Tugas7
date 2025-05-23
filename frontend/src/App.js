import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotesList from './components/NotesList';
import AddNotes from './components/AddNotes';
import EditNotes from './components/EditNotes';
import Login from './components/Login';
import Register from './components/Register';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Halaman yang butuh login */}
        <Route path="/notes/" element={<RequireAuth><NotesList /></RequireAuth>} />
        <Route path="/add-notes" element={<RequireAuth><AddNotes /></RequireAuth>} />
        <Route path="/notes/:id" element={<RequireAuth><EditNotes /></RequireAuth>} />
      </Routes>
    </Router>
  );
}

export default App;