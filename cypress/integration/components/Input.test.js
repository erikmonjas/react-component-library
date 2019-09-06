/// <reference types="Cypress" />

describe('Input component', () => {
  beforeEach(() => {
    cy.visit('/form');
  });

  it('initial value, has-content', () => {
    cy.get('#text').should('have.value', 'Default value');

    cy.get('#otherText').should('have.value', '');

    cy.get('#text')
      .parent()
      .should('have.class', 'input--has-content');
  });

  it('focus / blur', () => {
    cy.get('#text')
      .focus()
      .parent()
      .should('have.class', 'input--active');

    cy.get('#text')
      .blur()
      .parent()
      .should('not.have.class', 'input--active');
  });

  it('correct', () => {
    cy.get('#otherText')
      .focus()
      .type('hi, user')
      .blur()
      .parent()
      .should('not.have.class', 'input--has-error');

    cy.get('#otherText')
      .focus()
      .clear()
      .blur()
      .parent()
      .should('not.have.class', 'input--has-error');

    cy.get('#requiredText')
      .focus()
      .type('hi, user')
      .blur()
      .parent()
      .should('not.have.class', 'input--has-error');

    cy.get('#number')
      .focus()
      .type('11')
      .blur()
      .parent()
      .should('not.have.class', 'input--has-error');
  });

  it('error', () => {
    cy.get('#otherText')
      .focus()
      .type('hello')
      .blur()
      .parent()
      .should('have.class', 'input--has-error');

    cy.get('#otherText')
      .focus()
      .clear()
      .type('hi')
      .blur()
      .parent()
      .should('have.class', 'input--has-error');

    cy.get('#requiredText')
      .focus()
      .blur()
      .parent()
      .should('have.class', 'input--has-error');

    cy.get('#number')
      .focus()
      .type('10')
      .blur()
      .parent()
      .should('have.class', 'input--has-error');
  });
});
