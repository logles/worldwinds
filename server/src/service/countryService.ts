class Country { 
    name: string;
    capital: string;
    region: string;
    subregion: string;
    currency: number;
    language: string[];
  
    constructor(
      name: string,
      capital: string,
      region: string,
      subregion: string,
      currency: number,
      language: string[],
    ) {
      this.name = name;
      this.capital = capital;
      this.region = region;
      this.subregion = subregion;
      this.currency = currency;
      this.language = language;
    }
  }
  
  class CountryService { 
    private baseURL: string = "https://restcountries.com/v3.1";
  
    private async fetchData(endpoint: string): Promise<any> {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Failed to fetch url paramaters (endpoint)");
      }
      return await response.json();
    }

  
    async getCountryByName(name: string): Promise<Country> {
      const data = await this.fetchData(`${this.baseURL}/name/${name}?fullText=true&fields=name,capital,region,subregion,currency,language`);
      const country = data[0];
      return new Country(
        country.name.common,
        country.capital?.[0] || "Not Available",
        country.region,
        country.subregion,
        country.currency,
        Object.values(country.language || {})
      );
    }
  
      //Note: Incase we want to beable to search by region (Asia)
    // async getCountriesByRegion(region: string): Promise<Country[]> {
    //   const data = await this.fetchData(`${this.baseURL}/region/${region}?fields=name,capital,region,subregion,currency,language`);
    //   return data.map((country: any) => 
    //     new Country(
    //       country.name.common,
    //       country.capital?.[0] || "N/A",
    //       country.region,
    //       country.subregion,
    //       country.currency,
    //       Object.values(country.language || {})
    //     )
    //   );
    // }
  }
  
  export default new CountryService();
  