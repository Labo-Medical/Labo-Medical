// utils/cookieManager.ts
import Cookies from 'js-cookie';
export const setCookie = (key, value, days = 7) => {
    Cookies.set(key, value, { expires: days, path: '/' });
};
export const getCookie = (key) => {
    return Cookies.get(key);
};
export const removeCookie = (key) => {
    Cookies.remove(key, { path: '/' });
};
