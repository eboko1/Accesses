class DirectoriesPage {

    checkHeader = (nameButton, nameHeader) => {
        cy.get('.ant-btn')
          .contains(nameButton)
          .click({force: true});
        cy.wait(2000)
        cy.get('h1')
          .should('have.text', nameHeader);
    }
}

export default DirectoriesPage