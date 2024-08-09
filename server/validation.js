const Joi = require("joi");
// joi 套件主要用在註冊帳號時，簡化程式碼然後讓系統提供完整易懂的提示

// 註冊驗證
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(data);
};

// 登入驗證
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(data);
};

// 新增課程的驗證
const postValidation = (data) => {
  const schema = Joi.object({
    content: Joi.string().max(2000).required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.postValidation = postValidation;
