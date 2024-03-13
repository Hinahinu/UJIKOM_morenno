import React, { useState } from "react";
import Style from "../../style/login.module.css";
import Text from "../../style/text.module.css"
import { CiShoppingBasket } from "react-icons/ci";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function LoginAdmin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login/account', {
                email,
                password
            });

            const token = response.data.token;

            localStorage.setItem("token", token);

            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form onSubmit={handleLogin} className="d-flex flex-column" style={{ gap: "0.575rem" }}>
                <div className="d-flex flex-column" style={{ gap: "0.35rem" }}>
                    <div className="d-flex flex-column">
                        <div className="d-flex justify-content-center align-items-center">
                            <CiShoppingBasket size="5em" color="#363062" />
                        </div>
                        <p className={`${Text.text1} m-0`}>Account Login</p>
                    </div>
                    <div className="d-flex flex-column">
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
                        <button type="submit" className={`${Style.button3}`} style={{ flex: "1 0 0" }}>Sign In</button>
                    </div>
                    <div className="d-flex justify-content-center">
                        <p className={`${Text.text4} m-0`}> Belum memiliki akun? <Link to="/register" className={`${Text.text7}`} style={{ textDecoration: "none" }}>Daftar</Link></p>
                    </div>
                </div>
            </form>
        </>
    )
}