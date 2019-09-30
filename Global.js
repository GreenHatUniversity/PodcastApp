import Player from './src/components/Player';
const urljoin = require('url-join');

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
  static player = new Player();

  static httpRequestHeader = {
    Accept: 'application/text',
    'Content-Type': 'application/text',
  };

  static pathJoin = (...paths) => {
    const url = urljoin(...paths);
    return url;
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
        user.userId,
        'image',
        post.icon,
      );
    }
  };

  static postAudioUrl = (user, post) => {
    if (/^(https|http):/.test(post.url)) {
      return post.url;
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
