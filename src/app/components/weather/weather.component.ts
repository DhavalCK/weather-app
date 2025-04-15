import { Component } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent {
  city: string = '';
  weatherData: any;
  error: string | null = null;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    console.log('navigator - ', navigator);
    this.getWeatherByCoordinates();
  }

  getWeatherByCoordinates() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      this.weatherService.getWeatherByCoords(latitude, longitude).subscribe({
        next: (result) => {
          console.log('result =', result);
        },
        error: (err) => {},
      });
    });
  }

  getWeatherByCity() {
    if (!this.city) return;

    this.weatherService.getWeatherByCity(this.city).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.error = null;
      },
      error: (err) => {
        this.weatherData = null;
        this.error = 'City not found or API error.';
      },
    });
  }
}
