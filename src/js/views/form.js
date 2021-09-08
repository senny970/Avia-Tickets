import {getAutocompleteInstance, getDatePickerInstance} from "../libs/materialize";

class FormUI {
    constructor(autocompleteInstance, datePickerInstance) {
        //Form elements
        this._form = document.forms['locationControls'];
        this.origin = document.getElementById('autocomplete-origin');
        this.destination = document.getElementById('autocomplete-destination');
        this.datepickerDepart = document.getElementById('datepicker-depart');
        this.datepickerReturn = document.getElementById('datepicker-return');
        //Instances
        this.originAutocomplete = autocompleteInstance(this.origin);
        this.destinationAutocomplete = autocompleteInstance(this.destination);
        this.departDatePicker = datePickerInstance(this.datepickerDepart);
        this.returnDatePicker = datePickerInstance(this.datepickerDepart);
    }

    get form() {
        return this._form;
    }

    setAutocompleteData(data) {
        this.originAutocomplete.updateData(data);
        this.destinationAutocomplete.updateData(data);
    }
}

const formUI = new FormUI(getAutocompleteInstance, getDatePickerInstance);

export default formUI;
