class Navigation {
  constructor() {
    this.mainContainer = document.getElementById('main-container');
    this.setUpNavListeners();
  }

  setUpNavListeners() {
      const search = document.getElementById('search');
      const mapContainer = document.getElementById('map-container');

      document.querySelector('.nav-country').addEventListener('click', (e) => {
        e.preventDefault();
        this.removeActive();
        document.querySelector('.nav-country').classList.add('active');
        mapContainer.style.display = 'block';
        this.slideOut();
        search.style.display = 'block';
        document.getElementById('playlist').classList.remove('full-width');
        document.getElementById('back-to-map').style.display = 'inline';
      });
      document.querySelector('.nav-name').addEventListener('click', (e) => {
        e.preventDefault();
        this.removeActive();
        document.querySelector('.nav-name').classList.add('active');
        this.hideSearchResults();
        const nameSearch = document.getElementById('name-search');
        nameSearch.style.display =  'block';
        this.slideIn();
        search.style.display = 'block';
        document.getElementById('playlist').classList.remove('full-width');
        document.getElementById('back-to-map').style.display = 'none';
      });
      document.querySelector('.nav-genre').addEventListener('click', (e) => {
        e.preventDefault();
        this.removeActive();
        document.querySelector('.nav-genre').classList.add('active');
        this.hideSearchResults();
        const chartSearch = document.getElementById('chart-search');
        chartSearch.style.display = 'block';
        this.slideIn();
        search.style.display = 'block';
        document.getElementById('playlist').classList.remove('full-width');
        document.getElementById('back-to-map').style.display = 'none';
      });
      document.querySelector('.nav-playlist').addEventListener('click', (e) => {
        e.preventDefault();
        this.removeActive();
        document.querySelector('.nav-playlist').classList.add('active');
        // hide map
        mapContainer.style.display = 'none';
        // hide #search container
        search.style.display = 'none';
        this.slideIn();
        // find #playlist and add 'full-width' class to it
        document.getElementById('playlist').classList.add('full-width');
        document.getElementById('back-to-map').style.display = 'none';
      });
  }

  removeActive() {
    document.querySelector('.active').classList.remove('active');
  }

  hideSearchResults() {
    [].slice.call(document.querySelectorAll('#search > div')).forEach((element) => {
      element.style.display = 'none';
    });
  }

  displayMapResults() {
    this.hideSearchResults();
    this.slideIn();
    document.getElementById('map-search').style.display = 'block';
    document.getElementById('back-to-map').style.display = 'inline';
  }

  slideIn() {
    TweenMax.to(this.mainContainer, 0.5, {
      x: '0%',
      ease: Power2.easeInOut
    });
    window.map.pause();
  }

  slideOut() {
    TweenMax.to(this.mainContainer, 0.5, {
      x: '-100%',
      ease: Power2.easeInOut
    });
    window.map.play();
  }
}
