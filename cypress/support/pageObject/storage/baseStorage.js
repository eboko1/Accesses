import { statSync } from "fs";
import { type } from "os";
import { listenerCount } from "process";

const path = require("path");

class BaseStorage {

    openDocsBtn = (numberBtn) => { 
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get('button').eq(numberBtn).click({force: true})
        cy.wait(4000)
    }

    openDocsPlus = (numberPlus) => { 
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get('.anticon-plus').eq(numberPlus).click({force: true})
        cy.wait(4000)
    }
    
    selectSupplier = (supplier) => {  
        cy.get('.ant-input').last().type(supplier)
        cy.wait(2000)
        cy.get('tr > td > a').first().click({force: true})
        cy.get('.ant-input').eq(1).should('have.value',supplier)
    }
    checkCardSupplier = (numberDoc) => { 
        cy.get('.ant-tabs-tab').contains('Борг').click({force:true})
        cy.get('.ant-input').last().type(numberDoc)
        cy.wait(1000)
        cy.get('.ant-table-row > :nth-child(8)').should('have.text','0 ')
    }

    fillingForm=(idProduct, nameDocs,nameSupplier,requisitesBusness) => { // заповнення даними docs
        cy.get('.ant-select-selection-item').eq(1).should('have.text', nameDocs)
        cy.get('.ant-select-selection-search').eq(3).type(nameSupplier+'{enter}')
        cy.wait(2000);
        cy.get('.ant-input').eq(2).clear().type('Коментарій '+nameDocs).should('have.text','Коментарій '+nameDocs)
        cy.get('.ant-input').eq(1).type(idProduct)
        cy.get('.ant-select-selection-search').eq(6).type('{enter}').should('not.be.empty') // Реквізити СТО
        cy.wait(2000);
        cy.get('.ant-select-selection-search').eq(7).type('{enter}')  // Реквізити Постачальника
        cy.wait(2000);
        cy.get('.ant-badge > .anticon').last().click({force: true}) // дискетка 
        cy.wait(3000);
        cy.get('h1 > span').contains('Нов.').should('exist')
    }

    fillingFormClient=(idProduct, nameDocs, client) =>{
        cy.get('.ant-select-selection-item').eq(1).should('have.text',nameDocs)
        cy.get('.ant-select-selection-search').eq(3).type(client).should('not.be.empty') 
        cy.wait(2000);
        cy.get('.ant-select-item').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-input').eq(2).clear().type('Коментарій '+nameDocs).should('have.text','Коментарій '+ nameDocs)
        cy.get('.ant-input').eq(1).type(idProduct).should('have.value', idProduct)
        cy.get('.ant-select-selection-search').eq(6).type('{downarrow}{enter}').should('not.be.empty')  
        cy.wait(2000);
        cy.get('.ant-select-selection-search').eq(7).type('{downarrow}{enter}').should('not.be.empty') 
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
    
    openListDocs = () => {    
        cy.get('tr > td > a').should('be.visible').first().click({force: true}) // вибір зі списку    
        cy.wait(3000);      
    }

    cardSupplierCredit = (supplierSystem) => {
     cy.get('tr > td > a').first().invoke('text')
          .then (text => {
            const idDoc = text.split('-')
            const numberDoc = idDoc[idDoc.length-1]
            cy.get('img').eq(0).click({force: true}) //menu
            cy.get('.ant-menu-submenu-title').contains('Довідник').click({force: true})
            cy.get('.ant-menu-item').contains('Довідники та налаштування').click({force: true})
            cy.get('button').contains('Постачальники').click({force: true})
            this.selectSupplier(supplierSystem)
            this.checkCardSupplier(numberDoc)
        })
    }

    checkCreditPage = (supplierSystem, message) => {
        cy.get('.ant-tabs-tab').contains('Кредиторка').click({force:true})
        cy.get('.ant-input').last().type(supplierSystem)
        cy.wait(1000)
        cy.get('.ant-empty-description').should('have.text',message)
    }

    checkPurchaseDoc = () => {
        cy.get('tr > td > a').first().click({force: true})
        cy.wait(2000);
        cy.get('[data-qa="remain_storage_document_form"]').should('have.text','Залишок0 грн.')
        cy.get('[data-qa="purchase_sum_storage_document_form"]').invoke('text').then( purchase_sum =>{
        const purchase = purchase_sum.replace(/[^0-9,]/g, '');
            cy.get('[data-qa="button_delete_post_storage_document_page"]').click()
            cy.get('[data-row-key] > :nth-child(5) > span').first().should('have.text', purchase +' грн.')
        })    
    }

    checkSellingDoc = () => {
        cy.get('tr > td > a').first().click({force: true})
        cy.wait(2000);
        cy.get('[data-qa="remain_storage_document_form"]').should('have.text','Залишок0 грн.')
        cy.get('[data-qa="selling_sum_storage_document_form"]').invoke('text').then( selling_sum =>{
            const selling = selling_sum.replace(/[^0-9,]/g, '');
            cy.get('[data-qa="button_delete_post_storage_document_page"]').click()
            cy.get('[data-row-key] > :nth-child(6) > span').first().should('have.text',selling +' грн.')
        })    
    }

    addProductInDocCatalog = (idProduct, priceSelling, quantity) => {
        cy.get('[data-qa="doc_products_table.add_btn"]').click({force: true})
        cy.wait(3000)
        cy.get('.ant-input').eq(0).should('have.text','')
        cy.wait(2000)
        cy.get('.ant-modal-body').find('.ant-select-selector').first().type(idProduct)
        cy.get('.ant-btn-icon-only').last().click({force: true}) // btn catalog
        cy.get('.ant-input-wrapper > .ant-input-affix-wrapper > .ant-input').should('have.value',idProduct)
        cy.get('[data-qa="button_handle_ok_select_order_detail_modal"]').first().click({force: true}) //модалка Каталог ЗЧ btn OK
        cy.wait(2000)
        cy.get('.ant-input-number-input').eq(0).clear().type(priceSelling)
       /// cy.get('.ant-modal-body').find('.ant-input-number').first().clear().type(priceSelling)// Закуп.сума
        ////// cy.get('.ant-modal-body').find('.ant-input-number-input').eq(1).clear()
        ///cy.get('.ant-modal-body').find('.ant-input-number-input').type(quantity)    // кількість
        cy.get('.ant-modal-footer > .ant-btn-primary').first().click({force: true})
        cy.wait(3000);
    }

    addProductInventDocs = (idProduct) => {
        cy.get('[data-qa="doc_products_table.add_btn"]').click({force: true})
        cy.wait(3000)
        cy.get('.ant-input').eq(0).should('have.text','')
        cy.wait(2000)
        cy.get('.ant-modal-body').find('.ant-select-selector').first().type(idProduct)
        cy.get('.ant-btn-icon-only').last().click({force: true}) // btn catalog
        cy.get('.ant-input-wrapper > .ant-input-affix-wrapper > .ant-input').should('have.value',idProduct)
        cy.get('[data-qa="button_handle_ok_select_order_detail_modal"]').first().click({force: true}) //модалка Каталог ЗЧ btn OK
        cy.wait(2000);
        cy.get('.ant-modal-body').find('.ant-input').eq(3).click({force: true})  
        cy.wait(2000);
        cy.get('tr > td > .ant-btn').first().click({force: true})                         ///комірка
        cy.get('.ant-modal-footer > .ant-btn-primary').first().click({force: true})
        cy.wait(3000);
        cy.get('.ant-table-cell').should('not.have.text','')
        cy.wait(3000);
    }

    addProductInDocBORCatalog = (idProduct) => {
        cy.get('[data-qa="doc_products_table.add_btn"]').click({force: true})
        cy.wait(3000)
        cy.get('.ant-input').eq(0).should('have.text','')
        cy.wait(2000)
        cy.get('.ant-modal-body').find('.ant-select-selector').first().type(idProduct)
        cy.get('.ant-btn-icon-only').last().click({force: true}) // btn catalog
        cy.get('.ant-input-wrapper > .ant-input-affix-wrapper > .ant-input').should('have.value',idProduct)
        cy.get('[data-qa="button_handle_ok_select_order_detail_modal"]').first().click({force: true}) //модалка Каталог ЗЧ btn OK
        cy.wait(2000)
        cy.get('.ant-modal-footer > .ant-btn-primary').first().click({force: true})
        cy.wait(3000);
    }
  
    successDocs = () => {  // перевід в статус враховано
        cy.get('div.ant-dropdown-trigger > span').click() /////////
        cy.wait(2000);
        cy.get('.ant-dropdown-menu-item').contains('Врах.').click()
        cy.wait(3000);
        cy.get('h1 > span').contains('Врах.').should('exist')
        cy.wait(3000);
    }

    successDocsModal = () => {  // перевід в статус враховано модалка Оплати
        cy.get('div.ant-dropdown-trigger > span').click() /////////
        cy.wait(2000);
        cy.get('.ant-dropdown-menu-item').contains('Врах.').click()
        cy.wait(3000);
        cy.get('.ant-modal-body').contains('Так').click({force: true})
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
        cy.get('[data-qa="button_open_cash_order_modal_storage_document_page"]').should('be.visible')
        cy.wait(2000)
        cy.get('[data-qa="button_open_cash_order_modal_storage_document_page"]').first().click({force: true})
        cy.wait(2000)
        cy.get('.ant-modal-body').should('exist')
        cy.wait(3000)
        cy.get('.ant-modal-footer').find('.ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('[data-qa="remain_storage_document_form"]').should('have.text','Залишок0 грн.')
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
        cy.wait(2000)
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
                cy.wait(2000)
            })
        })
      
    }

    addProductWithStorage = (idProduct) => {
        cy.get('[data-qa="doc_products_table.add_btn"]').click({force: true})
        cy.wait(3000)
        cy.get('.ant-input').eq(0).should('have.text','')
        cy.wait(2000)
        cy.get('.ant-modal-body').find('.ant-select-selector').first().type(idProduct)
        cy.get('.ant-modal-content').find('.ant-select-selector').eq(1).type('ABEX{enter}')
        cy.wait(2000)
        cy.get('.ant-input-number-input').eq(0).clear().type('122.25')
        cy.get('.ant-modal-footer > .ant-btn-primary').first().click({force: true})
        cy.wait(2000)
        cy.get('.ant-modal').last().should('have.text','Даного товару немає в довіднику товарів. Додати?СкасуватиГаразд')
        cy.get('.ant-btn-primary').last().click({force: true})
        cy.wait(2000)
        cy.get('.ant-modal').contains('Додати продукт').should('exist')
        /////модалка товара/////
        cy.get('#StoreProductForm_code').should('have.value', idProduct)
        cy.get('#StoreProductForm_groupId').type('1020201')             // група ЗЧ
        cy.wait(2000);
        cy.get('.ant-select-tree-title').first().click({force: true})   // група ЗЧ
        cy.wait(2000);
        cy.get('#StoreProductForm_name').should('have.value', 'Автозапчастина')
        cy.get('.ant-modal').find('button').contains('Застосувати').click({force: true})   //.contains('Застосувати')
        cy.wait(2000);
    }
    
    copyStoreDoc = (copyType) => {
        cy.get('h1').should('be.visible')
        cy.get('[data-qa="button_copy_document_storage_document_page"]').should('be.visible').click({force: true})
        cy.get('.ant-select-selection-item').last().click({force: true}) 
        cy.wait(2000)
        cy.get('.ant-select-item-option-content').contains(copyType).click({force: true}) 
        cy.get('.ant-modal-footer').contains('Гаразд').click({force: true})
        cy.wait(2000)
        cy.get('h1').should('be.visible').invoke('text').then(text =>{
            var words = text.split(' ') 
            var typeDoc =  words[words.length-1].split('-')
            //cy.log('statuDoc = '+statuDoc +'typeDoc = '+typeDoc[0])
            expect(copyType).to.eq(typeDoc[0])
            expect('Нов.').to.eq(words[0])
        })

    }
    searchDoc = (nameDoc) => {
        cy.get('input').last().type(nameDoc)
    }
}

export default BaseStorage