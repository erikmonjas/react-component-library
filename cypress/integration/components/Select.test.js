/// <reference types="Cypress" />

describe('Select component', () => {
  beforeEach(() => {
    cy.visit('/form');
  });

  it('initial value, has content, has error', () => {
    cy.get('#select')
      .parent()
      .focus()
      .should('have.class', 'select--active')
      .blur()
      .should('have.class', 'select--has-error');

    cy.get('#disabledSelect p').should('have.text', 'Option 1');
  });

  it('accessibility', () => {
    cy.get('#select')
      .parent()
      .focus()
      .type('{enter}')
      .type('{downarrow}')
      .type('{downarrow}')
      .type('{downarrow}')
      .type('{enter}');
    cy.get('#select p').should('have.text', 'Option 2');

    cy.get('#select')
      .parent()
      .focus()
      .type('{enter}')
      .type('{uparrow}')
      .type('{enter}');
    cy.get('#select p').should('have.text', 'Option 1');
  });
});
