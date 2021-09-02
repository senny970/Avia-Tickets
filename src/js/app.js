import api from '../js/services/apiService';

api.countries().then(res => console.log(res));