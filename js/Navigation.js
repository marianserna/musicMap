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
        this.scrollTo(mapContainer);
        search.style.display = 'block';
        document.getElementById('playlist').classList.remove('full-width');
      });
      document.querySelector('.nav-name').addEventListener('click', (e) => {
        e.preventDefault();
        this.removeActive();
        document.querySelector('.nav-name').classList.add('active');
        this.hideSearchResults();
        const nameSearch = document.getElementById('name-search');
        nameSearch.style.display =  'block';
        this.scrollTo(this.mainContainer);
        search.style.display = 'block';
        document.getElementById('playlist').classList.remove('full-width');
      });
      document.querySelector('.nav-genre').addEventListener('click', (e) => {
        e.preventDefault();
        this.removeActive();
        document.querySelector('.nav-genre').classList.add('active');
        this.hideSearchResults();
        const chartSearch = document.getElementById('chart-search');
        chartSearch.style.display = 'block';
        this.scrollTo(this.mainContainer);
        search.style.display = 'block';
        document.getElementById('playlist').classList.remove('full-width');
      });
      document.querySelector('.nav-playlist').addEventListener('click', (e) => {
        e.preventDefault();
        this.removeActive();
        document.querySelector('.nav-playlist').classList.add('active');
        // hide map
        mapContainer.style.display = 'none';
        // hide #search container
        search.style.display = 'none';
        // find #playlist and add 'full-width' class to it
        document.getElementById('playlist').classList.add('full-width');
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

  slideToMapResults() {
    this.hideSearchResults();
    this.scrollTo(this.mainContainer);
    document.getElementById('map-search').style.display = 'block';
  }

  scrollTo(element) {
    TweenMax.to(document.body, 0.5, {
      scrollTop: element.offsetTop,
      delay: 0.5
    });
    TweenMax.to(document.querySelector('html'), 0.5, {
      scrollTop: element.offsetTop,
      delay: 0.5
    });
  }
}
