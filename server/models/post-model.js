const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  // 簡單來說，這個欄位用來存儲貼文所屬的用戶的ID，並且這個ID必須存在於User集合中。
  id: {
    type: String,
  },
  username: {
    type: String,
  },
  content: {
    type: String,
    // required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  postUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Post", postSchema);
