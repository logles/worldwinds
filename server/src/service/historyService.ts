// TODO: Define a City class with name and id properties //very similar to mini project
import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

// Define the City class
class City {
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}
//this file gets history - Writes to it,

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  //read the contents of a file named searchHistory.json. Reading takes time, we don't want it to block other processes, that is why async.
  private async read(): Promise<string> {
    return await fs.readFile("db/searchHistory.json", {
      flag: "a+",
      encoding: "utf8",
    });
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  private async write(cities: City[]): Promise<void> {
    return await fs.writeFile(
      "db/searchHistory.json",
      JSON.stringify(cities, null, "\t")
    );
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  async getCities(): Promise<City[]> {
    return await this.read().then((data) => {
      try {
        return [].concat(JSON.parse(data));
      } catch {
        return [];
      }
    });
  }

  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
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
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
  async removeCity(id: string): Promise<void> {
    return await this.getCities()
      .then((cities) => cities.filter((city) => city.id !== id))
      .then((filteredCities) => this.write(filteredCities));
  }
}

export default new HistoryService();
