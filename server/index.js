const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const postRoute = require("./routes").post;
const UserFunctionRoute = require("./routes").UserFunction;
const passport = require("passport");
// 這行代碼引入了位於 ./config/passport 路徑下的配置文件，並將 passport (自己)作為參數傳遞給這個配置文件中的函數。
require("./config/passport")(passport);
const cors = require("cors");
const WebSocket = require("ws");
const PORT = 5050;
const jwt = require("jsonwebtoken");

mongoose
  .connect("mongodb://localhost:27017/stickyNotesDB")
  .then(() => {
    console.log(
      "connecting to mongodb -------------------------------------------------------------------"
    );
  })
  .catch((e) => {
    console.log(e);
  });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", authRoute);
// post route 應該被jwt保護，如果request header內部沒有jwt，則request 會被視為是unauthorized
// 只有登入系統的人(JWT)，才能夠發文
app.use(
  "/api/post",
  passport.authenticate("jwt", { session: false }),
  postRoute
);
app.use(
  "/api/UserFunc",
  passport.authenticate("jwt", { session: false }),
  UserFunctionRoute
);

// 建立實體，透過 ServerSocket 開啟 WebSocket 的服務
app.listen(PORT, () => {
  console.log(`Server listening port ${PORT}... `);
});

// const wss = new WebSocket.Server({ server });
