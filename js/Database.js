class Database {
  constructor() {
    const config = {
      apiKey: "AIzaSyDsSnsOz5Ddwv5ZyFNBmh4tUWCOYxVj-1s",
      authDomain: "musicmap-31edd.firebaseapp.com",
      databaseURL: "https://musicmap-31edd.firebaseio.com",
      storageBucket: "musicmap-31edd.appspot.com",
      messagingSenderId: "153331210404"
    };

    firebase.initializeApp(config);

    // Twitter auth from firebase documentation: https://firebase.google.com/docs/auth/web/twitter-login
    this.provider = new firebase.auth.TwitterAuthProvider();

    this.database = firebase.database();

    this.handleSignin();
  }

  signin() {
    firebase.auth().signInWithRedirect(this.provider);
  }

  signout() {
    firebase.auth().signOut();
  }

  handleSignin() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;
      const container = document.getElementById('container');
      const auth = document.getElementById('auth');
      const login = document.getElementById('login-page');
      document.getElementById('loading').style.display = 'none';

      if (user) {
        container.style.display = 'flex';
        auth.style.display = 'none';
        login.style.display = 'none';
        window.map.handleWindowResize();
        this.listenForNew();
      } else {
        container.style.display = 'none';
        auth.style.display = 'block';
        login.style.display = 'block';
      }
    });
  }

  saveTrack(track) {
    track.added_at = Date.now();
    this.database.ref(`users/${this.user.uid}/${track.id}`).set(track);
    if (this.userCountry) {
      this.database.ref(`countries/${this.userCountry}/${track.id}`).set(track);
    }
    this.database.ref('recent').set({
      track: track,
      user: {
        id: this.user.uid,
        name: this.user.displayName,
        country: this.userFullCountry,
        countryCode: this.userCountryCode
      }
    });
  }

  deleteTrack(track) {
    this.database.ref(`users/${this.user.uid}/${track.id}`).remove();
  }

  // When new tracks are added to playlist or to recent
  listenForNew() {
    this.database.ref(`users/${this.user.uid}`).orderByChild('added_at').on('value', (snapshot) => {
      playlist.displayTracks(snapshot.val());
    });

    this.database.ref('recent').on('value', (snapshot) => {
      const data = snapshot.val();
      const recent = new Recent(data.user, data.track);
      recent.render();
    });
  }

  setCountry(lat, lon) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&sensor=true`;
    fetch(url).then((response) => {
      return response.json();
    }).then((json) => {
      const country = json.results[0].address_components.find((addr) => {
        return addr.types.includes('country');
      });
      if (country) {
        this.userCountryCode = country.short_name;
        this.userCountry = country.long_name.replace(/ /g, '').toLowerCase();
        this.userFullCountry = country.long_name;
      }
    });
  }

  searchCountry(countryName) {
    countryName = countryName.replace(/ /g, '').toLowerCase();
    this.database.ref(`countries/${countryName}`).limitToLast(15).once('value').then((snapshot) => {
      const tracks = snapshot.val();
      search.displayCountryTracks(tracks);
    });
  }
}
