export default class Global {
  static apiAddress =
    'https://raw.githubusercontent.com/GreenHatUniversity/Database/master/';
  static themeColor = '#4DCCD5';
  static app = null;
  static users = null;
  static mirrors = null;

  static _point = null;
  static point = () => Global._point || Global.app;
  static setPoint = point => (Global._point = point);

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
      return this.pathJoin(this.apiAddress, 'resources/image', user.icon);
    }
  };
  static albumsIconUrl = album => this.userAvatarUrl(album);

  static postsIconUrl = post => {
    if (/^(https|http):/.test(post.icon)) {
      return post.icon;
    } else {
      return Global.pathJoin(
        Global.point().postsRepo[post.postsRepo],
        'posts/image',
        post.icon,
      );
    }
  };

  static postsAudioUrl = post => {
    if (/^(https|http):/.test(post.icon)) {
      return post.icon;
    } else {
      return Global.pathJoin(
        Global.point().postsRepo[post.postsRepo],
        'posts/audio',
        post.icon,
      );
    }
  };
}
