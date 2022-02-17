const path = require("path");

class BaseStorage {

    openDocsBtn = (numberBtn) => { // відкриття вже створеного дока
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get('button').eq(numberBtn).click({force: true})
        cy.wait(3000)
    }

    openDocsPlus = (numberPlus) => {  // відкриття новаго дока
        cy.contains('Швидка навігація').click({force: true})
        cy.wait(1000)
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get('.anticon-plus').eq(numberPlus).click({force: true})
        cy.wait(3000)
    }

    fillingForm=(idProduct, nameDocs) => { // заповнення даними docs
        cy.get('.ant-select-selection-item').eq(1).should('have.text', nameDocs)
        cy.get('.ant-select-selection-search').eq(3).type('Exist{enter}')
        cy.wait(2000);
        cy.get('.ant-input').eq(2).clear().type('Коментарій '+nameDocs).should('have.text','Коментарій '+nameDocs)
        cy.get('.ant-input').eq(1).type(idProduct)
        cy.get('.ant-select-selection-search').eq(6).type('{downarrow}{enter}') // Реквізити СТО
        cy.wait(2000);
        cy.get('.ant-select-selection-search').eq(7).type('{downarrow}{enter}')  // Реквізити Постачальника
        cy.wait(2000);
        cy.get('.ant-badge > .anticon').last().click({force: true}) // дискетка 
        cy.wait(3000);
        cy.get('h1 > span').contains('Нов.').should('exist')
    }

    fillingFormClient=(idProduct, nameDocs, client) =>{
        cy.get('.ant-select-selection-item').eq(1).should('have.text',nameDocs)
        cy.get('.ant-select-selection-search').eq(3).type(client)
        cy.wait(2000);
        cy.get('.ant-select-item').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-input').eq(2).clear().type('Коментарій '+nameDocs).should('have.text','Коментарій '+ nameDocs)
        cy.get('.ant-input').eq(1).type(idProduct)
        cy.get('.ant-select-selection-search').eq(6).type('{downarrow}{enter}') 
        cy.wait(2000);
        cy.get('.ant-select-selection-search').eq(7).type('{downarrow}{enter}') 
        cy.wait(2000);
        cy.get('.ant-badge > .anticon').last().click({force: true}) // дискетка 
        cy.wait(3000);
        cy.get('h1 > span').contains('Нов.').should('exist')
    }

    createDocsByBtnAdd = (nameDocs) => { // додати док через кнопку додати список доків
        cy.get('.ant-btn').contains('Додати').click({force: true})
        cy.wait(2000)
        cy.get('.ant-select-selection-item').eq(1).should('have.text', nameDocs)
    }

    addProductInDocs=(idProduct, numCount) => {
        cy.get('tr > td > a').first().click({force: true})
        cy.wait(2000);
        cy.get('.anticon-plus').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-input').eq(0).should('have.text','')
        cy.get('.ant-modal-body').find('.ant-select-selector').first().type(idProduct) 
        cy.wait(2000);
        cy.get('.ant-modal-body').find('.ant-input-number').first().type('111.11')              // ціна
        cy.get('.ant-modal-body').find('.ant-input-number-input').eq(1).clear().type(numCount)    // кількість
        cy.get('.ant-modal-footer > .ant-btn-primary').first().click({force: true})
        cy.wait(2000);
    }

    addProductInventDocs = (idProduct) => {
        cy.get('tr > td > a').first().click({force: true})
        cy.wait(2000);
        cy.get('.anticon-plus').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-modal-body').find('.ant-select-selector').first().type(idProduct) 
        cy.get('.ant-modal-body').find('.ant-input-number').first().type('111.11') 
        cy.get('.ant-modal-body').last().find('.ant-input').eq(1).click({force: true})      // комірка
        cy.wait(2000);
        cy.get('tr > td > .ant-btn').first().click({force: true})                         ///комірка
        cy.wait(2000);
        cy.get('.ant-modal-footer > .ant-btn-primary').first().click({force: true})
        cy.wait(3000);
        cy.get('.ant-table-cell').should('not.have.text','')
    }
  
    successDocs = () => {  // перевід в статус враховано
        cy.get('tr > td > a').first().click({force: true}) // вибір зі списку
        cy.wait(3000);
        cy.get('div.ant-dropdown-trigger > span').click() /////////
        cy.wait(2000);
        cy.get('.ant-dropdown-menu-item').contains('Врах.').click()
        cy.wait(3000);
        cy.get('h1 > span').contains('Врах.').should('exist')
        cy.wait(3000);
    }

    showDocsInList= () => {
        cy.get('tr > td > a').first().invoke('text').then(text =>{
            cy.log(text)
            const numArr = text.split('-') 
            cy.get('.ant-input').last().type(numArr[numArr.length-1])
            cy.get('tr > td > a').first().invoke('text').then( textFind =>{
                expect(text).to.eq(textFind)
            })
        })
    }

    showCode = () => {
        cy.get('tr > td > a').first().click({force: true})
        cy.wait(2000);
        cy.get('[aria-label="barcode"]').first().click({force: true})          ///STP-4835-898989
        cy.wait(2000);
        cy.get('.ant-modal-body').find('.ant-input').eq(0).type('898989')
        cy.get('.ant-modal-footer > .ant-btn-primary').contains('Оновити').first().click({force: true})
        cy.wait(2000)
    }
  
    payOrder = () => {
        cy.get('tr > td > a').first().click({force: true})
        cy.get('.styles-m__header---2z2EP').find('.anticon-dollar').should('exist').first().click({force: true})
        cy.wait(2000)
        cy.get('.ant-modal-body').should('exist')
        cy.get('.ant-modal-footer').find('.ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('.styles-m__sumNumeral---KAUvr').find('span').last().should('have.text','0 грн.')
        cy.get('.styles-m__header---2z2EP').find('.anticon-close').click()
    }

    downloadXML = () => {
        cy.get('tr > td > a').first().invoke('text').then(text =>{
            cy.log(text)
            var numArr = text.split('-') 
            cy.get('.ant-input').last().type(numArr[numArr.length-1])
            cy.get('tr > td > a').first().invoke('text').then( textFind =>{
                expect(text).to.eq(textFind)
                cy.get('tr > td > a').first().click({force: true})
                cy.wait(3000)
                cy.get('.anticon-printer').first().click({force: true})
                cy.get('.ant-dropdown-menu-item').contains('XLSX').click({force: true});
                cy.wait(10000)
                cy.readFile(path.join('cypress/downloads', 'Store document report for '+numArr[numArr.length-1]+'.xlsx')).should("exist")
                cy.log('document-'+text+'.pdf')
            })
        })
     
    }

    downloadPDF =() => {
        cy.get('tr > td > a').first().invoke('text').then(text =>{
            cy.log(text)
            var numArr = text.split('-') 
            cy.get('.ant-input').last().type(numArr[numArr.length-1])
            cy.get('tr > td > a').first().invoke('text').then( textFind =>{
            expect(text).to.eq(textFind)
            cy.get('tr > td > a').first().click({force: true})
            cy.wait(3000)
            cy.get('.anticon-printer').first().click({force: true})
            cy.get('.ant-dropdown-menu-item').contains('Документ').click({force: true});
            cy.wait(10000)
            cy.readFile(path.join('cypress/downloads', 'document-'+text+'.pdf')).should("exist")
            cy.log('document-'+text+'.pdf')
            })
        })
     
    }
}

export default BaseStorage