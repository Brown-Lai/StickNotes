import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../services/post.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";
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

const NewPostComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [content, setContent] = useState("");
  let [alertText, setAlertText] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = (text) => {
    setIsOpen(true);
    setAlertText(text);
  };

  const closeModal = () => {
    setIsOpen(false);
    navigate("/profile");
  };

  const notCancel = () => {
    setIsOpen(false);
    // navigate("/profile");
  };

  const addNewPost = async () => {
    let username = currentUser.user.username;
    try {
      await PostService.newPost(username, content);
      openModal("便利貼新增完成，您現在將被導向到個人頁面");
    } catch (e) {
      console.log(e);
    }
  };

  const cancel = () => {
    // window.confirm("確定要取消這篇貼文嗎？");
    openModal("確定要取消這篇貼文嗎？");
  };

  return (
    <div className="container mt-5">
      <br />
      <h1>
        New Sticky Note
        <FontAwesomeIcon
          icon={faNoteSticky}
          style={{ margin: "3px", color: "#FFFF93" }}
        />
      </h1>
      <div className="form-group">
        <label htmlFor="exampleforContent">內容：</label>
        <textarea
          className="form-control"
          id="exampleforContent"
          aria-describedby="emailHelp"
          name="content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <br />
        <button onClick={addNewPost} className="btn btn-color">
          新增便利貼
        </button>
        <button onClick={cancel} className="btn btn-color mx-2">
          取消
        </button>
        <br />
        <br />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h5 className="mt-1">{alertText}</h5>
        <div className=" d-flex justify-content-center align-item-center">
          <button
            className="btn btn-info mt-2"
            type="button"
            onClick={closeModal}
          >
            確定
          </button>
          {cancel && (
            <button
              className="btn btn-info mt-2 mx-2"
              type="button"
              onClick={notCancel}
            >
              取消
            </button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default NewPostComponent;
