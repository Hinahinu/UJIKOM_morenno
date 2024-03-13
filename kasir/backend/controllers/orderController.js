import Order from "../models/orderModel.js";
import easyInvoice from "easyinvoice";
import path from "path";
import fs from 'fs';
import PDFDocument from "pdfkit";
import { Sequelize, Op } from "sequelize";

export const getOrders = async (req, res) => {
  try {
    const response = await Order.findAll({
      where: {
        id_admin: req.params.id_admin
      }
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createOrder = async (req, res) => {
  try {
    const { pesanan } = req.body;
    const { totalBayar } = req.body;
    let totalSubtotal = 0;
    await Promise.all(pesanan.map(async (item) => {
      const subtotal = item.quantity * item.product.harga;
      totalSubtotal += subtotal;
      await Order.create({
        id_admin: item.id_admin,
        id_pesanan: item.idPesanan,
        id_produk: item.product.id,
        jumlah_produk: item.quantity,
        subtotal: subtotal
      });
    }));

    const kembalian = Math.max(totalBayar - totalSubtotal, 0);

    const doc = new PDFDocument();
    const fileName = `invoice_${Date.now()}.pdf`;
    const filePath = path.join('public', 'pdf', fileName);
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);

    const pageWidth = doc.page.width;
    const imageWidth = 50;

    const imageX = (pageWidth - imageWidth) / 2;

    doc.image('public/images/shop.png', imageX, doc.y, {
      fit: [imageWidth, 50], 
      align: 'center' 
    }).moveDown();

    doc.fontSize(20).text('Invoice', { align: 'center' }).moveDown();
    doc.text('Invoice Date: ' + new Date().toLocaleDateString());
    doc.moveDown();

    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    pesanan.forEach(item => {
      doc.fontSize(14).text('Product: ' + item.product.name);
      doc.fontSize(12).text('Quantity: ' + item.quantity);
      doc.fontSize(12).text('Price: ' + item.product.harga);
      doc.fontSize(12).text('Subtotal: ' + (item.quantity * item.product.harga)).moveDown();
    });

    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();
    doc.fontSize(14).text('Total Subtotal: ' + totalSubtotal, { align: "right" });
    doc.fontSize(14).text('Total Bayar: ' + totalBayar, { align: "right" });
    doc.fontSize(14).text('Kembalian: ' + kembalian, { align: "right" });

    doc.end();

    const url = `${req.protocol}://${req.get("host")}/invoice/${fileName}`;
    res.status(200).json({ message: 'Pesanan berhasil disimpan', url });
  } catch (error) {
    console.error('Error saat menyimpan pesanan:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menyimpan pesanan' });
  }
};

export const countProductsSoldThisMonth = async (req, res) => {
  try {
    const id_admin = req.params.id_admin;

    const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    const response = await Order.sum('jumlah_produk', {
      where: {
        id_admin: id_admin,
        createdAt: {
          [Op.between]: [startDate, endDate]
        }
      }
    });

    res.status(200).json(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const countUniqueOrdersByAdmin = async (req, res) => {
  try {
    const idAdmin = req.params.id_admin

    const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    const response = await Order.findOne({
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('id_pesanan'))), 'jumlah_pesanan']
      ],
      where: {
        id_admin: idAdmin,
        createdAt: {
          [Op.between]: [startDate, endDate]
        }
      }
    });
    res.json(response)
  } catch (error) {
    console.error('Error menghitung jumlah id_pesanan:', error);
    throw error;
  }
};