import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  function onInputChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  const onFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = inputs;
      const response = await fetch("http://localhost:5000/auth/register", {
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
      <h1 className="text-center my-5">Register</h1>
      <form onSubmit={(e) => onFormSubmit(e)}>
        <input
          className="form-control my-3"
          name="email"
          type="email"
          placeholder="Enter your E-mail"
          value={inputs.email}
          onChange={(e) => onInputChange(e)}
        ></input>
        <input
          className="form-control my-3"
          name="password"
          type="password"
          placeholder="Password"
          value={inputs.password}
          onChange={(e) => onInputChange(e)}
        ></input>
        <input
          className="form-control my-3"
          name="name"
          type="name"
          placeholder="Username"
          value={inputs.name}
          onChange={(e) => onInputChange(e)}
        ></input>
        <button type="submit" className="btn btn-success btn-block">
          Submit
        </button>
        <Link to="/login">Login</Link>
      </form>
    </Fragment>
  );
};

export default Register;
