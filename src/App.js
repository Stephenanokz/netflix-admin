import Sidebar from "./Components/Sidebar/Sidebar";
import Topbar from "./Components/topbar/Topbar";
import Home from "./Pages/home/Home";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserList from "./Pages/userList/UserList";
import User from "./Pages/user/User";
import NewUser from "./Pages/newUser/NewUser";
import ListsList from "./Pages/listsList/ListsList";
import List from "./Pages/list/List";
import NewList from "./Pages/newList/NewList";
import ProductList from "./Pages/productList/ProductList";
import Product from "./Pages/product/Product";
import NewProduct from "./Pages/newProduct/NewProduct";
import Login from "./Pages/login/Login";
import { AuthContext } from "./context/authContext/AuthContext";
import { useContext } from "react";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
      </Routes>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route
            exact
            path="/"
            element={!user ? <Navigate to="/login" /> : <Home />}
          />
          {user && (
            <>
              <Route exact path="/users" element={<UserList />} />
              <Route exact path="/user/:userId" element={<User />} />
              <Route exact path="/newuser" element={<NewUser />} />
              <Route exact path="/movies" element={<ProductList />} />
              <Route exact path="/movie/:movieId" element={<Product />} />
              <Route exact path="/newmovie" element={<NewProduct />} />
              <Route exact path="/lists" element={<ListsList />} />
              <Route exact path="/list/:listId" element={<List />} />
              <Route exact path="/newlist" element={<NewList />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
