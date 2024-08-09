import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewsPage = () => {
  const [fans, setFans] = useState(0);

  // useEffect(() => {
  //   // 模擬粉絲數增加
  //   const interval = setInterval(() => {
  //     setFans((prevFans) => prevFans + 1);
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //   if (fans > 0) {
  //     toast(`你有一個新粉絲！總粉絲數: ${fans}`);
  //   }
  // }, [fans]);

  return (
    <div className="container">
      <ul className="list-group rounded-pill m-4">
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-5 me-auto">
            <div className="fw-bold">user</div>
            follow u{" "}
          </div>
        </li>
      </ul>
      <ToastContainer />
    </div>
  );
};

export default NewsPage;
