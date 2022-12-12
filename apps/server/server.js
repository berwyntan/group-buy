require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const morgan = require("morgan");
const db = require("./config/database");

// routers
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const orderRouter = require("./routes/orderRouter");
const cartRouter = require("./routes/cartRouter");
const smsRouter = require("./routes/smsRouter");

const PORT = process.env.PORT || 3000;
const app = express();

// postgres
try {
    db.authenticate();
    console.log('Connected to ElephantSQL');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

// middleware
// app.set('trust proxy', 1); // trust first proxy
app.use(express.static("../client/dist"));

app.use(cors(corsOptions));
// app.use(cors());

// app.use(
//   session(sessionOptions)
// );

app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/api/order", orderRouter);
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/sms", smsRouter)

app.get("/", (req, res) => {res.json({msg: "hello world"})});

app.get("/*", (req, res) => {
  res.sendFile(path.resolve("../client/dist/index.html"));
});


app.listen(PORT, () => {
console.log(`Example app listening on port ${PORT}`);})
  

