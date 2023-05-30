/**
 * 存储/获取 user token
 */

const KEY = 'USRE_TOKEN'

export function setToken(token: string) {
  localStorage.setItem(KEY, token);
}

export function getToken() {
  return localStorage.getItem(KEY) || '';
}

export function removeToken() {
  return localStorage.removeItem(KEY);
}
