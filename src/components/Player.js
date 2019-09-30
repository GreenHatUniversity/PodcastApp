import Sound from 'react-native-sound';

export default class Player {
  static EventTime = 'EventTime';
  static EventState = 'EventState';

  static PlayPlaying = 'PlayPlaying';
  static PlayPaused = 'PlayPaused';
  static PlayHandOff = 'PlayHandOff';
  static PlayEnd = 'PlayEnd';
  static PlayError = 'PlayError';

  state = Player.PlayPaused;
  time = 0;
  duration = 0;
  _eventList = {};
  /** @type Sound */
  _sound = null;
  _timeout = setInterval(() => {
    if (this._sound && this._sound.isLoaded()) {
      this._sound.getCurrentTime((seconds, isPlaying) => {
        this.time = seconds;
        this.emitTimeEvent();
      });
    }
  }, 200);

  constructor() {
    Sound.setCategory('Playback', true);
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

  removeA(arr, ...a) {
    let what,
      L = a.length,
      ax;
    while (L > 0 && arr.length) {
      what = a[--L];
      while ((ax = arr.indexOf(what)) !== -1) {
        arr.splice(ax, 1);
      }
    }
    return arr;
  }

  removeEventListener(name, cb) {
    if (this._eventList.hasOwnProperty(name)) {
      this.removeA(this._eventList[name], cb);
    }
  }

  addEventListener(name, cb) {
    if (this._eventList.hasOwnProperty(name)) {
      this._eventList[name].push(cb);
    } else {
      this._eventList[name] = [cb];
    }
  }

  emitTimeEvent() {
    if (this._eventList.hasOwnProperty(Player.EventTime)) {
      for (let i = 0; i < this._eventList[Player.EventTime].length; i++) {
        const cb = this._eventList[Player.EventTime][i];
        try {
          cb(this.time);
        } catch (e) {
          console.log(e);
        }
      }
    }
  }

  emitStateEvent() {
    if (this._eventList.hasOwnProperty(Player.EventState)) {
      for (let i = 0; i < this._eventList[Player.EventState].length; i++) {
        const cb = this._eventList[Player.EventState][i];
        try {
          cb(this.state);
        } catch (e) {
          console.log(e);
        }
      }
    }
  }

  async play(filepath, cb) {
    if (this._sound) {
      this._sound.release();
    }
    this._sound = new Sound(filepath, '', error => {
      if (error) {
        this.state = Player.PlayError;
      } else {
        this.state = Player.PlayPlaying;
        this.duration = this._sound.getDuration();
        this._sound.play(this.playComplete);
      }
      this.emitStateEvent();
      cb(error);
    });
  }

  playComplete = success => {
    if (this._sound) {
      if (success) {
        this.state = Player.PlayEnd;
      } else {
        this.state = Player.PlayHandOff;
      }
      this.time = 0;
      this._sound.setCurrentTime(0);
      this.emitStateEvent();
    }
  };

  pause() {
    if (this._sound) {
      if (this.state === Player.PlayPlaying) {
        this._sound.pause();
        this.state = Player.PlayPaused;
      } else {
        this._sound.play(this.playComplete);
        this.state = Player.PlayPlaying;
      }
    }
    this.emitStateEvent();
  }

  jumpToTime(time) {
    this._sound.setCurrentTime(time);
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
        this.time = nextSecs;
      });
    }
  };
  jumpPrev15Seconds = () => this.jumpSeconds(-15);
  jumpNext15Seconds = () => this.jumpSeconds(15);
}
