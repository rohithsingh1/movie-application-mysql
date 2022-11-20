import React, { useState } from "react";
import "../resources/auth.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import Navbar from "../components/Navbar";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    Name: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });
  const dispatch = useDispatch();
  const Register = async (e) => {
    e.preventDefault();
    try {
      if (user.Password !== user.ConfirmPassword) {
        toast.error("Passwords did not match!!!");
      } else {
        dispatch(ShowLoading());
        const response = await axios.post(
          `https://movie-application-mysql.onrender.com/api/users/register`,
          user
        );
        dispatch(HideLoading());
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/login");
        } else {
          toast.error(response.data.message);
        }
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
          <h1 className="text-center">Register</h1>
          <form className="needs-validation">
            <div className="form-group was-validated">
              <label className="form-label" htmlFor="username">
                UserName
              </label>
              <input
                className="form-control"
                type="text"
                id="username"
                placeholder="username"
                value={user.Name}
                onChange={(e) => {
                  setUser({ ...user, Name: e.target.value });
                }}
                required
              />
              <div className="invalid-feedback">
                Please enter your username address
              </div>
            </div>
            <div className="form-group was-validated">
              <label className="form-label" htmlFor="email">
                Email address
              </label>
              <input
                className="form-control"
                type="email"
                id="email"
                placeholder="username@gmail.com"
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
                placeholder="******************"
                value={user.Password}
                onChange={(e) => setUser({ ...user, Password: e.target.value })}
                required
              />
              <div className="invalid-feedback">Please enter your password</div>
            </div>
            <div className="form-group was-validated">
              <label className="form-label" htmlFor="ConfirmPassword">
                ConfirmPassword
              </label>
              <input
                className="form-control"
                type="password"
                id="ConfirmPassword"
                placeholder="*********************"
                value={user.ConfirmPassword}
                onChange={(e) =>
                  setUser({ ...user, ConfirmPassword: e.target.value })
                }
                required
              />
              <div className="invalid-feedback">Please enter your password</div>
            </div>
            <input
              className="btn btn-success w-100"
              type="submit"
              value="Register"
              onClick={Register}
            />
          </form>
          <div className="d-flex justify-content-between align-items-center my-3">
            <Link to="/login">Click Here To Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
