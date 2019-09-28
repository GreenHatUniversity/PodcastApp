import Sound from 'react-native-sound';

export class Player {
  playState = 'paused'; //playing, paused
  playTime = 0;
  duration = 0;
  _currentTimeCallback = null;
  _currentStateCallback = null;
  /** @type Sound */
  _sound = null;
  _sliderEditing = false;
  _timeout = setInterval(() => {
    if (
      this._sound &&
      this._sound.isLoaded() &&
      this.playState === 'playing' &&
      !this._sliderEditing
    ) {
      this._sound.getCurrentTime((seconds, isPlaying) => {
        this.playTime = seconds;
        if (this._currentTimeCallback) {
          this._currentTimeCallback(seconds);
        }
      });
    }
  }, 100);

  constructor(currentStateCallback, currentTimeCallback) {
    Sound.setCategory('Playback', true);
    this._currentTimeCallback = currentTimeCallback;
    this._currentStateCallback = currentStateCallback;
  }

  desctructor() {
    if (this._sound) {
      this._sound.release();
      this._sound = null;
    }
    if (this._timeout) {
      clearInterval(this._timeout);
    }
  }

  async play(filepath) {
    filepath = encodeURI(filepath);
    if (this._sound) {
      this._sound.release();
      this.playState = 'paused';
      if (this._currentStateCallback) {
        this._currentStateCallback(this.playState);
      }
    }
    this._sound = new Sound(filepath, '', error => {
      if (error) {
        this.playState = 'paused';
      } else {
        this.playState = 'playing';
        this.duration = this._sound.getDuration();
        this._sound.play(this.playComplete);
      }
      if (this._currentStateCallback) {
        this._currentStateCallback(this.playState);
      }
    });
  }

  playComplete = success => {
    if (this._sound) {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
      this.playState = 'paused';
      this.playTime = 0;
      this._sound.setCurrentTime(0);
      if (this._currentStateCallback) {
        this._currentStateCallback(this.playState);
      }
    }
  };

  pause() {
    if (this._sound) {
      this._sound.pause();
    }
    this.playState = 'paused';
    if (this._currentStateCallback) {
      this._currentStateCallback(this.playState);
    }
  }

  jumpSeconds = secsDelta => {
    if (this._sound) {
      this._sound.getCurrentTime((secs, isPlaying) => {
        let nextSecs = secs + secsDelta;
        if (nextSecs < 0) {
          nextSecs = 0;
        } else if (nextSecs > this.duration) {
          nextSecs = this.duration;
        }
        this._sound.setCurrentTime(nextSecs);
        this.playTime = nextSecs;
      });
    }
  };
  jumpPrev15Seconds = () => this.jumpSeconds(-15);
  jumpNext15Seconds = () => this.jumpSeconds(15);
}

export default class Global {
  static apiAddress = () =>
    this.point()
      ? this.point().apiRepo
      : 'https://raw.githubusercontent.com/GreenHatUniversity/Database/master/';

  static themeColor = '#4DCCD5';
  static app = null;
  static users = null;
  static mirrors = null;

  static _point = null;
  static point = () => this._point || this.app;
  static setPoint = point => (this._point = point);

  /** @type Player */
  static player = null;

  static httpRequestHeader = {
    Accept: 'application/text',
    'Content-Type': 'application/text',
  };

  static pathJoin = (...paths) => {
    const sep = '/';
    const replace = new RegExp(sep + '{1,}', 'g');
    return paths.join(sep).replace(replace, sep);
  };

  static audioTimeString(seconds) {
    const m = parseInt(seconds / 60);
    const s = parseInt(seconds % 60);

    return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
  }

  static userAvatarUrl = user => {
    if (/^(https|http):/.test(user.icon)) {
      return user.icon;
    } else {
      return this.pathJoin(this.apiAddress(), 'resources/image', user.icon);
    }
  };
  static albumsIconUrl = album => this.userAvatarUrl(album);

  static postIconUrl = (user, post) => {
    if (/^(https|http):/.test(post.icon)) {
      return post.icon;
    } else {
      return this.pathJoin(
        this.point().postsRepo[post.postsRepo],
        'image',
        post.icon,
      );
    }
  };

  static postAudioUrl = (user, post) => {
    if (/^(https|http):/.test(post.url)) {
      return post.icon;
    } else {
      return this.pathJoin(
        this.point().postsRepo[post.postsRepo],
        user.userId,
        'audio',
        post.url,
      );
    }
  };
}
