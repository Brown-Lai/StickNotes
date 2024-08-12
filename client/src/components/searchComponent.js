import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import userFunctionService from "../services/userFunction.service";

const SearchComponent = () => {
  let [input, setInput] = useState("");
  let [searchedResult, setSearchedResult] = useState([]);

  const handleChangeInput = (e) => {
    setInput(e.target.value);
    searchUser();
  };

  const isEmail = (query) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(query);
  };

  const searchUser = async () => {
    try {
      let res;
      if (isEmail(input)) {
        res = await userFunctionService.searchUserByEmail(input);
      } else {
        res = await userFunctionService.searchUserByUsername(input);
      }
      setSearchedResult(res.data);
      console.log(searchedResult);
    } catch (e) {
      // console.log(e);
    }
  };

  return (
    <div className="container mt-5">
      <br />
      <div className="input-group mb-3 ">
        <input
          type="text"
          className="form-control rounded-pill"
          onChange={handleChangeInput}
          placeholder="username"
        />
        <button
          className="btn btn-outline-secondary rounded-circle ms-2"
          type="button"
          onClick={searchUser}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ color: "#010630" }}
          />
        </button>
      </div>
      <ul className="list-group">
        {searchedResult &&
          searchedResult.map((list, index) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={index}
            >
              <Link
                to={`/profile/${list.username}`}
                className="text-decoration-none text-dark"
              >
                <div className="ms-2 me-auto d-flex">
                  <div className="fw-bold ">{list.username}</div>
                  <small className="text-muted ms-2">{list.email}</small>
                </div>
                <small className="text-muted ms-2">{list.description}</small>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
