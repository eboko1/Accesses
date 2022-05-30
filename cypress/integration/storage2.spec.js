/// <reference types="cypress" />
import ProfilePage from '../support/pageObject/profilePage';
import LoginPage from '../support/pageObject/loginPage';
import OrderPage from '../support/pageObject/orderPage';
import BaseStorage from '../support/pageObject/storage/baseStorage';

const profilePage = new ProfilePage();
const loginPage = new LoginPage();
const orderPage = new OrderPage();
const baseStorage = new BaseStorage();

const path = require("path");

var date = new Date();
const client = 'Client'
const idProduct ='www'+'8989'

const idNewProduct ='XXX'+date.getDate()+date.getMonth()+date.getMinutes()+date.getSeconds();

describe ('Складські документи 2 ', function(){
    const login = (email, password) =>{
        cy.session([email, password], () => { 
          cy.visit('/')
          cy.get('#loginForm_login').type(email)
          cy.get('#loginForm_password').type(password)
          cy.get('button').click()
          cy.wait(7000)
          cy.get('img').eq(0).click({force: true}) //menu
          cy.getCookie('io')
        })
      }

    beforeEach('User Login ', function(){
        cy.viewport(1240,960) 
        login(Cypress.env('LoginMaster'), Cypress.env('pw'))  // test
    })

    it('Профіль вибір українського інтерфейсу', function(){
        cy.visit('/') 
        profilePage.choiceLanguage(1)
    })

    it('OUT / Витрати Товару / Продаж Клієнту через +',  function(){
        cy.visit('/new-document')
        baseStorage.openDocsPlus(15);
        baseStorage.fillingFormClient(idProduct, 'Продаж', client)
    })

    it('OUT / Додавання ЗЧ', function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(15);
        baseStorage.openListDocs()
        baseStorage.addProductInDocCatalog(idProduct, '111.2', 281.5)
        cy.reload()
        baseStorage.addProductInDocCatalog(idProduct, '222.4', 151.5)
    })

    it('OUT / Додавання Нового Товару ч/з Складські документи', function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(15);
        baseStorage.openListDocs()
        cy.get('[data-qa="doc_products_table.add_btn"]').click({force: true})
        cy.wait(3000)
        cy.get('.ant-input').eq(0).should('have.text','')
        cy.wait(2000)
        cy.get('.ant-modal-body').find('.ant-select-selector').first().type(idProduct)
        cy.get('.ant-modal-content').find('.ant-select-selector').eq(1).type('ABEX{enter}')
        cy.get('.ant-modal-footer > .ant-btn-primary').first().click({force: true})
        cy.wait(2000)
        cy.get('.ant-modal').last().should('have.text','Даного товару немає в довіднику товарів. Додати?СкасуватиГаразд')
        cy.get('.ant-btn-primary').last().click({force: true})
        cy.wait(2000)
        cy.get('.ant-modal').contains('Додати продукт').should('exist')
    })

    it('OUT / Перевід в статус враховано Витрати Товару / Продаж Клієнту',  function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(15);
        baseStorage.openListDocs()
        baseStorage.successDocsModal();
    })

    // // // // it('OUT /  Відсутність Боргу / Картка Клієнта', function() {
    // // // //     cy.visit('/storage-incomes')
    // // // //     baseStorage.cardSupplierCredit(supplierSystem)
    // // // // })

    // // // // it('OUT /  Відсутність Заборгованості Клієнта в Дебіторка/Бухгалтерія',  function() {
    // // // //     cy.visit('/receivables_and_payables')
    // // // //     baseStorage.checkCreditPage(supplierSystem,'Даних немає')   
    // // // // })
      
    it('OUT / Оплата / Продаж Клієнту ',  function() { // Товар наявний на Складі
        cy.visit('/new-document')
        baseStorage.openDocsBtn(15);
        baseStorage.payOrder()
    })

    it('OUT / Перевірка 0 Залишку, Закуп.та Продж. Суми Витрати Товару / Продаж Клієнту ',  function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(15);
        baseStorage.checkSellingDoc()
        baseStorage.checkPurchaseDoc()
    })

    it('OUT / Завантаження документа .pdf ',  function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(15);
        baseStorage.downloadPDF();
    })

    it('OUT / Завантаження документа .xlsx', function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(15);
        baseStorage.downloadXML();
    })

    it('OUT / Відображення документа в списку Витрати Товару / Продаж Клієнту / Пошук по номеру документа /  ',  function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(15);
        baseStorage.showDocsInList();
    })

    it('OUT / Створення документа Витрати Товару / Продаж Клієнту через кнопку Додати',  function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(15);
        baseStorage.createDocsByBtnAdd('Продаж');
    })

    it(' CRT / Прихід Товару / Повернення від Клієнта через +',  function(){
        cy.visit('/new-document')
        baseStorage.openDocsPlus(17);
        baseStorage.fillingFormClient(idProduct, 'Повернення від клієнта', client)
    })

    it('CRT / Додавання ЗЧ через модалку Каталог / Повернення від Клієнта',  function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(17);
        baseStorage.openListDocs()
        baseStorage.addProductInDocCatalog(idProduct, '111.9','1');
        baseStorage.addProductInDocCatalog(idProduct, '11.9','1');
    })

    it('CRT / Перевід в статус враховано Прихід Товару / Повернення від клієнта ',  function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(17);
        baseStorage.openListDocs();
        baseStorage.successDocs();
    })

    it('CRT / Оплата / Прихід Товару / Повернення від клієнта ', function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(17);
        cy.get('tr > td > a').first().click({force: true})
        cy.wait(2000);
        cy.get('.anticon-dollar').last().click({force: true})
        cy.wait(2000);
        cy.get('.ant-modal-header').contains('Касовий ордер')
        cy.wait(2000);
        cy.get('.ant-btn').contains('Додати').click({force: true})
        cy.wait(2000);
    })

    it('CRT / Перевірка 0 Залишку, Закуп.Суми / Прихід Товару / Повернення від клієнта ', function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(17);
        baseStorage.checkSellingDoc()
    })

    it('CRT / Завантаження документа .pdf',  function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(17);
        baseStorage.downloadPDF();
    })

    it('CRT / Завантаження документа .xlsx',  function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(17);
        baseStorage.downloadXML();
    })

    it('CRT / Відображення документа в списку Прихід Товару / Повернення від клієнта / Пошук по номеру документа /  ', function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(17);
        baseStorage.showDocsInList();
    })

    it('CRT / Створення документа Прихід Товару / Повернення від клієнта через кнопку Додати',  function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(17);
        baseStorage.createDocsByBtnAdd('Повернення від клієнта');
   })

    it(' STP / Плюс по Інвент. / через +',  function(){
        cy.visit('/new-document')
        baseStorage.openDocsPlus(14);
        cy.get('.ant-input').eq(2).type('Коментарій Плюс по Інвент.').should('have.text','Коментарій Плюс по Інвент.')
        cy.get('.ant-input').eq(1).type(idProduct)
        cy.wait(2000);
        cy.get('.ant-badge > .anticon').last().click({force: true}) // дискетка 
    })

    it('STP / Додавання ЗЧ через модалку Каталог / Плюс/Надлишки по Інвент.',  function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(14);
        baseStorage.openListDocs();
        baseStorage.addProductInventDocs(idProduct);
    })

    it('STP / Перевід в статус враховано Плюс/Надлишки по Інвент.', function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(14);
        baseStorage.openListDocs();
        baseStorage.successDocs();
    })

    it('STP / Завантаження документа .pdf ',  function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(14);
        baseStorage.downloadPDF();
    })

    it('STP / Завантаження документа .xlsx',  function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(14);
        baseStorage.downloadXML();
    })

    it('STP / Відображення документа в списку Плюс/Надлишки по Інвент. (STP)',  function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(14);
        baseStorage.showDocsInList();
    })

    it('STP / Створення документа  Плюс/Надлишки по Інвент. ерез кнопку Додати',  function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(14);
        baseStorage.createDocsByBtnAdd('Надлишки по iнвент.');
    })
  
    it(' STM / Мінус по Інвент. / через +',  function(){
        cy.visit('/new-document')
        baseStorage.openDocsPlus(19);
       ///// cy.get('.ant-select-selection-search').eq(2).should('have.text','Недостача по iнвент.')
        cy.get('.ant-input').eq(2).clear().type('Коментарій Мінус по Інвент.').should('have.text','Коментарій Мінус по Інвент.')
        cy.get('.ant-input').eq(1).type('STM'+idProduct)
        cy.wait(2000);
        cy.get('.ant-badge > .anticon').last().click({force: true}) // дискетка 
        cy.wait(2000);
       cy.get('h1 > span').contains('Нов.').should('exist')
    })

    it('STM / Додавання ЗЧ через модалку Каталог Мінус/Недостача по Інвент.',  function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(19);
        baseStorage.openListDocs();
        baseStorage.addProductInDocCatalog(idProduct,'11')
          /// baseStorage.addProductInventDocs(idProduct);
    })

    it('STM / Оплата та Перевід в статус враховано Мінус/Недостача по Інвент.',  function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(19);
        baseStorage.openListDocs();
        baseStorage.successDocs();
    })

    it('STM / Завантаження документа .pdf ', function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(19);
        baseStorage.downloadPDF();
    })

    it('STM / Завантаження документа .xlsx',  function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(19);
        baseStorage.downloadXML();
    })

    it('STM / Відображення документа в списку Мінус/Недостача по Інвент.(STM)',  function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(19)
        baseStorage.showDocsInList();
    })

    it('STM / Створення документа Мінус/Недостача по Інвент.(STM)',  function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(19);
        baseStorage.createDocsByBtnAdd('Недостача по iнвент.');
    })

})
