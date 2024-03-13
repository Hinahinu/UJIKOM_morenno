import React, { useState, useEffect } from "react";
import Sidebar from "../assets/components/sidebar/sidebar";
import Style from "../assets/style/adduser.module.css";
import Text from "../assets/style/text.module.css";
import { IoIosAdd } from "react-icons/io";
import AddModalUser from "../assets/components/modal/addmodal";
import EditModalUser from "../assets/components/modal/editmodal";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Navbar from "../assets/components/sidebar/navbar";

export default function AddUser() {
    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [editUserId, setEditUserId] = useState(null);

    const [users, setUser] = useState([]);
    const token = localStorage.getItem("token");

    const decodedToken = jwtDecode(token);
    const id_admin = decodedToken.userId;

    useEffect(() => {
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getUsers = async () => {
        const response = await axios.get(`http://localhost:5000/users/${id_admin}`);
        setUser(response.data);
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/user/${id}`);
            getUsers();
        } catch (error) {
            console.log(error);
        }
    }

    const handleShowEdit = (id) => {
        setEditUserId(id);
    };

    const handleCloseEdit = () => {
        setEditUserId(null);
    };

    return (
        <div className={`d-flex align-items-start ${Style.bg_adduser}`}>
            <Sidebar />
            <div className="d-flex flex-column p-3" style={{ width: "1280px" }}>
                <Navbar/>
                <div className="d-flex flex-column" style={{ gap: "1.375rem" }}>
                    <div className="d-flex align-items-center justify-content-between" style={{ gap: "0.375rem" }}>
                        <input type="text" style={{ border: "1px solid #4D4C7D", width: "527px", borderRadius: "16px", backgroundColor: "#f5f5f5" }} />
                        <button className={`p-2 d-flex align-items-center justify-content-center ${Style.button_adduser}`} onClick={handleShowAdd}>
                            <IoIosAdd size="1.5em" />
                            Tambah Petugas
                        </button>
                        <AddModalUser
                            show={showAdd}
                            handleClose={handleCloseAdd}
                            type="user"
                        />
                    </div>
                    <div style={{ overflow: "auto", height: "400px" }}>
                        <table className={`${Style.custom_table}`} style={{ width: "100%" }} cellPadding="3">
                            <thead style={{ backgroundColor: "#4D4C7D", color: "#f5f5f5" }}>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Password</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user.id} style={{ borderBottom: "1px solid #4D4C7D" }}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{user.email}</td>
                                        <td>{user.password}</td>
                                        <td>
                                            <div className="d-flex align-items-center" style={{ gap: "0.375rem" }}>
                                                <button className="btn btn-success" onClick={() => handleShowEdit(user.id)}>Edit</button>
                                                <EditModalUser
                                                    show={editUserId === user.id}
                                                    handleClose={handleCloseEdit}
                                                    user={user}
                                                    type="user"
                                                />
                                                <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Hapus</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}