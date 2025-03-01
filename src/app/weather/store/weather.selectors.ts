
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICoordinatesState, WeatherCoordinates } from '../weather';

export const selectWeatherState = createFeatureSelector<ICoordinatesState>('weather');


export const selectGeoCoordinates = (cityName: string) => createSelector(
    selectWeatherState,
    (state:ICoordinatesState):  WeatherCoordinates | undefined => {
       return state.weatherCoordinates?.find((obj) => obj.name === cityName) 
    }
);
