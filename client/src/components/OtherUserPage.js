import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authService from "../services/auth.service";
import userFunctionService from "../services/userFunction.service";

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
    <div>
      {pageUserData && currentUserData ? (
        <div>
          <div>
            <h3>Profile of {pageUserData.username}</h3>
            <p>Email: {pageUserData.email}</p>
            <p>fans: {pageUserData.fans}</p>
            <p>follow: {pageUserData.follow}</p>
            <p>following: {pageUserData.following}</p>
            <p>followers: {pageUserData.followers}</p>
            {}
            {!isFollowing && <button onClick={follow}>追蹤</button>}
            {isFollowing && <button onClick={follow}>取消追蹤</button>}
          </div>
          <p>----------------------------------------</p>
          <div>
            <h3>Profile of {currentUserData.username}</h3>
            <p>Email: {currentUserData.email}</p>
            <p>fans: {currentUserData.fans}</p>
            <p>follow: {currentUserData.follow}</p>
            <p>following: {currentUserData.following}</p>
            <p>followers: {currentUserData.followers}</p>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default OtherUserPage;
