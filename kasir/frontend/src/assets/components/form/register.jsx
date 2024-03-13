import React, { useState } from "react";
import Style from "../../style/login.module.css";
import Text from "../../style/text.module.css"
import { CiShoppingBasket } from "react-icons/ci";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterForm() {
    const [nama_toko, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const role = "admin";

    const saveAccount = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/account', {
                nama_toko,
                email,
                password,
                role
            });
            navigate("/login")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form onSubmit={saveAccount}>
                <div className="d-flex flex-column" style={{ gap: "0.675rem" }}>
                    <div className="d-flex flex-column" style={{ gap: "0.35rem" }}>
                        <div className="d-flex flex-column">
                            <div className="d-flex justify-content-center align-items-center">
                                <CiShoppingBasket size="5em" color="#363062" />
                            </div>
                            <p className={`${Text.text1} m-0`}>Register</p>
                        </div>
                        <div className="d-flex flex-column">
                            <div className="form-group">
                                <label for="exampleInputText1" className={`${Text.text2}`}>Nama Toko</label>
                                <input type="text" class="form-control" id="exampleInputText1" aria-describedby="namaHelp" placeholder="Nama Toko" value={nama_toko} onChange={(e) => setNama(e.target.value)} style={{ borderRadius: "12px" }} />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1" className={`${Text.text2}`}>Email</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ borderRadius: "12px" }} />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1" className={`${Text.text2}`}>Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ borderRadius: "12px" }} />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column" style={{ gap: "0.75rem" }}>
                        <div className="d-flex flex-column">
                            <button type="submit" className={`${Style.button3}`} style={{ flex: "1 0 0" }}>Sign Up</button>
                        </div>
                        <div className="d-flex justify-content-center">
                            <p className={`${Text.text4} m-0`}>Sudah memiliki akun? <Link to="/login" className={`${Text.text7}`} style={{ textDecoration: "none" }}>Login</Link></p>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}