import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function AddModalCategory(props) {
    const [kategori, setKategori] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const decodedToken = jwtDecode(token);
    const id_admin = decodedToken.userId;

    const handleClose = () => {
        props.handleClose();
    }

    const saveCategory = async (e) => {
        try {
            await axios.post('http://localhost:5000/kategori', {
                id_admin,
                kategori
            });

            navigate("/add/product");

            handleClose();
        } catch (error) {
            console.log(error);
        }
    }

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategory();
    }, [])

    const getCategory = async () => {
        const response = await axios.get(`http://localhost:5000/kategori/${id_admin}`);
        setCategories(response.data)
    }

    const deleteCategory = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/kategori/${id}`);
            getCategory();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah Kategori</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Kategori</Form.Label>
                            <Form.Control
                                type="text"
                                value={kategori} onChange={(e) => setKategori(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Kategori</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category, index) => (
                                    <tr key={category.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{category.kategori}</td>
                                        <td><button className="btn btn-danger" onClick={() => deleteCategory(category.id)}>Hapus</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary" onClick={saveCategory}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}