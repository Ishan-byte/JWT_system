import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Components
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  function setAuth(Boolean) {
    setisAuthenticated(Boolean);
  }

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    const response = await fetch("http://localhost:5000/auth/is-verified", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
        "Content-type": "application/json",
      },
    });

    const res = await response.json();
    setAuth(res.isUserAuthorized === true ? true : false);
  };

  return (
    <div className="App">
      <Router>
        <div className="container">
          <Switch>
            <Route
              exact
              path="/login"
              render={(props) =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={(props) =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={(props) =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
