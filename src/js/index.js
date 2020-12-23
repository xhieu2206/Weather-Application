import Weather from './models/Weather';
import Location from './models/Location';

import { elements } from './views/base';
import * as locationView from './views/locationView';
import * as weatherView from './views/weatherView';

const state = {}

const controlSearch = async () => {
  await state.location.getLocationByQuery()
    .then(latLng => {
      state.location.setlatlng(latLng.replace(/ /g, ''));
    })
    .catch(err => {
      alert(err);
    });

  if (state.location.getLatLng()) {
    await state.location.getLocationBylatlng();
  }

  locationView.renderLocations(state.location.locations);
}

elements.submitSearchButton.addEventListener('click', () => {
  let searchTerm = elements.searchInput.value.trim();

  if (searchTerm) {
    state.location = new Location(searchTerm);
    controlSearch();
  }
});

elements.searchInput.addEventListener('keydown', e => {
  let searchTerm = elements.searchInput.value.trim();

  if (e.keyCode == 13 && searchTerm) {
    state.location = new Location(searchTerm);
    controlSearch();
  }
})

const weatherItemControl = async () => {
  locationView.toggleHighlightSelectedItem(state.weather.getWoeid());
  await state.weather.fetchWeather();
  weatherView.renderWeatherItems(state.weather.getWeathers());
}

elements.searchLocationResultContainer.addEventListener('click', e => {
  if (e.target.classList.contains('list-group-item')) {
    const woeid = e.target.dataset.woeid;
    state.weather = new Weather(woeid);

    weatherItemControl();
  }
});
