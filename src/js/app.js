import locations from "./store/locations";
import '../css/style.css';
import './libs'; //import ./libs/index.js

locations.Init().then(res => {
        //console.log(res);
        console.log('Locations: \n');
        console.log(locations);
        console.log('\n');
        console.log('Countries UA:\n');
        console.log(locations.getCitiesByCountryCode('UA'));
        console.log('\n');
    }
);