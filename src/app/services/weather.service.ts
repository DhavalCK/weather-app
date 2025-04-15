import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeatherByCity(city: string, unit: string = 'metric') {
    return this.http.get(
      `${this.baseUrl}?q=${city}&appid=${environment.weatherApiKey}&units=${unit}`
    );
  }

  getWeatherByCoords(lat: number, lon: number, unit: string = 'metric') {
    return this.http.get(
      `${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${environment.weatherApiKey}&units=${unit}`
    );
  }
}
