/// <reference types="cypress" />
import LoginPage from '../../support/pageObject/loginPage';
import OrderPage from '../../support/pageObject/orderPage';
import ProfilePage from '../../support/pageObject/profilePage';

const loginPage = new LoginPage();
const orderPage = new OrderPage();
const profilePage = new ProfilePage();

const username = Cypress.env('DevKasur')
const password = Cypress.env('pw')

const baseUrl = 'https://'+Cypress.env('url')+'my.carbook.pro';
const appointments = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/appointments';
const addNZ = 'https://'+Cypress.env('url')+'my.carbook.pro/add';
const listPPO = 'https://'+Cypress.env('url')+'my.carbook.pro/report/cash_orders_logs';


describe ('PPO|Kasur|UA|Desktop|', function(){
    beforeEach('User LogIn ', function(){
        cy.visit(baseUrl)
        loginPage.enterLogin(username,password)
    });
  
    it('1. Профіль вибір українського інтерфейсу', function(){
        profilePage.selectUA()
    })

    it('2. Створення НЗ', function(){
        cy.visit(appointments)
        cy.get('img').first().click()
        cy.get('h1').should('have.text','Нові')
        cy.get('.ant-btn').last().click()
    })

    it('3. Заповнення картки по НЗ', function(){
        cy.visit(addNZ)
        cy.get('img').first().click()
        cy.get('h1').should('have.text','Додати Ремонт')
        cy.get('#searchClientQuery').type('Vika')
        cy.wait(2000)
        cy.get('tr').eq(1).click()
        cy.get('input').eq(5).click()
        cy.get('.ant-calendar-date').eq(10).click()
        cy.get('input').eq(6).click()
        cy.get('.ant-time-picker-panel-select-option-selected').eq(0).click({ force: true });
        cy.get('.ant-btn').click()
    })

    it('4. Додавання роботи в НЗ', function(){
        cy.visit(appointments) 
        cy.get('img').first().click({ force: true }) 
        cy.get('tr > td > a')
          .first()
          .click({ force: true }) // Open NZ first in list
        cy.get('.ant-tabs-nav',{timeout:5000})
          .contains('Роботи')
          .click({ force: true }) // табка Роботи в НЗ
        cy.get('button')
          .get('.anticon-plus')
          .eq(0)
          .click({ force: true }) // Іконка Додати Роботу
        cy.get('.ant-select-selection')
          .contains('Робота')
          .type('Заміна')
        cy.get('.ant-select-dropdown-menu-item')
          .first()
          .click({force: true});
        cy.get('.ant-modal-footer > div > .ant-btn-primary')
          .contains('Гаразд')
          .click({force: true})
          .wait(3000) 
    })

    it('5. Часткова оплата ч/з статус Завершено / Каса РРО', function(){
        cy.visit(appointments)  
        cy.get('img').first().click({ force: true })
        cy.get('tr > td > a')
          .first()
          .click({ force: true }) // Open NZ first in list
        cy.get('.ant-dropdown-trigger')
          .contains('Перевести у статус')
          .click({ force: true })    
        cy.get('.ant-dropdown-menu',{timeout:3000})
          .contains('Завершено')
          .click({ force: true });  
        cy.get('#withPayment > :nth-child(1) > :nth-child(2)')
          .click({ force: true });
        cy.get('#cashBoxId')     // Вибір Каси
          .click({ force: true }); 
        cy.get('.ant-select-dropdown-menu  > :nth-child(6)') // касаРРО372  
          .click({ force: true });
        cy.get('#partialPayment')
          .click({ force: true})                       
        cy.get('#paymentSum')     // часткова сума 100
          .clear()
          .type('100')      
        cy.get('.styles-m__submit---2hKgG > .ant-btn-primary').click();
        cy.wait(9000);
        cy.get('.styles-m__title---Nwr2X').contains('Виконано')
        cy.wait(1000)
    })

  it('4. Перевірка завантаженого чека / аванс (часткова олата)', function(){
        cy.visit(appointments)
        const path = require("path");
        cy.readFile(path.join('cypress/downloads', 'sale'+'.pdf')).should("exist");
    })

    it('5. Перевірка оплати в Журналі РРО', function(){
        cy.visit(listPPO)  
        cy.get('img').first().click({ force: true })
        
    
    })


})