import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const RegisterComponent = () => {
  const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleRegister = async () => {
    try {
      await AuthService.register(username, email, password);
      window.alert("註冊成功，您現在將被導向到登入頁面");
      navigate("/login");
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
      <h1 style={{ marginBottom: "1rem", color: "#010630" }}>註冊會員</h1>
      <div className="form-group ">
        <label htmlFor="username">用戶名稱</label>
        <input
          onChange={handleChangeUsername}
          type="text"
          className="form-control"
          name="username"
        />
      </div>
      <br />
      <div className="form-group ">
        {" "}
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
        {" "}
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
      <button onClick={handleRegister} className="btn btn-color">
        <span>註冊會員</span>
      </button>
    </div>
  );
};

export default RegisterComponent;
