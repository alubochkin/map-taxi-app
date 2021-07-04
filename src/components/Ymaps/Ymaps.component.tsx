/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { YMaps, Map, Placemark, RoutePanel } from 'react-yandex-maps';
import { haversine } from '../../utils/haversaine';
import { GEO_CODE } from '../../utils/constants';
import { addAdres, addCoords, getAddres } from '../../redux/user.reducer';
import { cars } from '../../utils/cars';
import { setRelevantCar, setVisibleCars } from '../../redux/cars.reduce';
import { getDistance } from '../../utils/fetcApi';

export const YmapsComponent = () => {
  // eslint-disable-next-line no-undef

  const dispatch = useDispatch();
  const isVisible = useSelector((state: any) => state.carsReducer.visibleCars);
  const userCoords = useSelector((state: any) => state.userReducer.userCoords);
  const adres = useSelector((state: any) => state.userReducer.adres);
  const relevantCar = useSelector(
    (state: any) => state.carsReducer.relevantCar
  );

  const [stateCoords, setStateCoords] = React.useState([]);
  const [carsState, setCarsState] = React.useState(cars);

  const startEnd = (start: number[], end: number[]) => {
    return [
      { latitude: start[0], longitude: start[1] },
      { latitude: end[0], longitude: end[1] },
    ];
  };

  const isCarRelevantGet = () => {
    const isCar: any = [...carsState].sort(
      (a, b) =>
        +haversine(...startEnd(a.coords, userCoords)) -
        +haversine(...startEnd(b.coords, userCoords))
    )[0];

    dispatch(setRelevantCar(isCar));
  };

  const getMyAdresHandler = (e: {
    _sourceEvent: { originalEvent: { coords: number[] } };
  }) => {
    const coords = e._sourceEvent.originalEvent.coords.reverse().join(',');
    const arrCorords = e._sourceEvent.originalEvent.coords;

    dispatch(getAddres(coords, addAdres));
    dispatch(addCoords(arrCorords.reverse()));
    isCarRelevantGet();
    dispatch(setVisibleCars(true));

    // getDistance(userCoords.join('|'), carsState[0].coords.join('|')).then(
    //   (res) => console.log(res)
    // );
  };

  return (
    <YMaps
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Map
        onClick={(e: any) => getMyAdresHandler(e)}
        style={{
          width: '100%',
          height: '100%',
        }}
        defaultState={{
          center: [55.75, 37.57],
          zoom: 12,
          controls: ['zoomControl', 'fullscreenControl'],
        }}
        modules={['control.ZoomControl', 'control.FullscreenControl']}
      >
        <Placemark
          iconContent="12"
          options={{
            cursor: 'poiter',
            preset: 'islands#bluePersonIcon',
          }}
          properties={{
            hideIconOnBalloonOpen: false,
          }}
          geometry={userCoords}
        />

        {isVisible &&
          carsState.map((car: any, i: number) => (
            <Placemark
              options={{
                preset: 'islands#greenAutoIcon',
              }}
              properties={{
                iconCaption: car.description.car,
              }}
              geometry={car.coords}
              key={car.id}
            />
          ))}
      </Map>
    </YMaps>
  );
};
