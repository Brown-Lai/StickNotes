import axios from "axios";
const API_URL = "http://localhost:5050/api/user";

class AuthService {
  // 註冊帳號
  register(username, email, password) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
    });
  }

  login(email, password) {
    // {email,password}表示要發送到伺服器的請求主體（request body）
    return axios.post(API_URL + "/login", { email, password });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    // 使用 JSON.parse 將這個 JSON 字符串解析為 JavaScript 對象
    return JSON.parse(localStorage.getItem("user"));
  }

  updateUserProfile(_id, username, description) {
    return axios.put(API_URL + "/updateProfile", {
      _id,
      username,
      description,
    });
  }

  searchUser(query) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(`${API_URL}/search`, {
      headers: { Authorization: token },
      params: { query: query },
    });
  }

  getUserByUsername(username) {
    return axios.get(`${API_URL}/profile/${username}`);
  }
}

export default new AuthService();
