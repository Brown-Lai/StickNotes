import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userFunctionService from "../services/userFunction.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostCardComponent from "./PostCardComponent";
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
      // // localStorage.setItem("user", JSON.stringify(currentUser))
      UserData();
    }
  }, []);

  const UserData = async () => {
    let res = await userFunctionService.getCurrentUser();
    setCurrentUserData(res.data);
    // console.log(currentUserData);

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
      <br />
      <br />
      <div className="row">
        <div className="col-2 ms-0 me-3  image-container">
          <img
            className="w-100 photo"
            src="https://picsum.photos/id/103/200/200"
            alt="..."
          />
        </div>
        <div className="col-9 d-flex align-items-center">
          <div className="col-4 d-flex">
            <div className="mx-1">
              <FontAwesomeIcon
                icon={faNoteSticky}
                style={{ color: "#010630" }}
              />
            </div>
            貼文:
            <div className="p-item">{currentUser.user.post}</div>
          </div>
          <div className="col-4 d-flex">
            <div className="mx-1">
              <FontAwesomeIcon
                icon={faFaceSmile}
                style={{ color: "#010630" }}
              />
            </div>
            粉絲:
            <div className="p-item"> {currentUser.user.fans}</div>
          </div>
          <div className="col-4 d-flex">
            <div className="mx-1">
              <FontAwesomeIcon icon={faGlasses} style={{ color: "#010630" }} />
            </div>
            追蹤:
            <div className="p-item"> {currentUser.user.follow}</div>
          </div>
        </div>
        <div className="row mt-3">
          <div>{currentUser.user.username}</div>
          <br />
          <div className="row">
            <p className="mail mt-3">{currentUser.user.email}</p>
            <p className="description">{currentUser.user.description}</p>
          </div>
        </div>
        <div className="container d-flex align-items-center justify-content-center">
          <button
            onClick={handleEditProfile}
            type="button"
            className="col-5 btn btn-light "
          >
            編輯檔案
          </button>
          <button
            onClick={handleNewPost}
            type="button"
            className="col-5 btn btn-light ms-2"
          >
            <FontAwesomeIcon icon={faNoteSticky} style={{ color: "#F9F900" }} />
          </button>
        </div>
      </div>

      {currentUser && (
        <PostCardComponent
          currentUser={currentUserData}
          serCurrentUser={setCurrentUserData}
        />
      )}
    </div>
  );
};

export default ProfileComponent;
