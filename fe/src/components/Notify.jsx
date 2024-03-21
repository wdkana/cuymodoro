import React from "react";
import { useNavigate } from "react-router-dom";

function Notify({ message, goto = "/apps" }) {
  const navigate = useNavigate();

  return (
    <div className="toast toast-bottom toast-center">
      <div className="alert">
        <span>{message}</span>
        <div onClick={() => navigate(goto)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-4 h-4 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Notify;
