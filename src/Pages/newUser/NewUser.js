import React, { useContext, useState } from "react";
import "./NewUser.css";
import storage from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { UserContext } from "../../context/userContext/UserContext";
import { createUserCall } from "../../context/userContext/UserApiCalls";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
  const [uploaded, setUploaded] = useState(0);
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const storageRef = ref(storage, `/files/user/${fileName}`);
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
            setUser((prev) => {
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
    upload([{ file: profilePic, label: "profilePic" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserCall(user, dispatch);
    return navigate("/users");
  };

  console.log(user);

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>First Name</label>
          <input
            name="firstName"
            type="text"
            placeholder="First name"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Last Name</label>
          <input
            name="lastName"
            type="text"
            placeholder="Last name"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="user@email.com"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="password"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input
            name="phone"
            type="number"
            placeholder="000-000-0000"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>City</label>
          <input
            name="city"
            type="text"
            placeholder="City"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Country</label>
          <input
            name="country"
            type="text"
            placeholder="Country"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              onChange={handleChange}
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              onChange={handleChange}
            />
            <label htmlFor="female">Female</label>
            <input
              type="radio"
              name="gender"
              id="others"
              value="others"
              onChange={handleChange}
            />
            <label htmlFor="others">Others</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>IsAdmin</label>
          <select
            className="newUserStatusSelect"
            name="isAdmin"
            id="isAdmin"
            onChange={handleChange}
          >
            <option>Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="newUserItem">
          <label>Profile Photo</label>
          <input
            type="file"
            name="profilePic"
            onChange={(e) => {
              setProfilePic(e.target.files[0]);
            }}
          />
        </div>
        {uploaded === 1 ? (
          <button className="addProductButton" onClick={handleSubmit}>
            Create
          </button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
};

export default NewUser;
