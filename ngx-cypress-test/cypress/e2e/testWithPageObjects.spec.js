/// <reference types="cypress" />
import { navigateTo } from "../support/page_objects/navigationPage";
import { onFormLayout } from "../support/page_objects/formLayoutPage";
import { onDatePickerPage } from "../support/page_objects/datePickerPage";
import { onSmartTablePage } from "../support/page_objects/smartTable";

describe('Test with Page Objects', () => {

    beforeEach(() => {
        cy.openHomePage();
    })

    it('Verify navigation across the page', () => {
        navigateTo.formLayoutPage();
        navigateTo.datePickerPage();
        navigateTo.smartTablePage();
        navigateTo.toasterPage();
        navigateTo.tooltipPage();
    })

    it.only('Should submit Inline and Basic form and select tomorrow date in the calendar', () => {
        navigateTo.formLayoutPage();
        onFormLayout.submitInlineFormWithNameAndEmail('Abdul', 'razaqyaro@gmail.com');
        onFormLayout.submitBasicFormWithEmailAndPassword('kusi@gmail.com', '12345678');
        navigateTo.datePickerPage();
        onDatePickerPage.selectCommonDatepickerDateFromToday(1);
        onDatePickerPage.selectDatepickerWithRangeFromToday(7, 14);
        navigateTo.smartTablePage();
        onSmartTablePage.addNewRecordWithFirstAndLastName('Bliss', 'Armah');
        onSmartTablePage.updateAgeByFirstName('Bliss', 23);
        onSmartTablePage.deleteRowByRowIndex(1);
    })
})