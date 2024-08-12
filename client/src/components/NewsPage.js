import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userFunctionService from "../services/userFunction.service";

const NewsPage = ({ currentUser, setCurrentUser }) => {
  let navigate = useNavigate();
  let [currentUserData, setCurrentUserData] = useState(null);
  let [followersData, setFollowersData] = useState([]);

  useEffect(() => {
    if (currentUser) {
      UserData();
    }
  }, [currentUser]);

  const UserData = async () => {
    try {
      let res = await userFunctionService.getCurrentUser();
      setCurrentUserData(res.data);
      // console.log("Updated currentUserData:", res.data);

      if (res.data.followers) {
        await fetchFollowersData(res.data.followers);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchFollowersData = async (followers) => {
    try {
      const followersPromises = followers.map((followerId) =>
        userFunctionService.getUserFromId(followerId)
      );
      // console.log(followers);

      const followersResults = await Promise.all(followersPromises);
      const followersData = followersResults.map((result) => result.data);
      setFollowersData(followersData);
      // console.log("Followers data:", followersData);
    } catch (error) {
      console.error("Error fetching followers data:", error);
    }
  };

  return (
    <div className="container mt-5">
      <br />

      {followersData &&
        followersData.map((follower, index) => (
          <ul key={index} className="list-group rounded-pill m-4">
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-5 me-auto">
                <div className="fw-bold">{follower.user.username}</div> 已追蹤你
              </div>
            </li>
          </ul>
        ))}
    </div>
  );
};

export default NewsPage;
