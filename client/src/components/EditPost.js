import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import postService from "../services/post.service";

const EditPost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [postId, setPostId] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (location.state) {
      const { postId, postContent } = location.state;
      setPostId(postId);
      setContent(postContent);
    } else {
      // Handle the case where location.state is null
      navigate("/profile");
    }
  }, [location.state, navigate]);

  const editPost = async () => {
    try {
      await postService.editUserPost(postId, content);
      navigate("/profile");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container">
      <h1>編輯貼文</h1>
      <div className="form-group">
        <label htmlFor="exampleforContent">內容：</label>
        <textarea
          className="form-control"
          id="exampleforContent"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <button onClick={editPost} className="btn btn-color">
          完成編輯
        </button>
        <br />
        <br />
      </div>
    </div>
  );
};

export default EditPost;
