import api from "../services/apiService";

class Locations {
    constructor(api) {
        this.api = api;
        this.countries = null;
        this.cities = null;
    }

    async Init() {
        const response = await Promise.all([
            this.api.countries(),
            this.api.cities(),
        ]);

        const [countries, cities] = response;
        this.countries = this.serializeCountries(countries);
        this.cities = this.serializeCities(cities);

        return response;
    }

    serializeCountries(countries) {
        // { 'country_code': {...} }
        return countries.reduce((acc, country) => {
            acc[country.code] = country;
            return acc;
        }, {})
    }

    serializeCities(cities) {
        // { 'City name, Country Name': {...} }
        return cities.reduce((acc, city) => {
            const country_name = this.getCountryNameByCode(city.country_code);
            const city_name = city.name || city.name_translations.en;
            const key = `${city.name},${country_name}`;
            acc[key] = city;

            return acc;
        }, {})
    }

    getCountryNameByCode(code) {
        return this.countries[code].name;
    }

    getCitiesByCountryCode(code) {
        return this.cities.filter(city => city.country_code === code)
    }
}

const locations = new Locations(api);

export default locations;

// { 'City, Country': null }
// [ {}, {} ]
// { 'City': {...} } => cities[code]