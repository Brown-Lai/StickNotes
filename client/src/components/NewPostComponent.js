import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../services/post.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";

const NewPostComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [content, setContent] = useState("");

  const addNewPost = async () => {
    let username = currentUser.user.username;
    try {
      await PostService.newPost(username, content);
      window.alert("便利貼新增完成，您現在將被導向到個人頁面");
      navigate("/profile");
    } catch (e) {
      console.log(e);
    }
  };

  const cancel = () => {
    window.confirm("確定要取消這篇貼文嗎？");
    navigate("/profile");
  };

  return (
    <div className="container">
      <h1>
        New Sticky
        <FontAwesomeIcon
          icon={faNoteSticky}
          style={{ margin: "3px", color: "#FFFF93" }}
        />
        Note
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
    </div>
  );
};

export default NewPostComponent;
