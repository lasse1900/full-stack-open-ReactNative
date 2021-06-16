import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const token = await AsyncStorage.getItem(`${this.namespace}:token`).then(token);
    // console.log('------> authStorage - token:', token);
    return token;
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(`${this.namespace}:token`, accessToken).then(accessToken);
    // console.log('------> authStorage - setToken:', accessToken);
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:token`);
    // console.log('------> authStorage - removeToken:');
  }
}

export default AuthStorage;