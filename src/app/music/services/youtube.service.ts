import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  player: YT.Player;
  id: string;
  setup(url: string) {
    this.id = this.urlParser(url);
    // console.log(this.id);
  }

  private urlParser(url: string) {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      // console.log(match);
      return match[2];
    } else {
      return 'L3HmPZgJ5';
    }
  }
  savePlayer(player) {
    this.player = player;
    // console.log('player instance', player);
  }
  onStateChange(event) {
    // console.log('player state', event.data);
  }
  playVideo() {
    this.player.playVideo();
  }

  pauseVideo() {
    this.player.pauseVideo();
  }
}
