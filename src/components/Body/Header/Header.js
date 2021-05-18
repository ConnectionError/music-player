import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import "./Header.css";
import { useDataLayerValue } from "../../DataLayer";

const Header = () => {
  const [{ user }, dispatch] = useDataLayerValue();
  let avatar;
  if (user && user.image && user.image.length > 0) {
    avatar = user.image[0].url;
  } else {
    avatar = null;
  }
  return (
    <div className="header">
      <div className="header-left">
        <SearchIcon />
        <input
          placeholder="Search for Artists, Songs, or Podcasts "
          type="text"
        />
      </div>
      <div className="header-right">
        <Avatar src={avatar} alt={user?.display_name} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
};

export default Header;
