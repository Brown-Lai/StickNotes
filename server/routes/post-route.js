const router = require("express").Router();
const Post = require("../models/").post;
const User = require("../models/").user;

router.use((req, res, next) => {
  console.log("post route正在接受一個request......");
  next();
});

// 新增貼文
router.post("/", async (req, res) => {
  let { content } = req.body;
  let userName = req.user.username;

  try {
    let newPost = new Post({
      username: userName,
      content: content,
      postUser: req.user._id,
    });
    let savedPost = await newPost.save();
    console.log("savedPost", savedPost);

    // 更新 User 的post数量
    let result = await User.findByIdAndUpdate(
      req.user._id,
      {
        $inc: { post: 1 },
      },
      { new: true }
    ); // 使用 { new: true } 確保返回更新後的資料
    console.log("resultP = ", result);

    return res.send({
      message: "便利貼已經保存",
      savedPost,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});

// 刪除便利貼
router.delete("/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let postFound = await Post.findOne({ _id });
    if (!postFound) {
      return res.status(400).send("找不到此便利貼，無法刪除便利貼內容");
    }
    if (postFound.postUser.equals(req.user._id)) {
      await Post.deleteOne({ _id }).exec();
      let result = await User.findByIdAndUpdate(
        req.user._id,
        {
          $inc: { post: -1 },
        },
        { new: true }
      ); // 使用 { new: true } 確保返回更新後的資料
      console.log("resultD = ", result);
      return res.send("便利貼已被刪除");
    } else {
      return res.status(403).send("你不是發文人，便利貼刪除失敗");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 透過貼文 id 修改貼文內容
router.put("/:currentPostId", async (req, res) => {
  const { currentPostId } = req.params;
  const { content } = req.body;
  try {
    let updatedPost = await Post.findByIdAndUpdate(
      currentPostId,
      { content },
      { new: true } // 返回更新後的文檔
    );

    if (!updatedPost) {
      return res.status(404).send("貼文未找到");
    }

    return res.send({
      message: "貼文已更新",
      updatedPost,
    });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
});

// 用 User id 來尋找 post
router.get("/:postUser_id", async (req, res) => {
  let { postUser_id } = req.params;
  let postFound = await Post.find({ postUser: postUser_id })
    .populate("postUser", ["username", "email", "date"])
    .exec();
  return res.send(postFound);
});

// 獲得系統中日期最近的10篇貼文
router.get("/", async (req, res) => {
  try {
    let postFound = await Post.find({})
      .sort({ date: -1 }) // 按日期降序排序
      .limit(30) // 限制結果為N篇
      .populate("postUser", ["username", "email", "date"])
      .exec();
    return res.send(postFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
