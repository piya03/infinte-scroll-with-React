import React, { useState, useEffect } from "react";
import "./App.css";
import Person from "./component/Person.js";

function App() {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [scrolling, setScrolling] = useState(false);

  function callApi() {
    fetch(
      `https://5da9aa08de10b40014f3745c.mockapi.io/api/v1/feed?page=${pageNo}&limit=${perPage}`
    ).then((res) => res.json().then((json) => setData([...data, ...json])));
  }
  useEffect(() => {
    async function makeSomeCall() {
      const {
        clientHeight,
        scrollTop,
        scrollHeight,
      } = document.documentElement;
      // console.log(
      //   "makeSomeCall -> clientHeight + scrollTop >= scrollHeight",
      //   clientHeight,
      //   scrollTop,
      //   scrollHeight
      // );
      if (clientHeight + scrollTop >= scrollHeight - 20) {
        console.log("to bottom");
        setPageNo((prev) => prev + 1);
        await callApi();
      }
    }
    window.addEventListener("scroll", makeSomeCall);

    return () => {
      window.removeEventListener("scroll", makeSomeCall);
    };
  }, [pageNo]);

  useEffect(() => {
    callApi();
  }, []);
  return (
    <div className="app">
      <h1 className="heading">Hello infinte scroll</h1>
      {data.map((each, i) => {
        return <Person key={i} each={each} />;
      })}
    </div>
  );
}

export default App;
