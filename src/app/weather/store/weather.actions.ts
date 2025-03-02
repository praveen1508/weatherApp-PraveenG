import { createAction, props } from '@ngrx/store';
import { Coordinates, WeatherCoordinates, WeatherForecast } from '../weather';

export enum WeatherActionType {
  LoadGeoCoordinates = '[Weather Component]  Load Geo Coordinates ',
  LoadGeoCoordinatesSuccess = '[Weather Component]  Load Geo Coordinates Success ',

  LoadCityForecast = '[Weather Component]  Load City ',
  LoadCityForecastSuccess = '[Weather Component]  Load City Success ',

  LoadForecastFailure = '[Weather Component]  Load Forecast Failure',
}

export const loadGeoCoordinates = createAction(
  WeatherActionType.LoadGeoCoordinates,
  props<{ cityName: string }>()
);

export const LoadForecastFailure = createAction(
  WeatherActionType.LoadForecastFailure,
  props<{ error: string }>()
);

export const loadGeoCoordinatesSuccess = createAction(
  WeatherActionType.LoadGeoCoordinatesSuccess,
  props<{ coordinates: WeatherCoordinates }>()
);

export const loadCityForecast = createAction(
  WeatherActionType.LoadCityForecast,
  props<{ geoCoordinates: Coordinates }>()
);

export const loadCityForecastSuccess  = createAction(
  WeatherActionType.LoadCityForecastSuccess,
  props<{ weatherForecast: WeatherForecast }>()
);
