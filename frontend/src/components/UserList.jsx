import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from "../utils";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get(`${BASE_URL}/users`);
        setUsers(response.data);
    }

    const deleteUser = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/user/${id}`)
            getUsers();
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
                        {users.map((user, index)=>(
                            <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.title}</td>
                            <td>{user.text}</td>
                            <td>{user.date}</td>
                            <td>
                                <Link to={`edit/${user.id}`} className="button is-small is-info">Edit</Link>
                                <button onClick={()=> deleteUser(user.id)} className="button is-small is-danger">Delete</button>
                            </td>
                        </tr>
                        ))}
                        
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default UserList