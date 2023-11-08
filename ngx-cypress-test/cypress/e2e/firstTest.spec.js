/// <reference types="cypress" />

describe('First test suite', () =>{
    it('first test', () =>{
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();
        // by Tag name
        cy.get('input');

        // by Id
        cy.get('#inputEmail1');

        //by Class
        cy.get('.input-full-width')

        //by Attribute name
        cy.get('[fullwidth]');

        // by attribute name and value
        cy.get('[placeholder="Email"]');

        cy.get('[class="input-full-width size-medium shape-rectangle"]');

        // by two attibutes
        cy.get('[placeholder="Email"][fullwidth]')

        // by tag, attribute and class
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

        //by cypress test ID
        cy.get('[data-cy="imputEmail1"]');


    })
    it('Second test', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

         //Theory
    // get() - find elements on the page by locator globally
    // find() - find child elements by locator
    // contains() - find HTML text and by text and locator

        cy.contains('[status="primary"]','Sign in')
        cy.contains('nb-card','Horizontal form').find('button');
        cy.contains('nb-card','Horizontal form').find('input[placeholder="Email"]')
        cy.contains('nb-card', 'Horizontal form').contains('Sign in')

        // cypress chains and DOM

        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain','Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()   
    })

    it('then and wrap methods', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();
        // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain','Email')
        // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain','Password')
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address');
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password');
        
        //selenium
        // const firstForm = cy.contains('nb-card', 'Using the Grid');
        // const secondForm = cy.contains('nb-card', 'Basic form');

        // firstForm.find('[for="inputEmail1"]').should('contain', 'Email');
        // firstForm.find('[for="inputPassword2"]').should('contain','Password');
        // secondForm.find('[for="exampleInputEmail1"]').should('contain', 'Email address');
        // secondForm.find('[for="exampleInputPassword1"]').should('contain', 'Password');
        
        //cypress style
        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
           const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
           const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text();
           expect(emailLabelFirst).to.equal('Email');
           expect(passwordLabelFirst).to.equal('Password');
           cy.contains('nb-card', 'Basic form').then(secondForms => {
            const passwordLabelSecond = secondForms.find('[for="exampleInputPassword1"]').text();
            expect(passwordLabelFirst).to.equal(passwordLabelSecond);
           })
           cy.wrap(firstForm).find('[for="inputPassword2"]').should('contain', 'Password');
        })
        cy.contains('nb-card', 'Basic form').then(secondForm => {
            const emailLabelSecond = secondForm.find('[for="exampleInputEmail1"]').text();
            const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text();
            expect(emailLabelSecond).to.equal('Email address');
            expect(passwordLabelSecond).to.equal('Password'); 
        })
   
   
    })

    it('invoke command', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        //1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address');

        //2
        cy.get('[for="exampleInputEmail1"]').then(label => {
            const labelText = label.text();
            expect(labelText).to.equal('Email address');
            cy.wrap(labelText).should('contain', 'Email address');
        })

        //3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address')
        })
        cy.get('[for="exampleInputEmail1"]')
        cy.contains('nb-card', 'Basic form')
             .find('nb-checkbox')
             .click()
             .find('.custom-checkbox')
             .invoke('attr', 'class')
             //.should('contain', 'checked');
             .then(classValue => {
                expect(classValue).to.contain('checked');
             })
        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then(classValue => {
                expect(classValue).to.equal('label');
         })

         //invoke a property
         cy.get('#exampleInputEmail1').type('razaqyaro@gmail.com');
         cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', 'razaqyaro@gmail.com').then(property => {
            expect(property).to.equal('razaqyaro@gmail.com');
         });
    })

    it('radio buttons', () =>{
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();
        
        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
            cy.wrap(radioButtons).eq(0).check({force: true}).should('be.checked');
            cy.wrap(radioButtons).eq(1).check({force: true})
            cy.wrap(radioButtons).eq(0).should('not.be.checked');
            cy.wrap(radioButtons).eq(2).should('be.disabled');
        })
    })
    
    it('checkboxes', () => {
        cy.visit('/');
        cy.contains('Modal & Overlays').click();
        cy.contains('Toastr').click();

        cy.get('[type="checkbox"]').check({force: true});
        cy.get('[type="checkbox"]');
    })
    it('Date pickers', () => {
       
        function selectDayFromCurrent(day){
            let date = new Date();
            date.setDate(date.getDate() + day);
            let futureDay = date.getDate();
            let futureMonth = date.toLocaleDateString('en-US', {month: 'short'});
            let futureYear = date.getFullYear();
            let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`;
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
                if(!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)){
                    cy.get('[ng-reflect-pack="nebular-essentials"]').eq(9).click();
                    selectDayFromCurrent(day);
                }else{
                    cy.get('.day-cell').not('.bounding-month').contains(futureDay).click();
                }
            })
            return dateToAssert;
        }
   
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Datepicker').click();
        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
         cy.wrap(input).click();
         const dateToAssert = selectDayFromCurrent(400);
         cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert);
         cy.wrap(input).should('have.value', dateToAssert);
       });
       
    })
    it('Drop down and List', () => {
        cy.visit('/');

        //1
        cy.get('nav nb-select').click();
        cy.get('.options-list').contains('Dark').click();
        cy.get('nav nb-select').should('contain', 'Dark');

        //2
        cy.get('nav nb-select').then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.options-list nb-option').each((listItem, index) => {
                const itemText = listItem.text().trim();
                cy.wrap(listItem).click();
                cy.wrap(dropdown).should('contain', itemText);
                if(index < 3){
                    cy.wrap(dropdown).click();
                }
            })
        })
    })

    it('Web table', ()=> {
        cy.visit('/');
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();

        //1 Get the role by test
        cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click();
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('42');
            cy.wrap(tableRow).find('.nb-checkmark').click();
            cy.wrap(tableRow).find('td').eq(6).should('contain', '42');
 
        })

        // 2 Get a row by index
        cy.get('thead').find('.nb-plus').click();
        cy.get('thead').find('tr').eq(2).then(tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Abdul-Razak');
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Hussein');
            cy.wrap(tableRow).find('[placeholder="Username"]').type('razzy');
            cy.wrap(tableRow).find('[placeholder="E-mail"]').type('razaqyaro@gmail.com');
            cy.wrap(tableRow).find('[placeholder="Age"]').type('76');
            cy.wrap(tableRow).find('.nb-checkmark').click();
        })

        cy.get('tbody tr').first().find('td').then(tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', 'Abdul-Razak');
            cy.wrap(tableColumns).eq(3).should('contain', 'Hussein');
            cy.wrap(tableColumns).eq(4).should('contain', 'razzy');
            cy.wrap(tableColumns).eq(5).should('contain', 'razaqyaro@gmail.com');
            cy.wrap(tableColumns).eq(6).should('contain', '76');
        })

        // Get each role validation
        const age = [20, 30, 40, 200];
        cy.wrap(age).each(age => {
            cy.get('thead [placeholder="Age"]').clear().type(age);
            cy.wait(500);
            cy.get('tbody tr').each(tableRow => {
                if(age == 200){
                    cy.wrap(tableRow).should('contain', 'No data found');
                }else{
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age);
                }
            })
        })
       

    })

    it('Tooltip', () => {
        cy.visit('/');
        cy.contains('Modal & Overlays').click();
        cy.contains('Tooltip').click();
        cy.contains('nb-card', 'Colored Tooltips')
            .contains('Default').click();
        cy.get('nb-tooltip').should('contain', 'This is a tooltip');
    })

    it.only('Dialog box', () => {
        cy.visit('/');
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();

        //1
        cy.get('tbody tr').first().find('.nb-trash').click();
        cy.on('window:confirm', (confirm) => {
            expect(confirm).to.equal('Are you sure you want to delete?')
        })

        //2
        const stub = cy.stub();
        cy.on('window:confirm', stub);
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })
    })
})