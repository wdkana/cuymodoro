import React from "react";

function Notify({ message }) {
  return (
    <div className="toast toast-bottom toast-center">
      <div className="alert">
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Notify;
