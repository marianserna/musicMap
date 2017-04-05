class Recent {
  constructor(user, track) {
    this.user = user;
    this.track = track;
  }

  render() {
    // build element to show recent
    this.recentContainer = this.buildRecentContainer();
    document.body.appendChild(this.recentContainer);
    // fade element in w GSAP

    TweenMax.to(this.recentContainer, 0.5, {
      opacity: 1,
      ease: Power1.easeInOut
    });
    // after 2 secs, fade element out
    TweenMax.to(this.recentContainer, 0.5, {
      opacity: 0,
      ease: Power1.easeOut,
      delay: 4,
      onComplete: () => {
        this.recentContainer.remove();
      }
    });
  }

  buildRecentContainer() {
    const recentContainer = document.createElement('div');
    recentContainer.classList.add('recent');
    const recentP = document.createElement('p');
    recentP.innerHTML = `${this.user.name} from ${this.user.country || 'a far away land'} has added ${this.track.title}`;
    recentContainer.appendChild(recentP);
    return recentContainer;
  }
}
