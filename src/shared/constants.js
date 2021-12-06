import DevEnv from 'src/env/debug';
import ProdEnv from 'src/env/release';

const getEnv = () => {
  return __DEV__ ? DevEnv : ProdEnv;
};

export const API_BASE_URL = getEnv().API_BASE_URL;
export const APP_NAME = getEnv().APP_NAME;
export const APP_VERSION = getEnv().APP_VERSION;
