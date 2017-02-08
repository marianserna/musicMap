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

  handleSignin() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;
      if (user) {
        const container = document.getElementById('container');
        const auth = document.getElementById('auth');
        container.style.display = 'flex';
        auth.style.display = 'none';
        window.map.handleWindowResize();
        this.listenForNew();
      } else {
        // No user is signed in.
      }
    });
  }

  saveTrack(track) {
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
    this.database.ref(`users/${this.user.uid}`).on('value', (snapshot) => {
      playlist.displayTracks(snapshot.val());
    });

    this.database.ref('recent').on('value', (snapshot) => {
      const data = snapshot.val();
      const recent = new Recent(data.user, data.track);
      recent.render();
    });
  }

  setCountry(lat, lon) {
    const url = `http://ws.geonames.org/countryCodeJSON?lat=${lat}&lng=${lon}&username=demo`;
    fetch(url).then((response) => {
      return response.json();
    }).then((json) => {
      this.userCountry = json.countryName.replace(/ /g, '').toLowerCase();
      this.userCountryCode = json.countryCode;
      this.userFullCountry = json.countryName;
    });
  }

  searchCountry(countryName) {
    countryName = countryName.replace(/ /g, '').toLowerCase();
    this.database.ref(`countries/${countryName}`).once('value').then((snapshot) => {
      const tracks = snapshot.val();
      search.displayCountryTracks(tracks);
    });
  }
}
