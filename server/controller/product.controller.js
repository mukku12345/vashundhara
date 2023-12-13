const db = require("../model");
 const Products = db.products.Product;

 exports.createProducts = async (req,res) => {
    try {

        const {name,price,rating,brand} = req.body;
        const baseUrl = "http://localhost:8080"
const imageUrls = req.files.map(file => `${baseUrl}/images/${file.filename}`);
        const product = new Products({name,price,rating,brand,images : imageUrls});
        await product.save();
        res.status(201).json(product);
    } catch (error){
        res.status(500).json({message:error.message});
    }
 }

 
 exports.getProducts = async (req,res) => {
    try {
const sortField = req.query.sortFiled;
const sortOrder = req.query.sortOrder === "descending" ?-1 :1;
const page = parseInt(req.query.page) || 1 ;
  const pageSize = 5 ;

let sortOptions = {};
if(sortField === "price" || sortField === "rating"){
    sortOptions[sortField]= sortOrder;
}
const totalproducts = await Products.countDocuments();
const totalPages = Math.ceil(totalproducts/pageSize);
const products = await Products.find().sort(sortOptions).skip((page-1)*pageSize).limit(pageSize);


res.status(200).json({products,currentPage:page ,totalPages});

    } catch (error){
        res.status(500).json({message:error.message});
    }
 }



 exports.updateOne = async (req,res) => {
    try {
        const productId = req.query.productId

        const existProduct = await Products.findById(productId);
        if(!existProduct){
return res.status(404).json({message:"Product not found"});
        }
         if(req.body.name){
            existProduct.name = req.body.name ;
         }
         if(req.body.price){
            existProduct.price = req.body.price ;
         }
           if(req.body.rating){
            existProduct.rating = req.body.rating ;
         } 
          if(req.body.brand){
            existProduct.brand = req.body.brand ;
         }
         if(req.files && req.files.length  >0){
           
        const baseUrl = "http://localhost:8080"

            const imageUrls = req.files.map(file => `${baseUrl}/images/${file.filename}`);
            existProduct.images = imageUrls ;
       
         }

         const updatedProduct = await existProduct.save();
    
        res.json({data : updatedProduct})
    } catch (error){
        res.status(500).json({message:error.message});
    }
 }


 exports.deleteOne = async (req,res) => {
    try {
        const productId = req.query.productId

        const existProduct = await Products.findById(productId);
        if(!existProduct){
return res.status(404).json({message:"Product not found"});
        }

        await Products.findByIdAndDelete(productId);
        res.json({message:"Product deleted successfully"})
    } catch (error){
        res.status(500).json({message:error.message});
    }
 }