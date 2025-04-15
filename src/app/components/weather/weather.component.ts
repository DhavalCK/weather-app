import { Component } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent {
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
}
