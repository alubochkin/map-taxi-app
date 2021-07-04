export const API_KEY_GEO = 'e6814192-a9b2-413f-8884-7ca412d0f611';
export const GEO_CODE = {
  PATH: `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_GEO}&format=json`,
};

export const API_KEY_DISTACE = '4c94357f-80aa-4a34-b49d-a0ba332ac748';
export const DISTANCE = {
  PATH: `https://api.routing.yandex.net/v2/distancematrix?`,
};

('https://api.routing.yandex.net/v2/distancematrix?origins=55.7538127,37.5755189|55.7539127,37.5655189&destinations=55.7489841,37.564189&mode=transit&apikey={ваш_api_ключ}');
