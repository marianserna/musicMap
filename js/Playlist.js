class Playlist {
  constructor() {
    this.playdrop = document.getElementById('playdrop');
    this.setUpDrop();
    this.setUpPlayAll();
  }

  setUpDrop() {
    this.playdrop.addEventListener('drop', (e) => {
      const track = JSON.parse(e.dataTransfer.getData('track'));
      database.saveTrack(track);
    });
    this.playdrop.addEventListener('dragover', (e) => {
      e.preventDefault();
      // console.log(e);
    });
  }

  displayTracks(tracks) {
    this.tracks = Object.values(tracks);
    this.playdrop.innerHTML = '';

    this.tracks.forEach((track) => {
      const trackContainer = document.createElement('div');
      trackContainer.classList.add('track');

      const trackImage = document.createElement('img');
      trackImage.setAttribute('src', track.artwork_url || 'http://lorempixel.com/100/100/');
      trackContainer.appendChild(trackImage);

      const trackTitle = document.createElement('span');
      trackTitle.textContent = track.title;
      trackContainer.appendChild(trackTitle);

      const playButton = document.createElement('i');
      playButton.classList.add('fa', 'fa-play-circle-o', 'fa-2x');
      playButton.addEventListener('click', (e) => {
        e.preventDefault();
        sound.play(track.permalink_url);
      })
      trackContainer.appendChild(playButton);

      const removeTrack = document.createElement('i');
      removeTrack.classList.add('fa', 'fa-trash', 'fa-2x');
      removeTrack.addEventListener('click', (e) => {
        e.preventDefault();
        database.deleteTrack(track);
      })
      trackContainer.appendChild(removeTrack);

      this.playdrop.appendChild(trackContainer);
    });
  }

  setUpPlayAll() {
    document.getElementById('play-all').addEventListener('click', (e) => {
      e.preventDefault();
      if (this.tracks) {
        this.current_index = 0;
        sound.play(this.tracks[this.current_index].permalink_url, true);
      }
    });
  }

  playNext() {
    if (this.current_index >= 0 && this.current_index < this.tracks.length - 1) {
      this.current_index++;
      sound.play(this.tracks[this.current_index].permalink_url, true);
    }
  }

}
