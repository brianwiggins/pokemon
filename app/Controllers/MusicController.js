import MusicService from "../Services/MusicService.js";
import store from "../store.js";

//Private
function _drawResults() {
  let songs = store.State.songs;
  let template = "";
  songs.forEach(s => {
    template += s.previewTemplate;
  });
  document.getElementById("search-results").innerHTML = template;
}
function _drawMySongs() {
  let songs = store.State.mySongs;
  let template = "";
  songs.forEach(s => {
    template += s.previewTemplate;
  });
  document.getElementById("my-songs").innerHTML = template;
}
function _drawActive() {
  if (!store.State.activeSong) {
    document.getElementById("active-song").innerHTML = "";
    return;
  }

  document.getElementById("active-song").innerHTML =
    store.State.activeSong.activeTemplate;
  document.querySelector("audio").play();
}

//Public
export default class MusicController {
  constructor() {
    store.subscribe("songs", _drawResults);
    store.subscribe("activeSong", _drawActive);
    store.subscribe("mySongs", _drawMySongs);
    MusicService.getApiMusic();
  }
  getMusicByQuery(event) {
    event.preventDefault();
    let formData = event.target;
    MusicService.getMusicByQuery(formData.query.value);

    formData.reset();
  }
  setActive(id) {
    MusicService.setActive(id); //not my problem
  }

  addSong() {
    MusicService.addToPlaylist();
  }

  removeSong() {
    MusicService.removeSong();
  }
}
