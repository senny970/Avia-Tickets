import locations from "./store/locations";

locations.Init().then(res => {
        console.log(res);
        console.log(locations);
        console.log(locations.getCitiesByCountryCode('PE'));
    }
);