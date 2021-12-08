import AccessToken from './AccessToken';

const authHeaders = async () => {
  let access_token = await AccessToken.get();
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + access_token,
  };
};

export const makeRequest = async (
  url,
  data,
  method = 'POST',
  headers = false,
) => {
  if (!headers) {
    headers = await authHeaders();
  }
  let routeData = {
    method: method,
    headers: headers,
  };
  if (method == 'POST') {
    routeData['body'] = JSON.stringify(data);
  }
  try {
    let response = await fetch(url, routeData);
    let responseJson = await response.json();
    if (response.status >= 200 && response.status < 300) {
      return responseJson;
    }
    throw responseJson;
  } catch (err) {
    throw err;
  }
};
