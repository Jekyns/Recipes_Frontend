import axios from 'axios';
import config from '../config';

const Helpers = {
  // Main wrapper for Fetch API
  httpRequest: (url, method, payload, headers) => {
    // Configuration to accept json as a default
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // method = post and payload, add it to the fetch request
    if (method.toLowerCase() === 'post' && payload && payload.length > 0) {
      config.body = JSON.stringify(payload);
    }
    // if custom headers need to be set for the specific request
    // override them here
    if (headers && typeof headers === 'object' && Object.keys(headers).length > 0) {
      config.headers = headers;
    }
    return fetch(
      url,
      config,
    ).then((response) => {
      // Check if the request is 200
      if (response.ok) {
        return response.json();
      }
      if (response.status === 401) {
        return response.json();
      }
      throw new Error('Network response was not ok');
    })
      .then((json) => {
        return json;
      });
  },
  axiosRequest: async (url, method, payload, headers) => {
    try {
      const res = await axios({
        ...payload,
        url: `${config.apiUrl}${url}`,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });

      return res;
    } catch (err) {
      if (err.response && err.response.status) {
        const status = err.response.status;
        if (status === 418) {
          // console.log('НЕТ ДОСТУПА!!!');
          window.location.replace('/home');
        }
        if (status === 406) {
          // console.log('ПАРШИВЫЙ ТОКЕН!!!');
          document.cookie = `token=; path=/; domain=${config.domain};`;

          window.location.replace('/home');
        }
      }

      throw err;
    }
  },
};

export default Helpers;


// // / 406 - нет пользователя в БД или сломанный токен
// // / 418 - ошибка доступа

// export default axiosWrapper;