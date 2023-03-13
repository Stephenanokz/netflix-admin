import { Visibility } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./SmallWidget.css";
import axios from "axios";
import { baseUrl } from "../../baseUrl";

const SmallWidget = () => {
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get(`${baseUrl}/users?new=true`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          }, 
        });
        setNewUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNewUsers();
  }, []);

  return (
    <div className="smallWidget">
      <span className="smallWidgetTitle">Recently Joined Members</span>
      <ul className="smallWidgetList">
        {newUsers.map((user) => (
          <li className="smallWidgetListItem" key={user._id}>
            <img
              src={
                user.profilePic ||
                "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              }
              alt=""
              className="smallWidgetImg"
            />
            <div className="smallWidgetUser">
              <span className="smallWidgetUsername">{user.username}</span>
            </div>
            <button className="smallWidgetButton">
              <Visibility className="smallWidgetIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SmallWidget;
