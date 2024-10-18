// export const KAKAOMAP_API_SRC = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
//   import.meta.env.VITE_KAKAOMAP_JS_KEY
// }&autoload=false`;

export const KAKAOMAP_API_SRC = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
  import.meta.env.VITE_KAKAOMAP_JS_KEY
}&autoload=false`;

export const STATIC_KAKAOMAP_API_SRC = `https://dapi.kakao.com/v2/maps/staticmap?&appkey=${import.meta.env.VITE_KAKAOMAP_API_KEY}`;

export const LOGIN_API_SRC = `${import.meta.env.VITE_SERVER_URL}/oauth2/authorization/kakao`;
