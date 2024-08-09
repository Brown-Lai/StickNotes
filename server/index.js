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
const WebSocket = require("ws"); // 引入 WebSocket 库

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
app.use(
  "/api/post",
  passport.authenticate("jwt", { session: false }),
  postRoute
  // post route 應該被jwt保護，如果request header內部沒有jwt，則request 會被視為是unauthorized
  // 只有登入系統的人(JWT)，才能夠發文
);
app.use(
  "/api/UserFunc",
  passport.authenticate("jwt", { session: false }),
  UserFunctionRoute
);

app.listen(5050, () => {
  console.log("Server listening port 5050... ");
});
