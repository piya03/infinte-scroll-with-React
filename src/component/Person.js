import React, { useState, useEffect } from "react";
import "../App.css";

function Person({ each }) {
  const { name, avatar } = each;
  return (
    <div>
      <div
        style={{
          height: "300px",
        }}
      >
        <img
          src={avatar}
          alt=""
          style={{
            height: "100%",
          }}
        />
      </div>

      <p className="name">{name}</p>
    </div>
  );
}

export default Person;
