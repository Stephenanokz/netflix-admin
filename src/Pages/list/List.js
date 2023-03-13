import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./List.css";
import { updateListCall } from "../../context/listContext/ListapiCalls";
import { ListContext } from "../../context/listContext/ListContext";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getMoviesCall } from "../../context/movieContext/MovieapiCalls";

const List = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const list = location.state.list;
  const [updatedList, setUpdatedList] = useState(list);

  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

  useEffect(() => {
    getMoviesCall(dispatchMovie);
  }, [dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setUpdatedList({ ...updatedList, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setUpdatedList({ ...updatedList, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateListCall(updatedList, dispatch);
    return navigate("/lists/");
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newlist">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{list._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Genre:</span>
              <span className="productInfoValue">{list.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Type:</span>
              <span className="productInfoValue">{list.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <div className="left">
              <label>list Title</label>
              <input
                name="title"
                type="text"
                placeholder={list.title}
                onChange={handleChange}
              />
              <label>Genre</label>
              <input
                name="genre"
                type="text"
                placeholder={list.genre}
                onChange={handleChange}
              />
              <label>Type</label>
              <select name="type" id="type" onChange={handleChange}>
                <option>Type</option>
                <option value="movie">Movie</option>
                <option value="series">Series</option>
              </select>
            </div>
          </div>
          <div className="addProductItem">
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
          <div className="productFormRight">
            <button className="addProductButton" onClick={handleSubmit}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default List;
