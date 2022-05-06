require("dotenv").config();

const express = require("express");
const cors = require('cors');
const app = express()
const cookieparser = require('cookie-parser');
const connection = require("./db");
app.use(cors())
app.use(express.json());
app.use(cookieparser())
connection();

const PORT = process.env.PORT || 3001


app.get("/", (req, res) => {
    res.send("hello")
})

app.use("/", require('./routes/router'));

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`))