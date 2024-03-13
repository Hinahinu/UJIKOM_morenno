import React from "react";
import Style from "../assets/style/login.module.css";
import RegisterForm from "../assets/components/form/register";
// import { FcGoogle } from 'react-icons/fc';

export default function Register() {
   
    return (
        <div className={`${Style.bg_login}`}>
            <div className="d-flex flex-column align-items-center" style={{ gap: "0.35rem" }}>
                <div className="d-flex flex-column mt-5" style={{ width: "45.5rem" }}>
                    <div className="d-flex flex-column" style={{ gap: "0.25rem", backgroundColor: "#ffffff", padding: "25px" }}>
                        <RegisterForm/>
                    </div>
                </div>
            </div>
        </div>
    )
}