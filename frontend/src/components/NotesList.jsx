import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Tambahkan useNavigate
import { BASE_URL } from "../utils";

const NotesList = () => {
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate(); // Inisialisasi useNavigate

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        const response = await axios.get(`${BASE_URL}/notes/`);
        setNotes(response.data);
    }

    const deleteNotes = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/notes/${id}`)
            getNotes();
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login"); 
    }

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <div className="is-flex is-justify-content-space-between mb-3">
                    <Link to={`/add-notes`} className='button is-success'>Tambah Notes</Link>
                    <button onClick={handleLogout} className="button is-danger">Logout</button>
                </div>

                <table className='table is-striped is-fullwidth'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Judul</th>
                            <th>Teks</th>
                            <th>Tanggal</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notes.map((notes, index)=>(
                            <tr key={notes.id}>
                                <td>{index + 1}</td>
                                <td>{notes.name}</td>
                                <td>{notes.email}</td>
                                <td>{notes.title}</td>
                                <td>{notes.text}</td>
                                <td>{notes.date}</td>
                                <td>
                                    <Link to={`/edit-notes/${notes.id}`} className="button is-small is-info mr-1">Edit</Link>
                                    <button onClick={()=> deleteNotes(notes.id)} className="button is-small is-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default NotesList;
