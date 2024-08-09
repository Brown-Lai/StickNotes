import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const EditProfileComponent = ({ currentUser, setCurrentUser }) => {
  let navigate = useNavigate();
  let [id, setId] = useState(currentUser.user._id);
  let [username, setUsername] = useState(currentUser.user.username);
  let [description, setDescription] = useState(currentUser.user.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthService.updateUserProfile(id, username, description);
      window.alert("個人資料修改成功");
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
      navigate("/profile");
    } catch (e) {
      window.alert(e.response.data);
    }
  };

  return (
    <div style={{ padding: "3rem" }}>
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
        <button type="submit" className="btn btn-primary">
          提交
        </button>
      </form>
    </div>
  );
};

export default EditProfileComponent;
