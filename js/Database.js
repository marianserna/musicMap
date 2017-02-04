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
  }

  signin() {
    firebase.auth().signInWithRedirect(this.provider);
  }

  handleSignin() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const container = document.getElementById('container');
        const auth = document.getElementById('auth');
        container.style.display = 'flex';
        auth.style.display = 'none';
        window.map.handleWindowResize();
      } else {
        // No user is signed in.
      }
    });
  }
}
