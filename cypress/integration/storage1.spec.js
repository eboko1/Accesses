/// <reference types="cypress" />
import ProfilePage from '../support/pageObject/profilePage';
import LoginPage from '../support/pageObject/loginPage';
import OrderPage from '../support/pageObject/orderPage';
import BaseStorage from '../support/pageObject/storage/baseStorage';
import ProductTab from '../support/pageObject/tabsOrder/productTab';

const profilePage = new ProfilePage();
const loginPage = new LoginPage();
const orderPage = new OrderPage();
const baseStorage = new BaseStorage();
const productTab = new ProductTab();
const path = require("path");

const textServise = 'Доставка Запчастин'
const supplierSystem = 'АСГ S'
var date = new Date();
//const idProduct ='TEST'+'29432'
const idProduct ='TEST'+date.getDate()+date.getMonth()+date.getMinutes()//+date.getSeconds();

describe ('Складські документи 1 ', function(){
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
        cy.visit('/profile') 
        profilePage.choiceLanguage(1)
    })
   
    it('Створення нового Товару через картку Товару / id= '+idProduct ,function(){
        cy.visit('/products')
        cy.get('.ant-btn').contains('Додати').click({force: true})
        cy.get('#StoreProductForm_code').type(idProduct)
        cy.get('.ant-modal').find('.ant-select').eq(0).type('100 Plus{enter}')     // бренд
        cy.wait(2000);
        cy.get('.ant-modal').find('.ant-select').eq(1).type('1020201')             // група ЗЧ
        cy.wait(2000);
        cy.get('.ant-select-tree-title').first().click({force: true})
        cy.get('.ant-modal').find('.ant-select').eq(2).type('{downarrow}{enter}')  // одиниці виміру
        cy.get('.ant-modal').find('.ant-input').eq(3).type('0000000000')           // код ТДЗЕД
        cy.get('.ant-modal').find('.ant-input').eq(4).type('00000000000000000')    // сертифікат
        cy.get('.ant-modal').find('button').contains('Застосувати').click({force: true})   //.contains('Застосувати')
        cy.wait(2000);
        cy.get(':nth-child(1) > :nth-child(1) > div > .ant-input').first().type(idProduct)
        cy.wait(3000);
        cy.get('.ant-table-content td').first().should('exist')
        cy.wait(3000);
        cy.get('a > div').first().invoke('text')
            .then (text => {
                cy.log(text)
            expect(text).to.eq(idProduct)
        })
    })

    it(' AUT / Витрати із НЗ / Створення нового Ремонту та відображення створеного дока в AUT',function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(2)
        cy.get('h1').should('have.text','Ремонти')
        orderPage.createOrder('') // Клієнт
        productTab.addFirstDetail()
        cy.wait(3000);
        cy.get('.ant-dropdown-trigger').eq(1).trigger('mouseover')////Переведіть н/з в статус Ремонт 
        cy.get('.ant-dropdown-menu-item').contains('Завершено').first().click({force: true})
        cy.wait(2000); 
        cy.get('.sc-bxivhb > .ant-checkbox > .ant-checkbox-inner').first().click({force: true})  ///модалка оплати ч/з статус Завершено
        cy.get('.ant-btn-primary').contains('Так').click({force: true})
        cy.wait(3000); 

        cy.get('h1').first().invoke('text').then(text =>{
            cy.log(text)
            const numArr = text.split('-') 
            cy.log(numArr[numArr.length-1])
            const newNmArr = numArr[numArr.length-1].split('З') 
            cy.log(newNmArr[0])
            cy.contains('Швидка навігація').click({force: true})
            cy.get('h1').should('have.text','Швидка навігація')  
            cy.get(':nth-child(12) > .styles-m__buttonLink---1D7wr > .ant-btn').first().click({force: true})///витрати з НЗ AUT
            cy.wait(2000);
            cy.get('tr > td > a').first().click({force: true})// вибір першого AUT в списку
            cy.get('.ant-table-row > :nth-child(3) > :nth-child(1) > div').first().invoke('text').then( textFind =>{
                expect('MRD-'+numArr[1]+'-'+newNmArr[0]).to.eq(textFind) // порівнняня коду НЗ з кодом в рядку AUT 
            })
        })
        cy.wait(2000);
    })

    it('AUT / Завантаження документа .pdf', function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(16)
        baseStorage.downloadPDF();
    })

    it('AUT / Завантаження документа .xlsx', function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(16)
        baseStorage.downloadXML();
    })

    it(' ORD / Замовлення Постачальнику через + / Сторінка Швидка навігація ', function(){
        cy.visit('/new-document')
        baseStorage.openDocsPlus(7)
        baseStorage.fillingForm(idProduct,'Замовлення постачальнику', supplierSystem)
    })

    it('ORD / Додавання ЗЧ в Замовлення постачальнику / Модалка +', function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(7)
        baseStorage.openListDocs()
        baseStorage.addProductInDocs(idProduct, 25, 2);
    })

    it('ORD / Відображення модалки ШК )', function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(7)
        baseStorage.showCode()
    })

    it('ORD / Перевід документа Замовлення постачальнику в статус Враховано ', function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(7);
        baseStorage.openListDocs()
        baseStorage.successDocs();
    })

    it('ORD / Завантаження документа .pdf', function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(7);
        baseStorage.downloadPDF();
    })

    it('ORD / Завантаження документа .xlsx',function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(7);
        baseStorage.downloadXML();
    })
   
    it('ORD / Відображення документа в списку Замовлення постачальнику', function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(7);
        baseStorage.showDocsInList();
    })

    it('ORD / Створення документа Замовлення Постачальнику через кнопку Додати', function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(7);
        baseStorage.createDocsByBtnAdd('Замовлення постачальнику')
    })

    it(' BOR / Коригування Замовлення через +', function(){
        cy.visit('/new-document')
        baseStorage.openDocsPlus(9)
        baseStorage.fillingForm(idProduct,'Коригування замовлення', supplierSystem)
    })     

    it('BOR / Вибір коригуючого Товару з модалки Каталог. Перевід у статус Враховано', function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(9)
        baseStorage.openListDocs()
        baseStorage.addProductInDocs(idProduct, '3', 1)
    })

    it('BOR / Завантаження документа .pdf', function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(9);
        baseStorage.downloadPDF();
    })

    it('BOR / Завантаження документа .xlsx', function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(9);
        baseStorage.downloadXML();
    })

    it('BOR / Відображення документа в списку Коригуючих замовлень', function() { 
        cy.visit('/new-document')
        baseStorage.openDocsBtn(9);   
        baseStorage.showDocsInList();
    })

    it('BOR / Створення документа Коригуючих замовлень через кнопку Додати',  function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(9);
        baseStorage.createDocsByBtnAdd('Коригування замовлення');
    })

    it(' COM / Прихід за Замовленням через +', ()=>{
        cy.visit('/new-document')
        baseStorage.openDocsPlus(8)
        baseStorage.fillingForm(idProduct,'Прихід за замовленням', supplierSystem)
    })     
        
    it('COM / Додавання ЗЧ в Прихід за Замовленням', function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(8)
        baseStorage.openListDocs()
        baseStorage.addProductInDocs(idProduct, '5.3', 2)
    })

    it('COM / Перевід документа Приходу за Замовленням в статус Враховано',  function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(8);
        baseStorage.openListDocs()
        baseStorage.successDocs();
    })

    it('COM / Завантаження документа .pdf ',  function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(8);
        baseStorage.downloadPDF();
    })

    it('COM / Завантаження документа .xlsx', function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(8);
        baseStorage.downloadXML();
    })

    it('COM / Відображення документа в списку Прихoди за Замовленнями',  function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(8);
        baseStorage.showDocsInList();
    })

    it('COM / Створення документа Прихoди за Замовленнями через кнопку Додати', function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(8);
        cy.wait(3000)
        baseStorage.createDocsByBtnAdd('Прихід за замовленням');
    })
    //////////////////////////INC////////////////////////////////
    it(' INC / Прихід від Постачальника через + ', function(){
        cy.visit('/new-document')
        baseStorage.openDocsPlus(10)
        baseStorage.fillingForm(idProduct,'Прихід від постачальника', supplierSystem)
    })

    it('INC / Додавання ЗЧ в Прихід від Постачальника, редагування ціни', function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(10);
        baseStorage.openListDocs()
        baseStorage.addProductInDocs(idProduct, '13.9', 12);
        baseStorage.addProductInDocs(idProduct, '100', 12);
    })

    it('INC / Перевід документа Приходу від Постачальника в статус Враховано ',  function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(10);
        baseStorage.openListDocs()
        baseStorage.successDocs();
    })

    it('INC / Оплата Приходу від Постачальника',  function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(10);
        baseStorage.payOrder()
    })

    it('INC /  Перевірка 0 Залишку, Закуп.та Продж. Суми Приходу від Постачальника',  function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(15);
        baseStorage.checkSellingDoc()
        baseStorage.checkPurchaseDoc()
    })

    it('INC / Відсутність Боргу / Картка Пастачальника', function() {
        cy.visit('/storage-incomes')
        baseStorage.cardSupplierCredit(supplierSystem)
    })

    it('INC / Відсутність Постачальника в Кредиторці/Бухгалтерія',  function() {
        cy.visit('/receivables_and_payables')
        baseStorage.checkCreditPage(supplierSystem,'Даних немає')   
    })
      
    it('INC / Відображення документа в списку Приходів на Склад ',  function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(10);
        baseStorage.showDocsInList()
    })

    it('INC / Завантаження документа .pdf ',  function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(10);
        baseStorage.downloadPDF();
    })

    it('INC / Завантаження документа .xlsx',  function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(10);
        baseStorage.downloadXML();
    })

    it('INC / Створення документа Прихід від Постачальника через кнопку Додати',  function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(10);
        baseStorage.createDocsByBtnAdd('Прихід від постачальника');
    })

    ///////////////////////INC////////////////////////////////
    it(' SRV / Прихід Послуги через кнопку +',  function(){
        cy.visit('/new-document')
        baseStorage.openDocsPlus(11);
        baseStorage.fillingForm(idProduct,'Послуги', supplierSystem)
    })

    it('SRV / Додавання Послуги',  () => {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(11);
        cy.get('tr > td > a').first().click({force: true})
        cy.wait(2000)
        cy.get('.ant-btn-icon-only').eq(1).click({force: true})
        cy.wait(1000)
        //cy.get('.ant-input').first().should('have.text','').type(textServise)
        cy.get('.ant-input').eq(5).should('have.text','').type(textServise)
        cy.wait(1000)
        cy.get('.ant-input-number-input').eq(0).clear().type('202,29')
        cy.get('.ant-input-number-input').eq(1).clear().type('1,29')
        cy.wait(1000)
        cy.get('.ant-input-number-input').eq(0).should('have.value','202,29')
        cy.get('.ant-input-number-input').eq(1).should('have.value','1,29')
        cy.get('.ant-modal-footer > .ant-btn-primary').first().click({force: true})
        cy.wait(2000)
    })

    // // // it('SRV / Редагування Послуги',  function() {
    // // //     cy.visit('/new-document')
    // // //     baseStorage.openDocsBtn(11);
    // // //     cy.get('tr > td > a').first().click({force: true})
    // // //     cy.wait(2000)
    // // //     cy.get('.ant-btn-icon-only').first().click({force: true})
    // // //     cy.get('.ant-modal-body').find('.ant-input').eq(1).should('have.text','').type(textServise)
    // // //     cy.wait(1000)
    // // //     cy.get('.ant-input-number-input').eq(0).clear().type('202,29')
    // // //     cy.get('.ant-input-number-input').eq(1).clear().type('1,29')
    // // //     cy.wait(1000)
    // // //     cy.get('.ant-input-number-input').eq(0).should('have.value','202,29')
    // // //     cy.get('.ant-input-number-input').eq(1).should('have.value','1,29')
    // // //     cy.get('.ant-modal-footer > .ant-btn-primary').first().click({force: true})
    // // //     cy.wait(2000)
    // // // })

    it('SRV / Перевід Послуги в статус Враховано',  function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(11);
        baseStorage.openListDocs()
        baseStorage.successDocs();
    })

    it('SRV / Оплата / Прихід Послуги ',  function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(11);
        baseStorage.payOrder();
    })

    it('SRV / Завантаження документа .pdf ',  function(){   
        cy.visit('/new-document')
        baseStorage.openDocsBtn(11);
        baseStorage.downloadPDF();
    })

    it('SRV / Завантаження документа .xlsx',  function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(11);
        baseStorage.downloadXML();
    })

    it('SRV / Відображення документа в списку Послуг',  function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(11);
        baseStorage.showDocsInList();
    })

    it('SRV / Створення документа Послуги через кнопку Додати',  function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(11);
        baseStorage.createDocsByBtnAdd('Послуги');
    })

    it(' SRT / Повернення Постачальнику через +',  function(){
        cy.visit('/new-document')
        baseStorage.openDocsPlus(12);
        baseStorage.fillingForm(idProduct, 'Повернення постачальнику', supplierSystem)
    })

    it('SRT / Додавання ЗЧ в документ Повернення Постачальнику',  function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(12);
        baseStorage.openListDocs()
        baseStorage.addProductInDocs(idProduct, '133.2', 1)
    })

    it('SRT / Перевід в статус Враховано',  function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(12);
        baseStorage.openListDocs()
        baseStorage.successDocs();
    })

    it('SRT / Оплата Повернення Постачальнику',  function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(12);
        baseStorage.payOrder()
    })

    it('SRT / Перевірка 0 Залишку, Закуп.та Продж. Суми Повернення Постачальнику',  function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(15);
        baseStorage.checkSellingDoc()
        baseStorage.checkPurchaseDoc()
    })
    
    it('SRT / Відсутність Боргу / Картка Пастачальника', function() {
        cy.visit('/storage-incomes')
        baseStorage.cardSupplierCredit(supplierSystem)
    })

    it('SRT / Відсутність Боргу в Кредиторці/Бухгалтерія',  function() {
        cy.visit('/receivables_and_payables')
        baseStorage.checkCreditPage(supplierSystem,'Даних немає')   
    })

    it('SRT / Завантаження документа .pdf ',  function(){ 
        cy.visit('/new-document')
        baseStorage.openDocsBtn(12);
        baseStorage.downloadPDF();
    })

    it('SRT / Завантаження документа .xlsx',  function() {
        cy.visit('/new-document')
        baseStorage.openDocsBtn(12);
        baseStorage.downloadXML();
    })

    it('SRT / Відображення документа Повернення Постачальнику у списку Витрат на Складі ',  function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(12);
        baseStorage.showDocsInList();
    })
   
    it('SRT / Створення документа Повернення Постачальнику через кнопку Додати',  function(){
        cy.visit('/new-document')
        baseStorage.openDocsBtn(12);
        baseStorage.createDocsByBtnAdd('Повернення постачальнику');
    })
})
