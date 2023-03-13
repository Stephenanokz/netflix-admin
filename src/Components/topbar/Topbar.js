import React from 'react';
import './Topbar.css';
import { NotificationsNone, Language, Settings } from '@mui/icons-material';

const Topbar = () => {
  return (
    <div className='topbar'>
      <div className="topbarWrapper">
        <div className="topLeft">
            <span className="logo">admin@admin.com</span>
        </div>
        <div className="topRight">
            <div className="topbarIconContainer">
                <NotificationsNone />
                <span className="topIconBadge">2</span>
            </div>
            <div className="topbarIconContainer">
                <Language />
                <span className="topIconBadge">2</span>
            </div>
            <div className="topbarIconContainer">
                <Settings />
            </div>
            <img src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=2000" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  )
}

export default Topbar;
