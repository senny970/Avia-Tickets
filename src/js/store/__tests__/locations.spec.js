import locationsInstance, {Locations} from "../locations";
import {formatDate} from "../../helpers/date";
import api, {Api} from "../../services/apiService";
import apiService from "../../services/apiService";

const countries = [{code: 'UKR', name: 'Ukraine'}];
const cities = [{country_code: 'UKR', name: 'Kiev', code: 'KV'}];
const airlines = [{country_code: 'UKR', name: 'Airlines', code: 'AVIA'}];

jest.mock('../../services/apiService', () => {
    const mockApi = {
        countries: jest.fn(() => Promise.resolve([{code: 'UKR', name: 'Ukraine'}])),
        cities: jest.fn(() => Promise.resolve([{country_code: 'UKR', name: 'Kiev', code: 'KV'}])),
        airlines: jest.fn(() => Promise.resolve([{country_code: 'UKR', name: 'Airlines', code: 'AVIA'}])),
    }

    return {
        Api: jest.fn(() => mockApi)
    }
})

const ApiService = new Api();

describe('Location store tests', () => {
    beforeEach(() => {
        // init data for testing serializeCities
        locationsInstance.countries = locationsInstance.serializeCountries(countries);
        locationsInstance.cities = locationsInstance.serializeCities(cities);
    });

    it('Check locationsInstance is instance of Locations class', () => {
        expect(locationsInstance).toBeInstanceOf(Locations)
    })

    it('Succes Locations instance create', () => {
        const instance = new Locations(api, {formatDate})
        expect(instance.countries).toBe(null)
        expect(instance.shortCitiesList).toEqual(null)
        expect(instance.formatDate).toEqual(formatDate)
    })

    it('Check correct countries serialize', () => {
        const res = locationsInstance.serializeCountries(countries)
        const expectedData = {
            UKR: {code: 'UKR', name: 'Ukraine'}
        }

        expect(res).toEqual(expectedData);
    })

    it('Check countries serialize is incorrect data', () => {
        const res = locationsInstance.serializeCountries(null)
        const expectedData = {};

        expect(res).toEqual(expectedData);
    })

    it('Check correct cities serialize', () => {
        const res = locationsInstance.serializeCities(cities);
        const expectedData = {
            KV: {country_code: 'UKR', name: 'Kiev', code: 'KV', country_name: 'Ukraine', full_name: 'Kiev,Ukraine'}
        }

        expect(res).toEqual(expectedData);
    })

    it('Check correct get city name by code', () => {
        const res = locationsInstance.getCityNameByCode('KV');
        expect(res).toBe('Kiev');
    })

    it('Check correct init method call', () => {
        const instance = new Locations(apiService, {formatDate});
        expect(instance.init()).resolves.toEqual([countries, cities, airlines]);
    })
})
