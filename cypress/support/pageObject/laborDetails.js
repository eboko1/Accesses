class LaborDetails {

    openPage = () =>{
        cy.wait(3000)
        cy.get(':nth-child(5) > a').first().click({force: true})
          .then(()=>{
            cy.get('.styles-m__minimized---2nM6M > .ant-btn').click() // фільтр дата /spare-parts-workplace
            cy.wait(2000)
            cy.get('.styles-m__filterDateButtons---QBBQy > :nth-child(5)').click({force: true}) // фільтр Рік
            cy.wait(5000)
            cy.get('.ant-dropdown-menu > :nth-child(1) > span').first().click({force: true}) // Фільтри поточний рік
            cy.get('.styles-m__headerContorls---2pU_V > .ant-radio-group > :nth-child(2)').click()
            cy.get('.anticon-sort-ascending').first().click({force: true})
            cy.wait(2000)
            cy.get('.ant-dropdown-menu > :nth-child(2) > div').first().click({force: true})
            cy.wait(2000)
            cy.get('.ant-tabs-tabpane-active > .ant-table-wrapper').should('exist');
            cy.wait(2000)
            cy.get('.anticon-sort-ascending').click() //Сортування за постачальником
            cy.get('.ant-dropdown-menu > :nth-child(2) > div > span').click({force: true})
            cy.get('[data-row-key] > :nth-child(2)').should('exist');
          })
    }
}

export default  LaborDetails 