/// <reference types="Cypress" />

describe('Calendar component', () => {
  beforeEach(() => {
    cy.visit('/form');
  });

  it('initial value', () => {
    cy.get('#calendar1').should('have.value', '');
    cy.get('#calendar2').should('have.value', '10/07/19');
  });

  it('on focus input, on blur input', () => {
    cy.get('#calendar1')
      .focus()
      .parent()
      .parent()
      .should('have.class', 'calendar__input-wrapper--active')
      .get('#calendar1')
      .blur()
      .parent()
      .parent()
      .should('not.have.class', 'calendar__input-wrapper--active');
  });

  it('on press image button', () => {
    cy.get('.calendar:first .calendar__datepicker').should(
      'not.have.class',
      'calendar__datepicker--showing'
    );

    cy.get('.calendar:first .calendar__input-image')
      .click()
      .get('.calendar:first .calendar__datepicker')
      .should('have.class', 'calendar__datepicker--showing');

    cy.get('.menu')
      .click()
      .get('.calendar:first .calendar__datepicker')
      .should('not.have.class', 'calendar__datepicker--showing');
  });
});
