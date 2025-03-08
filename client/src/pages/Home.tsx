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

  const handleSearch = async () => {
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

  return (
    <div className="home">
      <h1>Explore Your Dream Destinations</h1>

      {/* Search Section */}
      <section>
        <label>Country search:</label>
        <input
          type="text"
          placeholder="Where do you want to go?"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </section>

      {/* Display Results */}
      {countryProfile && weather && (
        <section>
          <h2>Country Profile: {countryProfile.name}</h2>
          <p>Capital: {countryProfile.capital}</p>
          <p>Population: {countryProfile.population}</p>
          <p>Region: {countryProfile.region}</p>

          <h3>Weather in {countryProfile.name}</h3>
          {/* <p>Temperature: {weather.forecast.}°C</p> */}
          {/* <p>Condition: {weather.description}</p> */}

          <button onClick={handleSave}>
            Add this location to my bucket list
          </button>
        </section>
      )}

      {/* Reset Button */}
      <section>
        <button
          onClick={() => {
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
          }}
        >
          Reset search
        </button>
      </section>
    </div>
  );
};

export default Home;
