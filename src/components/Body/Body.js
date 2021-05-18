import React from "react";
import { useDataLayerValue } from "../DataLayer";
import "./Body.css";
import Header from "./Header/Header";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Song from "./Song/Song";

const Body = ({ spotify }) => {
  const [{ discover_weekly }, dispatch] = useDataLayerValue();
  console.log(discover_weekly);
  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:4CKGKQIsKG05yFFoGpAPp5`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  return (
    <div className="body">
      <Header spotify={spotify} />
      <div className="body-info">
        <img src={discover_weekly?.images[0].url} alt="" />
        <div className="body-info-text">
          <strong>PLAYLIST</strong>
          <h2>Your Playlist</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>
      <div className="body-songs">
        <div className="body-icons">
          <PlayCircleFilledIcon
            className="body-shuffle"
            onClick={playPlaylist}
          />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>
      </div>
      {discover_weekly?.tracks.items.map((item, index) => (
        <Song playSong={playSong} track={item.track} key={index} />
      ))}
    </div>
  );
};

export default Body;
