const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").user;
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  console.log("正在接收一個跟auth有關的請求");
  next();
});

router.get("/testAPI", (req, res) => {
  return res.send("成功連結auth route...");
});

// router.get("/", (req, res) => {});

router.post("/register", async (req, res) => {
  // 確認數據是否符合規範
  let { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 確認信箱是否被註冊過
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("此信箱已經被註冊過了");

  // 製作新用戶
  let { email, username, password } = req.body;
  // constructor
  let newUser = new User({ email, username, password });
  try {
    // savedUser 是 newUser.save()的結果
    let savedUser = await newUser.save();
    return res.send({
      msg: "使用者成功儲存",
      savedUser,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("無法儲存使用者");
  }
});

router.post("/login", async (req, res) => {
  // 確認數據是否符合規範
  let { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 確認信箱是否被註冊過
  const foundUser = await User.findOne({ email: req.body.email });
  if (!foundUser) {
    return res.status(401).send("無法找到使用者, 請確認信箱是否正確");
  }

  // 與資料庫比對密碼
  foundUser.comparePassword(req.body.password, (err, isMatch) => {
    if (err) return res.status(500).send(err);

    if (isMatch) {
      // 製作json web token
      const tokenObject = { _id: foundUser._id, email: foundUser.email };
      const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
      return res.send({
        message: "成功登入",
        token: "JWT " + token,
        user: foundUser,
      });
    } else {
      return res.status(401).send("密碼錯誤");
    }
  });
});

// 編輯個人檔案
router.put("/updateProfile", async (req, res) => {
  const { _id, username, description } = req.body;

  try {
    const usernameExist = await User.findOne({ username: req.body.username });

    if (usernameExist && username != usernameExist.username) {
      return res.status(400).send("此用戶名稱已使用過");
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: _id },
      { username: username, description: description },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send("使用者未找到");
    }
    // console.log(updatedUser);
    return res.send({
      msg: "個人檔案更新成功",
      updatedUser,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("無法更新描述");
  }
});

// 搜尋其他使用者
router.get("/search", async (req, res) => {
  const { email, username } = req.query;

  try {
    let users = await User.find({});
    let user;

    if (email) {
      const emails = users.map((u) => u.email);
      const bestMatch = stringSimilarity.findBestMatch(email, emails);
      if (bestMatch.bestMatch.rating > 0.5) {
        // 0.5 是一个阈值，可以根据需要调整
        user = users.find((u) => u.email === bestMatch.bestMatch.target);
      }
    } else if (username) {
      const usernames = users.map((u) => u.username);
      const bestMatch = stringSimilarity.findBestMatch(username, usernames);
      if (bestMatch.bestMatch.rating > 0.5) {
        user = users.find((u) => u.username === bestMatch.bestMatch.target);
      }
    }

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/profile/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }).select("-password");
    // console.log("user", user);
    if (user) {
      return res.status(200).json({ user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
