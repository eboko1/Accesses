class NavigationPage {

    openNavigation = (nameBtn, nameHeader) => {
        cy.wait(2000)
        cy.get('.ant-btn').contains(nameBtn).click({force: true})
        cy.wait(2000)
        cy.get('h1').should('have.text',nameHeader)
    }
}

export default NavigationPage