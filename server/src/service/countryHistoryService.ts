import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

class CountryHistory {
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}
//writes searched country to db/countrySearchHistory.json
class CountryHistoryService {
  private filePath = "db/countrySearchHistory.json";

  private async read(): Promise<string> {
    return await fs.readFile(this.filePath, { flag: "a+", encoding: "utf8" });
  }

  private async write(history: CountryHistory[]): Promise<void> {
    return await fs.writeFile(this.filePath, JSON.stringify(history, null, "\t"));
  }

  async getHistory(): Promise<CountryHistory[]> {
    return await this.read().then((data) => {
      try {
        return [].concat(JSON.parse(data));
      } catch {
        return [];
      }
    });
  }

  async addCountryToHistory(country: string): Promise<CountryHistory> {
    if (!country) {
      throw new Error("Country name cannot be blank");
    }

    const newEntry = new CountryHistory(country, uuidv4());

    return await this.getHistory()
      .then((history) => {
        if (history.find((entry) => entry.name === country)) {
          throw new Error("Country already exists in history");
        }
        return [...history, newEntry];
      })
      .then((updatedHistory) => this.write(updatedHistory))
      .then(() => newEntry);
  }

  async removeCountryFromHistory(id: string): Promise<void> {
    return await this.getHistory()
      .then((history) => history.filter((entry) => entry.id !== id))
      .then((filteredHistory) => this.write(filteredHistory));
  }
}

export default new CountryHistoryService();
