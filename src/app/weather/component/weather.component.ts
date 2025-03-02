import { Component, OnDestroy, OnInit } from '@angular/core';
import { City_Options, imageUrl } from '../weather.config';
import { FormControl } from '@angular/forms';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { WeatherForecast, WeatherList } from '../weather';
import { WeatherFacadeService } from '../store/weather-facade.service';

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
    private weatherFacadeService: WeatherFacadeService
  ) {}

  ngOnInit(): void {
    this.createDates();
    this.listenToCityDropdownChange();
  }

  //Checks if the user has choosen any value in the City Dropdown
  showWeatherForecast(): boolean {
    return this.city?.value;
  }
 
  /* 
   When the user selects the particular City geocoordinates and weatherForecast api call 
   is made and cached using NgRx Store to avoid redundant API calls 
  */
  listenToCityDropdownChange(): void {
    this.city?.valueChanges
      .pipe(
        switchMap((cityName) => {
          this.weatherFacadeService.loadWeatherForeCast(cityName);
          return this.weatherFacadeService.getWeatherForecast(cityName);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((data: WeatherForecast | undefined) => {
        if (data) {
          this.weatherData = data?.list;
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
