const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const productsRoutes = require("./route/product");
const registerRouter = require("./route/register");
const loginRouter = require("./route/login");
const { default: mongoose } = require("mongoose");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));
app.get("/", async(req, res) => {
  res.json({ message: "Welcome To Api" });
});
app.use("/api/products", productsRoutes);
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
