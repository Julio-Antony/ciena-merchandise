import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import logo from "../images/logo-ciena.svg";
import swal from "sweetalert";

const Register = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [isUsefull, setIsUsefull] = useState(false);
  const [need, setNeed] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registData = JSON.stringify({
    name: name,
  });

  const onSubmit = () => {
    setLoading(true);
    axios
      .post("/api/auth", registData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("access_token", res.data.token);
        localStorage.setItem("name", name);
        localStorage.setItem("company", company);
        localStorage.setItem("email", email);
        localStorage.setItem("jabatan", jabatan);
        localStorage.setItem("isUsefull", isUsefull);
        localStorage.setItem("need", need);
        navigate("/doorprize");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          swal(err.response.data, {
            icon: "error",
          });
        }
        setLoading(false);
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card" style={{ marginBottom: "100px" }}>
            <img src={logo} alt="logo" width={180} className="mx-auto" />
            <h1 className="text-center">
              <strong>Form Partisipan</strong>
            </h1>
            <p
              className="text-center"
              style={{ marginBottom: "40px", marginTop: "-8px" }}
            >
              Isi Form ini dan dapatkan hadiahnya !!!
            </p>
            <div className="card-body">
              <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-md-12">
                  <label htmlFor="validationServer01" className="form-label">
                    Nama
                  </label>
                  <input
                    type="text"
                    className={`form-control ${name !== "" ? "is-valid" : ""}`}
                    id="name"
                    aria-invalid={errors.name ? "true" : "false"}
                    {...register("name")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="company" className="form-label">
                    Nama Perusahaan
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      company !== "" ? "is-valid" : ""
                    }`}
                    id="company"
                    aria-invalid={errors.name ? "true" : "false"}
                    {...register("company")}
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className={`form-control ${email !== "" ? "is-valid" : ""}`}
                    id="email"
                    aria-invalid={errors.name ? "true" : "false"}
                    {...register("email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="jabatan" className="form-label">
                    Jabatan
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      jabatan !== "" ? "is-valid" : ""
                    }`}
                    id="jabatan"
                    aria-invalid={errors.name ? "true" : "false"}
                    {...register("jabatan")}
                    value={jabatan}
                    onChange={(e) => setJabatan(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="isUsefull" className="form-label">
                    Apakah Ciena bisa dipakai untuk apa di network anda
                  </label>
                  <select
                    className="form-select"
                    id="isUsefull"
                    aria-label="Default select example"
                    onChange={(e) => setIsUsefull(e.target.value)}
                  >
                    <option value={true} selected={isUsefull === true}>
                      Ya
                    </option>
                    <option value={false} selected={isUsefull === false}>
                      Tidak
                    </option>
                  </select>
                </div>
                <div className="col-md-12">
                  <label htmlFor="need" className="form-label">
                    Produk dan solusi apa saja yang dibutuhkan untuk perusahaan
                    anda
                  </label>
                  <textarea
                    className="form-control"
                    id="need"
                    aria-invalid={errors.name ? "true" : "false"}
                    {...register("need")}
                    value={need}
                    onChange={(e) => setNeed(e.target.value)}
                  />
                </div>
                <div className="col-12 text-center">
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "#193FC3",
                      color: "#fff",
                      letterSpacing: ".75px",
                      borderRadius: "30px",
                    }}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "SUBMIT"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
