import React, { useState, useEffect } from "react";
import "../resources/auth.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { SetEditMovieList } from "../redux/movieSlice";
import Navbar from "../components/Navbar";

function MovieForm() {
  let initialState = {
    MovieName: "",
    Rating: "",
    Genre: "",
    ReleaseDate: "",
    Cast: "",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { editMovieList } = useSelector((state) => {
    return state.movies;
  });
  console.log("editMovieList = ", editMovieList);
  const [movie, setMovie] = useState(
    editMovieList === null ? initialState : editMovieList
  );
  const onAdd = async (e) => {
    //e.preventDefault();
    try {
      dispatch(ShowLoading());
      let castlistarr = movie.Cast.split(",");
      let temp = [];
      castlistarr.forEach((element) => {
        temp.push({
          CastName: element.trim(),
        });
      });
      console.log("temp = ", temp);
      const movieDetails = { ...movie, CastList: temp };
      console.log("movieDetaisl = ", movieDetails);
      const response = await axios.post(
        `https://movie-application-mysql.onrender.com/api/movies/add-movie`,
        movieDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(SetEditMovieList(null));
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const onEdit = async (e) => {
    //e.preventDefault();
    try {
      dispatch(ShowLoading());
      let castlistarr = movie.Cast.split(",");
      let temp = [];
      castlistarr.forEach((element) => {
        temp.push({
          CastName: element.trim(),
        });
      });
      console.log("temp = ", temp);
      const movieDetails = { ...movie, CastList: temp };
      console.log("movieDetaisl = ", movieDetails);
      const response = await axios.post(
        `https://movie-application-mysql.onrender.com/api/movies/update-movie`,
        movieDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(SetEditMovieList(null));
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (editMovieList) {
      let castlistarr = [];
      editMovieList.CastList.forEach((element) => {
        let castname = element[0];
        castlistarr.push(castname);
      });
      let obj = {
        ...editMovieList,
        Cast: castlistarr.join(","),
      };
      setMovie(obj);
    } else {
      setMovie(initialState);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login">
          <div className="login-header d-flex justify-content-start">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </button>
            <h1 className="text-right">
              {editMovieList ? "Edit" : "Add"} Movie
            </h1>
          </div>
          <form method="POST" className="needs-validation">
            <div className="form-group was-validated">
              <label className="form-label" htmlFor="movieName">
                Movie Name
              </label>
              <input
                className="form-control"
                type="text"
                id="movieName"
                placeholder="RRR"
                value={movie.MovieName}
                onChange={(e) =>
                  setMovie({ ...movie, MovieName: e.target.value })
                }
                required
              />
              <div className="invalid-feedback">Please enter movie details</div>
            </div>
            <div className="form-group was-validated">
              <label className="form-label" htmlFor="rating">
                Rating
              </label>
              <input
                className="form-control"
                type="text"
                id="rating"
                placeholder="9"
                value={movie.Rating}
                onChange={(e) => setMovie({ ...movie, Rating: e.target.value })}
                required
              />
              <div className="invalid-feedback">Please enter movie details</div>
            </div>
            <div className="form-group was-validated">
              <label className="form-label" htmlFor="genre">
                Genre
              </label>
              <input
                className="form-control"
                type="text"
                id="genre"
                placeholder="Thriller, Romantic ,Comedy ......."
                value={movie.Genre}
                onChange={(e) => setMovie({ ...movie, Genre: e.target.value })}
                required
              />
              <div className="invalid-feedback">Please enter movie details</div>
            </div>
            <div className="form-group was-validated">
              <label className="form-label" htmlFor="ReleaseDate">
                ReleaseDate
              </label>
              <input
                className="form-control"
                type="text"
                id="ReleaseDate"
                placeholder="2008-11-10 // yyyy/mm/dd format"
                value={movie.ReleaseDate}
                onChange={(e) =>
                  setMovie({ ...movie, ReleaseDate: e.target.value })
                }
                required
              />
              <div className="invalid-feedback">Please enter movie details</div>
            </div>
            <div className="form-group was-validated">
              <label className="form-label" htmlFor="cast">
                Cast Details
              </label>
              <input
                className="form-control"
                type="text"
                id="cast"
                placeholder="Priyanka Chopra , Alia Bhatt"
                value={movie.Cast}
                onChange={(e) => setMovie({ ...movie, Cast: e.target.value })}
                required
              />
              <div className="invalid-feedback">Please enter movie details</div>
            </div>
            <input
              className="btn btn-success w-100"
              type="button"
              value={editMovieList ? "Edit Movie" : "Add Movie"}
              onClick={() => {
                if (editMovieList) {
                  onEdit();
                } else {
                  console.log("onAdd clicked!!!!");
                  onAdd();
                }
              }}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default MovieForm;
