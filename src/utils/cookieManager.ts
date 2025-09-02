// utils/cookieManager.ts
import Cookies from 'js-cookie';

export const setCookie = (key: string, value: string, days = 7) => {
  Cookies.set(key, value, { expires: days, path: '/' });
};

export const getCookie = (key: string): string | undefined => {
  return Cookies.get(key);
};

export const removeCookie = (key: string) => {
  Cookies.remove(key, { path: '/' });
};
