import MusicController from "./Controllers/MusicController.js";

class App {
  musicController = new MusicController();
}

window["app"] = new App();
