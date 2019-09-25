const Global = {
  apiDomain:
    'https://raw.githubusercontent.com/GreenHatUniversity/Database/master/',
  themeColor: '#4DCCD5',
  app: {},
  users: {},
  mirrors: {},
  pathJoin: (...paths) => {
    const sep = '/';
    const replace = new RegExp(sep + '{1,}', 'g');
    return paths.join(sep).replace(replace, sep);
  },
  imagePath: (url, userPath = '') => {
    if (/^(https|http):/.test(url)) {
      return url;
    } else {
      return Global.pathJoin(
        Global.apiDomain,
        userPath.length ? `posts/${userPath}` : 'resources',
        'image',
        url,
      );
    }
  },
};

export default Global;
