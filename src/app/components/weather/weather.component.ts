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
  unit: 'metric' | 'imperial' = 'metric'; // default is Celsius
  backgroundClass: string = 'bg-blue-100'; // Default background (Clear Sky)

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
        this.weatherService
          .getWeatherByCoords(latitude, longitude, this.unit)
          .subscribe({
            next: (data) => {
              console.log('getWeatherByLocation =', data);

              this.weatherData = data;
              this.city = this.weatherData.name;
              this.updateBackground(this.weatherData.weather[0].description);

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

    this.weatherService.getWeatherByCity(this.city, this.unit).subscribe({
      next: (data) => {
        console.log('getWeatherByCity =', data);

        this.weatherData = data;
        this.updateBackground(this.weatherData.weather[0].description);

        this.loading = false;
      },
      error: () => {
        this.error = 'City not found or API error.';
        this.weatherData = null;
        this.loading = false;
      },
    });
  }

  get unitSymbol() {
    return this.unit === 'metric' ? '°C' : '°F';
  }

  toggleUnit() {
    this.unit = this.unit === 'metric' ? 'imperial' : 'metric';
    if (this.city) this.getWeatherByCity();
    else if (this.weatherData?.coord) this.getWeatherByLocation(); // triggers re-fetch with new unit
  }

  updateBackground(weatherDescription: string) {
    if (weatherDescription.includes('clear')) {
      this.backgroundClass = 'bg-blue-200'; // Clear sky
    } else if (weatherDescription.includes('cloud')) {
      this.backgroundClass = 'bg-gray-300'; // Cloudy
    } else if (weatherDescription.includes('rain')) {
      this.backgroundClass = 'bg-blue-500'; // Rainy weather
    } else if (weatherDescription.includes('snow')) {
      this.backgroundClass = 'bg-white'; // Snowy weather
    } else {
      this.backgroundClass = 'bg-gray-100'; // Default background
    }
  }
}
