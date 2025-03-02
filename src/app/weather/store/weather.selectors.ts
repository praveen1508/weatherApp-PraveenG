
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState, WeatherCoordinates, WeatherForecast } from '../weather';

export const selectWeatherState = createFeatureSelector<WeatherState>('weather');


export const selectGeoCoordinates = (cityName: string) => createSelector(
    selectWeatherState,
    (state:WeatherState):  WeatherCoordinates | undefined => {
       return state.weatherCoordinates?.find((obj: WeatherCoordinates) => obj.name === cityName) 
    }
);

export const selectCityWeatherForecast = (cityName: string) => createSelector(
    selectWeatherState,
    (state:WeatherState):  WeatherForecast | undefined => {
       return state.weatherForecast?.find((obj: WeatherForecast) => obj.city === cityName) 
    }
);
