import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

function timeNow() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const time = `${hours}:${minutes}`;
  return time;
}

function Hero() {
  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [status, setStatus] = useState("");
  const [statusButton, setStatusButton] = useState("Mulai");

  const addFeature = useMutation({
    mutationFn: ({ title, level }) => {
      axios
        .post("http://localhost:3002/features/add", {
          title,
          level,
        })
        .then((r) => setId(r.data.id))
        .catch(() => "error");
    },
  });

  const getLastData = () => {
    axios
      .get(
        `http://localhost:3002/features/last/${localStorage.getItem(
          "username"
        )}`
      )
      .then((r) => {
        setId(r.data.features.id);
        setTitle(r.data.features.title);
        setLevel(r.data.features.level);
        setStatus(r.data.features.status);

        switch (r.data.features.status) {
          case "ongoing":
            setStatusButton("break dulu");
            break;
          case "break":
            setStatusButton("Lanjutin");
          default:
            setStatusButton("Mulai");
            break;
        }
        if (r.data.features.status == "break") {
          setStatusButton("Lanjutkan");
        }
      });
  };

  useEffect(() => {
    localStorage.setItem("username", "admin");
    getLastData();
  }, []);

  const breakFeature = useMutation({
    mutationFn: () => {
      axios.put("http://localhost:3002/features/break", {
        id,
        break_time: timeNow(),
      });
    },
  });

  return (
    <div className="flex hero items-center">
      {addFeature.isError || breakFeature.isError ? (
        <div>An error occurred: {mutation.error.message}</div>
      ) : null}
      <div className="hero-content flex-col lg:flex-row">
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-bold">⏲ Cuymodoro</h1>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Fitur apa yang kamu kerjain"
              className="input input-bordered w-full max-w-xl rounded-md py-2 px-4"
              defaultValue={title}
            />
            <select
              className="select select-bordered w-full max-w-xl py-2 px-4"
              onChange={(e) => setLevel(e.target.value)}
              value={level}
            >
              <option defaultValue={"-"}>Pilih Break Level</option>
              <option value={"newcomers"}>New Comers</option>
              <option value={"reguler"}>Reguler</option>
              <option value={"enthusiast"}>Enthusiast</option>
            </select>
          </div>
          {addFeature.isSuccess ? <div>feature added!</div> : null}
          {status && <div>status: {status}</div>}
          {breakFeature.isSuccess ? (
            <div>TAKE A BREAK FOR xx:xx minutes</div>
          ) : null}
          <button
            className="btn btn-primary rounded-md"
            onClick={() => {
              switch (status) {
                case "ongoing":
                  breakFeature.mutate();
                  break;
                case "break":
                  //
                  break;
                default:
                  addFeature.mutate({ title, level });
                  break;
              }
            }}
          >
            {statusButton}
          </button>
          <button
            onClick={() => {
              alert(`feature ${title} selesai`);
            }}
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
