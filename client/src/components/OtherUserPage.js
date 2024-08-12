import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authService from "../services/auth.service";
import userFunctionService from "../services/userFunction.service";
import PostCardComponent from "./PostCardComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNoteSticky,
  faGlasses,
  faFaceSmile,
} from "@fortawesome/free-solid-svg-icons";

const OtherUserPage = ({ currentUser, setCurrentUser }) => {
  const { username } = useParams();
  const [pageUserData, setPageUserData] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // get page user data
    const getUserData = async () => {
      try {
        const res = await authService.getUserByUsername(username);
        setPageUserData(res.data.user);
      } catch (e) {
        console.log(e);
      }
    };
    getUserData();
  }, [username]);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserData(currentUser.user);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUserData && pageUserData) {
      // 根據目前 User 的資料更新 isFollow
      setIsFollowing(currentUserData.following.includes(pageUserData._id));
    }
  }, [currentUserData, pageUserData]);

  const follow = async () => {
    try {
      let res;
      if (isFollowing) {
        res = await userFunctionService.unfollowUser(pageUserData._id);
      } else {
        res = await userFunctionService.followUser(pageUserData._id);
      }

      // 更新localStorage中的currentUser信息
      const updatedCurrentUser = res.data.currentUser;
      setCurrentUserData(updatedCurrentUser);
      setCurrentUser({ user: updatedCurrentUser });

      // 更新isFollowing状态
      setIsFollowing(!isFollowing);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container rounded-3 mt-5">
      {pageUserData && currentUserData ? (
        <div className="row w-100 border-bottom p-2">
          <div className="col-2 mt-4 ms-0 me-3 image-container">
            <img
              className="w-100 photo"
              src="https://picsum.photos/id/101/200/200"
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
              <div className="p-item">{pageUserData.post}</div>
            </div>
            <div className="col-4 d-flex">
              <div className="mx-1">
                <FontAwesomeIcon
                  icon={faFaceSmile}
                  style={{ color: "#010630" }}
                />
              </div>
              粉絲:
              <div className="p-item"> {pageUserData.fans}</div>
            </div>
            <div className="col-4 d-flex">
              <div className="mx-1">
                <FontAwesomeIcon
                  icon={faGlasses}
                  style={{ color: "#010630" }}
                />
              </div>
              追蹤:
              <div className="p-item"> {pageUserData.follow}</div>
            </div>
          </div>
          <div className="row mt-3">
            <div>{pageUserData.username}</div>
            <br />
            <div className="row">
              <p className="mail mt-3">{pageUserData.email}</p>
              <p className="description">{pageUserData.description}</p>
            </div>
          </div>
          <div className="container d-flex align-items-center justify-content-center">
            {!isFollowing && (
              <button
                onClick={() => follow()}
                type="button"
                className="col-10 w-90 btn btn-light ms-2"
              >
                追蹤
              </button>
            )}
            {isFollowing && (
              <button
                onClick={() => follow()}
                type="button"
                className="col-10 w-90 btn btn-light ms-2"
              >
                取消追蹤
              </button>
            )}
          </div>
          {currentUser && (
            <PostCardComponent
              currentUser={pageUserData}
              serCurrentUser={setPageUserData}
            />
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default OtherUserPage;
