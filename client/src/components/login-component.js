import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const LoginComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    navigate("/profile");
  };

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
      // window.alert("登入成功，您現在將被導向到個人頁面");
      setCurrentUser(AuthService.getCurrentUser());
      openModal();
    } catch (e) {
      console.log(e);
      setMessage(e.response.data);
    }
  };

  return (
    <div
      className="flex-column d-flex justify-content-center align-items-center"
      style={{ padding: "3rem", height: "80vh" }}
    >
      <div className="my-3 " style={{ fontSize: "40px" }}>
        Sticky Notes
      </div>
      <div className="container col-md-4 rounded-3 border border-secondary ">
        <h1
          className="text-info mt-3"
          style={{ marginBottom: "1rem", color: "#010630" }}
        >
          會員登入
        </h1>
        <div>
          {message && <div className="alert alert-danger">{message}</div>}
        </div>
        <div className="form-group ">
          <label htmlFor="email">電子信箱</label>
          <input
            onChange={handleChangeEmail}
            type="text"
            className="form-control rounded-pill"
            name="email"
            placeholder="user111@gmail.com"
          />
          <br />
          <label htmlFor="password">密碼</label>
          <input
            onChange={handleChangePassword}
            type="password"
            className="form-control rounded-pill"
            name="password"
            placeholder="密碼至少為6個英文或數字"
          />
        </div>
        <br />
        <div className="form-group d-flex justify-content-center align-items-center">
          <button
            onClick={handleLogin}
            className="btn btn-info rounded-pill mb-3 w-100"
          >
            <span>登入</span>
          </button>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h5 className="mt-1">登入成功，您現在將被導向到個人頁面</h5>
        <div className=" d-flex justify-content-center align-item-center">
          <button
            className="btn btn-info mt-2"
            type="button"
            onClick={closeModal}
          >
            確定
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default LoginComponent;
