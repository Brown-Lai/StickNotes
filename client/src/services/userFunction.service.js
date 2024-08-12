import axios from "axios";
const API_URL = "http://localhost:5050/api/UserFunc";

class userFunctionService {
  getUserFromId(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(`${API_URL}/${_id}`, {
      headers: { Authorization: token },
    });
  }

  getCurrentUser() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(`${API_URL}/currentUser`, {
      headers: { Authorization: token },
    });
  }

  searchUserByEmail(email) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(`${API_URL}/search`, {
      headers: { Authorization: token },
      params: { email: email },
    });
  }

  searchUserByUsername(username) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(`${API_URL}/search`, {
      headers: { Authorization: token },
      params: { username: username },
    });
  }

  followUser(userId) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      `${API_URL}/follow/${userId}`,
      {},
      {
        headers: { Authorization: token },
      }
    );
  }

  unfollowUser(userId) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      `${API_URL}/unfollow/${userId}`,
      {},
      {
        headers: { Authorization: token },
      }
    );
  }
}

export default new userFunctionService();
