require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

const app = express();
const port = process.env.PORT || 4005;

console.log("Starting server...");

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connected to MongoDB");
}).catch(error => {
  console.error('Error connecting to MongoDB:', error.message);
});

let db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("We're connected to the cloud database"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/b5/users", userRoutes);
app.use("/b5/products", productRoutes);
app.use("/b5/cart", cartRoutes);
app.use("/b5/orders", orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).send('Something broke!');
});

if (require.main === module) {
  app.listen(port, () => console.log(`API is now online on port ${port}`));
}

module.exports = app;  // Ensure the export is correct for Vercel
