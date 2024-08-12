import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import postService from "../services/post.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
Modal.setAppElement("#root");

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

const PostCardComponent = ({ currentUser, serCurrentUser }) => {
  const navigate = useNavigate();
  let [postData, setPostData] = useState([]);
  let [localStorUser, setLocalStorUser] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  let [currentPostId, setCurrentPostId] = useState(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    // 從 localStorage 獲取當前用戶信息
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setLocalStorUser(storedUser);
  }, []);

  const deletePost = async (postId) => {
    openModal();
    setCurrentPostId(postId);
  };

  const confirmDelete = async (postId) => {
    try {
      await postService.deleteUserPost(postId);
      setPostData((prevData) => prevData.filter((post) => post._id !== postId));
      navigate("/profile");
      closeModal();
    } catch (e) {
      console.log(e);
    }
  };

  const editPost = (postId, postContent) => {
    navigate("/editPost", { state: { postId, postContent } });
  };

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        // console.log(currentUser);
        let _id = currentUser._id;
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
                  <p className="card-header fw-bold">{currentUser.username}</p>
                  <div className="card-body">
                    <p className="card-text" style={{ fontSize: "15px" }}>
                      {post.content}
                    </p>
                    <p className="mb-2 text-muted" style={{ fontSize: "10px" }}>
                      {post.date.substring(0, 16)}
                    </p>
                    <div className="d-flex">
                      {" "}
                      {localStorUser.user.username == currentUser.username && (
                        <div>
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
                        </div>
                      )}
                      <button type="button" className="btn btn-light m-1 ">
                        <FontAwesomeIcon icon={faHeart} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h5 className="mt-1">你確定要刪除這篇貼文嗎？</h5>
        <div className=" d-flex justify-content-center align-item-center">
          <button
            className="btn btn-info mt-2"
            type="button"
            onClick={() => confirmDelete(currentPostId)}
          >
            確定
          </button>
          <button
            className="btn btn-info mt-2 mx-2"
            type="button"
            onClick={() => closeModal()}
          >
            取消
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PostCardComponent;
