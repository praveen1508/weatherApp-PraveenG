import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api_Key, baseUrl } from '../weather.config';
import { Coordinates, WeatherCoordinates, WeatherForecast } from '../weather';

@Injectable()
export class WeatherApiService {

  constructor(private httpClient: HttpClient) { }

  getWeatherForeCast({lat,lon}: Coordinates): Observable<WeatherForecast> {
    return this.httpClient.get<WeatherForecast>(`${baseUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${Api_Key}`)
  }

  getCoordinates(cityName: string): Observable<WeatherCoordinates[]> {
    return this.httpClient.get<WeatherCoordinates[]>(`${baseUrl}/geo/1.0/direct?q=${cityName}&appid=${Api_Key}`)
  }
}
