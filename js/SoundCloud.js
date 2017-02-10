class SoundCloud {
  constructor() {
    SC.initialize({
      client_id: 'QkOuXLUgMp9Isa6jMqsp0hIgv0NY3BZb'
    });
  }

  play(track_url, play_all = false) {
    const options = {
      auto_play: true,
      liking: false,
      sharing: false,
      download: false,
      show_comments: false,
      show_user: false,
      show_artwork: false,
      show_playcount: false,
      maxheight: 125
    };

    if (this.widget) {
      this.widget.load(track_url, options);
    } else {

      SC.oEmbed(track_url, options).then((oEmbed) => {
        document.getElementById('player').innerHTML = oEmbed.html;
        this.widget = SC.Widget(document.querySelector('#player > iframe'));

        this.widget.bind(SC.Widget.Events.FINISH, (e) => {
          playlist.playNext();
        });
      });
    }
  }

  pause() {
    if (this.widget) {
      this.widget.pause();
    }
  }
}
