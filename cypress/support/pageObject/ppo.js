class PPO {
  
    checkDownloadSale =(nameFile,numberFile) => {
        const path = require("path");
        cy.readFile(path.join('cypress/downloads', nameFile+numberFile+'.pdf')).should("exist");
    }
    
    checkAvansListPPO =(type) => {
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(3)').first().should('have.text', type)  // тип операції
        cy.get('[data-row-key] > :nth-child(6)').first().should('have.text','100.00')  // загальнв сума авансу
        cy.get('[data-row-key] > .ant-table-row-expand-icon-cell > .ant-table-row-expand-icon').first().click({force: true})
        cy.get('.ant-table-content > .ant-table-body > table > .ant-table-tbody > .ant-table-row > :nth-child(2)').should('have.text','Авансова оплата за товар/послугу')
        cy.wait(2000)
    }

    openCashPPO =(row) => {
        cy.wait(2000)
        cy.get('tbody > tr').eq(row).find('button').first().click({ force: true })
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(5) > .anticon > svg > [d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"]')
        cy.get('.ant-input-number-input').clear().type(1999.99)
        cy.get('.ant-btn-primary').contains('Гаразд').click({ force: true })
        cy.wait(2000)

    }

    checkOpenCashPPO =() => {
        cy.get('[data-row-key] > :nth-child(3)').eq(1).should('have.text','OPEN_SHIFT')  // тип операції
    }

    checkCloseCashPPO =() => {
        
    }

    serviseInputCashPPO =(row) => {
        cy.get('tbody > tr').eq(row).find('button').eq(1).click({ force: true })
        cy.get('.ant-modal-header').contains('Касовий ордер')
        cy.get('.ant-input-number-input').clear().type('1234')
        cy.get('.ant-btn').contains('Додати').click({ force: true }) 
        cy.wait(3000)
    }

    serviseOutputCashPPO =(row) => {
        cy.get('tbody > tr').eq(row).find('button').eq(2).click({ force: true }) // 8й рядок 
        cy.get('.ant-modal-header').contains('Касовий ордер')
        cy.get('.ant-input-number-input').clear().type('100')
        cy.get('.ant-btn').contains('Додати').click({ force: true }) 
        cy.wait(2000)
    }
    
    checkServiseInputOutputCashPPO =(type) => {
        cy.get('[data-row-key] > :nth-child(3)').first().should('have.text', type)
    }
}

export default PPO