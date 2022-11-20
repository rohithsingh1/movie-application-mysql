import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { SetEditMovieList } from "../redux/movieSlice";
import Navbar from "../components/Navbar";

function Home() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getMovies = async () => {
    try {
      //dispatch(ShowLoading());
      const response = await axios.post(
        `https://movie-application-mysql.onrender.com/api/movies/show-movies`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      //dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setMovies(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      //dispatch(HideLoading());
      toast.error(error);
    }
  };
  const onDelete = async (MovieId, MovieName) => {
    try {
      const obj = {
        MovieId,
        MovieName,
      };
      //dispatch(ShowLoading());
      const response = await axios.post(
        `https://movie-application-mysql.onrender.com/api/movies/delete-movie`,
        obj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      //dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        getMovies();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      //dispatch(HideLoading());
      toast.error(error);
    }
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
          <div className="row ">
            <div className="col-sm-3 mt-5 mb-4 text-gred">
              {/* <div className="search">
                <form className="form-inline">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search Movies"
                    aria-label="Search"
                  />
                </form>
              </div> */}
            </div>
            <div
              className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
              style={{ color: "green" }}
            >
              <h2>
                <b>Movie Details</b>
              </h2>
            </div>
            <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
              <Button
                variant="primary"
                onClick={() => {
                  dispatch(SetEditMovieList(null));
                  navigate("/add-movie");
                }}
              >
                Add New Movie
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th>MOVIEID</th>
                    <th>MOVIENAME</th>
                    <th>RATING</th>
                    <th>GENRE</th>
                    <th>RELEASEDATE</th>
                    <th>CASTLIST</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map((moviearr) => {
                    let movielist = moviearr[0];
                    let moviecastlist = movielist.CastList;
                    return (
                      <>
                        <tr key={movielist.MovieId.toString()}>
                          <td>{movielist.MovieId}</td>
                          <td>{movielist.MovieName}</td>
                          <td>{movielist.Rating}</td>
                          <td>{movielist.Genre}</td>
                          <td>{movielist.ReleaseDate}</td>
                          <td>
                            <ul className="ullist">
                              {moviecastlist.map((castarr) => {
                                return (
                                  <li key={castarr[1].toString()}>
                                    {castarr[0]}
                                  </li>
                                );
                              })}
                            </ul>
                          </td>
                          <td>
                            <div>
                              Delete :
                              <i
                                className="fa-solid fa-trash"
                                onClick={() => {
                                  onDelete(
                                    movielist.MovieId,
                                    movielist.MovieName
                                  );
                                }}
                              ></i>
                            </div>
                            <div>
                              update :
                              <i
                                class="fa-solid fa-pen-to-square"
                                onClick={() => {
                                  dispatch(SetEditMovieList(movielist));
                                  navigate("/add-movie");
                                }}
                              ></i>
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
