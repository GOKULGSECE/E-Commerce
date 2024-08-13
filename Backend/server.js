const express = require("express")
const mongoose = require('mongoose');

const uri = "mongodb+srv://gokulg2022cce:MSDgokul007@cluster0.rk90bqs.mongodb.net/E-commerce";

const app = express()
const port = 5000
app.use(express.json())
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas', err));

app.use("/api/products",require('./routes/productsRoutes'))
app.use("/api/users",require('./routes/userRoutes'))
app.listen(port,()=>console.log(`server connected at ${port}`))