import React, { useEffect, useState } from "react";
import Sidebar from "../assets/components/sidebar/sidebar";
import Style from "../assets/style/dashboard.module.css";
import Text from "../assets/style/text.module.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Navbar from "../assets/components/sidebar/navbar";

export default function Dashboard() {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const id_admin = decodedToken.userId;

    const [countUser, setCountUser] = useState("");
    const [countProduct, setCountProduct] = useState("");
    const [soldProduct, setSoldProduct] = useState("");
    const [visitors, setVisitors] = useState("");

    useEffect(() => {
        userCount();
        productCount();
        soldProductThisMonth();
        countVisitors();
    }, []);

    const userCount = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/users/counts/${id_admin}`);
            setCountUser(response.data);
        } catch (error) {
            console.error("Terjadi kesalahan saat mengambil data user:", error);
        }
    };

    const productCount = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/counts/${id_admin}`);
            setCountProduct(response.data);
        } catch (error) {
            console.error("Terjadi kesalahan saat mengambil data user:", error);
        }
    };

    const soldProductThisMonth = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/sold/${id_admin}`);
            setSoldProduct(response.data);
        } catch (error) {
            console.error("Terjadi kesalahan saat mengambil data user:", error);
        }
    };

    const countVisitors = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/pengunjung/${id_admin}`);
            setVisitors(response.data.jumlah_pesanan);
        } catch (error) {
            console.error("Terjadi kesalahan saat mengambil data user:", error);
        }
    };

    return (
        <>
            <div className={`d-flex align-items-start ${Style.bg_dashboard}`}>
                <Sidebar />
                <div className="d-flex flex-column py-3 px-4" style={{ width: "1280px" }}>
                    <Navbar />
                    <div className="d-flex flex-column" style={{ gap: "0.875rem" }}>
                        <div className="d-flex align-items-start justify-content-between">
                            <div className={`d-flex flex-column py-4 px-3 ${Style.box}`} style={{ gap: "0.575rem" }}>
                                <p className={`${Text.text7} m-0`} style={{ flex: "1 0 0" }}>Jumlah Petugas</p>
                                <p className={`${Text.text8} m-0`}>{countUser}</p>
                            </div>
                            <div className={`d-flex flex-column py-4 px-3 ${Style.box}`} style={{ gap: "0.575rem" }}>
                                <p className={`${Text.text7} m-0`} style={{ flex: "1 0 0" }}>Jumlah Produk</p>
                                <p className={`${Text.text8} m-0`}>{countProduct}</p>
                            </div>
                            <div className={`d-flex flex-column py-4 px-3 ${Style.box}`} style={{ gap: "0.575rem" }}>
                                <p className={`${Text.text7} m-0`} style={{ flex: "1 0 0" }}>Jumlah Produk Terjual Bulan Ini</p>
                                <p className={`${Text.text8} m-0`}>{soldProduct}</p>
                            </div>
                            <div className={`d-flex flex-column py-4 px-3 ${Style.box}`} style={{ gap: "0.575rem" }}>
                                <p className={`${Text.text7} m-0`} style={{ flex: "1 0 0" }}>Jumlah Pelanggan Bulan Ini</p>
                                <p className={`${Text.text8} m-0`}>{visitors}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}