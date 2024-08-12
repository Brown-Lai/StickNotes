import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
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

const EditProfileComponent = ({ currentUser, setCurrentUser }) => {
  let navigate = useNavigate();
  let [id, setId] = useState(currentUser.user._id);
  let [username, setUsername] = useState(currentUser.user.username);
  let [description, setDescription] = useState(currentUser.user.description);
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    navigate("/profile");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthService.updateUserProfile(id, username, description);
      // window.alert("個人資料修改成功");
      setCurrentUser({
        ...currentUser,
        user: {
          ...currentUser.user,
          username,
          description,
        },
      });
      // 更新 localStorage (為了解決重新整理後描述消失的bug)
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...currentUser,
          user: {
            ...currentUser.user,
            username,
            description,
          },
        })
      );
    } catch (e) {
      window.alert(e.response.data);
    }
  };

  return (
    <div className="mt-5" style={{ padding: "3rem" }}>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="username">使用者名稱</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={currentUser.user.username}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="description">描述</label>
          <textarea
            className="form-control"
            id="description"
            aria-label="With textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write something"
          ></textarea>
        </div>
        <button onClick={openModal} type="submit" className="btn btn-primary">
          提交
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h5 className="mt-1">個人資料修改成功</h5>
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
      </form>
    </div>
  );
};

export default EditProfileComponent;
