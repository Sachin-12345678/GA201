import { Component, OnInit, DoCheck, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-dashboard',
  templateUrl: './weather-dashboard.component.html',
  styleUrls: ['./weather-dashboard.component.css'],
})
export class WeatherDashboardComponent implements OnInit, DoCheck, AfterViewInit, OnDestroy {
  weatherData: any;
  // lastDataUpdateTime: number;
  private lastDataUpdateTime: number = 0;
  private dataSubscription!: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchWeatherData();
    this.updateWeatherData();

    this.dataSubscription = this.http.get('ba947455b6aa4eac5662d7c4edf781a9').subscribe((data: any) => {
      this.weatherData = data;
    });
  }

  fetchWeatherData() {
    const API_KEY = 'ba947455b6aa4eac5662d7c4edf781a9';
    const city = 'Mumbai';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    this.http.get(apiUrl).subscribe((data: any) => {
      this.weatherData = data;
    });
  }


  ngDoCheck() {
    if (this.shouldUpdateWeatherData()) {
      this.updateWeatherData();
    }
  }

  private shouldUpdateWeatherData(): boolean {
    const currentTime = new Date().getTime();
    const timeSinceLastUpdate = currentTime - this.lastDataUpdateTime;
    return timeSinceLastUpdate >= 300000; // Example: Update every 5 minutes
  }

  private updateWeatherData() {
    this.http.get('ba947455b6aa4eac5662d7c4edf781a9').subscribe((data: any) => {
      this.weatherData = data;
      this.lastDataUpdateTime = new Date().getTime();
    });
  }

  ngAfterViewInit() {
    // Perform rendering tasks here
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe(); // Clean up resources
    }
  }
}

