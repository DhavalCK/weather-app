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

  ngOnInit() {}

  getWeatherByLocation() {
    if (!navigator.geolocation) {
      this.error = 'Geolocation is not supported by your browser.';
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        this.weatherService.getWeatherByCoords(latitude, longitude).subscribe({
          next: (data) => {
            console.log('getWeatherByLocation =', data);

            this.weatherData = data;
            this.error = null;
          },
          error: (err) => {
            this.weatherData = null;
            this.error = 'Unable to fetch weather for your location.';
          },
        });
      },
      () => {
        this.error = 'Permission denied or unable to access location.';
      }
    );
  }

  getWeatherByCity() {
    if (!this.city) return;

    this.weatherService.getWeatherByCity(this.city).subscribe({
      next: (data) => {
        console.log('getWeatherByCity =', data);

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
