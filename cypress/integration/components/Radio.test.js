/// <reference types="Cypress" />

describe('Radio component', () => {
  beforeEach(() => {
    cy.visit('/form')
  })

  it('initial value', () => {
    cy.get('form:first .radio-group .radio')
      .eq(2)
      .should('have.class', 'radio--selected')
  })

  it('accessibility', () => {
    cy.get('form:first .radio-group')
      .focus()
      .type('{downarrow}')
    cy.get('.radio-group .radio:first').should('have.class', 'radio--selected')
  })
})
