const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    request: true,
    minlength: 1,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    default: "",
  },
  post: {
    type: Number,
    default: 0,
  },
  fans: {
    type: Number,
    default: 0,
  },
  follow: {
    type: Number,
    default: 0,
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

userSchema.methods.comparePassword = async function (password, cb) {
  // password 是使用者登入時輸入的密碼。 this.password為資料庫儲存的經過雜湊處理的密碼
  let result;
  try {
    result = await bcrypt.compare(password, this.password);
    return cb(null, result);
  } catch (e) {
    return cb(e, result);
  }
};

// 在儲存新使用者 newUser.save() 之前要先做函數內部的事
userSchema.pre("save", async function (next) {
  // this 代表 mongoDB 內的 document
  if (this.isNew || this.isModified("password")) {
    // 若使用者為新用戶，或是正在更改密碼，則將密碼進行雜湊處理
    const hashValue = await bcrypt.hash(this.password, 10);
    this.password = hashValue;
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
