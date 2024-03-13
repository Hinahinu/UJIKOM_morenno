import Product from "../models/productModel.js";
import Kategori from "../models/kategoriModel.js";
import path from "path";
import { Op } from "sequelize";
import fs from "fs";

export const getProducts = async (req, res) => {
    try {
        const response = await Product.findAll({
            where: {
                id_admin: req.params.id_admin
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getProductById = async (req, res) => {
    try {
        const response = await Product.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveProduct = (req, res) => {
    const id_admin = req.body.id_admin;
    const kategori = req.body.kategori;
    const harga = req.body.harga;
    const stok = req.body.stok;
    const keuntungan = req.body.keuntungan;

    if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
    const name = req.body.title;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const date = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
    const fileName = `${file.md5}-${date}${ext}`;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Product.create({ id_admin: id_admin, name: name, image: fileName, url: url, kategori: kategori, harga: harga, stok: stok, keuntungan: keuntungan });
            res.status(201).json({ msg: "Product Created Successfuly" });
        } catch (error) {
            console.log(error.message);
        }
    })

}

export const updateProduct = async (req, res) => {
    const product = await Product.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!product) return res.status(404).json({ msg: "No Data Found" });

    let fileName = product.image;
    if (req.files !== null) {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        const date = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
        fileName = `${file.md5}-${date}${ext}`;
        const allowedType = ['.png', '.jpg', '.jpeg'];

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
        if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

        const filepath = `./public/images/${product.image}`;
        try {
            fs.unlinkSync(filepath);
        } catch (err) {

        }

        file.mv(`./public/images/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }

    const kategori = req.body.kategori;
    const harga = req.body.harga;
    const stok = req.body.stok;
    const keuntungan = req.body.keuntungan;
    const name = req.body.title;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    try {
        await Product.update({ name: name, image: fileName, url: url, kategori: kategori, harga: harga, stok: stok, keuntungan: keuntungan }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Product Updated Successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}


export const deleteProduct = async (req, res) => {
    const product = await Product.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!product) return res.status(404).json({ msg: "No Data Found" });

    try {
        const filepath = `./public/images/${product.image}`;
        fs.unlinkSync(filepath);
        await Product.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Product Deleted Successfuly" });
    } catch (error) {
        console.log(error.message);
    }
}

export const getProductsByIdAndCategory = async (req, res) => {
    try {
        const category = await Kategori.findOne({
            where: {
                id: req.params.selectedCategory
            }
        })
        
        if (!category) {
            return res.status(404).json({ error: 'Kategori tidak ditemukan' });
        }
    
        const kategori = category.kategori;

        const response = await Product.findAll({
            where: {
                id_admin: req.params.id_admin,
                kategori: {
                    [Op.like]: `%${kategori}%`
                  }
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const countProduct = async (req, res) => {
    try {
        const id_admin = req.params.id_admin;
    
        const response = await Product.count({
          where: {
            id_admin: id_admin
          }
        });
    
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
  }
