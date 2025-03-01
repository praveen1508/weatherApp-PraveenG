
import { Action, createReducer, on } from '@ngrx/store';
import * as weatherActions from './weather.actions';
import {  ICoordinatesState } from '../weather';

const initialState: ICoordinatesState = {
  weatherCoordinates: [],
  errorMsg: null 
}

const featureReducer = createReducer(
  initialState,
  on(weatherActions.loadGeoCoordinatesSuccess, (state, { coordinates }) => ({
    ...state,
    weatherCoordinates: [...state.weatherCoordinates,coordinates],
  })),
  on(weatherActions.loadGeoCoordinatesFailure, (state, { error }) => ({
    ...state, errorMsg: error
  }))  
);

export function reducer(state: ICoordinatesState | undefined, action: Action) {
  return featureReducer(state, action);
}
