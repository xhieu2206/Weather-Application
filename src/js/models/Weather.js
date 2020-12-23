import axios from 'axios';

import * as dateUtils from '../utils/Date';

const PROXYURL = 'https://thingproxy.freeboard.io/fetch/';

class WeatherDetail {
  constructor(title, weatherStateName, minTemp, maxTemp, windSpeed, date) {
    this.title = title;
    this.weatherStateName = weatherStateName;
    this.minTemp = minTemp;
    this.maxTemp = maxTemp;
    this.windSpeed = windSpeed;
    this.date = dateUtils.dateConvert(date);
  }
}

export default class Weather {
  constructor(woeid) {
    this.woeid = woeid;
    this.weathers = [];
  }

  async fetchWeather() {
    // https://www.metaweather.com/api/location/${this.woeid}/
    const res = await axios(PROXYURL + `https://www.metaweather.com/api/location/${this.woeid}/`);
    res.data.consolidated_weather.forEach(el => {
      let weather = new WeatherDetail(
        res.data.title,
        el.weather_state_name,
        el.min_temp,
        el.max_temp,
        el.wind_speed,
        el.applicable_date
      );
      this.weathers.push(weather);
    });
  }

  getWeathers() {
    return this.weathers;
  }

  getWoeid() {
    return this.woeid;
  }
}
