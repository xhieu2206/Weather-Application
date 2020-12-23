import { elements, MONTHS, DAYSOFWEEK } from './base';

const WeatherImage = new Map([
  ['Snow', 'sn'],
  ['Sleet', 'sl'],
  ['Hail', 'h'],
  ['Thunderstorm', 't'],
  ['Heavy Rain', 'hr'],
  ['Light Rain', 'lr'],
  ['Showers', 's'],
  ['Heavy Cloud', 'hc'],
  ['Light Cloud', 'lc'],
  ['Clear', 'c']
]);

const clearWeatherItems = () => {
  elements.weathersContainer.innerHTML = ''
}

const formatDay = date => {
  const today = new Date();
  if (date.getDate() === today.getDate()) {
    return 'Today';
  } else if (date.getDate() - 1 === today.getDate()) {
    return 'Tomorrow';
  } else {
    return `${DAYSOFWEEK[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }
}

const renderWeatherItem = item => {
  return `
  <div class="col-2">
    <h4 class="text-center h-85">${formatDay(item.date)}</h4>
    <p class="text-center">${Math.floor(item.minTemp)}°C - ${Math.floor(item.maxTemp)}°C</p>
    <p class="text-center">${item.weatherStateName}</p>
    <img src="img/${WeatherImage.get(item.weatherStateName)}.svg" alt="${item.weatherStateName}" class="img-thumbnail">
  </div>
  `;
}

export const renderWeatherItems = items => {
  clearWeatherItems();
  items.forEach(el => {
    elements.weathersContainer.insertAdjacentHTML('beforeend', renderWeatherItem(el));
  });
}
