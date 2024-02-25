const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbConfig = require("./DB/database");

const app = express();
app.use(express.json());
app.use(cors());

dbConfig();

const port = process.env.PORT || 3001;

app.use("/api/v1/auth", require("./Routes/authRoutes"));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
