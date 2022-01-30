

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })

Cypress.Commands.add('login', (baseUrl, username, password) => {
    cy.visit(baseUrl)
    cy.get('#login.ant-input').type(username)
    cy.get('#password').type(password)
    cy.get('button').click() 
})

 Cypress.Commands.add('logout', (baseUrl, username, password) => {
    cy.visit(baseUrl)
    cy.get('.anticon-appstore > svg').click() 
    cy.get('.ant-dropdown-menu > :nth-child(2)').click() 
 })
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
