import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from "../utils";

const NotesList = () => {
    const [notes, setNotes] = useState([]);

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

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <Link to={`add`} className='button is-success'>Tambah Notes</Link>
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
                                <Link to={`edit/${notes.id}`} className="button is-small is-info">Edit</Link>
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

export default NotesList