import React from "react";
import { useState } from "react";
import { Form, Field } from "react-final-form";
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";

import { login } from "../../reducers/authSlice";
import { useAppDispatch } from "../../app/store";
import logo from "../../assets/logo.png";
import email from "../../assets/icons/icon_email.png";
import eye from "../../assets/icons/eye.svg";
import eye_slash from "../../assets/icons/eye-slash.svg";

export interface Login {
  email: string;
  password: string;
}

const LoginForm = (): JSX.Element => {
  /** Local state */
  const [seePassword, setSeePassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  /** Validation form logic */
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const required = (value: string) =>
    value ? undefined : "Este campo é requerido!";
  const mustBeAnEmail = (value: string) =>
    emailRegex.test(value.toLowerCase())
      ? undefined
      : "Digite um e-mail válido!";
  const composeValidators = (...validators: any) => (value: any) =>
    validators.reduce(
      (error: any, validator: any) => error || validator(value),
      undefined
    );

  /** Redux state management */
  const dispatch = useAppDispatch();
  const history = useHistory();

  const onSubmit = async (values: Login) => {
    //e.preventDefault();

    dispatch(login(values))
      .then(unwrapResult)
      .then((result) => {
        history.replace("/dashboard");
      })
      .catch((error) => {
        setLoginError(true);
        values.password = "";
      });
  };

  return (
    <div className="container">
      <img src={logo} alt="" />
      {loginError ? (
        <div
          className="alert alert-danger alert-dismissible fade show w-100"
          role="alert"
        >
          Credenciais incorretas
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ) : (
        ""
      )}
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group relative">
              <Field
                name="email"
                validate={composeValidators(required, mustBeAnEmail)}
              >
                {({ input, meta }) => (
                  <>
                    <label htmlFor="email" className="label">
                      Email
                    </label>
                    <img className="icon right-align" src={email} alt="" />
                    <input
                      {...input}
                      type="text"
                      className="form-control my-input input-login"
                    />
                    {meta.error && meta.touched && (
                      <div className="invalid-feedback d-block">
                        {meta.error}
                      </div>
                    )}
                  </>
                )}
              </Field>
            </div>

            <div className="form-group relative">
              <Field name="password" validate={required}>
                {({ input, meta }) => (
                  <>
                    <label htmlFor="password" className="label">
                      Password
                    </label>
                    {seePassword ? (
                      <img
                        alt=""
                        src={eye_slash}
                        className="right-align icon"
                        onClick={() => {
                          setSeePassword(!seePassword);
                        }}
                      />
                    ) : (
                      <img
                        src={eye}
                        alt=""
                        className="right-align icon"
                        onClick={() => {
                          setSeePassword(!seePassword);
                        }}
                      />
                    )}
                    <input
                      type={seePassword ? "text" : "password"}
                      className="form-control my-input input-login"
                      {...input}
                    />
                    {meta.error && meta.touched && (
                      <div className="invalid-feedback d-block">
                        {meta.error}
                      </div>
                    )}
                  </>
                )}
              </Field>
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="btn btn-primary text-white my-btn my-primary"
              >
                Login
              </button>
            </div>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-light text-primary my-btn"
              >
                Esqueci a senha
              </button>
            </div>
          </form>
        )}
      ></Form>
    </div>
  );
};

export default LoginForm;
