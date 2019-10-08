/// <reference types="Cypress" />

describe('Form component', () => {
  beforeEach(() => {
    cy.visit('/form')
  })

  it('submit, has errors', () => {
    cy.get('form:first').submit()

    cy.get('form:first .input--has-error').should('have.length', 2)

    cy.get('form:first .select--has-error').should('have.length', 1)

    cy.get('form:first .checkbox--has-error').should('have.length', 1)

    cy.get('form:first .calendar__input-wrapper--has-error').should(
      'have.length',
      1
    )
  })
})
