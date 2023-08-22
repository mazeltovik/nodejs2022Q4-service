export const routes = {
  user: '/user',
  artist: '/artist',
  album: '/album',
  track: '/track',
  auth: {
    singup: '/auth/signup',
    login: '/auth/login',
  },
  favs: {
    all: '/favs',
    album: '/favs/album',
    artist: '/favs/artist',
    track: '/favs/track',
  },
};

export function createTemplate(
  ctx: string,
  timestamp: string,
  url: string,
  param: string,
  body: string,
  status: number,
) {
  const template = `
========================================
REQUEST LOG [${ctx}]:${timestamp}
========================================
url:${url}  
param:${param}  
body:${body}
========================================
RESPONSE LOG [${ctx}]:${timestamp}
========================================
status:${status}
`;
  return template;
}
