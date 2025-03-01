export interface WeatherCoordinates {
  name: string;
  local_names: { [key: string]: string };
  lat: number;
  lon: number;
  country: string;
}

export type Coordinates = Pick<WeatherCoordinates, 'lat' | 'lon'>;

export interface ICoordinatesState {
    weatherCoordinates: WeatherCoordinates[],
    errorMsg: string| null 
}

export interface WeatherForecast {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherList[];
}

export interface WeatherList {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain: Rain;
  sys: Sys;
  dt_txt: Date;
}

export interface Clouds {
  all: number;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface Rain {
  '3h': number;
}

export interface Sys {
  pod: string;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}
