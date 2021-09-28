import locations from "./store/locations";
import '../css/style.css';
import './libs'; //import ./libs/index.js
import formUI from './views/form'
import currencyUI from "./views/currency";
import ticketsUI from "./views/tickets";

//Debug
import api from "./services/apiService";

document.addEventListener('DOMContentLoaded', () => {
        initApp();
        const form = formUI.form;

        //Events
        form.addEventListener('submit', (e) => {
                e.preventDefault();
                onFormSubmit();
        })

        // Handlers
        async function initApp() {
                await locations.init();
                formUI.setAutocompleteData(locations.shortCitiesList);
                initDropDown();
                //Debug
                console.log('Cities:\n');
                console.log(api.cities())
                console.log('Countries:\n');
                console.log(api.countries())
                console.log('Prices:\n');
                console.log(api.prices())
                console.log('Airlines:\n');
                console.log(api.airlines())
                console.log('ShortCitiesList:\n');
                console.log(locations.shortCitiesList);
                //Debug
                console.log('Locations:\n');
                console.log(locations)
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

                //console.log(locations.lastSearch);
                ticketsUI.renderTickets(locations.lastSearch);
        }

        function initDropDown() {
                let elems = document.querySelectorAll('.dropdown-favorites');
                console.log(elems)
                let instances = M.Dropdown.init(elems);
        }
})