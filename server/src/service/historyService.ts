//Comment


// TODO: Define a City class with name and id properties //very similar to mini project
import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

class City {
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}

class HistoryService {
  private async read(): Promise<string> {
    return await fs.readFile("db/searchHistory.json", {
      flag: "a+",
      encoding: "utf8",
    });
  }

  private async write(cities: City[]): Promise<void> {
    return await fs.writeFile(
      "db/searchHistory.json",
      JSON.stringify(cities, null, "\t")
    );
  }

  async getCities(): Promise<City[]> {
    return await this.read().then((data) => {
      try {
        return [].concat(JSON.parse(data));
      } catch {
        return [];
      }
    });
  }

  async addCity(city: string): Promise<City> {
    if (!city) {
      throw new Error("City name cannot be blank");
    }

    const newCity = new City(city, uuidv4());

    return await this.getCities()
      .then((cities) => {
        if (cities.find((existingCity) => existingCity.name === city)) {
          throw new Error("City already exists");
        }
        return [...cities, newCity];
      })
      .then((updatedCities) => this.write(updatedCities))
      .then(() => newCity);
  }

  async removeCity(id: string): Promise<void> {
    return await this.getCities()
      .then((cities) => cities.filter((city) => city.id !== id))
      .then((filteredCities) => this.write(filteredCities));
  }
}

export default new HistoryService();
