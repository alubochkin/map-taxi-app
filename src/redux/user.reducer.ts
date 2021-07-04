/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import {
  ActionCreatorWithNonInferrablePayload,
  ActionCreatorWithoutPayload,
  createSlice,
} from '@reduxjs/toolkit';
import { getGeoCode } from '../utils/fetcApi';

export const getAddres =
  (
    params: string,
    action:
      | ActionCreatorWithNonInferrablePayload<string>
      | ActionCreatorWithoutPayload<string>
  ) =>
    async (dispatch: any) => {
      getGeoCode(params)
        .then((data) => data.json())
        .then((result) => {
          dispatch(
            action(
              result.response.GeoObjectCollection?.featureMember[0].GeoObject
                .metaDataProperty.GeocoderMetaData.text
            )
          );
        })
        .catch((err) => console.log(err));
    };

export const getCoords =
  (
    params: string,
    action:
      | ActionCreatorWithNonInferrablePayload<string>
      | ActionCreatorWithoutPayload<string>
  ) =>
    async (dispatch: any) => {
      getGeoCode(params)
        .then((data) => data.json())
        .then((result) => {
          dispatch(
            action(
              result?.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
                .split(' ')
                .reverse()
                .map((cord: string) => Number(Number(cord).toFixed(4)))
            )
          );
        })
        .catch((err) => console.log(err));
    };

const userToolkit = createSlice({
  name: 'userSlice',
  initialState: {
    userCoords: [],
    adres: '',
  },
  reducers: {
    addCoords(state: any, action: any) {
      state.userCoords = action.payload;
    },

    addAdres(state: any, action: any) {
      state.adres = action.payload;
    },
  },
});

export default userToolkit.reducer;
export const { addAdres, addCoords } = userToolkit.actions;
