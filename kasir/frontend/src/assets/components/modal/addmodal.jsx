import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function AddModalUser(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const role = "petugas";
    const token = localStorage.getItem("token");

    const decodedToken = jwtDecode(token);
    const id_admin = decodedToken.userId;

    const handleClose = () => {
        props.handleClose();
    }

    const saveUser = async (e) => {
        try {
            await axios.post('http://localhost:5000/user', {
                id_admin,
                email,
                password,
                role
            });

            navigate("/add/user");

            handleClose();
        } catch (error) {
            console.log(error);
        }
    }

    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");
    const [kategori, setKategori] = useState("");
    const [harga, setHarga] = useState("");
    const [stok, setStok] = useState("");
    const [keuntungan, setKeuntungan] = useState("");
    const [preview, setPreview] = useState("");

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);


    const getCategories = async () => {
        const response = await axios.get(`http://localhost:5000/kategori/${id_admin}`);
        setCategories(response.data);
    }

    const loadImage = (e) => {
        const image = e.target.files[0]
        setFile(image);
        setPreview(URL.createObjectURL(image));
    };

    const saveProduct = async (e) => {
        const formData = new FormData();
        formData.append("id_admin", id_admin);
        formData.append("title", title);
        formData.append("file", file);
        formData.append("kategori", kategori);
        formData.append("harga", harga);
        formData.append("stok", stok);
        formData.append("keuntungan", keuntungan);
        try {
            await axios.post("http://localhost:5000/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            navigate("/add/product")
        } catch (error) {
            console.error("Error while saving product:", error);
        }
    }

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                {props.type === "user" ? <Form onSubmit={saveUser}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah Petugas</Modal.Title>
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
                        <Button type="submit" variant="primary">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form> : <Form onSubmit={saveProduct}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nama Produk</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nama Produk"
                                value={title} onChange={(e) => setTitle(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput2"
                        >
                            <Form.Label>Gambar</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={loadImage}
                            />
                            {preview ? (
                                <figure>
                                    <img style={{ width: "128px", height: "128px" }} src={preview} alt="Foto" />
                                </figure>
                            ) : (
                                ""
                            )}

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Kategori</Form.Label>
                            <Form.Select
                                value={kategori}
                                onChange={(e) => setKategori(e.target.value)}
                                autoFocus
                            >
                                <option value="">Pilih kategori</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.kategori}>
                                        {category.kategori}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                            <Form.Label>Harga</Form.Label>
                            <Form.Control
                                type="number"
                                value={harga} onChange={(e) => setHarga(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                            <Form.Label>Stok</Form.Label>
                            <Form.Control
                                type="number"
                                value={stok} onChange={(e) => setStok(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                            <Form.Label>Keuntungan</Form.Label>
                            <Form.Control
                                type="number"
                                value={keuntungan} onChange={(e) => setKeuntungan(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>}
            </Modal>
        </>
    )
}