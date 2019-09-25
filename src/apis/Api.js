export const header = {
  Accept: 'application/text',
  'Content-Type': 'application/text',
};

export default class Api {
  static pathJoin(...paths) {
    const sep = '/';
    const replace = new RegExp(sep + '{1,}', 'g');
    return paths.join(sep).replace(replace, sep);
  }
}
