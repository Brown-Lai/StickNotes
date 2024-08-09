import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AuthService from "./services/auth.service";
import Layout from "./components/Layout";
import HomeComponent from "./components/Home-component";
import ProfileComponent from "./components/profile-component";
import SearchComponent from "./components/searchComponent";
import NewsPage from "./components/NewsPage";
import LoginComponent from "./components/login-component";
import RegisterComponent from "./components/register-component";
import EditProfileComponent from "./components/EditProfileComponent";
import NewPostComponent from "./components/NewPostComponent";
import EditPost from "./components/EditPost";
import OtherUserPage from "./components/OtherUserPage";

function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        >
          <Route
            index
            element={
              <HomeComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          ></Route>
          <Route
            path="profile"
            element={
              <ProfileComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          ></Route>
          <Route
            path="search"
            element={
              <SearchComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          ></Route>
          <Route path="news" element={<NewsPage />}></Route>
          <Route
            path="login"
            element={
              <LoginComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          ></Route>
          <Route
            path="register"
            element={
              <RegisterComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          ></Route>
          <Route
            path="edit-profile"
            element={
              <EditProfileComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="newPost"
            element={
              <NewPostComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route path="editPost" element={<EditPost />} />
          <Route
            path="profile/:username"
            element={
              <OtherUserPage
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
