import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Coordinates, WeatherCoordinates, WeatherForecast } from '../weather';
import * as weatherActions from '../store/weather.actions';
import { selectCityWeatherForecast, selectGeoCoordinates } from './weather.selectors';

@Injectable()
export class WeatherFacadeService {
  constructor(private store: Store) {}

  loadWeatherForeCast(cityName: string): void {
    this.loadGeoCoordinates(cityName);
    this.loadForeCast(cityName);
  }

  loadGeoCoordinates(cityName: string): void {
    const coordinates = this.store.pipe(select(selectGeoCoordinates(cityName)));
    coordinates.subscribe((storeCoordinatesData: WeatherCoordinates | undefined) => {
      // If the coordinates data is not present for the selected city ,trigger the Effects (API Call). 
      if (!storeCoordinatesData) {
        this.store.dispatch(weatherActions.loadGeoCoordinates({ cityName }));
      }
    });
  }

  loadForeCast(cityName: string): void {
    this.getWeatherForecast(cityName)?.subscribe((storeWeatherForecast: WeatherForecast | undefined) => {
      /* If the forecast data is  present for the selected ,city 
      don't trigger the Effects (API Call)*/
      if(storeWeatherForecast) {
        return ;
      }
      const coordinates = this.store.pipe(select(selectGeoCoordinates(cityName)));
      coordinates.subscribe((data: WeatherCoordinates | undefined) => {
        if (data) {
          const geoCoordinates: Coordinates = {
            lat: data?.lat,
            lon: data?.lon,
            city: cityName,
          };
          this.store.dispatch(
            weatherActions.loadCityForecast({ geoCoordinates })
          );
        }
      });
    })
  }

  getWeatherForecast(cityName: string): Observable<WeatherForecast | undefined> {
    return this.store.pipe(select(selectCityWeatherForecast(cityName)));
  }
}
