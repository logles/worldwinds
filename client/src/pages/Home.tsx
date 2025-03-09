import { useState } from "react";
import { fetchCountry as getCountryProfile } from "../api/countryProfile";
import { fetchWeather as getWeather } from "../api/weatherAPI";
import { WeatherData } from "../interfaces/weatherData";
import { CountryProfile } from "../interfaces/countryProfile";

const Home = () => {
  const [country, setCountry] = useState("");
  const [weather, setWeather] = useState<WeatherData>({
    currentWeather: {},
    forecast: [],
  });

  const [countryProfile, setCountryProfile] = useState<CountryProfile>({
    name: "",
    capital: "",
    region: "",
    subregion: "",
    currency: "",
    languages: [],
    population: 0,
  });

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!country.trim()) return;

    const countryData = await getCountryProfile(country);
    setCountryProfile(countryData);

    const weatherData = await getWeather(country);
    setWeather(weatherData);
  };

  const handleSave = () => {
    if (countryProfile) {
      const storedCountries = JSON.parse(
        localStorage.getItem("savedCountries") || "[]"
      );

      const newCountry = {
        name: countryProfile.name,
        capital: countryProfile.capital,
        region: countryProfile.region,
        subregion: countryProfile.subregion,
        currency: countryProfile.currency,
        languages: countryProfile.languages,
      };

      const updatedCountries = [...storedCountries, newCountry];
      localStorage.setItem("savedCountries", JSON.stringify(updatedCountries));
    }
  };

  const handleReset = () => {
    setCountry("");
    setCountryProfile({
      name: "",
      capital: "",
      region: "",
      subregion: "",
      currency: "",
      languages: [],
      population: 0,
    });
    setWeather({
      currentWeather: {},
      forecast: [],
    });
  };

  return (
    <div className="home-page register-page about-me">
      <h2>Learn About Your Dream Destinations</h2>

      {/* Search Section */}
      <form onSubmit={handleSearch} id="search-form">
        <div>
          <label htmlFor="search-input">Country search:</label>
          <input
            type="text"
            id="search-input"
            placeholder="Where do you want to go?"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <button type="submit">Search</button>
      </form>

      {/* Display Results */}
      {countryProfile && weather && (
        <section className="result-section">
          <h2>Country Profile: {countryProfile.name}</h2>
          <p>Capital: {countryProfile.capital}</p>
          <p>Population: {countryProfile.population}</p>
          <p>Region: {countryProfile.region}</p>

          <h2>Weather Forcast:{countryProfile.name}</h2>
          {/* <p>Temperature: {weather.forecast.}°C</p> */}
          {/* <p>Condition: {weather.description}</p> */}

          <button onClick={handleSave} className="save-button">
            Add to my bucket list
          </button>
        </section>
      )}

      {/* Reset Button */}
      <section>
        <button onClick={handleReset} className="reset-button">
          Reset search
        </button>
      </section>
    </div>
  );
};

export default Home;
