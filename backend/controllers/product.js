const Product = require('../models/product');
const { StatusCodes } = require('http-status-codes');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(StatusCodes.OK).json({
      success: true,
      products
    });
  } catch(error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).send();
  }
}

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        msg: "Product not found"
      });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      product
    });
  } catch(error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).send();
  }
}

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Product created successfully",
      product
    });
  } catch(error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).send();
  }
}

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Product not found"
      });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Product updated successfully",
      product
    });
  } catch(error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).send();
  }
}

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Product not found"
      });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Product deleted successfully",
      product
    });
  } catch(error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).send();
  }
}

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};