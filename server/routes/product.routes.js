const express = require("express");

const router = new express.Router();

const Products = require("../controller/product.controller");
const upload = require("../multer")

module.exports = app => {
    router.post("/posts",upload.array('images'),Products.createProducts);
    router.get("/getProducts",Products.getProducts);
    router.delete("/deleteById",Products.deleteOne);
    router.put("/updateById",upload.array('images'),Products.updateOne);
    app.use("/api",router);
}