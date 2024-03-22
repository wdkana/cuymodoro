import React from "react";

function Title({ title }) {
  return (
    <div>
      <h1 className="text-4xl text-center font-bold py-4">{title}</h1>
      <hr />
    </div>
  );
}

export default Title;
