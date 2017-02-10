class Search {
  constructor(sound) {
    this.sound = sound;
    this.handleNameSearch();
    this.handleChartSearch();
  }

  displayCountryTracks(tracks) {
    const search = document.getElementById('map-search-results');
    search.innerHTML = '';

    if (tracks) {
      Object.values(tracks).forEach((track) => {
        search.appendChild(this.buildTrack(track));
      });
    } else {
      search.innerHTML = 'Oopsies! No tracks have been added to this country yet...'
    }
  }

  handleNameSearch() {
    let nameSearch = document.getElementById('name-search-form');
    let input = document.getElementById('name-search-input');

    nameSearch.addEventListener('submit', (e) => {
      e.preventDefault();
      this.searchByTerm(input.value);
    }, false);
  }

  handleChartSearch() {
    const nameSearch = document.getElementById('chart-search-form');
    const input = document.getElementById('chart-search-input');

    nameSearch.addEventListener('submit', (e) => {
      e.preventDefault();
      this.searchChart(input.value);
    }, false);
  }

  searchChart(genre) {
    const search = document.getElementById('chart-search-results');
    const spinner = '<img src="video/preloader.gif" id="spinner" alt="preloader">';
    const url = `https://soundcloud-marian.herokuapp.com/charts/${genre}`;
    search.innerHTML = spinner;

    fetch(url).then((response) => {
      return response.json();
    }).then((tracks) => {
      search.innerHTML = '';
      tracks.forEach((track) => {
        search.appendChild(this.buildTrack(track));
      });
    });
  }

  searchByTerm(term) {
    SC.get('/tracks', {
      q: term, license: 'cc-by-sa'
    }).then((tracks) => {
      const search = document.getElementById('name-search-results');
      search.innerHTML = '';
      tracks.forEach((track) => {
        search.appendChild(this.buildTrack(track));
      });
    });
  }

  buildTrack(track) {
    const trackContainer = document.createElement('div');
    trackContainer.classList.add('track');
    trackContainer.setAttribute('draggable', true);
    trackContainer.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('track', JSON.stringify(track));
    });

    const trackImage = document.createElement('img');
    trackImage.setAttribute('src', track.artwork_url || 'http://lorempixel.com/100/100/');
    trackContainer.appendChild(trackImage);

    const trackTitle = document.createElement('span');
    trackTitle.textContent = track.title.substring(0, 50);
    trackContainer.appendChild(trackTitle);

    const playButton = document.createElement('i');
    playButton.classList.add('fa', 'fa-play-circle-o', 'fa-2x');
    playButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.sound.play(track.permalink_url);
    })
    trackContainer.appendChild(playButton);

    const addButton = document.createElement('i');
    addButton.classList.add('fa', 'fa-plus-circle', 'fa-2x');
    addButton.addEventListener('click', (e) => {
      e.preventDefault();
      database.saveTrack(track);
    })
    trackContainer.appendChild(addButton);


    return trackContainer;
  }
}
