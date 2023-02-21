import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  function onInputChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  const onLoginFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = inputs;
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const res = await response.json();

      localStorage.setItem("token", res.token);
      setAuth(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center my-5">Login</h1>
      <form onSubmit={(e) => onLoginFormSubmit(e)}>
        <input
          className="form-control my-3"
          type="email"
          name="email"
          placeholder="Enter your E-mail"
          value={inputs.email}
          onChange={(e) => onInputChange(e)}
        />
        <input
          className="form-control my-3"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={inputs.password}
          onChange={(e) => onInputChange(e)}
        />

        <button type="submit" className="btn btn-success btn-block">
          Login
        </button>
        <Link to="/register">Register</Link>
      </form>
    </Fragment>
  );
};

export default Login;
