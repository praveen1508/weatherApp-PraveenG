import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, switchMap } from 'rxjs/operators';
import * as weatherActions from './weather.actions';
import { WeatherApiService } from './weather-api.service';

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
          catchError((error) =>
            of(weatherActions.loadGeoCoordinatesFailure({ error }))
          )
        )
      )
    )
  );
}
