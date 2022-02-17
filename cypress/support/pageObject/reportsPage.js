const path = require("path");

class ReportsPage {

    checkDownloadFile = (nameButton, nameModal, nameFile) => {
        cy.get('.ant-btn').contains(nameButton).click({force: true})
        cy.wait(3000)
        cy.get('.ant-modal-header').should('exist')
        cy.get('.ant-modal-header').should('have.text', nameModal)
        cy.get('.ant-modal-footer > .ant-btn-primary').last().click({force: true})
        cy.wait(6000)
        cy.readFile(path.join('cypress/downloads', nameFile+'.xlsx')).should("exist")    
        cy.wait(5000)
    }
}

export default ReportsPage