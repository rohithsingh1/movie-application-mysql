import React, { useState } from "react";
import "../resources/auth.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import Navbar from "../components/Navbar";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    Email: "",
    Password: "",
  });
  const dispatch = useDispatch();
  const Login = async (e) => {
    e.preventDefault();
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/users/login", user);
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };
  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login">
          <h1 className="text-center">Login</h1>
          <form className="needs-validation">
            <div className="form-group was-validated">
              <label className="form-label" htmlFor="email">
                Email address
              </label>
              <input
                className="form-control"
                type="email"
                id="email"
                placeholder="test@gmail.com"
                value={user.Email}
                onChange={(e) => setUser({ ...user, Email: e.target.value })}
                required
              />
              <div className="invalid-feedback">
                Please enter your email address
              </div>
            </div>
            <div className="form-group was-validated">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-control"
                type="password"
                id="password"
                placeholder="**************"
                value={user.Password}
                onChange={(e) => setUser({ ...user, Password: e.target.value })}
                required
              />
              <div className="invalid-feedback">Please enter your password</div>
            </div>
            <input
              className="btn btn-success w-100"
              type="submit"
              value="Login"
              onClick={Login}
            />
          </form>
          <div className="d-flex justify-content-between align-items-center my-3">
            <Link to="/register">Click Here To Register</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
