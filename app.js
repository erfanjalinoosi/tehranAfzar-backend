require("dotenv").config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
const connectDB = require("./config/db");

const app = express();

const cors = require('cors')
app.use(cors())

// mongodb configuration
connectDB();


// admin route
const adminRouter = require("./routes/admin");
app.use("/admin", adminRouter);

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


//routes config
const indexRouter = require("./routes/index");
const productsRouter = require("./routes/products");
const categoryRouter = require("./routes/category");
const usersRouter = require("./routes/user");
const orderRouter = require("./routes/order")
app.use("/products", productsRouter);
app.use("/categories", categoryRouter);
app.use("/user", usersRouter);
app.use("/order", orderRouter)
app.use("/", indexRouter);

// error handler
app.use(function (err, req, res, next) {
  return res.status(400).send({
    message: err.message
  })
});
``
var port = process.env.PORT || 3000;
app.set("port", port);
app.listen(port, () => {
  console.log("Server running at port " + port);
});

module.exports = app;
