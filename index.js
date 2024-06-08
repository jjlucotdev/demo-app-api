const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

const app = express();
const port = 4005;

//jason connection
mongoose.connect("mongodb+srv://admin:admin1234@capstone2-ecommerce.x4q92t5.mongodb.net/ecommerce?retryWrites=true&w=majority");

//jose connection
// mongoose.connect("mongodb+srv://admin:admin1234@wdc028-course-booking.smrreb4.mongodb.net/ecommerce?retryWrites=true&w=majority");


let db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("We're connected to the cloud database"));


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use("/b5/users", userRoutes);
app.use("/b5/products", productRoutes);
app.use("/b5/cart", cartRoutes);
app.use("/b5/orders", orderRoutes);

if(require.main === module){
	app.listen(process.env.PORT || port, () => console.log(`API is now online on port ${process.env.PORT || port}`));
}

module.exports = {app, mongoose};