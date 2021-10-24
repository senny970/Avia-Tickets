describe('Form', () => {
  it('When visiting the home page, the form is visible', () => {
    cy.visit('http://localhost:9000/')
    cy.get('[data-hook=mainForm]').should('be.visible')
  })

  it('When typing a value into origin city autocomplete, this autocomplete is visible and has typed value', () => {
    cy.get('[data-hook=autocompleteOrigin]').as('autocompleteOrigin')

    cy.get('@autocompleteOrigin').should('be.visible')
    cy.get('@autocompleteOrigin').type('Харьков,Украина')
    cy.get('@autocompleteOrigin').click()
    cy.get('@autocompleteOrigin').should('have.value', 'Харьков,Украина')

  })

  it('When typing a value into destination city autocomplete, this autocomplete is visible and has typed value', () => {
    cy.get('[data-hook=autocompleteDestination]').as('autocompleteDestination')

    cy.get('@autocompleteDestination').should('be.visible')
    cy.get('@autocompleteDestination').type('Киев,Украина')
    cy.get('@autocompleteDestination').click()
    cy.get('@autocompleteDestination').should('have.value', 'Киев,Украина')
  })

  it('When clicking on the depart datepicker the datepicker modal should opens', () => {
    cy.get('[data-hook=datePickerDepartInput]').as('datePickerDepartInput')
    cy.get('[data-hook=datePickerDepartWrap] .datepicker-container').as('modalWindow')

    cy.get('@datePickerDepartInput').click()
    cy.get('@modalWindow').should('be.visible')
  })

  it('After selecting the departing date, it should be displayed in the input field in the right format', () => {
    cy.get('[data-hook=datePickerDepartWrap] .datepicker-container .is-today').as('today')
    cy.get('[data-hook=datePickerDepartWrap] .datepicker-container .btn-flat').as('modalButtons')
    cy.get('[data-hook=datePickerDepartInput]').as('datePickerDepartInput')

    cy.get('@today').click()
    cy.get('@today').should('have.class', 'is-selected')
    cy.get('@modalButtons').contains('Ok').click()

    cy.get('@datePickerDepartInput').then(($input) => {
      const val = $input.val()
      // 2020-11
      expect(val).to.match(/^\d{4}-\d{2}$/)
    })
  })

  it('When clicking on the depart datepicker the datepicker modal should opens', () => {
    cy.get('[data-hook=datePickerReturnWrap]').as('datePickerReturnInput')
    cy.get('[data-hook=datePickerReturnWrap] .datepicker-container').as('modalWindow')

    cy.get('@datePickerReturnInput').click()
    cy.get('@modalWindow').should('be.visible')
  })

  it('After selecting the return date, it should be displayed in the input field in the right format', () => {
    cy.get('[data-hook=datePickerReturnWrap] .datepicker-container .is-today').as('today')
    cy.get('[data-hook=datePickerReturnWrap] .datepicker-container .btn-flat').as('modalButtons')
    cy.get('[data-hook=datePickerReturnInput]').as('datePickerReturnInput')

    cy.get('@today').click()
    cy.get('@today').should('have.class', 'is-selected')
    cy.get('@modalButtons').contains('Ok').click()

    cy.get('@datePickerReturnInput').then(($input) => {
      const val = $input.val()
      // 2020-11
      expect(val).to.match(/^\d{4}-\d{2}$/)
    })
  })

  // Currency testing
  it('When selecting the currency from the header dropdown it should be changed and visible in the header', () => {
    cy.get('[data-hook=currencySelect] .dropdown-trigger').as('currencyTrigger')
    cy.get('[data-hook=currencySelect] .dropdown-content li').as('currencyItem')

    cy.get('@currencyTrigger').click()
    cy.get('@currencyItem').contains('€ Euro').click()
    cy.get('@currencyTrigger').should('have.value', '€ Euro')
  })

  it('After filling in all the form fields, press the search button', () => {
    cy.get('[data-hook=searchButton]').as('searchTrigger')
    cy.get('@searchTrigger').click()
  })

  it('Check for render cards', () => {
    cy.get('[data-hook="cardsWrap"]').as('cardsWrapTrigger')
    cy.get('@cardsWrapTrigger').children()
  })
})