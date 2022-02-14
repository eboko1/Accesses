class LaborDetails {

    openPage = () =>{
        cy.wait(3000)
        cy.get('h1').should('have.text','Деталі в роботі')
        cy.get('.anticon-calendar').first().click({force: true}) // фільтр дата
          .then(()=>{
            cy.wait(2000)
            cy.get('.ant-btn').contains('Рік').trigger('mouseover')  /// Рік
            cy.get('.ant-dropdown-menu > :nth-child(1) > span').first().click({force: true}) // Фільтри поточний рік
            cy.wait(2000)
            cy.get('tr > td').should('not.have.text','')
            cy.get('.styles-m__headerContorls---2pU_V > .ant-radio-group > :nth-child(2)').click()
            cy.get('tr > td').should('not.have.text','')
            cy.get('.anticon-sort-ascending').first().click({force: true})
            cy.wait(1000)
            cy.get('.ant-tabs-tabpane-active > .ant-table-wrapper').should('exist');
            cy.wait(1000)
            cy.get('.ant-dropdown-menu-item').eq(5).click()  //Сортування за постачальником  //ant-dropdown-menu-title-content
            cy.get('tr > td').should('not.have.text','')
          })
    }
}

export default  LaborDetails 