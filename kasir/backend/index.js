import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import AccountRoute from "./routes/accountRoute.js";
import UserRoute from "./routes/userRoute.js";
import FileUpload from "express-fileupload";
import ProductRoute from "./routes/productRoute.js";
import CategoryRoute from "./routes/categoryRoute.js"
import OrderRoute from "./routes/orderRoute.js"
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(AccountRoute, UserRoute, ProductRoute, CategoryRoute, OrderRoute)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.get('/invoice/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, 'public', 'pdf', fileName);

    res.sendFile(filePath);
  });

app.listen(port, ()=> console.log('Server up and running...'));