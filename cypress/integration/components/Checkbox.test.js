/// <reference types="Cypress" />

describe('Checkbox component', () => {
  beforeEach(() => {
    cy.visit('/form')
  })

  it('initial value, selected', () => {
    cy.get('#otherCheckbox')
      .parent()
      .should('not.have.class', 'checkbox--checked')

    cy.get('#otherCheckbox')
      .siblings('label')
      .focus()
      .parent()
      .should('have.class', 'checkbox--active')
  })

  it('accessibility, change value, error message', () => {
    cy.get('#otherCheckbox')
      .siblings('label')
      .focus()
      .type('{enter}')
      .parent()
      .should('have.class', 'checkbox--checked')

    cy.get('#otherCheckbox')
      .siblings('label')
      .focus()
      .type('{enter}')
      .parent()
      .should('not.have.class', 'checkbox--checked')
      .children('label')
      .blur()
      .parent()
      .should('have.class', 'checkbox--has-error')

    cy.get('#otherCheckbox')
      .siblings('.checkbox__error-message')
      .should('exist')
  })
})
