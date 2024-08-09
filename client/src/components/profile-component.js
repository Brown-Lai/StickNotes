import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userFunctionService from "../services/userFunction.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostCardComponent from "./PostCardComponent";
import stickyNote from "../images/sticky-note2.png"; // 根據你的圖片路徑調整
import {
  faNoteSticky,
  faGlasses,
  faFaceSmile,
} from "@fortawesome/free-solid-svg-icons";

const ProfileComponent = ({ currentUser, setCurrentUser }) => {
  let navigate = useNavigate();
  const [currentUserData, setCurrentUserData] = useState(null);

  useEffect(() => {
    if (currentUser) {
      // localStorage.setItem("user", JSON.stringify(currentUser))
      UserData();
    }
  }, [currentUser]);

  const UserData = async () => {
    let res = await userFunctionService.getCurrentUser();
    setCurrentUserData(res.data);

    // get current localStorage  user object
    let storedUser = JSON.parse(localStorage.getItem("user"));

    // 更新 user 中的資訊，保留原有的 token
    storedUser.user = {
      ...storedUser.user, // 保留原有的字段（包括 token）
      ...res.data, // 覆蓋更新后的用户數據
    };
    localStorage.setItem("user", JSON.stringify(storedUser));
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };
  const handleNewPost = () => {
    navigate("/newPost");
  };

  return (
    <div className="container mt-5">
      <div className="row w-100">
        <div className="col-3 ms-0 me-3 image-container">
          <img className="w-100 photo" src={stickyNote} alt="..." />
        </div>
        <div className="col-8">
          <h3>{currentUser.user.username}</h3>
          <br />
          <div className="row">
            <div className="col-4 d-flex">
              <div className="mx-1">
                <FontAwesomeIcon
                  icon={faNoteSticky}
                  style={{ color: "#010630" }}
                />
              </div>
              <div className="p-item">Post: {currentUser.user.post}</div>
            </div>

            <div className="col-4 d-flex">
              <div className="mx-1">
                <FontAwesomeIcon
                  icon={faFaceSmile}
                  style={{ color: "#010630" }}
                />
              </div>
              <div className="p-item">Fans: {currentUser.user.fans}</div>
            </div>

            <div className="col-4 d-flex">
              <div className="mx-1">
                <FontAwesomeIcon
                  icon={faGlasses}
                  style={{ color: "#010630" }}
                />
              </div>
              <div className="p-item">Follow: {currentUser.user.follow}</div>
            </div>
            <p className="mail mt-3">{currentUser.user.email}</p>
            <p className="description">{currentUser.user.description}</p>
            <div className="container d-flex">
              <button
                onClick={handleEditProfile}
                type="button"
                className="btn btn-secondary ms-2"
              >
                編輯檔案
              </button>
              <button
                onClick={handleNewPost}
                type="button"
                className="btn btn-secondary ms-2"
              >
                <FontAwesomeIcon
                  icon={faNoteSticky}
                  style={{ margin: "3px", color: "#FFFF93" }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {currentUser && (
        <PostCardComponent
          currentUser={currentUser}
          serCurrentUser={setCurrentUser}
        />
      )}
    </div>
  );
};

export default ProfileComponent;
