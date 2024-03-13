import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditModalUser(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (props.show) {
            getUserById(props.user.id);
        }
    }, [props.show]);

    const updateUser = async (e) => {
        try {
            await axios.patch(`http://localhost:5000/user/${props.user.id}`, {
                email,
                password
            });
            props.handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    const getUserById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/user/${id}`);
            setEmail(response.data.email);
            setPassword(response.data.password);
        } catch (error) {
            console.log(error);
        }
    };
    
    const handleClose = () => {
        props.handleClose();
    }

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Form onSubmit={updateUser}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Petugas</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput2"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                autoFocus />
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}