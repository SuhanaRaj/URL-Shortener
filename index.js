const express = require("express");
const urlRoute = require('./Routes/url');
const { connectToMongoDB } = require('./connect');
const URL = require('./models/url');
require('dotenv').config();

connectToMongoDB();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/url", urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, 
    { $push: 
        {
            visitHistory: { timestamp: Date.now() }
        } 
    });
    res.redirect(entry.redirectURL);
})

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));