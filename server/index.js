const express = require('express')
const app = express();
const bodyparser = require('body-parser');
const path = require('path');
const db = require('./model');
const cors = require('cors');


app.use(cors());

const port = process.env.PORT || 8080 ;
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());
app.use('/images',express.static('images'));
db.mongoose.connect(db.url).then(()=>{
  console.log("connected to mongodb Atlas server")
}).catch(err=>{
  console.log("Not connected ",err)
})

require("./routes/product.routes")(app);
app.listen(port,()=>{
  
 console.log("server is running")

})
