import React, { useState, useEffect } from "react";
import Style from "../assets/style/cashier.module.css";
import Sidebar from "../assets/components/sidebar/sidebar";
import Text from "../assets/style/text.module.css";
import { VscDiffAdded } from "react-icons/vsc";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { jwtDecode } from "jwt-decode";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

export default function Cashier() {
    const [totalBayar, setTotalBayar] = useState("");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);
    const [cartCourses, setCartCourses] = useState([]);
    console.log(cartCourses)
    const [idPesanan, setIdPesanan] = useState(uuidv4());

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const id_admin = decodedToken.userId;

    const getUser = async () => {
        const response = await axios.get(`http://localhost:5000/account/${id_admin}`);
        setUser(response.data);
    };

    const addCourseToCartFunction = (GFGcourse) => {
        const alreadyCourses = cartCourses.find(item => item.product.id === GFGcourse.id);
        if (alreadyCourses) {
            const latestCartUpdate = cartCourses.map(item =>
                item.product.id === GFGcourse.id ? { ...item, quantity: item.quantity + 1, id_admin } : item
            );
            setCartCourses(latestCartUpdate);
        } else {
            setCartCourses([...cartCourses, { product: GFGcourse, quantity: 1, id_admin, idPesanan }]);
        }
    };

    const totalAmountCalculationFunction = () => {
        return cartCourses.reduce((total, item) => total + item.product.harga * item.quantity, 0);
    };

    const totalAmountCalculationFunctionPerProduct = () => {
        const totalPerProduct = {};

        cartCourses.forEach(item => {
            const productId = item.product.id;
            const productPrice = item.product.harga;
            const quantity = item.quantity;
            const totalPerItem = productPrice * quantity;

            if (!totalPerProduct[productId]) {
                totalPerProduct[productId] = 0;
            }

            totalPerProduct[productId] += totalPerItem;
        });

        return totalPerProduct;
    };

    const getTotalAmountPerProduct = (productId) => {
        const totalPerProduct = totalAmountCalculationFunctionPerProduct();
        return totalPerProduct[productId] || 0;
    };

    const removeCourseFromCartFunction = (productId) => {
        setCartCourses(prevCartCourses => prevCartCourses.filter(item => item.product.id !== productId || item.quantity !== 0));
    };

    const handleCheckout = async () => {
        try {
            const response = await axios.post('http://localhost:5000/pesanan', { pesanan: cartCourses, totalBayar });
            setCartCourses([]);
            setIdPesanan(uuidv4());
            setTotalBayar("");

            window.open(response.data.url, '_blank');

            handleClose();
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    };

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(0);

    const fetchProducts = async () => {
        try {
            let response;
            if (selectedCategory === 0) {
                response = await axios.get(`http://localhost:5000/products/${id_admin}`);
            } else {
                response = await axios.get(`http://localhost:5000/products/${selectedCategory}/${id_admin}`);
            }
            setProducts(response.data)
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    useEffect(() => {
        getCategories();
        fetchProducts();
        getUser();
        setSelectedCategory(selectedCategory);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory]);

    console.log(selectedCategory)

    const getCategories = async () => {
        const response = await axios.get(`http://localhost:5000/kategori/${id_admin}`);
        setCategories([{ id: 0, kategori: 'Semua' }, ...response.data]);
    }

    return (
        <div className={`d-flex align-items-start ${Style.bg_cashier}`}>
            <Sidebar />
            <div className="d-flex align-items-start">
                <div className="d-flex flex-column p-2" style={{ gap: "0.375rem", width: "43.675rem" }}>
                    <div className="d-flex" style={{ flex: "1 0 0" }}>
                        <h1 className={`${Text.text1}`}>{user ? user.nama_toko : "Nama Toko"}</h1>
                    </div>
                    <div className="d-flex flex-column" style={{ gap: "0.675rem" }}>
                        <div className="d-flex" style={{ flexWrap: "wrap", gap: "1.5rem" }}>
                            {categories.map((category) => (
                                <p
                                    key={category.id}
                                    className={`m-0 ${category.id === selectedCategory ? `${Text.text_onbottom}` : `${Text.text_offbottom}`}`}
                                    onClick={() => setSelectedCategory(category.id)}
                                >
                                    {category.kategori}
                                </p>

                            ))}
                        </div>
                        <div className="d-flex" style={{ flexWrap: "wrap", gap: "1.375rem", height: "28.75rem", overflow: "auto" }}>
                            {products.map((product) => (
                                <div key={product.id} className={`d-flex flex-column p-2 ${Style.box_product}`} style={{ gap: "0.15rem" }}>
                                    <figure>
                                        <img src={product.url} alt="Foto" style={{ width: "188px", height: "112px" }} />
                                    </figure>
                                    <p className={`${Text.text2} m-0`}>{product.name}</p>
                                    <div className="d-flex align-items-center" style={{ gap: "0.135rem" }}>
                                        <p className={`${Text.text5} m-0`} style={{ flex: "1 0 0" }}>Rp. {product.harga}</p>
                                        <button className="btn btn-link m-0 p-0" onClick={() => addCourseToCartFunction(product)}>
                                            <VscDiffAdded color="#F99417" size="2em" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={`d-flex flex-column py-3 px-4 ${Style.box_cashier}`} style={{ gap: "0.675rem", width: "36.25rem" }}>
                    <div className="d-flex">
                        <h1 className={`${Text.text1}`}>Pesanan #1</h1>
                    </div>
                    <div className="d-flex flex-column" style={{ gap: "1.675rem" }}>
                        <div className="d-flex flex-column" style={{ gap: "0.675rem" }}>
                            <div className="d-flex align-items-center" style={{ borderBottom: "3px solid #363062" }}>
                                <p className={`${Text.text3}`} style={{ flex: "1 0 0" }}>Barang</p>
                                <div className="d-flex align-items-center" style={{ gap: "5.375rem" }}>
                                    <p className={`${Text.text3}`}>Jumlah</p>
                                    <p className={`${Text.text3}`}>Harga</p>
                                </div>
                            </div>
                            <div className="d-flex flex-column" style={{ gap: "0.375rem" }}>
                                {cartCourses.map((item) => (
                                    <div className="d-flex align-items-center" style={{ gap: "0.375rem" }} key={item.product.id}>
                                        <div className="d-flex align-items-center" style={{ flex: "1 0 0", gap: "0.375rem" }}>
                                            <figure className="m-0">
                                                <img src={item.product.url} alt="Foto" style={{ width: "75px", height: "50px" }} />
                                            </figure>
                                            <div className="d-flex flex-column" style={{ gap: "0.175rem" }}>
                                                <p className={`${Text.text5} m-0`}>{item.product.name}</p>
                                                <p className={`${Text.text5} m-0`}>Rp. {item.product.harga}</p>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center" style={{ gap: "3.275rem" }}>
                                            <div className="d-flex align-items-center" style={{ gap: "0.175rem" }}>
                                                <button className="btn btn-link m-0 p-0" onClick={(e) => {
                                                    setCartCourses(prevCartCourses => {
                                                        const updatedCart = prevCartCourses.map(prevItem =>
                                                            prevItem.product.id === item.product.id
                                                                ? { ...prevItem, quantity: Math.max(item.quantity - 1, 0) }
                                                                : prevItem
                                                        );
                                                        if (item.quantity === 1) {
                                                            removeCourseFromCartFunction(item.product.id);
                                                        }
                                                        return updatedCart;
                                                    });
                                                }}>
                                                    <CiCircleMinus size="1.5em" color="#F99417" />
                                                </button>
                                                <input className="border-0" value={item.quantity} type="text" style={{ width: "22px", height: "18px", backgroundColor: "#f5f5f5" }}></input>
                                                <button className="btn btn-link m-0 p-0" onClick={(e) => {
                                                    setCartCourses((prevCartCourses) => {
                                                        const updatedCart = prevCartCourses.map(
                                                            (prevItem) =>
                                                                prevItem.product.id === item.product.id
                                                                    ? { ...prevItem, quantity: item.quantity + 1 }
                                                                    : prevItem
                                                        );
                                                        return updatedCart;
                                                    })
                                                }}>
                                                    <CiCirclePlus size="1.5em" color="#F99417" />
                                                </button>
                                            </div>
                                            <p className={`${Text.text5} m-0`}>Rp. {getTotalAmountPerProduct(item.product.id)}</p>
                                        </div>
                                    </div>
                                ))}
                                <div className="d-flex align-items-center justify-content-between mt-2 pt-1" style={{ borderTop: "3px solid #363062" }}>
                                    <p className={`${Text.text5}`}>Subtotal</p>
                                    <p className={`${Text.text5}`}>Rp. {totalAmountCalculationFunction()}</p>
                                </div>
                            </div>
                        </div>
                        <div className=" d-flex justify-content-center">
                            <button className={`${Style.button_cashier} p-1`} onClick={handleShow}>Lanjutkan Pembayaran</button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title className={`${Text.text3}`}>Modal heading</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{ borderBottom: "2px solid #4D4C7D" }}>
                                            <Form.Label className={`${Text.text3}`}>TOTAL TAGIHAN</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={totalAmountCalculationFunction()}
                                                className="border-0 focus-visible"
                                                readOnly
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2" style={{ borderBottom: "2px solid #4D4C7D" }}>
                                            <Form.Label className={`${Text.text3}`}>TOTAL BAYAR</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="border-0 focus-visible"
                                                value={totalBayar} onChange={(e) => setTotalBayar(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Form>
                                    <div className="d-flex flex-column">
                                        <p className={`${Text.text6} m-0`}>KEMBALIAN :</p>
                                        <p className={`${Text.text6} m-0`}>{totalBayar - totalAmountCalculationFunction()}</p>
                                        <p className={`${Text.text6} m-0`}>WAKTU PEMBAYARAN :</p>
                                        <p className={`${Text.text6} m-0`}></p>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleCheckout}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}





// <div className={`d-flex align-items-start ${Style.bg_cashier}`}>
//     <Sidebar />
//     <div className="d-flex align-items-start">
//         <div className="d-flex flex-column p-2" style={{ gap: "0.375rem", width: "43.675rem" }}>
//             <div className="d-flex" style={{ flex: "1 0 0" }}>
//                 <h1 className={`${Text.text1}`}>{user ? user.nama_toko : "Nama Toko"}</h1>
//             </div>
//             <div className="d-flex flex-column" style={{ gap: "0.675rem" }}>
//                 <div className="d-flex" style={{ flexWrap: "wrap", gap: "1.5rem" }}>
//                     {categories.map((category) => (
//                         <p
//                             key={category.id}
//                             className={`m-0 ${category.id === selectedCategory ? `${Text.text_onbottom}` : `${Text.text_offbottom}`}`}
//                             onClick={() => setSelectedCategory(category.id)}
//                         >
//                             {category.kategori}
//                         </p>
//                     ))}
//                 </div>
//                 <div className="d-flex" style={{ flexWrap: "wrap", gap: "1.375rem", height: "28.75rem", overflow: "auto" }}>
//                     {products.map((product) => (
//                         <div key={product.id} className={`d-flex flex-column p-2 ${Style.box_product}`} style={{ gap: "0.15rem" }}>
//                             <figure>
//                                 <img src={product.url} alt="Foto" style={{ width: "188px", height: "112px" }} />
//                             </figure>
//                             <p className={`${Text.text2} m-0`}>{product.name}</p>
//                             <div className="d-flex align-items-center" style={{ gap: "0.135rem" }}>
//                                 <p className={`${Text.text5} m-0`} style={{ flex: "1 0 0" }}>Rp. {product.harga}</p>
//                                 <button className="btn btn-link m-0 p-0" onClick={() => addCourseToCartFunction(product)}>
//                                     <VscDiffAdded color="#F99417" size="2em" />
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//         <div className={`d-flex flex-column py-3 px-4 ${Style.box_cashier}`} style={{ gap: "0.675rem", width: "36.25rem" }}>
//             <div className="d-flex">
//                 <h1 className={`${Text.text1}`}>Pesanan #1</h1>
//             </div>
//             <div className="d-flex flex-column" style={{ gap: "1.675rem" }}>
//                 <div className="d-flex flex-column" style={{ gap: "0.675rem" }}>
//                     <div className="d-flex align-items-center" style={{ borderBottom: "3px solid #363062" }}>
//                         <p className={`${Text.text3}`} style={{ flex: "1 0 0" }}>Barang</p>
//                         <div className="d-flex align-items-center" style={{ gap: "5.375rem" }}>
//                             <p className={`${Text.text3}`}>Jumlah</p>
//                             <p className={`${Text.text3}`}>Harga</p>
//                         </div>
//                     </div>
//                     <div className="d-flex flex-column" style={{ gap: "0.375rem" }}>
//                         {cartCourses.map((item) => (
//                             <div className="d-flex align-items-center" style={{ gap: "0.375rem" }} key={item.product.id}>
//                                 <div className="d-flex align-items-center" style={{ flex: "1 0 0", gap: "0.375rem" }}>
//                                     <figure className="m-0">
//                                         <img src={item.product.url} alt="Foto" style={{ width: "75px", height: "50px" }} />
//                                     </figure>
//                                     <div className="d-flex flex-column" style={{ gap: "0.175rem" }}>
//                                         <p className={`${Text.text5} m-0`}>{item.product.name}</p>
//                                         <p className={`${Text.text5} m-0`}>Rp. {item.product.harga}</p>
//                                     </div>
//                                 </div>
//                                 <div className="d-flex align-items-center" style={{ gap: "3.275rem" }}>
//                                     <div className="d-flex align-items-center" style={{ gap: "0.175rem" }}>
//                                         <button className="btn btn-link m-0 p-0" onClick={(e) => {
//                                             setCartCourses(prevCartCourses => {
//                                                 const updatedCart = prevCartCourses.map(prevItem =>
//                                                     prevItem.product.id === item.product.id
//                                                         ? { ...prevItem, quantity: Math.max(item.quantity - 1, 0) }
//                                                         : prevItem
//                                                 );
//                                                 if (item.quantity === 1) {
//                                                     removeCourseFromCartFunction(item.product.id);
//                                                 }
//                                                 return updatedCart;
//                                             });
//                                         }}>
//                                             <CiCircleMinus size="1.5em" color="#F99417" />
//                                         </button>
//                                         <input className="border-0" value={item.quantity} type="text" style={{ width: "22px", height: "18px", backgroundColor: "#f5f5f5" }}></input>
//                                         <button className="btn btn-link m-0 p-0" onClick={(e) => {
//                                             setCartCourses((prevCartCourses) => {
//                                                 const updatedCart = prevCartCourses.map(
//                                                     (prevItem) =>
//                                                         prevItem.product.id === item.product.id
//                                                             ? { ...prevItem, quantity: item.quantity + 1 }
//                                                             : prevItem
//                                                 );
//                                                 return updatedCart;
//                                             })
//                                         }}>
//                                             <CiCirclePlus size="1.5em" color="#F99417" />
//                                         </button>
//                                     </div>
//                                     <p className={`${Text.text5} m-0`}>Rp. {getTotalAmountPerProduct(item.product.id)}</p>
//                                 </div>
//                             </div>
//                         ))}
//                         <div className="d-flex align-items-center justify-content-between mt-2 pt-1" style={{ borderTop: "3px solid #363062" }}>
//                             <p className={`${Text.text5}`}>Subtotal</p>
//                             <p className={`${Text.text5}`}>Rp. {totalAmountCalculationFunction()}</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className=" d-flex justify-content-center">
//                     <button className={`${Style.button_cashier} p-1`} onClick={handleShow}>Lanjutkan Pembayaran</button>
//                     <Modal show={show} onHide={handleClose}>
//                         <Modal.Header closeButton>
//                             <Modal.Title className={`${Text.text3}`}>Modal heading</Modal.Title>
//                         </Modal.Header>
//                         <Modal.Body>
//                             <Form>
//                                 <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{ borderBottom: "2px solid #4D4C7D" }}>
//                                     <Form.Label className={`${Text.text3}`}>TOTAL TAGIHAN</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         value={totalAmountCalculationFunction()}
//                                         className="border-0 focus-visible"
//                                         readOnly
//                                     />
//                                 </Form.Group>
//                                 <Form.Group className="mb-3" controlId="exampleForm.ControlInput2" style={{ borderBottom: "2px solid #4D4C7D" }}>
//                                     <Form.Label className={`${Text.text3}`}>TOTAL BAYAR</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         className="border-0 focus-visible"
//                                         value={totalBayar} onChange={(e) => setTotalBayar(e.target.value)}
//                                     />
//                                 </Form.Group>
//                             </Form>
//                             <div className="d-flex flex-column">
//                                 <p className={`${Text.text6} m-0`}>KEMBALIAN :</p>
//                                 <p className={`${Text.text6} m-0`}>{totalBayar - totalAmountCalculationFunction()}</p>
//                                 <p className={`${Text.text6} m-0`}>WAKTU PEMBAYARAN :</p>
//                                 <p className={`${Text.text6} m-0`}></p>
//                             </div>
//                         </Modal.Body>
//                         <Modal.Footer>
//                             <Button variant="secondary" onClick={handleClose}>
//                                 Close
//                             </Button>
//                             <Button variant="primary" onClick={handleCheckout}>
//                                 Save Changes
//                             </Button>
//                         </Modal.Footer>
//                     </Modal>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
