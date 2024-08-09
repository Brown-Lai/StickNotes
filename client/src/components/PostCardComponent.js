import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import postService from "../services/post.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const PostCardComponent = ({ currentUser, serCurrentUser }) => {
  const navigate = useNavigate();
  let [postData, setPostData] = useState([]);
  let [localStorUser, setLocalStorUser] = useState(null);

  useEffect(() => {
    // 從 localStorage 獲取當前用戶信息
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setLocalStorUser(storedUser);
  }, []);

  const deletePost = async (postId) => {
    if (window.confirm("你確定要刪除這篇貼文嗎？")) {
      try {
        await postService.deleteUserPost(postId);
        setPostData((prevData) =>
          prevData.filter((post) => post._id !== postId)
        );
        navigate("/profile");
      } catch (e) {
        console.log(e);
      }
    }
  };

  const editPost = (postId, postContent) => {
    navigate("/editPost", { state: { postId, postContent } });
  };

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        // console.log(currentUser);
        let _id = currentUser.user._id;
        // console.log(_id);

        const response = await postService.getUserPost(_id);
        setPostData(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    if (currentUser) {
      fetchUserPosts();
    }
  }, [currentUser]);

  return (
    <div className="container my-5" style={{ overflowX: "auto" }}>
      {currentUser && postData && postData.length !== 0 && (
        <div className="row">
          {postData
            .sort((a, b) => new Date(b.date) - new Date(a.date)) // 按日期排序
            .map((post) => (
              <div className="col-12 mt-2" key={post._id}>
                <div className="card">
                  <p className="card-header fw-bold">
                    {currentUser.user.username}
                  </p>
                  <div className="card-body">
                    <p className="card-text" style={{ fontSize: "15px" }}>
                      {post.content}
                    </p>
                    <p className="mb-2 text-muted" style={{ fontSize: "10px" }}>
                      {post.date.substring(0, 16)}
                    </p>

                    <>
                      <button
                        onClick={() => editPost(post._id, post.content)}
                        type="button"
                        className="btn btn-light m-1"
                      >
                        編輯
                      </button>
                      <button
                        onClick={() => deletePost(post._id)}
                        type="button"
                        className="btn btn-light m-1"
                      >
                        刪除
                      </button>
                    </>

                    <button type="button" className="btn btn-light m-1 ">
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default PostCardComponent;
