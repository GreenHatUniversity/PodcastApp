import Global from '../../Global';
import Api, {header} from './Api';

export default class MirrorApi extends Api {
  static async mirrorsApi() {
    try {
      let response = await fetch(
        this.pathJoin(Global.apiDomain, '/config/app.json'),
        {
          method: 'GET',
          headers: header,
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
      let response = await fetch(
        this.pathJoin(point.url, '/config/point.json'),
        {
          method: 'GET',
          headers: header,
        },
      );
      point.info = eval(`Object(${await response.text()})`);
      return point.info;
    } catch (error) {
      console.error(error);
    }
  }
}
