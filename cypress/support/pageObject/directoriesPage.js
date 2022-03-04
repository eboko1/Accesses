class DirectoriesPage {

    checkHeader = (nameButton, nameHeader) => {
        cy.wait(2000)
        cy.get('.ant-btn')
          .contains(nameButton)
          .click({force: true});
        cy.wait(4000)
        cy.get('h1')
          .should('have.text', nameHeader);
    }
}

export default DirectoriesPage