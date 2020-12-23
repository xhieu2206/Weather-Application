import { elements } from './base';

const renderLocation = location => {
  return `<li class="list-group-item w-100" data-woeid="${location.woeid}">${location.title}</li>`
}

const clearLocationsResult = () => {
  elements.searchLocationResultContainer.innerHTML = '';
}

const clearHighlightLocationsResult = () => {
  const elements = Array.from(document.querySelectorAll('.list-group-item'));
  elements.forEach(el => {
    if (el.classList.contains('active')) {
      el.classList.toggle('active');
    }
  });
}

export const renderLocations = (locations) => {
  clearLocationsResult();
  locations.forEach(location => {
    elements.searchLocationResultContainer.insertAdjacentHTML('beforeend', renderLocation(location));
  });
}

export const toggleHighlightSelectedItem = woeid => {
  clearHighlightLocationsResult();
  const element = document.querySelector(`[data-woeid="${woeid}"]`);
  element.classList.toggle('active');
}
