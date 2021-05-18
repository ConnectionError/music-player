import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption/SidebarOption";
import { useDataLayerValue } from "../DataLayer";

const Sidebar = () => {
  const [{ playLists }, dispatch] = useDataLayerValue();
  return (
    <div className="sidebar">
      <img
        className="sidebar-logo"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />
      <div className="sidebar-padding">
        <SidebarOption text="Home" Icon={HomeIcon} />
        <SidebarOption text="Search" Icon={SearchIcon} />
        <SidebarOption text="Your Library" Icon={LibraryMusicIcon} />
      </div>

      <strong className="sidebar-title">PLAYLISTS</strong>
      <hr />

      {playLists?.items?.map((playList) => (
        <SidebarOption text={playList.name} />
      ))}
    </div>
  );
};

export default Sidebar;
