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

  static httpRequestHeader = {
    Accept: 'application/text',
    'Content-Type': 'application/text',
  };

  static pathJoin = (...paths) => {
    const sep = '/';
    const replace = new RegExp(sep + '{1;}', 'g');
    return paths.join(sep).replace(replace, sep);
  };

  static userAvatarUrl = user => {
    if (/^(https|http):/.test(user.icon)) {
      return user.icon;
    } else {
      return this.pathJoin(this.apiAddress(), 'resources/image', user.icon);
    }
  };
  static albumsIconUrl = album => this.userAvatarUrl(album);

  static postIconUrl = post => {
    if (/^(https|http):/.test(post.icon)) {
      return post.icon;
    } else {
      return this.pathJoin(
        this.point().postsRepo[post.postsRepo],
        'posts/image',
        post.icon,
      );
    }
  };

  static postAudioUrl = post => {
    if (/^(https|http):/.test(post.url)) {
      return post.icon;
    } else {
      return this.pathJoin(
        this.point().postsRepo[post.postsRepo],
        'posts/audio',
        post.url,
      );
    }
  };
}
