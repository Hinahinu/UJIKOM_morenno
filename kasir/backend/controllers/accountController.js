import Account from "../models/accountModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const getAccounts = async(req, res) =>{
    try {
        const response = await Account.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

export const getAccountById = async(req, res) =>{
    try {
        const response = await Account.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

export const createAccount = async(req, res) =>{
    try {
        await Account.create(req.body);
        res.status(201).json({msg: 'User Created'});
    } catch (error) {
        console.log(error.message);
    }
};

export const updateAccount = async(req, res) =>{
    try {
        await Account.update(req.body, {
            where:{
                id: req.params.id
            }
        });
        res.status(201).json({msg: 'User Update'});
    } catch (error) {
        console.log(error.message);
    }
};

export const loginAccount = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Account.findOne({ where: { email } });
  
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      if (password !== user.password) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      res.json({ message: 'Login successful', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  };