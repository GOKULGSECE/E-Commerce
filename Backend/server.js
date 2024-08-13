const express = require("express")
const mongoose = require('mongoose');

const uri = "mongodb://localhost:27017/E-Commerce";

const app = express()
const port = 3000
app.use(express.json())
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB compasss'))
  .catch(err => console.error('Error connecting to MongoDB Atlas', err));

app.use("/api/products",require('./routes/productsRoutes'))
app.use("/api/users",require('./routes/userRoutes'))
app.listen(port,()=>console.log(`server connected at ${port}`))