import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createListCall } from "../../context/listContext/ListapiCalls";
import { getMoviesCall } from "../../context/movieContext/MovieapiCalls";
import { ListContext } from "../../context/listContext/ListContext";
import { MovieContext } from "../../context/movieContext/MovieContext";
import "./NewList.css";

const NewList = () => {
  const [list, setList] = useState(null);

  const navigate = useNavigate();

  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

  useEffect(() => {
    getMoviesCall(dispatchMovie);
  }, [dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };

  console.log(list);

  const handleSubmit = (e) => {
    e.preventDefault();
    createListCall(list, dispatch);
    return navigate("/lists");
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm">
        <div className="formLeft">
          <div className="addListItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="List Title"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="addListItem">
            <label>Genre</label>
            <input
              type="text"
              placeholder="List Genre"
              name="genre"
              onChange={handleChange}
            />
          </div>
          <div className="addListItem">
            <label>Type</label>
            <select name="type" id="type" onChange={handleChange}>
              <option>Type</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>
        <div className="formRight">
          <div className="addListItem">
            <label>Content</label>
            <select
              multiple
              name="content"
              id="content"
              onChange={handleSelect}
            >
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="addProductButton" onClick={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  );
};

export default NewList;
