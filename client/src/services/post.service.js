import axios from "axios";
const API_URL = "http://localhost:5050/api/post";

class PostService {
  newPost(userName, content) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL,
      { userName, content },
      { headers: { Authorization: token } }
    );
  }

  getUserPost(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/" + _id, {
      headers: { Authorization: token },
    });
  }

  deleteUserPost(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.delete(API_URL + "/" + _id, {
      headers: { Authorization: token },
    });
  }

  editUserPost(_id, content) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.put(
      API_URL + "/" + _id,
      { content },
      { headers: { Authorization: token } }
    );
  }

  getAllPost() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL, { headers: { Authorization: token } });
  }
}

export default new PostService();
