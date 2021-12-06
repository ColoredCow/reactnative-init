import {API_BASE_URL} from 'src/shared/constants';

class API {
  constructor() {
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  async makeRequest(url, data, method = 'POST', headers = this.headers) {
    let response = await fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(data),
    });
    let responseJson = await response.json();
    if (response.status >= 200 && response.status < 300) {
      return responseJson;
    }
    throw responseJson;
  }

  signIn(userData) {
    let url = API_BASE_URL + '/login';
    return new Promise(async (next, error) => {
      try {
        let responseJson = await this.makeRequest(url, userData);
        next(responseJson);
      } catch (err) {
        setTimeout(() => alert(err.error), 500);
        error(err.error);
      }
    });
  }
}

export default new API();
