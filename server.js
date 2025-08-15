const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Product = require('./models/product.model')
const productRoute = require('./routes/product.route')
const userRoute = require('./routes/user.route')
const User = require('./models/user.model')
require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//routes
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
}).then(() => {
  console.log('Connected to MongoDB')
  app.listen(3000, () => {
    console.log('Server is running on port 3000')
  })
}).catch(err => {
  console.error('Error connecting to MongoDB:', err)
});