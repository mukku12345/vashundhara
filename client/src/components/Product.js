import React, { useState,useEffect } from 'react';
import API from './services/ApiServices';
import { ApiEndPoint } from './services/ApiEndPoint';

function Product() {
const[productName,setProductName] = useState("");
const[price,setPrice] = useState(null);
const[rating,setRating] = useState(null);
const[brandName,setbrandName] = useState("");
const[images,setImages] = useState([]);
const[findProducts ,setFindProducts] = useState([])
const[sortOrder,setSortOrder] = useState("");
const[sortField,setSortField] = useState("");
const[pageNumber,setPageNumber] = useState(1);
const [isEditing,setIsEditing] = useState(false);
const[editProductId,setEditProductId] = useState("");
const[editImages,setEditImages] = useState(null);





const postProducts = (e) =>{
e.preventDefault();

const headers = {
    // 'Content-Type' : 'multipart/form-data'
}
const formData = new FormData();
formData.append('name',productName)
formData.append('price',price)
formData.append('rating',rating)
formData.append('brand',brandName)

for(let i =0;i<images.length;i++){

    formData.append('images',images[i])
}

API.post(ApiEndPoint.Post,formData,{headers:headers})
.then((response)=>{
    console.log("response",response.data);
    getProducts();
    alert("posted")
}).catch((error)=>{
    console.log("error",error)
})


}



useEffect(()=>{
    getProducts();
},[sortOrder,pageNumber,sortField])

const getProducts = () =>{
    
  const  headers ={
        'Content-Type': 'application/json'
    }
   
    
    API.get(ApiEndPoint.Get + `?sortOrder=${sortOrder}&sortFiled=${sortField}&page=${pageNumber}`,{headers:headers})
    .then((response)=>{
        console.log("get",response.data.products);
        setFindProducts(response.data.products)
    }).catch((error)=>{
        console.log("error",error)
    })
    
    
    }


    const pageLoadingNext = ()=>{
setPageNumber(c=>c+1)
    }
    const pageLoadingPrev = ()=>{
        if(pageNumber>1){

            setPageNumber(c=>c-1)
        }
            }



const deleteProduct = (id) =>{
    const productId=id
    console.log("productId",typeof productId)
    const  headers ={
        'Content-Type': 'application/json'
    }
   
    
    API.delete(ApiEndPoint.DeleteById + `?productId=${productId}`,{headers:headers})
    .then((response)=>{
       getProducts();
       alert("deleted")
    }).catch((error)=>{
        console.log("error",error)
    })

}


//////////////////edit/////////////////


const editProductById = (id,name,price,rating,brand,images) =>{
  console.log("checkkk",editProductId)
    
    setEditProductId(id);
    setProductName(name);
    setPrice(price);
    setRating(rating);
    setbrandName(brand);
    setEditImages(images);
    setIsEditing(true);

}

const saveEditProduct = (e) =>{
   
  console.log("images",editImages)
    
    e.preventDefault();
    const headers = {
        // 'Content-Type' : 'multipart/form-data'
    }
    const formData = new FormData();
    formData.append('name',productName)
    formData.append('price',price)
    formData.append('rating',rating)
    formData.append('brand',brandName)
    
    for(let i =0;i<images.length;i++){
    
        formData.append('images',images[i])
    }
    
    API.put(ApiEndPoint.UpdateById +`?productId=${editProductId}`,formData,{headers:headers})
    .then((response)=>{
        alert("updated");
    setIsEditing(false)

        getProducts();
    }).catch((error)=>{
        console.log("error",error)
    })

}





  return (
    <>
    <h3>Vasundhara 🌎</h3>
{ <form onSubmit={(e)=>(isEditing?saveEditProduct(e):postProducts(e))}>
<label>Name</label>
<input type='text' value={productName} onChange={(e)=>{setProductName(e.target.value)}}/>
<br/>
<label>price</label>
<input type='text' value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
<br/><label>rating</label>
<input type='text'  value={rating} onChange={(e)=>{setRating(e.target.value)}}/>
<br/><label>brand</label>
<input type='text' value={brandName} onChange={(e)=>{setbrandName(e.target.value)}}/>
<br/>
<label>Images</label>
<input type='file' multiple   onChange={(e)=>{setImages(e.target.files)}}/>

<button type='submit'>save</button>

 </form>}


<div>
    <h1>Products</h1>
<select onChange={(e)=>setSortOrder(e.target.value)}>
    <option value="asc">Ascending</option>
    <option value="descending">Descending</option>
</select>
<select onChange={(e)=>setSortField(e.target.value)}>
    <option value="rating">Rating</option>
    <option value="price">Price</option>
</select>

    {
        findProducts && findProducts.map((item,index)=>{
return(
    <div className='container-products' key={index}>
      <div>
      <p>Name : {item.name}</p>
        <p>Price : {item.price}</p>
        <p>Rating : {item.rating} ⭐</p>
        <p>Brand : {item.brand}</p>
        </div>
      
       {item.images.map((item)=>{
        return(
            <div >
    
        <img src={item} name="images"  style={{"height":"200px" ,"width":"190px"}}/>
        
        </div>
        )
       })}
       <div className='btn-div'>
       <button className='btn' onClick={()=>{editProductById(item._id,item.name,item.price,item.rating,item.brand,item.images)}}>Edit</button>
<button className='btn' onClick={()=>{deleteProduct(item._id)}}>Delete</button>
        </div>


        </div>
)
        })
    }

  


   {pageNumber>1 ?<button onClick={()=>{pageLoadingPrev()}} >prev</button> : ""}
    {/* {pageNumber >= findProducts.length  ? "" : */}
    <button onClick={()=>{pageLoadingNext()}} >next</button>
    {/* } */}
</div>
    </>
  )
}

export default Product 