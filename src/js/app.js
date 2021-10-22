import locations from "./store/locations";
import '../css/style.css';
import './libs'; //import ./libs/index.js
import formUI from './views/form'
import currencyUI from "./views/currency";
import ticketsUI from "./views/tickets";
import favorites from "./store/favorites";

//Debug
import api from "./services/apiService";

const debug = true;

document.addEventListener('DOMContentLoaded', () => {
    initApp();
    favorites.init();
    const form = formUI.form;
    const preloader = document.querySelector('.preloader-wrapper');

    //Events
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        onFormSubmit();
    })

    formDisable(true);

    // Handlers
    async function initApp() {
        await locations.init();
        formUI.setAutocompleteData(locations.shortCitiesList);

        //DebugData
        if (debug) {
            console.log('Cities:\n');
            console.log(api.cities());
            console.log('Countries:\n');
            console.log(api.countries())
            console.log('Prices:\n');
            console.log(api.prices());
            console.log('Airlines:\n');
            console.log(api.airlines())
            console.log('ShortCitiesList:\n');
            console.log(locations.shortCitiesList);
            //Debug
            console.log('Locations:\n');
            console.log(locations);
        }

        formDisable(false);
    }

    async function onFormSubmit() {
        // collect data form inputs
        const origin = locations.getCityCodeByKey(formUI.originValue);
        const destination = locations.getCityCodeByKey(formUI.destinationValue);
        const depart_date = formUI.departDateValue;
        const return_date = formUI.returnDateValue;
        const currency = currencyUI.currencyValue;

        //console.log(origin, destination, depart_date, return_date)
        await locations.fetchTickets({
            origin,
            destination,
            depart_date,
            return_date,
            currency,
        });

        ticketsUI.renderTickets(locations.lastSearch);

        if (debug) {
            console.log('LastSearch:\n');
            console.log(locations.lastSearch);
        }
    }

    function formDisable(state) {
        let elements = form.elements;

        if (state) {
            preloader.classList.add('active');
        } else {
            preloader.classList.remove('active');
        }

        for (let i = 0, len = elements.length; i < len; ++i) {
            if (state) {
                elements[i].classList.add('disabled');
                elements[i].readOnly = true;

            } else {
                elements[i].classList.remove('disabled');
                elements[i].readOnly = false;
            }
        }
    }
})

export default debug;