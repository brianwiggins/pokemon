export default class Song {
  constructor(data) {
    this.sandbox = data.trackId ? false : true;
    this.artist = data.artist || data.artistName;
    this.album = data.album || data.collectionName;
    this.title = data.title || data.trackName;
    this.preview = data.preview || data.previewUrl;
    this.price = data.price || data.trackPrice;
    this.id = data._id || data.trackId;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.albumArtSmall = this.albumArt.replace(/300x300/g, "90x90");
    this.albumArtLarge = this.albumArt.replace(/300x300/g, "500x500");
  }

  get previewTemplate() {
    return `
    <div class="col-12">
    <div class="media" onclick="app.musicController.setActive('${this.id}')">
    <img src="${this.albumArtSmall}" class="mr-3" alt="...">
    <div class="media-body">
        <h5 class="mt-0">${this.artist} - ${this.title}</h5>
    </div>
    </div>
    </div>
    `;
  }

  get Button() {
    if (this.sandbox) {
      return ` <button class="btn btn-danger" onclick="app.musicController.removeSong()">Remove</button>`;
    }
    return ` <button class="btn btn-success" onclick="app.musicController.addSong()">Add</button>`;
  }

  get activeTemplate() {
    return `
      <div class="card" style="width: 18rem;">
            <img src="${this.albumArtLarge}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${this.title}</h5>
              <p class="card-text">
                ${this.artist} - ${this.album} - $${this.price}
              </p>
                ${this.Button}
              <audio src="${this.preview}" controls></audio>
            </div>
          </div>
      `;
  }
}
