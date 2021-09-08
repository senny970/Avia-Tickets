import locations from "./store/locations";
import '../css/style.css';
import './libs'; //import ./libs/index.js
import formUI from './views/form'

/*
locations.Init().then(res => {
        //console.log(res);
        console.log('Locations: \n');
        console.log(locations);
        console.log('\n');
        console.log('Countries UA:\n');
        console.log(locations.getCitiesByCountryCode('UA'));
        console.log('\n');
    }
);*/

document.addEventListener('DOMContentLoaded', () => {
        initApp();

        //Events

        // Handlers
        async function initApp() {
                await locations.init();
                formUI.setAutocompleteData(locations.shortCitiesList);
                console.log(locations)
        }
})