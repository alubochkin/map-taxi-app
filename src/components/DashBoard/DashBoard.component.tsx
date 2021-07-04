/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { throttle } from 'lodash';
import React, { Ref, RefObject } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import { setRelevantCar, setVisibleCars } from "../../redux/cars.reduce";
import { addAdres, addCoords, getCoords } from "../../redux/user.reducer";
import { cars } from "../../utils/cars";
import { getDistance } from "../../utils/fetcApi";
import { haversine } from "../../utils/haversaine";

const get = throttle((adres: any, cb: (arg0: any) => any) => {
  return cb(adres);
}, 400);

export const DashBoardComponent = () => {
  const dispatch = useDispatch();
  const [carsState] = React.useState(cars);
  const refInput: RefObject<any> = React.useRef()

  const [visebleCar, setVisibleCar] = React.useState(false);
  const yourAdres = useSelector((state: any) => state.userReducer.adres);
  const userCoords = useSelector((state: any) => state.userReducer.userCoords);
  const relevantCar = useSelector((state: any) => state.carsReducer.relevantCar);

  const startEnd = (start: any, end: any) => {
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

  React.useEffect(() => refInput.current.value = yourAdres, [yourAdres])


  const getCoordinateOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const adres = e.target.value;

    if (adres.length > 8) {
      dispatch(getCoords(adres, addCoords));
      dispatch(addAdres(adres));
      isCarRelevantGet();
      dispatch(setVisibleCars(true));
      setVisibleCar(true);

    }
  };

  const orderTaxiHandler = () => {

    const date = new Date;

    const source_time = [
      date.getFullYear(),
      +date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1),
      +date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
      +date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
      +date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
      +date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(),
    ].join('')

    const order = {

      // формат времени ГГГГММДДччммсс 
      "source_time": source_time,
      "addresses": [
        {
          "address": yourAdres,
          "lat": userCoords[0],
          "lon": userCoords[1]
        }
      ],
      "crew_id": relevantCar.id
    }

    console.log(order);

  };


  return (
    <DashBoardWrapper>
      <div>
        <Input
          ref={refInput}
          defaultValue={yourAdres}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            getCoordinateOnChangeHandler(e)
          }
          name="adres"
          type="text"
          placeholder="Введите адрес"
        />
      </div>

      {yourAdres ? (
        <>
          <Description>
            <div>
              <h4>Ваш адрес: </h4>
              <div>{yourAdres}</div>
            </div>
            <div>
              <h4>Подходящий экипаж:</h4>
              {relevantCar ? (
                <>
                  <div>Машина: {relevantCar?.description?.car}</div>
                  <div>Цвет: {relevantCar?.description?.color}</div>
                  <div>Номер: {relevantCar?.description?.number}</div>
                </>
              ) : null}
            </div>
          </Description>

          <Button onClick={orderTaxiHandler} type="button">
            Заказать такси
          </Button>
        </>
      ) : (
        <h4>
          После того как вы укажите адрес мы подберем ближайший к вам экипаж!
        </h4>
      )}
    </DashBoardWrapper>
  );
};

const DashBoardWrapper = styled.form`
  display: flex;
  gap: 40px;
  flex-direction: column;
  flex-grow: 1;
  padding: 50px 15px;
  max-width: 400px;
  width: 100%;
  position: fixed;
  z-index: 100;
  background: #16161ac2;
  backdrop-filter: blur(9px);
  height: 100%;
  color: #fff;
  top: 0;
  left: 0;
  font-size: 14px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #ffffff;
  color: #fff;
  background: none;
  padding: 10px 5px;
  outline: none;
  width: 100%;
    &::placeholder {
      color: #fff;
    }
`;

const Button = styled.button`
  border: none;
  background: none;
  padding: 10px 25px;
  color: #fff;
  border: 3px solid #ffffff;
  cursor: pointer;
  width: max-content;
  border-radius: 50px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
