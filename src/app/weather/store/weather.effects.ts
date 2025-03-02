import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  mergeMap,
} from 'rxjs/operators';
import * as weatherActions from './weather.actions';
import { WeatherApiService } from './weather-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { WeatherForecast } from '../weather';

@Injectable()
export class WeatherStoreEffects {
  constructor(
    private weatherApiService: WeatherApiService,
    private actions$: Actions
  ) {}

  loadGeoCoordinatesEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(weatherActions.loadGeoCoordinates),
      mergeMap(({ cityName }) =>
        this.weatherApiService.getCoordinates(cityName).pipe(
          map((data) =>
            weatherActions.loadGeoCoordinatesSuccess({ coordinates: data[0] })
          ),
          catchError((err:HttpErrorResponse) =>
            of(weatherActions.LoadForecastFailure({ error: err.message}))
          )
        )
      )
    )
  );

  loadWeatherEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(weatherActions.loadCityForecast),
      mergeMap(({ geoCoordinates }) =>
        this.weatherApiService.getWeatherForeCast(geoCoordinates).pipe(
          map((weatherForecast: WeatherForecast) => {
            weatherForecast.city = geoCoordinates?.city as string;
            return weatherActions.loadCityForecastSuccess({weatherForecast});
          }),
          catchError((err: HttpErrorResponse) =>
            of(weatherActions.LoadForecastFailure({ error: err?.message }))
          )
        )
      )
    )
  );
}
