import { Component, OnDestroy, OnInit } from '@angular/core';
import { City_Options, imageUrl } from '../weather.config';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as weatherActions from '../store/weather.actions';
import { selectGeoCoordinates } from '../store/weather.selectors';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { WeatherApiService } from '../store/weather-api.service';
import { WeatherForecast, WeatherList } from '../weather';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit, OnDestroy {
  public city = new FormControl();
  public weatherData!: WeatherList[];
  public datesArr: string[] = [];
  public unsubscribe$ = new Subject<void>();

  get cityDropDownOptions(): string[] {
    return City_Options;
  }

  constructor(
    private store: Store,
    private weatherApiService: WeatherApiService
  ) {}

  ngOnInit(): void {
    this.createDates();
    this.loadGeoCoordinates();
    this.listenToCityDropdownChange();
  }

  /* Fetching Geo coordinates for all the cities and 
  storing it in the store to avoid Redundant API Calls*/
  loadGeoCoordinates(): void {
    this.cityDropDownOptions?.forEach((cityName: string) => {
      if (cityName) {
        this.store.dispatch(weatherActions.loadGeoCoordinates({ cityName }));
      }
    });
  }

  //Checks if the user has choosen any value in the City Dropdown
  showWeatherForecast(): boolean {
    return this.city?.value;
  }

  listenToCityDropdownChange(): void {
    this.city?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((cityName: string) => {
        if (cityName) {
          const coordinates = this.store.pipe(
            select(selectGeoCoordinates(cityName))
          );
          coordinates
            ?.pipe(
              switchMap((data) =>
                this.weatherApiService.getWeatherForeCast({
                  lat: data?.lat as number,
                  lon: data?.lon as number,
                })
              )
            )
            .subscribe({
              next: (data: WeatherForecast) => (this.weatherData = data?.list),
              error: (err: HttpErrorResponse) => console.log(err),
            });
        }
      });
  }

  // Creates 5 Consecutive Dates from Today
  createDates(): void {
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      const nextDate = new Date(date.setDate(date.getDate() + i));
      this.datesArr.push(nextDate.toDateString());
    }
  }

  isDateMatching(forecastDate: Date, date: string): boolean {
    return new Date(forecastDate).toDateString() === date;
  }

  getImgSrc(src: string | undefined): string {
    return `${imageUrl}/${src}.png`;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
