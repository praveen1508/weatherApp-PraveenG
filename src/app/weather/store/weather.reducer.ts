
import { Action, createReducer, on } from '@ngrx/store';
import * as weatherActions from './weather.actions';
import {  WeatherState } from '../weather';

const initialState: WeatherState = {
  weatherCoordinates: [],
  weatherForecast: [],
  errorMsg: null 
}

const featureReducer = createReducer(
  initialState,
  on(weatherActions.loadGeoCoordinatesSuccess, (state, { coordinates }) => ({
    ...state,
    weatherCoordinates: [...state.weatherCoordinates,coordinates],
  })),
  on(weatherActions.loadCityForecastSuccess, (state, { weatherForecast }) => ({
    ...state,
    weatherForecast: [...state.weatherForecast,weatherForecast],
  })),
  on(weatherActions.LoadForecastFailure, (state, { error }) => ({
    ...state, errorMsg: error
  }))  
);

export function reducer(state: WeatherState | undefined, action: Action) {
  return featureReducer(state, action);
}
