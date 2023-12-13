const { isObjectIdOrHexString } = require("mongoose");

const mongoose = require("mongoose")
module.exports = mongoose=>{
    const product = mongoose.Schema({
        name:  {
            type:String,
            required :true
         } ,
        price: {
            type:Number,
            required :true
         },
        rating: {
            type:Number,
            required :true
         },
        brand: {
            type:String,
            required :true
         },
        images:[
         {
            type:String,
            required :true
         }
        ]
      
       
});
    

    const Product = mongoose.model("Product",product);
   
    return {Product}
    
}