import React, { useState } from "react";
import Style from "../assets/style/login.module.css";
import Text from "../assets/style/text.module.css";
import LoginAdmin from "../assets/components/form/login.admin";
import LoginPetugas from "../assets/components/form/login.petugas"
// import { FcGoogle } from 'react-icons/fc';

export default function Login() {
    const [selectedOption, setSelectedOption] = useState('LoginAdmin');
    const [button1Color, setButton1Color] = useState(Style.button1);
    const [button2Color, setButton2Color] = useState(Style.button2);

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        setButton1Color(option === 'LoginAdmin' ? Style.button1 : Style.button2);
        setButton2Color(option === 'LoginPetugas' ? Style.button1 : Style.button2);
    };
    return (
        <div className={`${Style.bg_login}`}>
            <div className="d-flex flex-column align-items-center" style={{ gap: "0.35rem" }}>
                <div className="mt-5">
                    <p className={`${Text.text4} m-0`}>Login Sebagai</p>
                </div>
                <div className="d-flex flex-column" style={{ width: "45.5rem" }}>
                    <div className="d-flex align-items-center">
                        <button onClick={() => handleOptionChange("LoginAdmin")} className={`${button1Color}`} style={{ flex: "1 0 0" }}>
                            Admin
                        </button>
                        <button onClick={() => handleOptionChange("LoginPetugas")} className={`${button2Color}`} style={{ flex: "1 0 0" }}>
                            Petugas
                        </button>
                    </div>
                    <div className="d-flex flex-column" style={{ gap: "0.25rem", backgroundColor: "#ffffff", padding: "25px" }}>
                        {selectedOption === "LoginAdmin" ? <LoginAdmin /> : <LoginPetugas />}
                    </div>
                </div>
            </div>
        </div>
    )
}