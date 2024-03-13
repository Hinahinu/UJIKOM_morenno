import React, { useEffect, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import Text from "../../style/text.module.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Style from "../../style/cashier.module.css";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const id_admin = decodedToken.userId;

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        const response = await axios.get(`http://localhost:5000/account/${id_admin}`);
        setUser(response.data);
    };

    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenPetugas");
    navigate("/login");
  };

    return (
        <div className="d-flex align-self-stretch justify-content-between">
            <h1 className={`${Text.text1} m-0`}>{user ? user.nama_toko : "Nama Toko"}</h1>
            <Dropdown className="m-0">
                <Dropdown.Toggle style={{ backgroundColor: "transparent", border: "none" }}>
                    <div className="rounded-circle m-0" style={{ backgroundColor: "#363062", width: "55px", height: "55px" }}>
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="d-flex flex-column" style={{ gap: "1.375rem" }}>
                    <Dropdown.Item className="d-flex align-items-center" style={{ gap: "0.375rem" }}>
                        <FiUser size="1.8em" color="#363062"/>
                        <p className={`${Text.text7} m-0`}>My Profile</p>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <button className={`${Style.button_dropdown} p-1`} onClick={handleLogout}>Log Out</button>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}