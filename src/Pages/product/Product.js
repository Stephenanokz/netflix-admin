import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Product.css";
import { Publish } from "@material-ui/icons";
import { updateMovieCall } from "../../context/movieContext/MovieapiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import storage from "../../firebase";

const Product = () => {
  const location = useLocation();
  const movie = location.state.movie;
  const navigate = useNavigate();

  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [updatedMovie, setUpdatedMovie] = useState(movie);
  const [uploaded, setUploaded] = useState(0);
  const { dispatch } = useContext(MovieContext);

  console.log(trailer);

  const handleChange = (e) => {
    const value = e.target.value;
    setUpdatedMovie({ ...updatedMovie, [e.target.name]: value });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const storageRef = ref(storage, `/files/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log("Upload is " + progress + "% completed.");
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUpdatedMovie((prev) => {
              return { ...prev, [item.label]: downloadURL };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMovieCall(updatedMovie, dispatch);
    return navigate("/movie/" + updatedMovie._id);
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newmovie">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie.img} alt="" className="productInfoImg" />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Genre:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Year:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Limit:</span>
              <span className="productInfoValue">{movie.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input
              name="title"
              type="text"
              placeholder={movie.title}
              onChange={handleChange}
            />
            <label>Year</label>
            <input
              name="year"
              type="text"
              placeholder={movie.year}
              onChange={handleChange}
            />
            <label>Limit</label>
            <input
              name="limit"
              type="text"
              placeholder={movie.limit}
              onChange={handleChange}
            />
            <label>Genre</label>
            <input
              name="genre"
              type="text"
              placeholder={movie.genre}
              onChange={handleChange}
            />
            <label>Trailer</label>
            <input
              name="trailer"
              type="file"
              placeholder={movie.trailer}
              onChange={(e) => setTrailer(e.target.files[0])}
            />
            <label>Video</label>
            <input
              name="video"
              type="file"
              placeholder={movie.video}
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={movie.img} alt="" className="productUploadImg" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            {uploaded === 2 ? (
              <button className="addProductButton" onClick={handleSubmit}>
                Update
              </button>
            ) : (
              <button className="addProductButton" onClick={handleUpload}>
                Upload
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
