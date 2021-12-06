import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {useAuth} from 'src/contexts/AuthContext';
import {Loading} from '../components/Loading';
import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {GuestStack} from './GuestStack';

export const Router = () => {
  const {authData, loading, isFirstTime} = useAuth();

  if (loading) {
    return <Loading />;
  }

  const loadRoutes = () => {
    console.log('isFirstTime', isFirstTime);
    if (isFirstTime) {
      return <GuestStack />;
    }

    if (!authData) {
      return <AuthStack />;
    }

    return <AppStack />;
  };

  return <NavigationContainer>{loadRoutes()}</NavigationContainer>;
};
