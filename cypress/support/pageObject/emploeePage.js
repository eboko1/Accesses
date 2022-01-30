class EmploeePage {
   
    openEmploeeCard =() => {
        cy.get('.styles-m__employeeName---2QyjT').first().click({force: true})
        cy.wait(2000)
        cy.get('.ant-tabs').should('exist');
        cy.wait(2000)
        cy.get(':nth-child(1) > .ant-row > .ant-col-18').contains('Менеджерський доступ');
    }

    openEmploeeCardForCreate = () =>{
        cy.wait(2000)
        cy.get('.ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('.ant-form').should('exist');
        cy.get('#jobTitle').type('Test').should('exist');
    }
}

export default EmploeePage