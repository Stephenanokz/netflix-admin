import React, { useContext, useEffect } from "react";
import "./ProductList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { MovieContext } from "../../context/movieContext/MovieContext";
import {
  deleteMovieCall,
  getMoviesCall,
} from "../../context/movieContext/MovieapiCalls";

const ProductList = () => {
  const { movies, dispatch } = useContext(MovieContext);

  useEffect(() => {
    getMoviesCall(dispatch);
  }, [dispatch]);

  const deleteHandler = (id) => {
    deleteMovieCall(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "movie",
      headerName: "Movie",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="productListProduct">
            <img src={params.row.img} alt="" className="productListImage" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "Year", width: 120 },
    { field: "limit", headerName: "Limit", width: 120 },
    { field: "isSeries", headerName: "IsSeries", width: 120 },

    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={"/movie/" + params.row._id}
              state={{ movie: params.row }}
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => deleteHandler(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={movies}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(r) => r._id}
      />
    </div>
  );
};

export default ProductList;
