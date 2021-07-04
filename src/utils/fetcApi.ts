import axios from 'axios';

import { isArray } from 'lodash';
import { API_KEY_DISTACE, DISTANCE, GEO_CODE } from './constants';

export const getGeoCode = async (eventAdres: string | []) => {
  return await fetch(`${GEO_CODE.PATH}&geocode=${eventAdres}`);
};

export const getDistance = async (
  origin: string | [],
  destinations: string | number | []
) => {
  const dist = isArray(destinations) ? destinations.join('|') : destinations;
  console.log(dist);

  return await axios(
    `${DISTANCE.PATH}${origin}&${dist}&apikey${API_KEY_DISTACE}`
  );
};

('https://api.routing.yandex.net/v2/distancematrix?origins=55.7538127,37.5755189|55.7539127,37.5655189&destinations=55.7489841,37.564189&mode=transit&apikey={ваш_api_ключ}');
