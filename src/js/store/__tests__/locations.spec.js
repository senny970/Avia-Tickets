import locationsInstance, {Locations} from "../locations";
import {formatDate} from "../../helpers/date";
import api, {Api} from "../../services/apiService";

const countries = [{code: 'UKR', name: 'Ukraine'}]

describe('Location store tests', () => {
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
})
