require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const restaurantRoutes = require('./routes/restaurant');

mongoose.set('strictQuery', true);
const connString = process.env.DATABASE_URL;

mongoose.connect(connString);
const database = mongoose.connection;

database.on("error", (error) => {
    console.log(error);
});

database.once("connected", () => {
    console.log("Database connected");
});

const app = express();
app.use(express.json());
app.use('/api', restaurantRoutes);


const PORT = process.env.PORT;

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;