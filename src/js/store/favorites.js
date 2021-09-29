import locations from "./locations";
import currency from "../views/currency";

class Favorites {
    constructor(favoritesList) {
        this.favoriteBtn = null;
        this.favoritesTickets = [];
        this.getCurrencySymbol = null;
        this.dropDown = null;
        this.dropDownBtn = null;
        this.dropDownTicketDeleteBtn = null;
    }

    init() {
        this.favoriteBtn = document.querySelector('.tickets-sections .row');
        this.favoriteBtn.addEventListener('click', this.onAddToFavoriteHandler.bind(this));
        this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
        this.dropDown = document.querySelector('.dropdown-content');
        this.dropDownBtn = document.querySelector('.dropdown-favorites');
        this.dropDownBtnInstances = M.Dropdown.init(this.dropDownBtn);
        this.dropDownTicketDeleteBtn = document.querySelector('.dropdown-content');
        this.dropDownTicketDeleteBtn.addEventListener('click', this.onDeleteFormFavoriteHandler.bind(this));

        this.loadFavoritesTicketsFormLStorage();
    }

    addTicketToFavorite(ticketHash) {
        locations.lastSearch.forEach(ticket => {
            if (ticketHash === ticket.hash) {
                this.favoritesTickets.push(ticket);
            }
        });

        this.saveFavoritesTicketsToLStorage();
    }

    onAddToFavoriteHandler({target}) {
        if (target.classList.contains('add-favorite')) {
            let ticketHash = target.getAttribute(['ticket-hash']);
            target.classList.add('disabled');

            if (ticketHash) {
                this.addTicketToFavorite(ticketHash);
            }
        }
    }

    onDeleteFormFavoriteHandler({target}) {
        if (target.classList.contains('delete-favorite')) {
            let ticketHash = target.getAttribute(['ticket-hash']);

            if (ticketHash) {
                this.removeTicketFromDropDown(ticketHash);
            }
        }
    }

    saveFavoritesTicketsToLStorage() {
        this.favoritesTickets.forEach(ticket => {
            localStorage.setItem(ticket.hash, JSON.stringify(ticket));
        });

        this.addTicketsToDropDown();
    }

    loadFavoritesTicketsFormLStorage() {
        this.favoritesTickets = [];

        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i) === 'loglevel:webpack-dev-server') continue;

            let ticketString = localStorage.getItem(localStorage.key(i));
            let ticket = null;

            try {
                ticket = JSON.parse(ticketString);
            } catch (e) {
                console.log(e)
            }

            if (ticket && ticket.hash) this.favoritesTickets.push(ticket);
        }

        this.addTicketsToDropDown();
    }

    clearDropDown() {
        this.dropDown.innerHTML = '';
    }

    dropDownTicketTemplate(ticket, currency) {
        return `
             <div class="favorite-item d-flex align-items-start">
                <div class="ticket-img">
                    <img
                        src="${ticket.airline_logo}"
                        class="favorite-item-airline-img"
                    />
                </div>
                <div class="favorite-item-info d-flex flex-column">
                  <div
                    class="favorite-item-destination d-flex align-items-center"
                  >
                    <div class="d-flex align-items-center mr-auto">
                      <span class="favorite-item-city">${ticket.origin_name} </span>
                      <i class="medium material-icons">flight_takeoff</i>
                    </div>
                    <div class="d-flex align-items-center">
                      <i class="medium material-icons">flight_land</i>
                      <span class="favorite-item-city">${ticket.destination_name}</span>
                    </div>
                  </div>
                  <div class="ticket-time-price d-flex align-items-center">
                    <span class="ticket-time-departure">${ticket.departure_at}</span>
                    <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
                  </div>
                  <div class="ticket-additional-info">
                    <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
                    <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
                  </div>
                  <a
                    class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto"
                    ticket-hash=${ticket.hash}
                    >Delete</a
                  >
                </div>
              </div>
        `;
    }

    addTicketsToDropDown() {
        this.clearDropDown();

        if (this.favoritesTickets.length) {
            this.dropDownBtn.classList.remove('disabled');
        }

        let fragment = '';
        const currency = this.getCurrencySymbol();

        this.favoritesTickets.forEach(ticket => {
            const template = this.dropDownTicketTemplate(ticket, currency);
            fragment += template;
        });

        this.dropDown.insertAdjacentHTML('afterbegin', fragment);
    }

    removeTicketFromDropDown(ticketHash) {
        localStorage.removeItem(ticketHash);
        if (localStorage.length <= 1) this.dropDownBtn.classList.add('disabled');
        this.loadFavoritesTicketsFormLStorage();
    }
}


const favorites = new Favorites({});
export default favorites;