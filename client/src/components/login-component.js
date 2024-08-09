import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const LoginComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      let response = await AuthService.login(email, password);
      localStorage.setItem("user", JSON.stringify(response.data));
      window.alert("登入成功，您現在將被導向到個人頁面");
      setCurrentUser(AuthService.getCurrentUser());
      navigate("/profile");
    } catch (e) {
      console.log(e);
      setMessage(e.response.data);
    }
  };

  return (
    <div style={{ padding: "3rem" }}>
      <div>
        {message && <div className="alert alert-danger">{message}</div>}
      </div>
      <div className="form-group ">
        <label htmlFor="email">電子信箱</label>
        <input
          onChange={handleChangeEmail}
          type="text"
          className="form-control"
          name="email"
          placeholder="user111@gmail.com"
        />
      </div>
      <br />
      <div className="form-group ">
        <label htmlFor="password">密碼</label>
        <input
          onChange={handleChangePassword}
          type="password"
          className="form-control"
          name="password"
          placeholder="密碼至少為6個英文或數字"
        />
      </div>
      <br />
      <button onClick={handleLogin} className="btn btn-info">
        <span>登入會員</span>
      </button>
    </div>
  );
};

export default LoginComponent;
