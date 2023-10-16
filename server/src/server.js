const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();
//=#=#=#=#=#==#=#=#=#=#==#=#=#=#=#==#=#=#=#=#==#=#=#=#=#==#=#=#=#=#=#

const AuthRouter = require("./routes/Auth.js");
const PostRouter = require("./routes/Post.js");
//=#=#=#=#=#==#=#=#=#=#==#=#=#=#=#==#=#=#=#=#==#=#=#=#=#==#=#=#=#=#=#

//=#=#=#=#=#==#=#=#=#=#==#=#=#=#=#==#=#=#=#=#==#=#=#=#=#==#=#=#=#=#=#
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // use your actual domain name (or localhost), using * is not recommended
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Origin",
      "X-Requested-With",
      "Accept",
      "x-client-key",
      "x-client-token",
      "x-client-secret",
      "Authorization",
    ],
    credentials: true,
  })
); //=#=#=#=#=#==#=#=#=#=#==#=#=#=#=#==#=#=#=#=#==#=#=#=#=#==#=#=#=#=#=#

//
//=#=#=#=#=#==#=#=#=#=#==#=#=#=#=#==#=#=#=#=#==#=#=#=#=#==#=#=#=#=#=#

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bde79pf.mongodb.net/?retryWrites=true&w=majority`,
    {useNewUrlParser: true, useUnifiedTopology: true} // Add connection options
  )
  .then((res) => {
    console.log(`CONNECTED SUCCESSFULLY.`);
  })
  .catch((err) => {
    // Change to 'err' instead of 'res'
    console.log(`CONNECTION FAILED: ${err}`);
  });

app.use("/post", PostRouter);
app.use("/auth", AuthRouter);
//=#=#=#=#=#==#=#=#=#=#==#=#=#=#=#==#=#=#=#=#==#=#=#=#=#==#=#=#=#=#=#

const PORT = 5000;

app.listen(PORT, () => {
  // Use 'PORT' instead of '(PORT)'
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
