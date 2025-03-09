// Select necessary DOM elements
const searchForm: HTMLFormElement = document.getElementById(
  "search-form"
) as HTMLFormElement;
const searchInput: HTMLInputElement = document.getElementById(
  "search-input"
) as HTMLInputElement;
// const countryContainer = document.getElementById(
//   "country-container"
// ) as HTMLDivElement;

/*
API Calls
*/

export const fetchCountry = async (countryName: string) => {
  const response = await fetch(`/api/country/${countryName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const countryData = await response.json();
  console.log("Country Data:", countryData);

  return countryData;
};

/*
Render Function
*/

// const renderCountry = (country: any): void => {
//   const { name, capital, region, subregion, currency, language } = country;

//   countryContainer.innerHTML = `
//     <h2>${name}</h2>
//     <p><strong>Capital:</strong> ${capital}</p>
//     <p><strong>Region:</strong> ${region}</p>
//     <p><strong>Subregion:</strong> ${subregion}</p>
//     <p><strong>Currency:</strong> ${currency}</p>
//     <p><strong>Languages:</strong> ${language.join(", ")}</p>
//   `;
// };

/*
Event Handler
*/

const handleSearchFormSubmit = (event: Event): void => {
  event.preventDefault();

  if (!searchInput.value) {
    alert("Country name cannot be blank");
    return;
  }

  const search: string = searchInput.value.trim();
  fetchCountry(search);
  searchInput.value = "";
};

/*
Initial Event Listener
*/

searchForm?.addEventListener("submit", handleSearchFormSubmit);
