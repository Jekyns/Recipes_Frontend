import cookie from 'react-cookies';
import { user } from '../actionTypes';
import Helpers from '../../api/hs';

export function setUser(profile) {
  return {
    type: user.SET_USER,
    user: profile,
  };
}
export function deleteUser(profile) {
  return {
    type: user.DELETE_USER,
    user: profile,
  };
}

export const authorizeCheck = () => {
  return async (dispatch) => {
    try {
      const user = await Helpers.axiosRequest('/users/profile', 'GET', '', { token: cookie.load('token') });
      dispatch(setUser(user.data.msg));
    } catch (error) {
      console.log('Ошибка при авторизации');
    }
  };
};
