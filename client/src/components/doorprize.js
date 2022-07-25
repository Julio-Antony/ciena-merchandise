import React, { useEffect, useState } from "react";
import { simple } from "simple-gacha";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import logo from "../images/logo-ciena.svg";

const Doorprize = () => {
  const [prizes, setPrizes] = useState({});
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const company = localStorage.getItem("company");
  const email = localStorage.getItem("email");
  const jabatan = localStorage.getItem("jabatan");
  const isUsefull = localStorage.getItem("isUsefull");
  const need = localStorage.getItem("need");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("access_token");
  if (!token) {
    window.location.replace("/");
  }

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("/api/doorprize", {
          headers: { "x-auth-token": token },
        })
        .then((res) => {
          const { pick } = simple(res.data);
          setPrizes(pick);
          setReady(true);
        });
    };

    fetchData().catch((err) => {
      if (err.response.status === 401) {
        navigate("/");
      }
      if (err.response.status === 400) {
        swal(err.response.data, {
          icon: "error",
        });
        navigate("/");
      }
    });
  }, [navigate, token]);

  const data = JSON.stringify({
    name: name.toLowerCase(),
    company: company.toLowerCase(),
    email: email.toLowerCase(),
    jabatan: jabatan.toLowerCase(),
    isUsefull: isUsefull.toLowerCase(),
    need: need.toLowerCase(),
    prizeName: prizes.name,
  });

  const onClaim = () => {
    const token = localStorage.getItem("access_token");
    axios
      .put(`/api/doorprize/${prizes._id}`, data, {
        headers: { "Content-Type": "application/json", "x-auth-token": token },
      })
      .then((res) => {
        localStorage.clear();
        swal(res.data.msg, {
          icon: "success",
        });
        navigate("/");
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          swal(err.response.data, {
            icon: "error",
          });
          navigate("/");
        }
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card card-doorprize">
            <div
              className={`card-body ${
                prizes.rarity === "Gold"
                  ? "bg-gold"
                  : prizes.rarity === "Silver"
                  ? "bg-silver"
                  : "bg-bronze"
              } `}
            >
              <img src={logo} alt="logo" width={120} className="mr-auto" />
              {ready ? (
                <div className="text-center">
                  <img
                    alt="prize"
                    src={"data:image/png;base64," + prizes.img}
                    className="prize-img"
                  />
                  <p>Selamat, Anda Mendapatkan :</p>
                  <h3 style={{ marginBottom: "50px", color: "#193FC3" }}>
                    {prizes.name}
                  </h3>
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "#193FC3",
                      color: "#fff",
                      letterSpacing: ".75px",
                      borderRadius: "30px",
                    }}
                    onClick={onClaim}
                  >
                    {loading ? "Loading..." : "CLAIM"}
                  </button>
                </div>
              ) : (
                <div className="text-center" style={{marginTop: "200px"}}>
                  <div className="spinner-border" role="status"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doorprize;
