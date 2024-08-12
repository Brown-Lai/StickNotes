import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import postService from "../services/post.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faArrowDownLong } from "@fortawesome/free-solid-svg-icons";
import { faArrowUpLong } from "@fortawesome/free-solid-svg-icons";

const HomeComponent = ({ currentUser, serCurrentUser }) => {
  let [postData, setPostData] = useState([]);
  let [expanded, setExpanded] = useState({});

  const getAllPostData = async () => {
    try {
      let res = await postService.getAllPost();
      // console.log(res);
      // 確保 res.data 是數組
      if (Array.isArray(res.data)) {
        setPostData(res.data);
      } else {
        console.error("API response is not an array:", res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllPostData();
  }, []);

  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      {currentUser == null && (
        <div>
          <div className="mt-5  d-flex justify-content-center align-items-center">
            <br />
            還沒有會員嗎? 歡迎加入StickyNotes
          </div>
          <div>
            <Link to={"/register"} className="text-decoration-none ">
              註冊會員
            </Link>
            <Link to={"/login"} className="text-decoration-none ms-2">
              登入
            </Link>
          </div>
        </div>
      )}
      {currentUser && (
        <div className="container mt-4 mx-2">
          <h2>首頁</h2>
          <div className="row row-cols-1 row-cols-md-3 mt-1 g-4">
            {postData.map((card, index) => (
              <div className="col" key={index}>
                <div className="card h-100 ">
                  <div className="card-header fw-bold ">
                    <Link
                      to={`/profile/${card.postUser.username}`}
                      className="text-decoration-none text-dark d-flex"
                    >
                      <div className="col-1   image-container">
                        <img
                          className=" photo"
                          src={`https://picsum.photos/200/200?random=${index}`}
                          alt="..."
                        />
                      </div>
                      <div className="ms-2">{card.postUser.username}</div>
                    </Link>
                  </div>
                  <div
                    className={`card-text mt-2 ms-2 ${
                      expanded[index] ? "" : "text-truncate"
                    }`}
                    style={{
                      maxHeight: expanded[index] ? "none" : "100px",
                      fontSize: "15px",
                      overflow: "hidden",
                    }}
                  >
                    {card.content}
                  </div>
                  <p
                    className="text-muted mb-2 ms-2"
                    style={{ fontSize: "10px" }}
                  >
                    {card.date.substring(0, 16)}
                  </p>

                  <div className="d-flex ms-auto">
                    <button type="button" className="btn btn-light m-1">
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                    {card.content.length > 10 && ( // 只有當文字超過100字符時才顯示展開按鈕
                      <button
                        type="button"
                        className="btn btn-light m-1"
                        onClick={() => toggleExpand(index)}
                      >
                        {expanded[index] ? (
                          <FontAwesomeIcon icon={faArrowUpLong} />
                        ) : (
                          <FontAwesomeIcon icon={faArrowDownLong} />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeComponent;
