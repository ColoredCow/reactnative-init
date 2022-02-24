import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthApi from 'src/apis/AuthApi';
import AccessToken from 'src/shared/AccessToken';
import AuthUser from 'src/shared/AuthUser';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext({});

const AuthProvider = ({children}) => {
  const [authToken, setAuthToken] = useState();
  const [authData, setAuthData] = useState();
  const [isFirstTime, setIsFirstTime] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isFirstTimeApp();
    loadAuthDataFromStorage();
  }, []);

  async function firstTimeAppCompleted() {
    AsyncStorage.setItem('isFirstTimeApp', 'false');
    setIsFirstTime(false);
  }

  async function isFirstTimeApp() {
    AsyncStorage.getItem('isFirstTimeApp').then(value => {
      if (typeof value === 'string') {
        setIsFirstTime(false);
        return true;
      } else {
        setIsFirstTime(true);
        return false;
      }
    });
  }

  async function loadAuthDataFromStorage() {
    try {
      const authToken = await AccessToken.get();

      if (authToken) {
        const _authToken = authToken;
        const authData = await AuthUser.get();
        setAuthToken(_authToken);
        setAuthData(authData);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const signIn = async userData => {
    try {
      const _authData = await AuthApi.signIn(userData);
      const authToken = _authData.access_token;
      AccessToken.set(authToken);
      AuthUser.set(_authData.user);
      setAuthToken(authToken);
      setAuthData(_authData.user);
    } catch (error) {
      console.log(error);
    }
  };

  const appleSignIn = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const {identityToken} = appleAuthRequestResponse;

      let appleUserData = jwt_decode(identityToken);

      if (!appleUserData['email']) {
        Alert.alert(
          'Something is not right with apple account! Not able to access email',
        );
        return false;
      }

      const _authData = await AuthApi.loginViaExternalProvider({
        apple_user: {user: appleUserData},
        domain: 'apple',
      });

      await setupAuthData(_authData);
    } catch (error) {
      if (
        ![appleAuth.Error.UNKNOWN, appleAuth.Error.CANCELED].includes(
          error.code,
        )
      ) {
        Alert.alert('An error occurred while continuing with Apple.');
      }
    }
  };

  const signOut = async () => {
    await AccessToken.clear();
    await AuthUser.clear();

    setAuthToken(undefined);
    setAuthData(undefined);

    // We can enable this for Testing so that we can test the splash
    // and onboarding flow
    // production version
    // await AsyncStorage.removeItem('isFirstTimeApp');
    // setIsFirstTime(true);
  };

  return (
    <AuthContext.Provider
      value={{
        authData,
        loading,
        signIn,
        appleSignIn,
        signOut,
        isFirstTime,
        firstTimeAppCompleted,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

//A simple hooks to facilitate the access to the AuthContext
function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export {AuthContext, AuthProvider, useAuth};
