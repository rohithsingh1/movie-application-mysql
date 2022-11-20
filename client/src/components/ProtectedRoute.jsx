import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/userSlice";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => {
    return state.users;
  });
  const validateToken = async () => {
    try {
      //dispatch(ShowLoading());
      const response = await axios.post(
        `https://movie-application-mysql.onrender.com/api/users/get-user-by-id`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      //dispatch(HideLoading());
      if (response.data.success) {
        dispatch(SetUser(response.data.data));
        //toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
        //toast.success(response.data.message);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      //dispatch(HideLoading());
      toast.error(error.message);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  }, []);

  return <div>{user !== null && children}</div>;
}

export default ProtectedRoute;
