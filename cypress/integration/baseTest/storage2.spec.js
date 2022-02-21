/// <reference types="cypress" />
import LoginPage from '../../support/pageObject/loginPage';
import OrderPage from '../../support/pageObject/orderPage';
import BaseStorage from '../../support/pageObject/storage/baseStorage';


const loginPage = new LoginPage();
const orderPage = new OrderPage();
const baseStorage = new BaseStorage();

const path = require("path");

var date = new Date();
const idProduct ='TEST'+'17154'
///const idProduct ='TEST'+date.getDate()+date.getMonth()+date.getMinutes()//+date.getSeconds();  // 

describe ('Складські документи ', function(){
    const login = (email, password) =>{
        cy.session([email, password], () => { 
          cy.visit('/')
          cy.get('#loginForm_login').type(email)
          cy.get('#loginForm_password').type(password)
          cy.get('button').click()
          cy.wait(7000)
          cy.getCookie('io')
        })
      }

    beforeEach('User Login ', function(){
        cy.viewport(1240,960) 
       //// login(Cypress.env('LoginMaster'), Cypress.env('pw'))
       login("my@admin.com", "123456")
    })
   
    it(' OUT / Витрати Товару / Продаж Клієнту через +',  function(){
        cy.visit('/')
        baseStorage.openDocsPlus(15);
        baseStorage.fillingFormClient(idProduct, 'Продаж', 'vika')
    })

    it('OUT / Додавання ЗЧ Продажу Клієнту через модалку Каталог', function(){
        cy.visit('/')
        baseStorage.openDocsBtn(15);
        baseStorage.addProductInDocs(idProduct, '203.3')
    })

    it('OUT / Оплата та Перевід в статус враховано Витрати Товару / Продаж Клієнту ',  function() {
        cy.visit('/')
        baseStorage.openDocsBtn(15);
        cy.get('tr > td > a').first().click({force: true})
        cy.wait(2000);
        cy.get('div.ant-dropdown-trigger > span').click()
        cy.wait(2000);
        cy.get('.ant-dropdown-menu-item').contains('Врах.').click()
        cy.wait(2000);
        cy.get(':nth-child(1) > .ant-radio > .ant-radio-inner').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-modal-body').contains('Так').click({force: true})
        cy.wait(2000);
        cy.get('.styles-m__header---2z2EP').contains('Врах.').should('exist')
        cy.get('.styles-m__header---2z2EP').find('.anticon-close').click()
    })

    it('OUT / Перевірка 0 Залишку Витрати Товару / Продаж Клієнту ',  function() {
        cy.visit('/')
        baseStorage.openDocsBtn(15);
        cy.get('tr > td > a').first().click({force: true})
        cy.wait(2000);
        cy.get('.styles-m__sumNumeral---KAUvr').last().should('have.text','0 грн.')
        cy.get('.styles-m__header---2z2EP').find('.anticon-close').click()
    })

    it('OUT / Завантаження документа .pdf ',  function() {
        cy.visit('/')
        baseStorage.openDocsBtn(15);
        baseStorage.downloadPDF();
    })

    it('OUT / Завантаження документа .xlsx', function(){
        cy.visit('/')
        baseStorage.openDocsBtn(15);
        baseStorage.downloadXML();
    })

    it('OUT / Відображення документа в списку Витрати Товару / Продаж Клієнту / Пошук по номеру документа /  ',  function(){
        cy.visit('/')
        baseStorage.openDocsBtn(15);
        baseStorage.showDocsInList();
    })

    it('OUT / Створення документа Витрати Товару / Продаж Клієнту через кнопку Додати',  function(){
        cy.visit('/')
        baseStorage.openDocsBtn(15);
        baseStorage.createDocsByBtnAdd('Продаж');
    })

    it(' CRT / Прихід Товару / Повернення від Клієнта через +',  function(){
        cy.visit('/')
        baseStorage.openDocsPlus(17);
        baseStorage.fillingFormClient(idProduct, 'Повернення від клієнта', 'vika')
    })

    it('CRT / Додавання ЗЧ через модалку Каталог / Повернення від Клієнта',  function() {
        cy.visit('/')
        baseStorage.openDocsBtn(17);
        baseStorage.addProductInDocs(idProduct, '1');
    })

    it('CRT / Перевід в статус враховано Прихід Товару / Повернення від клієнта ',  function() {
        cy.visit('/')
        baseStorage.openDocsBtn(17);
        baseStorage.successDocs();
    })

    it('CRT / Оплата / Прихід Товару / Повернення від клієнта ', function(){
        cy.visit('/')
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

    it('CRT / Перевірка 0 Залишку Прихід Товару / Повернення від клієнта ', function(){
        cy.visit('/')
        baseStorage.openDocsBtn(17);
        cy.get('tr > td > a').first().click({force: true})
        cy.wait(2000);
        cy.get('.styles-m__sumNumeral---KAUvr').last().should('have.text','0 грн.')
    })

    it('CRT / Завантаження документа .pdf',  function(){
        cy.visit('/')
        baseStorage.openDocsBtn(17);
        baseStorage.downloadPDF();
    })

    it('CRT / Завантаження документа .xlsx',  function(){
        cy.visit('/')
        baseStorage.openDocsBtn(17);
        baseStorage.downloadXML();
    })

    it('CRT / Відображення документа в списку Прихід Товару / Повернення від клієнта / Пошук по номеру документа /  ', function() {
        cy.visit('/')
        baseStorage.openDocsBtn(17);
        baseStorage.showDocsInList();
    })

    it('CRT / Створення документа Прихід Товару / Повернення від клієнта через кнопку Додати',  function(){
        cy.visit('/')
        baseStorage.openDocsBtn(17);
        baseStorage.createDocsByBtnAdd('Повернення від клієнта');
   })

    it(' STP / Плюс по Інвент. / через +',  function(){
        cy.visit('/')
        baseStorage.openDocsPlus(14);
        cy.get('.ant-input').eq(2).type('Коментарій Плюс по Інвент.').should('have.text','Коментарій Плюс по Інвент.')
        cy.get('.ant-input').eq(1).type('STP'+idProduct)
        cy.wait(2000);
        cy.get('.ant-badge > .anticon').last().click({force: true}) // дискетка 
    })

    it('STP / Додавання ЗЧ через модалку Каталог / Плюс/Надлишки по Інвент.',  function(){
        cy.visit('/')
        baseStorage.openDocsBtn(14);
        baseStorage.addProductInventDocs(idProduct);
    })

    it('STP / Оплата та Перевід в статус враховано Плюс/Надлишки по Інвент.', function() {
        cy.visit('/')
        baseStorage.openDocsBtn(14);
        baseStorage.successDocs();
    })

    it('STP / Завантаження документа .pdf ',  function(){
        cy.visit('/')
        baseStorage.openDocsBtn(14);
        baseStorage.downloadPDF();
    })

    it('STP / Завантаження документа .xlsx',  function() {
        cy.visit('/')
        baseStorage.openDocsBtn(14);
        baseStorage.downloadXML();
    })

    it('STP / Відображення документа в списку Плюс/Надлишки по Інвент. (STP)',  function(){
        cy.visit('/')
        baseStorage.openDocsBtn(14);
        baseStorage.showDocsInList();
    })

    it('STP / Створення документа  Плюс/Надлишки по Інвент. ерез кнопку Додати',  function() {
        cy.visit('/')
        baseStorage.openDocsBtn(14);
        baseStorage.createDocsByBtnAdd('Надлишки по iнвент.');
    })
  
    it(' STM / Мінус по Інвент. / через +',  function(){
        cy.visit('/')
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
        cy.visit('/')
        baseStorage.openDocsBtn(19);
        baseStorage.addProductInventDocs(idProduct);
    })

    it('STM / Оплата та Перевід в статус враховано Мінус/Недостача по Інвент.',  function(){
        cy.visit('/')
        baseStorage.openDocsBtn(19);
        baseStorage.successDocs();
    })

    it('STM / Завантаження документа .pdf ', function(){
        cy.visit('/')
        baseStorage.openDocsBtn(19);
        baseStorage.downloadPDF();
    })

    it('STM / Завантаження документа .xlsx',  function(){
        cy.visit('/')
        baseStorage.openDocsBtn(19);
        baseStorage.downloadXML();
    })

    it('STM / Відображення документа в списку Мінус/Недостача по Інвент.(STM)',  function() {
        cy.visit('/')
        baseStorage.openDocsBtn(19)
        baseStorage.showDocsInList();
    })

    it('STM / Створення документа Мінус/Недостача по Інвент.(STM)',  function(){
        cy.visit('/')
        baseStorage.openDocsBtn(19);
        baseStorage.createDocsByBtnAdd('Недостача по iнвент.');
    })

})
