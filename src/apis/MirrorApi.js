import Global from '../../Global';

export default class MirrorApi {
  static async mirrorsApi() {
    try {
      let response = await fetch(
        Global.pathJoin(Global.apiAddress(), 'mirrors.json'),
        {
          method: 'GET',
          headers: Global.httpRequestHeader,
        },
      );
      Global.mirrors = eval(`Object(${await response.text()})`);
      return Global.mirrors;
    } catch (error) {
      console.error(error);
    }
  }

  static async pointApi(point) {
    try {
      let response = await fetch(Global.pathJoin(point.url, 'point.json'), {
        method: 'GET',
        headers: Global.httpRequestHeader,
      });
      point.info = eval(`Object(${await response.text()})`);
      return point.info;
    } catch (error) {
      console.error(error);
    }
  }
}
