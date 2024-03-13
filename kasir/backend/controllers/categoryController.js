import Kategori from "../models/kategoriModel.js";

export const getCategory = async(req, res) =>{
    try {
        const response = await Kategori.findAll({
            where: {
                id_admin: req.params.id_admin
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

export const createCategory = async(req, res) =>{
    try {
        await Kategori.create(req.body);
        res.status(201).json({msg: 'User Created'});
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteCategory = async(req, res) => {
    try {
        await Kategori.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Delete"});
    } catch (error) {
        console.log(error.message);
    }
};