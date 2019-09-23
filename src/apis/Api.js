export const header = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export default class Api {
  static pathJoin(...paths) {
    const sep = '/';
    const replace = new RegExp(sep + '{1,}', 'g');
    return paths.join(sep).replace(replace, sep);
  }
}
