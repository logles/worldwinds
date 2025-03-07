import { useState, useEffect } from "react";

interface Country {
  name: string;
  capital: string;
  region: string;
  subregion: string;
  currency: string;
  languages: string[];
}

const SavedCountries = () => {
  const [savedCountries, setSavedCountries] = useState<Country[]>([]);

  // Retrieve saved countries from local storage
  useEffect(() => {
    const storedCountries = localStorage.getItem("savedCountries");
    if (storedCountries) {
      setSavedCountries(JSON.parse(storedCountries));
    }
  }, []);

  // Remove country from saved list
  const removeCountry = (countryToRemove: Country) => {
    const updatedCountries = savedCountries.filter(
      (country) => country.name !== countryToRemove.name
    );
    setSavedCountries(updatedCountries);
    localStorage.setItem("savedCountries", JSON.stringify(updatedCountries));
  };

  return (
    <div>
      <h1>Saved Countries</h1>
      {savedCountries.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Capital</th>
              <th>Region</th>
              <th>Subregion</th>
              <th>Currency</th>
              <th>Languages</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {savedCountries.map((country, index) => (
              <tr key={index}>
                <td>{country.name}</td>
                <td>{country.capital}</td>
                <td>{country.region}</td>
                <td>{country.subregion}</td>
                <td>{country.currency}</td>
                <td>{country.languages.join(", ")}</td>
                <td>
                  <button
                    className="remove"
                    onClick={() => removeCountry(country)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No countries saved yet.</p>
      )}
    </div>
  );
};

export default SavedCountries;
