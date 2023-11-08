/// <reference types="cypress" />

describe('JSON objects', () => {

    it('JSON objects', () => {
        cy.openHomePage();

        const simpleObject = { "key1": "value1", "key2": "value2"};

        const simpleArrayOfValues = ["one", "two", "three"];

        const arrayOfObjects = [{"key1": "value1"}, {"key2": "value2"}, {"key3": "value3"}];

        const typesOfData = { "string": "this is a string", "number": 10};

        const mixedObject = {
            "FirstName": "Abdul",
            "LastName" : "Razak",
            "Age": 74,
            "Students": [
                {
                    "firstName": "Arthur",
                    "lastName": "Benjamin"
                },
                {
                    "firstName": "Bruce",
                    "lastName": "Wills"
                }
            ]
        }
        

        console.log(simpleObject.key2);
        console.log(simpleObject["key2"]);
        console.log(simpleArrayOfValues[1]);
        console.log(arrayOfObjects[0].key1);
        console.log(mixedObject.Students[0].lastName);
    })
    
   
})

