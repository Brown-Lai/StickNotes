const router = require("express").Router();
const Post = require("../models/").post;
const User = require("../models/").user;
const stringSimilarity = require("string-similarity");

router.use((req, res, next) => {
  console.log("User-function route 正在接受一個 request......");
  next();
});

// 獲取當前用戶資料
router.get("/currentUser", async (req, res) => {
  try {
    // 假設你有一個中間件來驗證用戶並將用戶資料附加到 req.user
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");
    console.log(userId);

    if (!user) {
      return res.status(404).send("用戶未找到");
    }

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("伺服器錯誤");
  }
});

router.get("/search", async (req, res) => {
  const { email, username } = req.query;

  try {
    let users = await User.find({});
    let matchedUsers = [];

    if (email) {
      const emails = users.map((u) => u.email);
      const matches = stringSimilarity.findBestMatch(email, emails).ratings;
      matchedUsers = matches
        .filter((match) => match.rating > 0.5) // 0.5 是一个阈值，可以根据需要调整
        .map((match) => users.find((u) => u.email === match.target));
    } else if (username) {
      const usernames = users.map((u) => u.username);
      const matches = stringSimilarity.findBestMatch(
        username,
        usernames
      ).ratings;
      matchedUsers = matches
        .filter((match) => match.rating > 0.5)
        .map((match) => users.find((u) => u.username === match.target));
    }

    if (matchedUsers.length > 0) {
      return res.status(200).json(matchedUsers); // 使用 return 來提前結束函數
    } else {
      return res.status(404).json({ message: "User not found" }); // 使用 return 來提前結束函數
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message }); // 使用 return 來提前結束函數
  }
});

// 追蹤用戶
router.post("/follow/:id", async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    const userToFollow = await User.findById(req.params.id);

    if (!currentUser || !userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!currentUser.following.includes(userToFollow._id)) {
      currentUser.following.push(userToFollow._id);
      userToFollow.followers.push(currentUser._id);

      currentUser.follow += 1;
      userToFollow.fans += 1;

      await currentUser.save();
      await userToFollow.save();

      // // 通知前端
      // console.log("notifyFollowers: ", userToFollow._id, currentUser.username);
      // notifyFollowers(userToFollow._id, currentUser.username);

      // 返回更新後的 currentUser 數據
      res.status(200).json({ message: "Followed successfully", currentUser });
    } else {
      res.status(400).json({ message: "You are already following this user" });
    }
  } catch (e) {
    console.error("Error while following user:", e);
    res.status(500).json({ message: "An error occurred", error: e });
  }
});

// 取消追蹤用戶
router.post("/unfollow/:id", async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    const userToUnfollow = await User.findById(req.params.id);

    if (!currentUser || !userToUnfollow) {
      return res.status(404).json({ message: "User not found" });
    }

    if (currentUser.following.includes(userToUnfollow._id)) {
      currentUser.following.pull(userToUnfollow._id);
      userToUnfollow.followers.pull(currentUser._id);

      currentUser.follow -= 1;
      userToUnfollow.fans -= 1;

      await currentUser.save();
      await userToUnfollow.save();

      // 返回更新後的 currentUser 數據
      res.status(200).json({ message: "Unfollowed successfully", currentUser });
    } else {
      res.status(400).json({ message: "You are not following this user" });
    }
  } catch (e) {
    console.error("Error while unfollowing user:", e);
    res.status(500).json({ message: "An error occurred", error: e });
  }
});

router.get("/:_id", async (req, res) => {
  const { _id } = req.params;

  try {
    const user = await User.findById({ _id }).select("-password");
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
