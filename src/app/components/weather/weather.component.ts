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
  currentDate = new Date();
  loading = false;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getWeatherByLocation();
  }

  getWeatherByLocation() {
    if (!navigator.geolocation) {
      this.error = 'Geolocation is not supported by your browser.';
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        this.loading = true;
        this.weatherService.getWeatherByCoords(latitude, longitude).subscribe({
          next: (data) => {
            console.log('getWeatherByLocation =', data);

            this.weatherData = data;
            this.loading = false;
            this.error = null;
          },
          error: (err) => {
            this.weatherData = null;
            this.loading = false;
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
    this.loading = true;
    this.error = null;

    this.weatherService.getWeatherByCity(this.city).subscribe({
      next: (data) => {
        console.log('getWeatherByCity =', data);

        this.weatherData = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'City not found or API error.';
        this.weatherData = null;
        this.loading = false;
      },
    });
  }
}
