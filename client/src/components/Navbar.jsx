import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => {
    return state.users;
  });
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light navbar-expand-sm navbar-light">
        <div className="container-fluid">
          <Link className="navbar-brand ms-auto" to="/">
            <h4>Home</h4>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              {user !== null ? (
                <>
                  <li className="nav-item navbar-li">
                    <h4>{user.Name}</h4>
                  </li>
                  <li className="nav-item navbar-li">
                    <i
                      className="fa-solid fa-right-from-bracket"
                      onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                      }}
                    ></i>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
