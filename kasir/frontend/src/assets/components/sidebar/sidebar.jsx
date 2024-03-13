import React, { useEffect, useState } from "react";
import Style from "../../style/sidebar.module.css";
import { AiOutlineShop, AiOutlinePieChart, AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
import { Link } from 'react-router-dom';
import axios from "axios";

export default function Sidebar() {
    const token = localStorage.getItem("token");
    const tokenPetugas = localStorage.getItem("tokenPetugas");

    const [role, setRole] = useState("")

    let fetchData;

    useEffect(() => {
        fetchData();
    }, [])

    if (!tokenPetugas) {
        const decodedToken = jwtDecode(token);
        const id = decodedToken.userId;

        fetchData = async () => {
            const response = await axios.get(`http://localhost:5000/account/${id}`);
            setRole(response.data.role);
        }
    } else {
        const decodedToken = jwtDecode(tokenPetugas);
        const id = decodedToken.petugasId;

        fetchData = async () => {
            const response = await axios.get(`http://localhost:5000/user/${id}`);
            setRole(response.data.role)
        }
    }

    return (
        <div className={`d-flex flex-column py-4 ${Style.bg_sidebar}`} style={{ gap: "2.55rem" }}>
            {role === "admin" ? <>
                <div className="d-flex justify-content-center">
                    <Link to="/" className={window.location.pathname === "/" ? Style.bg_onbnavigate : Style.bg_offbnavigate}>
                        <div className="p-2">
                            <AiOutlineShop color="#f5f5f5" size="3em" />
                        </div>
                    </Link>
                </div>
                <div className="d-flex justify-content-center">
                    <Link to="/dashboard" className={window.location.pathname === "/dashboard" ? Style.bg_onbnavigate : Style.bg_offbnavigate}>
                        <div className="p-2">
                            <AiOutlinePieChart color="#f5f5f5" size="3em" />
                        </div>
                    </Link>
                </div>
                <div className="d-flex justify-content-center">
                    <Link to="/add/user" className={window.location.pathname === "/add/user" ? Style.bg_onbnavigate : Style.bg_offbnavigate}>
                        <div className="p-2">
                            <AiOutlineUsergroupAdd color="#f5f5f5" size="3em" />
                        </div>
                    </Link>
                </div>
                <div className="d-flex justify-content-center">
                    <Link to="/add/product" className={window.location.pathname === "/add/product" ? Style.bg_onbnavigate : Style.bg_offbnavigate}>
                        <div className="p-2">
                            <MdOutlineAddToPhotos color="#f5f5f5" size="3em" />
                        </div>
                    </Link>
                </div>
            </> : <>
                <div className="d-flex justify-content-center">
                    <Link to="/" className={window.location.pathname === "/" ? Style.bg_onbnavigate : Style.bg_offbnavigate}>
                        <div className="p-2">
                            <AiOutlineShop color="#f5f5f5" size="3em" />
                        </div>
                    </Link>
                </div>
                <div className="d-flex justify-content-center">
                    <Link to="/add/product" className={window.location.pathname === "/add/product" ? Style.bg_onbnavigate : Style.bg_offbnavigate}>
                        <div className="p-2">
                            <MdOutlineAddToPhotos color="#f5f5f5" size="3em" />
                        </div>
                    </Link>
                </div>
            </>}
        </div>
    )
}
