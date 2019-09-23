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
      Global.mirrors = await response.json();
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
      point.remoteInfo = await response.json();
      return point.remoteInfo;
    } catch (error) {
      console.error(error);
    }
  }
}
