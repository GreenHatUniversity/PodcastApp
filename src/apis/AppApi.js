import Global from '../../Global';
import Api, {header} from './Api';

export default class AppApi extends Api {
  static async appApi() {
    try {
      let response = await fetch(
        this.pathJoin(Global.apiDomain, 'config/app.json'),
        {
          method: 'GET',
          headers: header,
        },
      );
      Global.app = eval(`Object(${await response.text()})`);
      return Global.app;
    } catch (error) {
      console.error(error);
    }
  }

  static async usersApi() {
    try {
      let response = await fetch(
        this.pathJoin(Global.apiDomain, 'config/users.json'),
        {
          method: 'GET',
          headers: header,
        },
      );
      Global.users = eval(`Object(${await response.text()})`);
      return Global.users;
    } catch (error) {
      console.error(error);
    }
  }

  static async postsApi(user) {
    try {
      let response = await fetch(
        this.pathJoin(Global.apiDomain, `config/users/${user.path}.json`),
        {
          method: 'GET',
          headers: header,
        },
      );
      user.posts = eval(`Object(${await response.text()})`);
      return user.posts;
    } catch (error) {
      console.error(error);
    }
  }
}
