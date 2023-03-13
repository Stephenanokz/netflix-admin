import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import WcIcon from "@mui/icons-material/Wc";
import React, { useContext, useEffect, useState } from "react";
import "./User.css";
import { Link, useParams } from "react-router-dom";
import {
  updateUserCall,
  getUsersCall,
} from "../../context/userContext/UserApiCalls";
import { UserContext } from "../../context/userContext/UserContext";

let firstLoad = true;
let user;

const User = () => {
  const { users, dispatch } = useContext(UserContext);
  const params = useParams();
  useEffect(() => {
    getUsersCall(dispatch);
  }, [dispatch, params]);

  let [updatedUser, setUpdatedUser] = useState(user);
  if (users && firstLoad) {
    user = users.filter((user) => user._id === params.userId)[0];
    updatedUser = user;
  }

  // const navigate = useNavigate();

  const handleChange = (e) => {
    firstLoad = false;
    const value = e.target.value;
    setUpdatedUser({ ...updatedUser, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserCall(updatedUser, dispatch);
    window.location.reload();
    // getUsersCall(dispatch);
    // return navigate(`/users/${user._id}`);
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">User</h1>
        <Link to="/newuser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      {user && (
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src={
                  user.profilePic ||
                  "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                }
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{user.username}</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {user.firstName} {user.lastName}
                </span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {user.createdAt.slice(0, 10)}
                </span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {`+234 ${user.phone}` || "+234 91 0275 3340"}
                </span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{user.email}</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {user.city} | {user.country}
                </span>
              </div>
              <div className="userShowInfo">
                <WcIcon className="userShowIcon" />
                <span className="userShowInfoTitle">{user.gender}</span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    name="username"
                    type="text"
                    placeholder={user.username}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>First Name</label>
                  <input
                    name="firstName"
                    type="text"
                    placeholder={`${user.firstName}` || "First Name"}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Last Name</label>
                  <input
                    name="lastName"
                    type="text"
                    placeholder={`${user.lastName}` || "Last Name"}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    name="email"
                    type="email"
                    placeholder={user.email}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone Number</label>
                  <input
                    name="phone"
                    type="number"
                    placeholder={user.phone || "+234 91 0275 3340"}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>City</label>
                  <input
                    name="city"
                    type="text"
                    placeholder={`${user.city}` || "City"}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Country</label>
                  <input
                    name="country"
                    type="text"
                    placeholder={`${user.country}` || "Country"}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    src={
                      user.profilePic ||
                      "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                    }
                    alt=""
                    className="userUpdateImg"
                  />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="userUpdateButton" onClick={handleSubmit}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
