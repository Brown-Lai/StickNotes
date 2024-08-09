import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { faAnchor } from "@fortawesome/free-solid-svg-icons";

const NavComponent = ({ currentUser, setCurrentUser }) => {
  let textColor = "#FFFFFF";
  const handleLogout = () => {
    AuthService.logout();
    window.alert("登出成功，現在將您導向首頁");
    setCurrentUser(null);
  };

  const handleNavLinkClick = () => {
    const navbarCollapse = document.getElementById("navbarSupportedContent");
    if (navbarCollapse.classList.contains("show")) {
      navbarCollapse.classList.remove("show");
    }
  };

  // console.log("currentUser: ", currentUser);

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light bg-info">
        <div className="container-fluid">
          <div className="d-flex w-auto">
            <Link
              className="nav-link active "
              style={{ color: textColor }}
              to="/"
            >
              Sticky
              <FontAwesomeIcon
                icon={faNoteSticky}
                style={{ margin: "2px", color: "#FFFF93" }}
              />
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse ms-2"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {currentUser && (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/profile"
                    onClick={handleNavLinkClick}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{ color: textColor }}
                    />
                    個人頁面
                  </Link>
                </li>
              )}

              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/search"
                  onClick={handleNavLinkClick}
                >
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    style={{ color: textColor }}
                  />
                  搜尋
                </Link>
              </li>

              {currentUser && (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/news"
                    onClick={handleNavLinkClick}
                  >
                    <FontAwesomeIcon
                      icon={faBell}
                      style={{ color: textColor }}
                    />
                    通知
                  </Link>
                </li>
              )}

              {!currentUser && (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/register"
                    onClick={handleNavLinkClick}
                  >
                    <FontAwesomeIcon
                      icon={faFlag}
                      style={{ color: textColor }}
                    />
                    註冊會員
                  </Link>
                </li>
              )}

              {!currentUser && (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login"
                    onClick={handleNavLinkClick}
                  >
                    <FontAwesomeIcon
                      icon={faAnchor}
                      style={{ color: textColor }}
                    />
                    會員登入
                  </Link>
                </li>
              )}

              {currentUser && (
                <li onClick={handleLogout} className="nav-item">
                  <Link
                    className="nav-link"
                    to="/"
                    onClick={handleNavLinkClick}
                  >
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      style={{ color: textColor }}
                    />
                    登出
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavComponent;
