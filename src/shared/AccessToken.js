import AsyncStorage from '@react-native-async-storage/async-storage';

class AccessToken {
  async get() {
    return this._accessToken ? this._accessToken : await this.fetchFromLocal();
  }

  async fetchFromLocal() {
    this._accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
    return this._accessToken;
  }

  async set(token) {
    this._accessToken = token;
    try {
      await AsyncStorage.setItem('ACCESS_TOKEN', token);
    } catch (err) {}
    return this._accessToken;
  }

  async clear() {
    this._accessToken = null;
    await AsyncStorage.removeItem('ACCESS_TOKEN');
  }
}

export default new AccessToken();
