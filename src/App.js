import "./App.css";
import Login from "./components/Login/Login";
import Player from "./components/Player/Player";
import { useEffect } from "react";
import { getTokenFromUrl } from "./components/spotify/spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./components/DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";

    const token = hash.access_token;
    if (token) {
      dispatch({
        type: "SET_TOKEN",
        token,
      });

      spotify.setAccessToken(token);

      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });
      });

      spotify.getUserPlaylists().then((playLists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playLists,
        });
      });

      spotify.getPlaylist("4CKGKQIsKG05yFFoGpAPp5").then((response) => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        });
      });
    }
    return () => {};
  }, [dispatch]);

  return (
    <div className="app">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
