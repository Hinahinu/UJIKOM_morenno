import React, { useState, useEffect } from "react";
import Sidebar from "../assets/components/sidebar/sidebar";
import Style from "../assets/style/adduser.module.css";
import Text from "../assets/style/text.module.css";
import { IoIosAdd } from "react-icons/io";
import AddModalUser from "../assets/components/modal/addmodal";
import EditModalProduct from "../assets/components/modal/editmodalproduct";
import AddModalCategory from "../assets/components/modal/addmodalkategori";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Navbar from "../assets/components/sidebar/navbar";

export default function AddProduct() {
    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [showAddCategory, setShowAddCategory] = useState(false);
    const handleCloseAddCategory = () => setShowAddCategory(false);
    const handleShowAddCategory = () => setShowAddCategory(true);

    const [editProductId, setEditProductId] = useState(null);

    const [products, setProducts] = useState([]);
    const token = localStorage.getItem("token");

    const decodedToken = jwtDecode(token);
    const id_admin = decodedToken.userId;

    useEffect(() => {
        getProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getProducts = async () => {
        const response = await axios.get(`http://localhost:5000/products/${id_admin}`);
        setProducts(response.data);
    };

    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/products/${productId}`);
            getProducts();
        } catch (error) {
            console.log(error);
        }
    };

    const handleShowEdit = (id) => {
        setEditProductId(id);
    };

    const handleCloseEdit = () => {
        setEditProductId(null);
    };

    return (
        <div className={`d-flex align-items-start ${Style.bg_adduser}`}>
            <Sidebar />
            <div className="d-flex flex-column p-3" style={{ width: "1280px" }}>
                <Navbar/>
                <div className="d-flex flex-column" style={{ gap: "1.375rem" }}>
                    <div className="d-flex align-items-center justify-content-between" style={{ gap: "0.375rem" }}>
                        <input type="text" style={{ border: "1px solid #4D4C7D", width: "527px", borderRadius: "16px", backgroundColor: "#f5f5f5" }} />
                        <div className="d-flex align-items-center" style={{ gap: "0.375rem" }}>
                            <button className={`p-2 d-flex align-items-center justify-content-center ${Style.button_adduser}`} onClick={handleShowAddCategory}>
                                <IoIosAdd size="1.5em" />
                                Tambah Kategori
                            </button>
                            <AddModalCategory
                                show={showAddCategory}
                                handleClose={handleCloseAddCategory}
                            />
                            <button className={`p-2 d-flex align-items-center justify-content-center ${Style.button_adduser}`} onClick={handleShowAdd}>
                                <IoIosAdd size="1.5em" />
                                Tambah Product
                            </button>
                            <AddModalUser
                                show={showAdd}
                                handleClose={handleCloseAdd}
                                type="product"
                            />

                        </div>
                    </div>
                    <div style={{ overflow: "auto", height: "400px" }}>
                        <table className={`${Style.custom_table}`} style={{ width: "100%" }} cellPadding="3">
                            <thead style={{ backgroundColor: "#4D4C7D", color: "#f5f5f5" }}>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Nama Produk</th>
                                    <th scope="col">Gambar</th>
                                    <th scope="col">Kategori</th>
                                    <th scope="col">Harga</th>
                                    <th scope="col">Stok</th>
                                    <th scope="col">Keuntungan</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={product.id} style={{ borderBottom: "1px solid #4D4C7D" }}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{product.name}</td>
                                        <td> <figure>
                                            <img style={{ width: "50px", height: "50px" }} src={product.url} alt="Foto" />
                                        </figure>
                                        </td>
                                        <td>{product.kategori}</td>
                                        <td>{product.harga}</td>
                                        <td>{product.stok}</td>
                                        <td>{product.keuntungan}</td>
                                        <td>
                                            <div className="d-flex align-items-center" style={{ gap: "0.375rem" }}>
                                                <button className="btn btn-success" onClick={() => handleShowEdit(product.id)}>Edit</button>
                                                <EditModalProduct
                                                    show={editProductId === product.id}
                                                    handleClose={handleCloseEdit}
                                                    product={product}
                                                />
                                                <button className="btn btn-danger" onClick={() => deleteProduct(product.id)}>Hapus</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}