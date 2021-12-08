'use strict';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthUser {
  async get() {
    return this._user ? this._user : await this.fetchFromLocal();
  }

  async fetchFromLocal() {
    this._user = await AsyncStorage.getItem('AUTH_USER');
    if (typeof this._user == 'string') {
      this._user = JSON.parse(this._user);
    }
    return this._user;
  }

  async set(user) {
    this._user = user;
    AsyncStorage.setItem('AUTH_USER', JSON.stringify(user));
    return this._user;
  }

  async clear() {
    this._user = null;
    await AsyncStorage.removeItem('AUTH_USER');
  }

  can(permission) {
    if (this._user) {
      let userPermissions = this._user.permissions;
      return userPermissions && userPermissions.includes(permission);
    }
  }
}

export default new AuthUser();
