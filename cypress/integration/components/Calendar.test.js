import { timeToDate } from "../../../src/utils/date";

/// <reference types="Cypress" />

describe("Calendar component", () => {
  beforeEach(() => {
    cy.visit("/form");
  });

  const todayDate = timeToDate(
    "mmddyy",
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    )
  );

  it("initial value", () => {
    cy.get("#calendar1").should("have.value", "");
    cy.get("#calendar2").should("have.value", todayDate);

    cy.get("#calendar2")
      .parent()
      .parent()
      .parent()
      .find(".calendar__day--today")
      .should("have.class", "calendar__day--active");
  });

  it("on focus input, on blur input", () => {
    cy.get("#calendar1")
      .focus()
      .parent()
      .parent()
      .should("have.class", "calendar__input-wrapper--active")
      .get("#calendar1")
      .blur()
      .parent()
      .parent()
      .should("not.have.class", "calendar__input-wrapper--active");
  });

  it("on press image button", () => {
    cy.get(".calendar:first .calendar__datepicker").should(
      "not.have.class",
      "calendar__datepicker--showing"
    );

    cy.get(".calendar:first .calendar__input-image")
      .click()
      .get(".calendar:first .calendar__datepicker")
      .should("have.class", "calendar__datepicker--showing");

    cy.get(".menu")
      .click()
      .get(".calendar:first .calendar__datepicker")
      .should("not.have.class", "calendar__datepicker--showing");
  });

  const yesterdayDate = timeToDate(
    "ddmmyy",
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 1
    )
  );

  it("select day with click", () => {
    cy.get(".calendar")
      .eq(2)
      .find(".calendar__input-image")
      .click();

    cy.get(".calendar")
      .eq(2)
      .find(".calendar__datepicker")
      .find(".calendar__day--today")
      .prev()
      .click();

    cy.get("#calendar3").should("have.value", yesterdayDate);
  });

  it("error", () => {
    cy.get("#calendar1")
      .focus()
      .type("1")
      .blur()
      .siblings(".calendar__input-error-message")
      .should("have.text", "Invalid date");

    cy.get("#calendar1")
      .focus()
      .clear()
      .blur()
      .siblings(".calendar__input-error-message")
      .should("have.text", "Please, enter a date");

    cy.get("#calendar4")
      .focus()
      .clear()
      .type("05/07/19")
      .blur()
      .focus()
      .blur()
      .get(".calendar")
      .eq(3)
      .find(".calendar__input-error-message")
      .should("have.text", "Min date not reached");
  });
});
