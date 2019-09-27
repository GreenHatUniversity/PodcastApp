import Global from '../../Global';

export default class AppApi {
  static async appApi() {
    try {
      let response = await fetch(
        Global.pathJoin(Global.apiAddress, 'app.json'),
        {
          method: 'GET',
          headers: Global.httpRequestHeader,
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
        Global.pathJoin(Global.apiAddress, 'users.json'),
        {
          method: 'GET',
          headers: Global.httpRequestHeader,
        },
      );
      Global.users = eval(`Object(${await response.text()})`);
      return Global.users;
    } catch (error) {
      console.error(error);
    }
  }

  static async albumsApi(user) {
    try {
      let response = await fetch(
        Global.pathJoin(Global.apiAddress, `albums/${user.userId}.json`),
        {
          method: 'GET',
          headers: Global.httpRequestHeader,
        },
      );
      user.albums = eval(`Object(${await response.text()})`);
      return user.albums;
    } catch (error) {
      console.error(error);
    }
  }

  static async postsApi(user) {
    try {
      let response = await fetch(
        Global.pathJoin(Global.apiAddress, `posts/${user.userId}.json`),
        {
          method: 'GET',
          headers: Global.httpRequestHeader,
        },
      );
      user.posts = eval(`Object(${await response.text()})`);
      return user.posts;
    } catch (error) {
      console.error(error);
    }
  }
}
