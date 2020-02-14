import store from "../store.js";
import Song from "../Models/Song.js";

let _sandboxApi = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/Mark0/songs",
  timeout: 3000
});

class MusicService {
  removeSong() {
    _sandboxApi
      .delete(store.State.activeSong.id)
      .then(res => {
        let mySongs = store.State.mySongs.filter(
          s => s.id != store.State.activeSong.id
        );

        store.commit("mySongs", mySongs);
        store.commit("activeSong", null);
      })
      .catch(err => {
        throw new Error(err);
      });
  }
  setActive(id) {
    let song = store.State.songs.find(s => s.id == id);
    if (!song) {
      song = store.State.mySongs.find(s => s.id == id);
      if (!song) {
        console.error("invalid song id");
        return;
      }
    }
    store.commit("activeSong", song);
  }
  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  getMusicByQuery(query) {
    //NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        let results = res.results
          .filter(s => s.kind == "song")
          .map(rawData => new Song(rawData));
        store.commit("songs", results);
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  addToPlaylist() {
    _sandboxApi
      .post("", store.State.activeSong)
      .then(res => {
        let activeSong = new Song(res.data.data);
        let mySongs = [...store.State.mySongs, activeSong];
        store.commit("mySongs", mySongs);
      })
      .catch(err => {
        throw new Error(err);
      });
  }
  getApiMusic() {
    _sandboxApi
      .get("")
      .then(res => {
        let mySongs = res.data.data.map(s => new Song(s));
        store.commit("mySongs", mySongs);
      })
      .catch(err => {
        throw new Error(err);
      });
  }
}

const service = new MusicService();
export default service;
