import locations from "./store/locations";
import '../css/style.css';
import './libs'; //import ./libs/index.js

locations.Init().then(res => {
        console.log(res);
        console.log(locations);
        console.log(locations.getCitiesByCountryCode('PE'));
    }
);