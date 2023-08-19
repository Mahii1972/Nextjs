import { serialize } from 'cookie';

export function setCookie(res, name, value, options = {}) {
  const stringValue = typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);
  res.setHeader('Set-Cookie', serialize(name, stringValue, { ...options, httpOnly: false }));
}


export function getCookie(req, name) {
  const cookies = req.headers.cookie.split(';').reduce((cookies, cookie) => {
    const [name, value] = cookie.split('=').map(c => c.trim());
    cookies[name] = value;
    return cookies;
  }, {});
  return cookies[name];

}



