import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";
import email from "../../assets/icons/icon_email.png";

const LoginForm = (): JSX.Element => {
  const [seePassword, setSeePassword] = useState(false);

  return (
    <div className="container">
      <img src={logo} alt="" />
      <form className="form">
        <div className="form-group relative">
          <label htmlFor="exampleInputEmail1" className="label">Email</label>
          <img className="icon right-align" src={email} alt="" />
          <input
            type="email"
            className="form-control my-input input-login"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"            
          />
        </div>

        <div className="form-group relative">
          <label htmlFor="exampleFormControlTextarea1" className="label">
            Password
          </label>
          {seePassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-eye-slash right-align icon"
              viewBox="0 0 16 16"
              onClick={() => {
                setSeePassword(!seePassword);
              }}
            >
              <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
              <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
              <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884l-12-12 .708-.708 12 12-.708.708z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-eye right-align icon"
              viewBox="0 0 16 16"
              onClick={() => {
                setSeePassword(!seePassword);
              }}
            >
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
            </svg>
          )}
          <input
            type={seePassword ? "text" : "password"}
            className="form-control my-input input-login"
            id="exampleFormControlInput1"
            placeholder=""
          />
        </div>
        <div className="mb-3">
          <Link
            to="/dashboard"
            type="button"
            className="btn btn-primary text-white my-btn my-primary"
          >
            Login
          </Link>
        </div>
        <div className="mb-3">
          <button type="button" className="btn btn-light text-primary my-btn">
            Esqueci a senha
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
