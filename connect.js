const mongoose = require("mongoose");

function connectToMongoDB() {
    return mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected"))
}

module.exports = { connectToMongoDB };