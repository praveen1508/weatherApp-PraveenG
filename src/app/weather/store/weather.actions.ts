
import { createAction, props } from '@ngrx/store';
import { WeatherCoordinates } from '../weather';

export enum WeatherActionType {
  LoadGeoCoordinates = '[Weather Component]  Load Geo Coordinates ',
  LoadGeoCoordinatesSuccess = '[Weather Component]  Load Geo Coordinates Success ',
  LoadGeoCoordinatesFailure = '[Weather Component]  Load Geo Coordinates Failure',
}

export const loadGeoCoordinates = createAction(
  WeatherActionType.LoadGeoCoordinates,
  props<{ cityName: string}>()
);

export const loadGeoCoordinatesFailure = createAction(
  WeatherActionType.LoadGeoCoordinatesFailure,
  props<{ error: string }>()
);

export const loadGeoCoordinatesSuccess = createAction(
  WeatherActionType.LoadGeoCoordinatesSuccess,
  props<{ coordinates: WeatherCoordinates }>()
);