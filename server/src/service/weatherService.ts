import dotenv from "dotenv";
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}

// TODO: Define a class for the Weather object
class Weather {
  tempF: number;
  iconDescription: string;
  icon: string;
  date: string;
  city: string;
  windSpeed: number;
  humidity: number;

  constructor(
    tempF: number,
    iconDescription: string,
    icon: string,
    date: string,
    city: string,
    windSpeed: number,
    humidity: number
  ) {
    this.tempF = tempF;
    this.iconDescription = iconDescription;
    this.icon = icon;
    this.date = date;
    this.city = city;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}

// TODO: Complete the WeatherService class
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO:  Define the baseURL, API key, and city name properties
  private baseURL: string = process.env.API_BASE_URL || "";
  private apiKey: string = process.env.API_KEY || "";
  private cityName: string = "";

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(this.cityName);
    return this.destructureLocationData(locationData);
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<any> {
    const queryString = this.buildGeocodeQuery(query);
    const response = await fetch(queryString);
    if (!response.ok) {
      throw new Error("Failed to fetch location data");
    }
    return await response.json();
  }

  // TODO:  Create buildGeocodeQuery method
  private buildGeocodeQuery(query: string): string {
    return `https://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${this.apiKey}`;
  }

  // TODO:  Create destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
    const { lat, lon } = locationData[0];
    return { latitude: lat, longitude: lon };
  }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const queryString = this.buildWeatherQuery(coordinates);

    const response = await fetch(queryString);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    return await response.json();
  }

  // TODO:  Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}&units=metric`;
  }

  // TODO:  Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    const { temp } = response.main;
    const { description, icon } = response.weather[0];
    return new Weather(
      temp,
      description,
      icon,
      response.dt_txt,
      this.cityName,
      response.wind.speed,
      response.main.humidity
    );
  }

  // TODO: Complete buildForecastArray method
  private buildForecastArray(
    currentWeather: Weather,
    weatherData: any[]
  ): Weather[] {
    const forcastArray: Weather[] = [currentWeather];
    let filteredWeather = weatherData.filter((data: any) => {
      return data.dt_txt.includes(`12:00:00`);
    });
    for (let i = 0; i < filteredWeather.length; i++) {
      forcastArray.push(
        new Weather(
          filteredWeather[i].main.temp,
          filteredWeather[i].weather[0].description,
          filteredWeather[i].weather[0].icon,
          filteredWeather[i].dt_txt,
          this.cityName,
          filteredWeather[i].wind.speed,
          filteredWeather[i].main.humidity
        )
      );
    }
    return forcastArray;
    // return weatherData.map((forecast) => {
    //   const { temp } = forecast.main;
    //   const { description, icon } = forecast.weather[0];
    //   return new Weather(temp, description, icon);
    // });
  }
  // // New method to build the forecast query (ADDED BY LYDIA?)
  private buildForecastQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}&units=metric`;
  }

  // // Add a new method to fetch forecast data (ADDED BY LYDIA?)
  private async fetchForecastData(coordinates: Coordinates): Promise<any> {
    const queryString = this.buildForecastQuery(coordinates);
    console.log(queryString, "query String");
    const response = await fetch(queryString);
    if (!response.ok) {
      throw new Error("Failed to fetch forecast data");
    }
    return await response.json();
  }

  // TODO: Complete getWeatherForCity method
  public async getWeatherForCity(city: string) {
    this.cityName = city;

    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData.list[0]);
    const forecastData = await this.fetchForecastData(coordinates);

    const forecastArray = this.buildForecastArray(
      currentWeather,
      forecastData.list
    );

    return forecastArray;
  }
}

export default new WeatherService();
