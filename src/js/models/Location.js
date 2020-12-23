import axios from 'axios';

const PROXYURL = 'https://thingproxy.freeboard.io/fetch/';

export default class Location {
  constructor(query) {
    this.query = query;
    this.locations = [];
  }

  getLocationByQuery() {
    // https://www.metaweather.com/api/location/search/?query=${query}
    return new Promise((resolve, reject) => {
      fetch(PROXYURL + `https://www.metaweather.com/api/location/search/?query=${this.query}`)
        .then(res => {
          return res.json();
        })
        .catch(err => {
          reject("Location not found");
        })
        .then(result => {
          resolve(result[0].latt_long);
        })
        .catch(err => {
          reject("Something went wrong when trying to get location's coordinates");
        });
    });
  }

  async getLocationBylatlng() {
    // https://www.metaweather.com/api/location/search/?lattlong=${latlng}
    try {
      const res = await axios(PROXYURL + `https://www.metaweather.com/api/location/search/?lattlong=${this.latlng}`);
      this.locations = [...res.data];
    } catch (err) {
      alert('Something went wrong when getting locations by Lat and Lng!!!');
    }
  }

  setlatlng(latlng) {
    this.latlng = latlng;
  }

  getLocations() {
    return this.locations;
  }

  getLatLng() {
    return this.latlng;
  }
}
