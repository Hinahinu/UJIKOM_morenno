import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const getUsers = async(req, res) =>{
    try {
        const response = await User.findAll({
            where: {
                id_admin: req.params.id_admin
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

export const getUserById = async(req, res) =>{
    try {
        const response = await User.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

export const createUser = async(req, res) =>{
    try {
        await User.create(req.body);
        res.status(201).json({msg: 'User Created'});
    } catch (error) {
        console.log(error.message);
    }
};

export const updateUser = async(req, res) =>{
    try {
        await User.update(req.body, {
            where:{
                id: req.params.id
            }
        });
        res.status(201).json({msg: 'User Update'});
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteUser = async(req, res) => {
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Delete"});
    } catch (error) {
        console.log(error.message);
    }
};

export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      if (password !== user.password) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

      const token = jwt.sign({ userId: user.id_admin }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const tokenPetugas = jwt.sign({ petugasId: user.id }, process.env.JWT_SECRET,{
        expiresIn: "1h",
      })
  
      res.json({ message: 'Login successful', token, tokenPetugas });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  };

  export const countUser = async (req, res) => {
    try {
        const response = await User.count({
            where: {
                id_admin: req.params.id_admin
            }
        })
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
  }