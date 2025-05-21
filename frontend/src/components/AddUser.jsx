import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";

const AddUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [date, setDate] = useState("");
    const navigate = useNavigate();

    const saveUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/add-users`, {
                name,
                email,
                title,
                text,
                date
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={saveUser}>
                    <div className="field">
                        <label className="label">Nama</label>
                        <div className="control">
                            <input type="text" className="input" value={name} onChange={(e)=> setName(e.target.value)} placeholder="Nama" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input type="text" className="input" value={email} onChange={(e)=> setEmail(e.target.value)}placeholder="Email" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Judul</label>
                        <div className="control">
                            <input type="text" className="input" value={title} onChange={(e)=> setTitle(e.target.value)} placeholder="Judul" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Teks</label>
                        <div className="control">
                            <input type="text" className="input" value={text} onChange={(e)=> setText(e.target.value)} placeholder="Teks" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Tanggal</label>
                        <div className="control">
                            <input type="date" className="input" value={date} onChange={(e)=> setDate(e.target.value)}placeholder="Tanggal" />
                        </div>
                    </div>
                    <div className="field">
                        <button type="submit" className="button is-success">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default AddUser;