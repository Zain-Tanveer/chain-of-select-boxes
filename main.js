// data import
import { countries, states, cities } from "./utils/data.js";

// variables
const countriesEl = document.getElementById("countries");
const statesEl = document.getElementById("states");
const citiesEl = document.getElementById("cities");

const addressWrapper = document.querySelector(".address-wrapper");
const countrySpan = document.getElementById("country");
const stateSpan = document.getElementById("state");
const citySpan = document.getElementById("city");

// functions
const createOptionsEl = (value) => {
  const option = document.createElement("option");
  option.textContent = value;
  option.value = value;

  return option;
};

const removeOptionsEl = (selectEl) => {
  while (selectEl.options.length > 1) {
    selectEl.remove(selectEl.length - 1);
  }
};

const addCountries = () => {
  countries.forEach((country) => {
    const option = createOptionsEl(country);
    countriesEl.appendChild(option);
  });
};

const addStates = (country) => {
  states[country].forEach((state) => {
    const option = createOptionsEl(state);
    statesEl.appendChild(option);
  });
};

const addCities = (state) => {
  cities[state].forEach((city) => {
    const option = createOptionsEl(city);
    citiesEl.appendChild(option);
  });
};

const getSelectedOption = (selectEl) => {
  return selectEl.options[selectEl.selectedIndex];
};

// add countries options
addCountries();
countriesEl.style.cursor = "pointer";

// event listeners
countriesEl.addEventListener("change", () => {
  const selectedOption = getSelectedOption(countriesEl);

  if (selectedOption.value !== "") {
    removeOptionsEl(statesEl);
    addStates(selectedOption.value);

    statesEl.style.cursor = "pointer";

    countrySpan.textContent = selectedOption.value;
    statesEl.disabled = false;
    addressWrapper.style.display = "block";
  } else {
    removeOptionsEl(statesEl);
    removeOptionsEl(citiesEl);

    statesEl.style.cursor = "not-allowed";
    citiesEl.style.cursor = "not-allowed";

    countrySpan.textContent = "";
    stateSpan.textContent = "";
    citySpan.textContent = "";
    addressWrapper.style.display = "none";

    statesEl.disabled = true;
    citiesEl.disabled = true;
  }
});

statesEl.addEventListener("change", () => {
  const selectedOption = getSelectedOption(statesEl);

  if (selectedOption.value !== "") {
    removeOptionsEl(citiesEl);
    addCities(selectedOption.value);

    citiesEl.style.cursor = "pointer";

    stateSpan.textContent = selectedOption.value + " ,";
    citiesEl.disabled = false;
  } else {
    removeOptionsEl(citiesEl);

    citiesEl.style.cursor = "not-allowed";

    stateSpan.textContent = "";
    citySpan.textContent = "";
    citiesEl.disabled = true;
  }
});

citiesEl.addEventListener("change", () => {
  const selectedOption = getSelectedOption(citiesEl);

  if (selectedOption.value !== "") {
    citySpan.textContent = selectedOption.value + " ,";
  } else {
    citySpan.textContent = "";
  }
});
