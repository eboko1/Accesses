/// <reference types="cypress" />
import LoginPage from '../../support/pageObject/loginPage';

const loginPage = new LoginPage();

const baseUrl = 'https://'+Cypress.env('url')+'my.carbook.pro';
const textServise = 'Доставка Запчастин'
var date = new Date();
const idProduct ='TEST'+date.getDate()+date.getMonth()+date.getMinutes()//+date.getSeconds();
//const idProduct ='TEST'+'91053'

const username = Cypress.env('LoginMaster')
const password = Cypress.env('pw')

describe ('Складські документи ', function(){
        beforeEach('User LogIn ', () => {
          cy.visit(baseUrl)
          loginPage.enterLogin(username,password)
        });

        it('Створення нового Товару через картку Товару / id= '+idProduct , ()=>{
            cy.get('.ant-menu-submenu-title').contains('Довідник').click()
            cy.wait(2000);
            cy.get('.ant-menu-submenu').contains('Товари').click()
            cy.get('.ant-btn').contains('Додати').click({force: true})
            cy.get('#code').type(idProduct)
            cy.get('.ant-form').find('.ant-select-selection').eq(0).type('100 Plus')
            cy.wait(2000);
            cy.get('.ant-select-dropdown-menu-item').click({force: true})
            cy.wait(2000);
            cy.get('.ant-form').find('.ant-select-selection').eq(1).type('1020201')
            cy.wait(2000);
            cy.get(':nth-child(3) > :nth-child(1) > :nth-child(3) > .ant-select-tree-treenode-switcher-open > .ant-select-tree-child-tree > li > .ant-select-tree-node-content-wrapper').click({force: true})
            cy.get('#tradeCode').type('0000000000')
            cy.get('#certificate').type('00000000000000000')
            cy.get('.ant-form').find('button').click()   //.contains('Застосувати')
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
///**************************************************************************************************************************** */

  it('Замовлення Постачальнику (ORD) через + / Сторінка Швидка навігація ', ()=>{
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(1) > .styles-m__folderLink---2Myrv').click({force: true})
        cy.get(':nth-child(1) > :nth-child(2) > .ant-select > .ant-select-selection').should('have.text','Замовлення постачальнику')
        cy.get('.ant-select > .ant-select-selection').eq(3).type('Exist')
        cy.wait(2000);//
        cy.get('.ant-select-dropdown-menu-item').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-input').eq(3).clear().type('Коментарій Замовлення постачальнику').should('have.text','Коментарій Замовлення постачальнику')
        cy.get(':nth-child(3) > .ant-input').type('ORD'+idProduct)
        cy.get(':nth-child(3) > :nth-child(1) > .ant-select > .ant-select-selection').click()
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
        cy.wait(2000);
        cy.get(':nth-child(3) > :nth-child(2) > .ant-select > .ant-select-selection').click()
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
        cy.get('.ant-badge > .anticon').last().click({force: true}) // дискетка 
        cy.wait(2000);
        cy.get('.styles-m__title---Nwr2X > :nth-child(1) > span').should('have.text','Нов.')
    })

    it('Додавання ЗЧ в Замовлення постачальнику (ORD)/ Модалка +', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(1) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-table-row > :nth-child(1) > .ant-btn').first().click({force: true})///////////
        cy.wait(2000);
        cy.get('.ant-input').eq(0).should('have.text','')
        cy.get('.ant-modal-body').find('.ant-input').first().type(idProduct) 
        cy.wait(2000);
        cy.get('.ant-modal-body').find('.ant-input-number').first().type('111.11') 
        cy.get('.ant-modal-body').find('.ant-input-number-input').eq(1).clear().type('100.88')
        cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true})
        cy.wait(2000);
    })

    it('Перевід документа Замовлення постачальнику в статус Враховано ', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(1) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.wait(2000);
        cy.get('div.ant-dropdown-trigger > span').click() /////////
        cy.wait(2000);
        cy.get('.ant-dropdown-menu-item').contains('Врах.').click()
        cy.wait(2000);
        cy.get('.styles-m__header---2z2EP').contains('Врах.').should('exist')
        cy.get('.styles-m__header---2z2EP').find('.anticon-close').click()
    })

    it('Відображення документа в списку Замовлення постачальнику', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(1) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().invoke('text').then(text =>{
            cy.log(text)
            const numArr = text.split('-') 
            cy.get('.styles-m__paper---3d-H1').find('.ant-input').type(numArr[numArr.length-1])
            cy.get('.ant-table-row > :nth-child(1) > a').first().invoke('text').then( textFind =>{
                expect(text).to.eq(textFind)
            })
        })
   })

   it('Створення документа Замовлення Постачальнику через кнопку Додати', () => {
    cy.get('.styles-m__logo---2zDPJ').click()
    cy.contains('Швидка навігація').click({force: true})
    cy.get('h1').should('have.text','Швидка навігація')
    cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(1) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
    cy.wait(2000)
    cy.get('.ant-btn').contains('Додати').click({force: true})
    cy.wait(2000)
    cy.get(':nth-child(2) > .ant-select > .ant-select-selection > .ant-select-selection__rendered > .ant-select-selection-selected-value > span').should('have.text','Замовлення постачальнику')
})

//     /// //*************КОРИГУВАННЯ ЗАМОВЛЕННЯ*************************************************************************************************** */
     it('Коригування Замовлення (BOR) через +', ()=>{
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(3) > .styles-m__folderLink---2Myrv').click({force: true})
        cy.get(':nth-child(1) > :nth-child(2) > .ant-select > .ant-select-selection').should('have.text','Коригування замовлення')
        cy.get('.ant-select > .ant-select-selection').eq(3).type('Exist')
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-input').eq(3).clear().type('Коментарій Коригування Замовлення').should('have.text','Коментарій Коригування Замовлення')
        cy.get(':nth-child(3) > .ant-input').type('BOR'+idProduct)
        cy.get(':nth-child(3) > :nth-child(1) > .ant-select > .ant-select-selection').click()
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
        cy.wait(2000);
        cy.get(':nth-child(3) > :nth-child(2) > .ant-select > .ant-select-selection').click()
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
        cy.get('.ant-badge > .anticon').last().click({force: true}) // дискетка 
        cy.wait(1000);
        cy.get('.styles-m__title---Nwr2X > :nth-child(1) > span').should('have.text','Нов.')
    })     
        
    it('Вибір корегуючого Товару з модалки Каталог. Перевід у статус Враховано', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(3) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-table-row > :nth-child(1) > .ant-btn').first().click({force: true})///////////
        cy.wait(2000);
        cy.get('.ant-input').eq(0).should('have.text','')
        cy.get('.ant-modal-body').find('.ant-input').first().type(idProduct) 
        cy.get('.ant-modal-body').find('.ant-input-number').first().type('111.11') 
        cy.get('.ant-modal-body').find('.ant-input-number-handler-up').eq(1).dblclick()
        cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true})
        cy.get('div.ant-dropdown-trigger > span').click()
        cy.wait(2000);
        cy.get('.ant-dropdown-menu-item').contains('Врах.').click()
        cy.wait(2000);
        cy.get('.styles-m__header---2z2EP').contains('Врах.').should('exist')
        cy.get('.styles-m__header---2z2EP').find('.anticon-close').click()
        cy.wait(2000);
    })

    it('Відображення документа в списку Коригуючих замовлень BOR', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(3) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().invoke('text').then(text =>{
            cy.log(text)
            const numArr = text.split('-') 
            cy.get('.styles-m__paper---3d-H1').find('.ant-input').type(numArr[numArr.length-1])
            cy.get('.ant-table-row > :nth-child(1) > a').first().invoke('text').then( textFind =>{
                expect(text).to.eq(textFind)
            })
        })
    })

    it('Створення документа Коригуючих замовлень BOR через кнопку Додати', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(3) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('.ant-btn').contains('Додати').click({force: true})
        cy.wait(2000)
        cy.get(':nth-child(2) > .ant-select > .ant-select-selection > .ant-select-selection__rendered > .ant-select-selection-selected-value > span').should('have.text','Коригування замовлення') 
    })
    // /***********ПРИХІД за ЗАМОВЛЕННЯМ***************************************************************************************************** */

    it('Прихід за Замовленням (COM) через +', ()=>{
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(2) > .styles-m__folderLink---2Myrv').click({force: true})
        cy.get(':nth-child(1) > :nth-child(2) > .ant-select > .ant-select-selection').should('have.text','Прихід за замовленням')
        cy.get('.ant-select > .ant-select-selection').eq(3).type('Exist')
        cy.wait(3000);
        cy.get('.ant-select-dropdown-menu-item').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-input').eq(3).clear().type('Коментарій Прихід за замовленням').should('have.text','Коментарій Прихід за замовленням')
        cy.get(':nth-child(3) > .ant-input').type('COM'+idProduct)
        cy.get(':nth-child(3) > :nth-child(1) > .ant-select > .ant-select-selection').click()
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
        cy.wait(2000);
        cy.get(':nth-child(3) > :nth-child(2) > .ant-select > .ant-select-selection').click()
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
        cy.get('.ant-badge > .anticon').last().click({force: true}) // дискетка 
        cy.wait(2000);
        cy.get('.styles-m__title---Nwr2X > :nth-child(1) > span').should('have.text','Нов.')
    })     
        
    it('Додавання ЗЧ в Прихід за Замовленням', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(2) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-table-row > :nth-child(1) > .ant-btn').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-input').eq(0).should('have.text','')
        cy.get('.ant-modal-body').find('.ant-input').first().type(idProduct) 
        cy.get('.ant-modal-body').find('.ant-input-number').first().type('111.11') 
        cy.get('.ant-modal-body').find('.ant-input-number-handler-up').eq(1).dblclick()
        cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true})
        cy.wait(2000);
    })

    it('Перевід документа Приходу за Замовленням в статус Враховано', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(2) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.wait(2000)
        cy.get('div.ant-dropdown-trigger > span').click()
        cy.wait(2000);
        cy.get('.ant-dropdown-menu-item').contains('Врах.').click()
        cy.wait(2000);
        cy.get('.styles-m__header---2z2EP').contains('Врах.').should('exist')
        cy.get('.styles-m__header---2z2EP').find('.anticon-close').click()
    })

    it('Відображення документа в списку Прихoди за Замовленнями', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(2) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().invoke('text').then(text =>{
            cy.log(text)
            const numArr = text.split('-') 
            cy.get('.styles-m__paper---3d-H1').find('.ant-input').type(numArr[numArr.length-1])
            cy.get('.ant-table-row > :nth-child(1) > a').first().invoke('text').then( textFind =>{
                expect(text).to.eq(textFind)
            })
        })
    })

    it('Створення документа Прихoди за Замовленнями через кнопку Додати', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(2) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('.ant-btn').contains('Додати').click({force: true})
        cy.wait(2000)
        cy.get(':nth-child(2) > .ant-select > .ant-select-selection > .ant-select-selection__rendered > .ant-select-selection-selected-value > span').should('have.text','Прихід за замовленням')
    })
    /////***********ПРИХІД за ЗАМОВЛЕННЯМ***************************************************************************************************** */
  
   // /***********ПРИХІД ТОВАРУ***************************************************************************************************** */
    it('Прихід Товару від Постачальника (INC) через + ', ()=>{
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(6) > .styles-m__folderLink---2Myrv').click({force: true})
        cy.get(':nth-child(1) > :nth-child(2) > .ant-select > .ant-select-selection').should('have.text','Прихід від постачальника')
        cy.get('.ant-select > .ant-select-selection').eq(3).type('Exist')
        cy.wait(1000);
        cy.get('.ant-select-dropdown-menu-item').first().click({force: true})
        cy.wait(1000);
        cy.get('.ant-input').eq(3).clear().type('Коментарій Прихід від постачальника').should('have.text','Коментарій Прихід від постачальника')
        cy.get(':nth-child(3) > .ant-input').type('INC'+idProduct)
        cy.wait(2000);
        cy.get(':nth-child(3) > :nth-child(1) > .ant-select > .ant-select-selection').click()
        cy.wait(1000);
        cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
        cy.wait(2000);
        cy.get(':nth-child(3) > :nth-child(2) > .ant-select > .ant-select-selection').click()
        cy.wait(1000);
        cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
        cy.get('.ant-badge > .anticon').last().click({force: true}) // дискетка 
        cy.wait(1000);
        cy.get('.styles-m__title---Nwr2X > :nth-child(1) > span').should('have.text','Нов.')
        cy.wait(2000);
    })

    it('Додавання ЗЧ в Прихід від Постачальника (INC), редагування ціни', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(6) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-table-row > :nth-child(1) > .ant-btn').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-input').eq(0).should('have.text','')
        cy.get('.ant-modal-body').find('.ant-input').first().type(idProduct)
        cy.wait(2000) 
        cy.get('.ant-modal-body').find('.ant-input-number-input').eq(1).clear().type('10.9') 
        cy.get('.ant-modal-body').find('.ant-input').last().click()
        cy.wait(1000);
        cy.get('.ant-modal-header').last().should('have.text','Вибір комірки')
        cy.wait(1000);
        cy.get('[data-row-key] > :nth-child(8) > .ant-btn').first().click({force: true})
        cy.wait(1000);
        cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true})
        cy.wait(1000);
    })

    it('Перевід документа Приходу від Постачальника в статус Враховано ', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(6) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.wait(2000);
        cy.get('div.ant-dropdown-trigger > span').click()
        cy.wait(2000);
        cy.get('.ant-dropdown-menu-item').contains('Врах.').click()
        cy.wait(2000);
        cy.get('.styles-m__header---2z2EP').contains('Врах.').should('exist')
    })

    it('Оплата Приходу від Постачальника', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(6) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.get('.styles-m__header---2z2EP').find('.anticon-dollar').should('exist').first().click({force: true})
        cy.wait(2000)
        cy.get('.ant-modal-body').should('exist')
        cy.get('.ant-modal-footer').find('.ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('.styles-m__sumNumeral---KAUvr').find('span').should('have.text','0 грн.')
        cy.get('.styles-m__header---2z2EP').find('.anticon-close').click()
    })

    it('Відображення документа в списку Приходів на Склад ', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(6) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().invoke('text').then(text =>{
            cy.log(text)
            const numArr = text.split('-') 
            cy.get('.styles-m__paper---3d-H1').find('.ant-input').type(numArr[numArr.length-1])
            cy.get('.ant-table-row > :nth-child(1) > a').first().invoke('text').then( textFind =>{
                expect(text).to.eq(textFind)
            })
        })
    })

    it('Завантаження документа Приходу від Постачальника', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(6) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.get('.styles-m__header---2z2EP').find('.anticon-printer ').click({force: true})
        cy.get('.ant-dropdown-menu > :nth-child(1)').click({force: true})  // document-INC-594-1759
        cy.get('.styles-m__header---2z2EP').contains('Врах.').should('exist')
        cy.get('.ant-dropdown-menu > :nth-child(2)').click({force: true}) // Store document report for 1759
        cy.get('.styles-m__header---2z2EP').contains('Врах.').should('exist')
        cy.get('.styles-m__title---Nwr2X > :nth-child(1)').first().invoke('text')
            .then (text => {
               var textArr = text.split(' ')
               var numArr = textArr[textArr.length-1].split('-') 
               const path = require("path");
               cy.wait(1000);
               cy.readFile(path.join('cypress/downloads', 'document-'+textArr[textArr.length-1]+'.pdf')).should("exist"); 
               cy.readFile(path.join('cypress/downloads', 'Store document report for '+numArr[numArr.length-1]+'.xlsx')).should("exist"); 
        })
        cy.get('.ant-form').should('exist')
    })

    it('Створення документа Прихід від Постачальника (INC) через кнопку Додати', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(6) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('.ant-btn').contains('Додати').click({force: true})
        cy.wait(2000)
        cy.get(':nth-child(2) > .ant-select > .ant-select-selection > .ant-select-selection__rendered > .ant-select-selection-selected-value > span').should('have.text','Прихід від постачальника')
    })

     ///***********ПРИХІД ТОВАРУ***************************************************************************************************** */

      /***********ПРИХІД Послуги***************************************************************************************************** */
    it('Прихід Послуги (SRV) через кнопку +', ()=>{
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get('.styles-m__paper---3d-H1').children().eq(1).find(':nth-child(7) > .styles-m__folderLink---2Myrv').click({force: true})
        cy.get(':nth-child(1) > :nth-child(2) > .ant-select > .ant-select-selection').should('have.text','Послуги')
        cy.get('.ant-select > .ant-select-selection').eq(3).type('Exist')
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-input').eq(3).clear().type('Коментарій Прихід Послуги').should('have.text','Коментарій Прихід Послуги')
        cy.get(':nth-child(3) > .ant-input').type('SRV'+idProduct)
        cy.get(':nth-child(3) > :nth-child(1) > .ant-select > .ant-select-selection').click()
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
        cy.wait(2000);
        cy.get(':nth-child(3) > :nth-child(2) > .ant-select > .ant-select-selection').click()
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
        cy.get('.ant-badge > .anticon').last().click({force: true}) // дискетка 
        cy.wait(2000);
        cy.get('.styles-m__title---Nwr2X > :nth-child(1) > span').should('have.text','Нов.')
    })

    it('Додавання Послуги', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get('.styles-m__paper---3d-H1').children().eq(1).find(':nth-child(7) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('.styles-m__header---2z2EP').find(':nth-child(1) > .ant-btn').should('have.text','Послуги')
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.get('.ant-table-row > :nth-child(1) > .ant-btn').first().click({force: true})
        cy.get('.ant-modal-body').find('.ant-input').eq(0).should('have.text','').type(textServise)
        cy.wait(2000)
        ///// cy.get('.ant-modal-body').find('.ant-input').eq(1).click()                                  // джерело
        cy.get(':nth-child(4) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').should('have.value','1,00')
        cy.get(':nth-child(5) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').should('have.value','1,00')
        cy.get(':nth-child(4) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().type(222.22).should('have.value','222,22')
        cy.get(':nth-child(5) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().type(2.2).should('have.value','2,2')
        cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true})
        cy.wait(2000);
    })

    it('Перевід Прихід Послуги в статус Враховано', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get('.styles-m__paper---3d-H1').children().eq(1).find(':nth-child(7) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.get('div.ant-dropdown-trigger > span').click()
        cy.wait(2000);
        cy.get('.ant-dropdown-menu-item').contains('Врах.').click()
        cy.wait(2000);
        cy.get('.styles-m__header---2z2EP').contains('Врах.').should('exist')
        cy.wait(2000);
    })

    it('Оплата / Прихід Послуги ', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get('.styles-m__paper---3d-H1').children().eq(1).find(':nth-child(7) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.get('.styles-m__header---2z2EP').find('.anticon-dollar').should('exist').first().click({force: true})
        cy.get('.ant-modal-body').should('exist')
        cy.wait(2000);
        cy.get('.styles-m__buttonGroup---14_lS').find('.ant-btn').click()
        cy.get('.styles-m__sumNumeral---KAUvr').find('span').should('have.text','0 грн.')
        cy.get('.styles-m__header---2z2EP').find('.anticon-close').click()
    })

    it('Відображення документа в списку Послуг', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get('.styles-m__paper---3d-H1').children().eq(1).find(':nth-child(7) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('.styles-m__header---2z2EP').find(':nth-child(1) > .ant-btn').should('have.text','Послуги')
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().invoke('text').then(text =>{
            cy.log(text)
            const numArr = text.split('-') 
            cy.get('.styles-m__paper---3d-H1').find('.ant-input').type(numArr[numArr.length-1])
            cy.get('.ant-table-row > :nth-child(1) > a').first().invoke('text').then( textFind =>{
                expect(text).to.eq(textFind)
            })
        })
    })

    it('Завантаження документа Прихід Послуг', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get('.styles-m__paper---3d-H1').children().eq(1).find(':nth-child(7) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('.styles-m__header---2z2EP').find(':nth-child(1) > .ant-btn').should('have.text','Послуги')
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.get('.styles-m__header---2z2EP').find('.anticon-printer ').click({force: true})
        cy.get('.ant-dropdown-menu > :nth-child(1)').click({force: true})  // document-SRV-594-1759
        cy.get('.styles-m__header---2z2EP').contains('Врах.').should('exist')
        cy.get('.ant-dropdown-menu > :nth-child(2)').click({force: true}) // Store document report for 1759
        cy.get('.styles-m__header---2z2EP').contains('Врах.').should('exist')
        cy.get('.styles-m__title---Nwr2X > :nth-child(1)').first().invoke('text')
            .then (text => {
               var textArr = text.split(' ')
               var numArr = textArr[textArr.length-1].split('-') 
               const path = require("path");
               cy.wait(1000);
               cy.readFile(path.join('cypress/downloads', 'document-'+textArr[textArr.length-1]+'.pdf')).should("exist"); 
               cy.readFile(path.join('cypress/downloads', 'Store document report for '+numArr[numArr.length-1]+'.xlsx')).should("exist"); 
        })
        cy.get('.ant-form').should('exist')
    })

    it('Створення документа Послуги через кнопку Додати', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get('.styles-m__paper---3d-H1').children().eq(1).find(':nth-child(7) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(3000)
        cy.get('.styles-m__header---2z2EP').find(':nth-child(1) > .ant-btn').should('have.text','Послуги')
        cy.wait(1000)
        cy.get('.ant-btn').contains('Додати').click({force: true})
        cy.wait(2000)
        cy.get(':nth-child(2) > .ant-select > .ant-select-selection > .ant-select-selection__rendered > .ant-select-selection-selected-value > span').should('have.text','Послуги')
    })

  ///***********ПРИХІД Послуги***************************************************************************************************** */

  ////***********Повернення Постачальнику***************************************************************************************************** */
    
  it('Повернення Постачальнику (SRT) через +', ()=>{
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(8) > .styles-m__folderLink---2Myrv').click({force: true})
        cy.get(':nth-child(1) > :nth-child(2) > .ant-select > .ant-select-selection').should('have.text','Повернення постачальнику')
        cy.get('.ant-select > .ant-select-selection').eq(3).type('Exist')
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-input').eq(3).clear().type('Коментарій Повернення постачальнику').should('have.text','Коментарій Повернення постачальнику')
        cy.get(':nth-child(3) > .ant-input').type('SRT'+idProduct)
        cy.get(':nth-child(3) > :nth-child(1) > .ant-select > .ant-select-selection').click()
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
        cy.wait(2000);
        cy.get(':nth-child(3) > :nth-child(2) > .ant-select > .ant-select-selection').click()
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
        cy.get('.ant-badge > .anticon').last().click({force: true}) // дискетка 
        cy.wait(2000);
        cy.get('.styles-m__title---Nwr2X > :nth-child(1) > span').should('have.text','Нов.')
    })

    it('Додавання ЗЧ в документ Повернення Постачальнику (SRT)', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(8) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.get('.styles-m__header---2z2EP').find(':nth-child(1) > .ant-btn').should('have.text','Повернення постачальнику')
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-table-row > :nth-child(1) > .ant-btn').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-input').eq(0).should('have.text','')
        cy.get('.ant-modal-body').find('.ant-input').first().type(idProduct) 
        cy.get('.ant-modal-body').find('.ant-input-number-input').eq(1).clear().type('1.7') 
        cy.wait(2000);
        cy.get('.ant-modal-body').find('.ant-input').last().click()
        cy.get('.ant-modal-header').last().should('have.text','Вибір комірки')
        cy.get('[data-row-key] > :nth-child(8) > .ant-btn').first().click({force: true})
        cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true})
    })

    it('Перевід Повернення Постачальнику в статус Враховано ', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(8) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.get('.styles-m__header---2z2EP').find(':nth-child(1) > .ant-btn').should('have.text','Повернення постачальнику')
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.wait(2000);
        cy.get('div.ant-dropdown-trigger > span').click()
        cy.wait(2000);
        cy.get('.ant-dropdown-menu-item').contains('Врах.').click()
        cy.wait(2000);
        cy.get('.styles-m__header---2z2EP').contains('Врах.').should('exist')
        cy.wait(2000);
    })

    it('Відображення документа Повернення Постачальнику (SRT) у списку Витрат на Складі ', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(8) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.get('.styles-m__header---2z2EP').find(':nth-child(1) > .ant-btn').should('have.text','Повернення постачальнику')
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().invoke('text').then(text =>{
            cy.log(text)
            const numArr = text.split('-') 
            cy.get('.styles-m__paper---3d-H1').find('.ant-input').type(numArr[numArr.length-1])
            cy.get('.ant-table-row > :nth-child(1) > a').first().invoke('text').then( textFind =>{
                expect(text).to.eq(textFind)
            })
        })
    })

    it('Завантаження документа Повернення Постачальнику (SRT)', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(8) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.get('.styles-m__header---2z2EP').find(':nth-child(1) > .ant-btn').should('have.text','Повернення постачальнику')
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.get('.styles-m__header---2z2EP').find('.anticon-printer ').click({force: true})
        cy.get('.ant-dropdown-menu > :nth-child(1)').click({force: true})  // document-SRT-594-1759
        cy.get('.styles-m__header---2z2EP').contains('Врах.').should('exist')
        cy.get('.ant-dropdown-menu > :nth-child(2)').click({force: true}) // Store document report for 1759
        cy.get('.styles-m__header---2z2EP').contains('Врах.').should('exist')
        cy.get('.styles-m__title---Nwr2X > :nth-child(1)').first().invoke('text')
            .then (text => {
               var textArr = text.split(' ')
               var numArr = textArr[textArr.length-1].split('-') 
               const path = require("path");
               cy.wait(1000);
               cy.readFile(path.join('cypress/downloads', 'document-'+textArr[textArr.length-1]+'.pdf')).should("exist"); 
               cy.readFile(path.join('cypress/downloads', 'Store document report for '+numArr[numArr.length-1]+'.xlsx')).should("exist"); 
        })
        cy.get('.ant-form').should('exist')
    })

    it('Створення документа Повернення Постачальнику (SRT) через кнопку Додати', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(2) > .styles-m__blockItems---2q9Ea > :nth-child(8) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.get('.styles-m__header---2z2EP').find(':nth-child(1) > .ant-btn').should('have.text','Повернення постачальнику')
        cy.wait(2000)
        cy.get('.ant-btn').contains('Додати').click({force: true})
        cy.wait(2000)
        cy.get(':nth-child(2) > .ant-select > .ant-select-selection > .ant-select-selection__rendered > .ant-select-selection-selected-value > span').should('have.text','Повернення постачальнику')
    })
      //////***********Продаж Клієнту***************************************************************************************************** */
    
  it('Витрати Товару (OUT) / Продаж Клієнту через +', ()=>{
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(11) > .styles-m__folderLink---2Myrv').click({force: true})
        cy.get(':nth-child(1) > :nth-child(2) > .ant-select > .ant-select-selection').should('have.text','Продаж')
        cy.get('.ant-select > .ant-select-selection').eq(3).type('Vika')
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-input').eq(3).clear().type('Коментарій Продаж Клієнту').should('have.text','Коментарій Продаж Клієнту')
        cy.get(':nth-child(3) > .ant-input').type('OUT'+idProduct)
        cy.get(':nth-child(3) > :nth-child(1) > .ant-select > .ant-select-selection').click()
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
        cy.wait(2000);
        cy.get(':nth-child(3) > :nth-child(2) > .ant-select > .ant-select-selection').click()
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
        cy.get('.ant-badge > .anticon').last().click({force: true}) // дискетка 
        cy.wait(2000);
        cy.get('.styles-m__title---Nwr2X > :nth-child(1) > span').should('have.text','Нов.')
    })

    it('Додавання ЗЧ Продажу Клієнту через модалку Каталог', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(11) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-table-row > :nth-child(1) > .ant-btn').first().click({force: true})///////////
        cy.wait(2000);
        cy.get('.ant-input').eq(0).should('have.text','')
        cy.get('.ant-modal-body').find('.ant-input').first().type(idProduct) 
        cy.get('.ant-modal-body').find('.ant-input-number').first().type('111.11') 
        cy.get('.ant-modal-body').find('.ant-input').eq(2).click({force: true})           ///комірка
        cy.get('[data-row-key] > :nth-child(8) > .ant-btn').first().click({force: true}) ///комірка
        cy.wait(2000);
        cy.get('.ant-modal-body').find('.ant-input-number-input').eq(1).clear().type('1.22')
        cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true})
        cy.wait(2000);
    })

    it('Оплата та Перевід в статус враховано Витрати Товару (OUT)/Продаж Клієнту ', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(11) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.wait(2000);
        cy.get('div.ant-dropdown-trigger > span').click() /////////
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

    it('Перевірка 0 Залишку Витрати Товару (OUT)/Продаж Клієнту ', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get('.styles-m__paper---3d-H1').children().eq(1).find(':nth-child(11) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.wait(2000);
        cy.get('.styles-m__sumNumeral---KAUvr').last().should('have.text','0 грн.')
        cy.get('.styles-m__header---2z2EP').find('.anticon-close').click()
    })

    it('Відображення документа в списку Витрати Товару (OUT)/ Продаж Клієнту / Пошук по номеру документа /  ', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(11) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().invoke('text').then(text =>{
            cy.log(text)
            const numArr = text.split('-') 
            cy.get('.styles-m__paper---3d-H1').find('.ant-input').type(numArr[numArr.length-1])
            cy.get('.ant-table-row > :nth-child(1) > a').first().invoke('text').then( textFind =>{
                expect(text).to.eq(textFind)
            })
        })
   })

   it('Створення документа Витрати Товару (OUT)/Продаж Клієнту через кнопку Додати', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(11) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('.ant-btn').contains('Додати').click({force: true})
        cy.wait(2000)
        cy.get(':nth-child(2) > .ant-select > .ant-select-selection > .ant-select-selection__rendered > .ant-select-selection-selected-value > span').should('have.text','Продаж')
    })

    ///***********Продаж Клієнту***************************************************************************************************** *//

    ////***********Повернення від Клієнта***************************************************************************************************** */

  it('Прихід Товару (CRT) / Повернення від Клієнта через +', ()=>{
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(13) > .styles-m__folderLink---2Myrv').click({force: true})
        cy.get(':nth-child(1) > :nth-child(2) > .ant-select > .ant-select-selection').should('have.text','Повернення від клієнта')
        cy.get('.ant-select > .ant-select-selection').eq(3).type('Vika')
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-input').eq(3).clear().type('Коментарій Повернення від клієнта').should('have.text','Коментарій Повернення від клієнта')
        cy.get(':nth-child(3) > .ant-input').type('CRT'+idProduct)
        cy.get(':nth-child(3) > :nth-child(1) > .ant-select > .ant-select-selection').click()
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
        cy.wait(2000);
        cy.get(':nth-child(3) > :nth-child(2) > .ant-select > .ant-select-selection').click()
        cy.wait(2000);
        cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
        cy.get('.ant-badge > .anticon').last().click({force: true}) // дискетка 
        cy.wait(2000);
        cy.get('.styles-m__title---Nwr2X > :nth-child(1) > span').should('have.text','Нов.')
    })

    it('Додавання ЗЧ через модалку Каталог / Повернення від Клієнта', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(13) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-table-row > :nth-child(1) > .ant-btn').first().click({force: true})///////////
        cy.wait(2000);
        cy.get('.ant-input').eq(0).should('have.text','')
        cy.get('.ant-modal-body').find('.ant-input').first().type(idProduct) 
        cy.get('.ant-modal-body').find('.ant-input-number').first().type('111.11') 
        cy.get('.ant-modal-body').find('.ant-input').eq(3).click({force: true})           ///комірка
        cy.wait(2000);
        cy.get('[data-row-key] > :nth-child(8) > .ant-btn').first().click({force: true}) ///комірка
        cy.wait(2000);
        cy.get('.ant-modal-body').find('.ant-input-number-input').eq(1).clear().type('1.22')
        cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true})
        cy.wait(2000);
    })

    it('Оплата та Перевід в статус враховано Прихід Товару (CRT)/ Повернення від клієнта ', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(13) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.wait(2000);
        cy.get('div.ant-dropdown-trigger > span').click() /////////
        cy.wait(2000);
        cy.get('.ant-dropdown-menu-item').contains('Врах.').click()
        cy.wait(2000);
        cy.get('.styles-m__title---Nwr2X').contains('Врах.').should('exist')
//     })

    it('Перевірка 0 Залишку Прихід Товару (CRT)/ Повернення від клієнта ', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get('.styles-m__paper---3d-H1').children().eq(1).find(':nth-child(13) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.wait(2000);
        cy.get('.styles-m__sumNumeral---KAUvr').last().should('have.text','0 грн.')
        cy.get('.styles-m__header---2z2EP').find('.anticon-close').click()
    })

    it('Відображення документа в списку Прихід Товару (CRT)/ Повернення від клієнта / Пошук по номеру документа /  ', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(13) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().invoke('text').then(text =>{
            cy.log(text)
            const numArr = text.split('-') 
            cy.get('.styles-m__paper---3d-H1').find('.ant-input').type(numArr[numArr.length-1])
            cy.get('.ant-table-row > :nth-child(1) > a').first().invoke('text').then( textFind =>{
                expect(text).to.eq(textFind)
            })
        })
   })

   it('Створення документа Прихід Товару (CRT)/ Повернення від клієнта через кнопку Додати', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(13) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('.ant-btn').contains('Додати').click({force: true})
        cy.wait(2000)
        cy.get(':nth-child(2) > .ant-select > .ant-select-selection > .ant-select-selection__rendered > .ant-select-selection-selected-value > span').should('have.text','Повернення від клієнта')
    })
    ////***********Прихід / Повернення від Клієнта***************************************************************************************************** */

    ////***********Витрати з НЗ***************************************************************************************************** */
    //   it('Витрати з НЗ / Створення нового Ремонту через Швидку навігацію', ()=>{
    //         cy.get('.styles-m__logo---2zDPJ').click()
    //         cy.contains('Швидка навігація').click({force: true})
    //         cy.get('h1').should('have.text','Швидка навігація')
    //         cy.get(':nth-child(1) > .styles-m__blockItems---2q9Ea > :nth-child(1) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
    //         cy.get('.styles-m__title---Nwr2X > span').should('have.text','Нові')
    //         cy.get('.styles-m__description---1eHYb > span').should('have.text','Керування Вашими замовленнями')
    //         cy.get('.styles-m__header---2z2EP').find('.ant-btn').contains('Додати').first().click({force: true})
    //         cy.wait(2000);
    //         cy.get('#searchClientQuery').type('Vika')
    //         cy.get('.ant-select > .ant-select-selection').eq(3).type('Vika')
    //         cy.get('.ant-select-dropdown-menu-item').last().click({force: true})
    //         cy.wait(2000);
    //         cy.get('.ant-table-row > :nth-child(1)').first().click({force: true})
    //         cy.get('.styles-m__header---2z2EP').find('.ant-btn').contains('Додати').first().click({force: true})
    //         cy.wait(2000);
    //         cy.get('.ant-tabs-nav').contains('Запчастини').first().click({force: true})
    //         cy.get('.styles-m__headerActions---29OlS > [title="Додати"]').first().click({force: true})
    //         cy.wait(2000);
    //     })
    ////***********Витрати з НЗ***************************************************************************************************** */

    ////***********Плюс по Інвент. / Надлишки по інвестиції***************************************************************************************************** */
   
  it('Плюс по Інвент. (STP) / через +', ()=>{
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(10) > .styles-m__folderLink---2Myrv').click({force: true})
        cy.get('.ant-select > .ant-select-selection').eq(2).should('have.text','Надлишки по iнвент.')
        cy.get('.ant-input').eq(3).clear().type('Коментарій Плюс по Інвент.').should('have.text','Коментарій Плюс по Інвент.')
        cy.get(':nth-child(3) > .ant-input').type('STP'+idProduct)
        cy.wait(2000);
        cy.get('.ant-badge > .anticon').last().click({force: true}) // дискетка 
        cy.get('.styles-m__title---Nwr2X > :nth-child(1) > span').should('have.text','Нов.')
    })

    it('Додавання ЗЧ через модалку Каталог / Плюс/Надлишки по Інвент. (STP)', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(10) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-table-row > :nth-child(1) > .ant-btn').first().click({force: true})///////////
        cy.wait(2000);
        cy.get('.ant-input').eq(0).should('have.text','')
        cy.get('.ant-modal-body').find('.ant-input').first().type(idProduct) 
        cy.get('.ant-modal-body').find('.ant-input-number').first().type('111.11') 
        cy.get('.ant-modal-body').find('.ant-input').eq(2).click({force: true})           ///комірка
        cy.wait(2000);
        cy.get('[data-row-key] > :nth-child(8) > .ant-btn').first().click({force: true}) ///комірка
        cy.wait(2000);
        cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true})
        cy.wait(2000);
    })


    it('Оплата та Перевід в статус враховано Плюс/Надлишки по Інвент. (STP)', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(10) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.wait(2000);
        cy.get('div.ant-dropdown-trigger > span').click() /////////
        cy.wait(2000);
        cy.get('.ant-dropdown-menu-item').contains('Врах.').click()
        cy.wait(2000);
        cy.get('.styles-m__title---Nwr2X').contains('Врах.').should('exist')
    })

    it('Відображення документа в списку Плюс/Надлишки по Інвент. (STP)', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(10) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get(':nth-child(1) > .ant-btn').should('have.text','Надлишки по iнвент.')
        cy.get('[data-row-key] > :nth-child(1) > a').first().invoke('text').then(text =>{
            cy.log(text)
            const numArr = text.split('-') 
            cy.get('.styles-m__paper---3d-H1').find('.ant-input').type(numArr[numArr.length-1])
            cy.get('.ant-table-row > :nth-child(1) > a').first().invoke('text').then( textFind =>{
                expect(text).to.eq(textFind)
            })
        })
   })

   it('Створення документа  Плюс/Надлишки по Інвент. (STP)', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(10) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('.ant-btn').contains('Додати').click({force: true})
        cy.wait(2000)
        cy.get(':nth-child(2) > .ant-select > .ant-select-selection > .ant-select-selection__rendered > .ant-select-selection-selected-value > span').should('have.text','Надлишки по iнвент.')
    })
    ////***********Плюс по Інвент. / Надлишки по інвестиції***************************************************************************************************** */

    ////***********Мінус по Інвент. / Недостача по інвестиції***************************************************************************************************** */
   
    it('Мінус по Інвент. (STM) / через +', ()=>{
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(15) > .styles-m__folderLink---2Myrv').click({force: true})
        cy.get('.ant-select > .ant-select-selection').eq(2).should('have.text','Недостача по iнвент.')
        cy.get('.ant-input').eq(3).clear().type('Коментарій Мінус по Інвент.').should('have.text','Коментарій Мінус по Інвент.')
        cy.get(':nth-child(3) > .ant-input').type('STM'+idProduct)
        cy.wait(2000);
        cy.get('.ant-badge > .anticon').last().click({force: true}) // дискетка 
        cy.wait(2000);
        cy.get('.styles-m__title---Nwr2X > :nth-child(1) > span').should('have.text','Нов.')
    })

    it('Додавання ЗЧ через модалку Каталог Мінус/Недостача по Інвент.(STM)', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(15) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.wait(2000);
        cy.get('.ant-table-row > :nth-child(1) > .ant-btn').first().click({force: true})///////////
        cy.wait(2000);
        cy.get('.ant-input').eq(0).should('have.text','')
        cy.get('.ant-modal-body').find('.ant-input').first().type(idProduct) 
        cy.get('.ant-modal-body').find('.ant-input-number').first().type('111.11') 
        cy.get('.ant-modal-body').find('.ant-input').eq(2).click({force: true})           ///комірка
        cy.wait(2000);
        cy.get('[data-row-key] > :nth-child(8) > .ant-btn').first().click({force: true}) ///комірка
        cy.wait(2000);
        cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true})
        cy.wait(2000);
    })


    it('Оплата та Перевід в статус враховано Мінус/Недостача по Інвент.(STM)', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(15) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
        cy.wait(2000);
        cy.get('div.ant-dropdown-trigger > span').click() /////////
        cy.wait(2000);
        cy.get('.ant-dropdown-menu-item').contains('Врах.').click()
        cy.wait(2000);
        cy.get('.styles-m__title---Nwr2X').contains('Врах.').should('exist')
    })

    it('Відображення документа в списку Мінус/Недостача по Інвент.(STM)', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(15) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get(':nth-child(1) > .ant-btn').should('have.text','Недостача по iнвент.')
        cy.get('[data-row-key] > :nth-child(1) > a').first().invoke('text').then(text =>{
            cy.log(text)
            const numArr = text.split('-') 
            cy.get('.styles-m__paper---3d-H1').find('.ant-input').type(numArr[numArr.length-1])
            cy.get('.ant-table-row > :nth-child(1) > a').first().invoke('text').then( textFind =>{
                expect(text).to.eq(textFind)
            })
        })
   })

   it('Створення документа Мінус/Недостача по Інвент.(STM)', () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.contains('Швидка навігація').click({force: true})
        cy.get('h1').should('have.text','Швидка навігація')
        cy.get(':nth-child(15) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
        cy.wait(2000)
        cy.get('.ant-btn').contains('Додати').click({force: true})
        cy.wait(2000)
        cy.get(':nth-child(2) > .ant-select > .ant-select-selection > .ant-select-selection__rendered > .ant-select-selection-selected-value > span').should('have.text','Недостача по iнвент.')
    })
    ////***********Мінус по Інвент. / Недостача по інвестиції***************************************************************************************************** */
    })
})