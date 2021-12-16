/// <reference types="cypress" />
import LoginPage from '../../support/pageObject/loginPage';
import OrderPage from '../../support/pageObject/orderPage';
import ClientPage from '../../support/pageObject/clientPage';
import ProfilePage from '../../support/pageObject/profilePage';

import LaborTab from '../../support/pageObject/tabsOrder/laborTab';
import ProductTab from '../../support/pageObject/tabsOrder/productTab';

const loginPage = new LoginPage();
const orderPage = new OrderPage();
const clientPage = new ClientPage();
const profilePage = new ProfilePage();
const laborTab = new LaborTab();
const productTab = new ProductTab();

const username = Cypress.env('LoginMasterMehanic')
const password = Cypress.env('pw')

const baseUrl = 'https://'+Cypress.env('url')+'my.carbook.pro';
const appointments = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/appointments';
const approve = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/approve';
const progress = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/progress';
const success = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/success';
const cancel = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/cancel';

var date = new Date();
//const idClient ='91140'
const idClient =''+date.getDate()+date.getMonth()+date.getMinutes();
var second = parseInt(date.getSeconds())+10
var minute = parseInt(date.getMinutes())+10
const tel =second+'0'+minute+''+second+''+minute;

describe ('Master|Mehanic|UA|Desktop|', function(){
  beforeEach('User LogIn ', () => {
    cy.visit(baseUrl)
    loginPage.enterLogin(username,password)
  });

  it('Профіль вибір українського інтерфейсу', function(){
    profilePage.selectUA()
  })
 
  it('Загальний пошук', function(){
    cy.get('.styles-m__logo---2zDPJ').click()
    cy.get('.styles-m__title---Nwr2X > span').should('have.text','Календар Завантаження')
    cy.get('.ant-select-search__field > .ant-input').type('start')
    cy.wait(3000)
    cy.get('.styles-m__title---Nwr2X > span').should('not.have.text','Помилка')
  })

})