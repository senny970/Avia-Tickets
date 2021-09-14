class CurrencyUI {
    constructor() {
        this.currency = document.getElementById('currency');
        this.dictonary = {
            USD: '$',
            EUR: '€',
        };
    }

    get currencyValue() {
        return this.currency.value;
    }

    getCurrencySymbol() {
        return this.dictonary[this.currencyValue];
    }
}

const currencyUI = new CurrencyUI();

export default currencyUI;