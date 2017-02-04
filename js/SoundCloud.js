class SoundCloud {
  constructor() {
    SC.initialize({
      client_id: 'QkOuXLUgMp9Isa6jMqsp0hIgv0NY3BZb'
    });

    this.handleSearch();
  }

  handleSearch() {
    let nameSearch = document.getElementById('name-search-form');
    let input = document.getElementById('name-search-input');

    nameSearch.addEventListener('submit', (e) => {
      e.preventDefault();
      this.search(input.value);
    }, false);
  }

  search(term) {
    SC.get('/tracks', {
      q: term, license: 'cc-by-sa'
    }).then((tracks) => {
      const search = document.getElementById('name-search-results');
      search.innerHTML = '';
      tracks.forEach((track) => {
        // console.log(track);
        const trackContainer = document.createElement('div');
        trackContainer.classList.add('track');
        trackContainer.innerHTML = `<h3>${track.title}</h3>`;
        search.appendChild(trackContainer);
      });
    });
  }
}
