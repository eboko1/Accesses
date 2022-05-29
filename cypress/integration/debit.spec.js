/// <reference types="cypress" />
import ProfilePage from '../support/pageObject/profilePage';
import BaseStorage from '../support/pageObject/storage/baseStorage';

const profilePage = new ProfilePage();
const baseStorage = new BaseStorage();

const idProduct ='DEB'+'8989'
const supplierSystem = 'АСГ S'
const supplierNew = 'NewSupplier'

  describe ('Find|Master|UA|Desktop|', function(){
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
      login(Cypress.env('Manual'), Cypress.env('pw')) //присутні: доступи до пошуку, реквізити Постачальника з ПДВ та без ПДВ supplierSystem,
    })

    it('Профіль вибір українського інтерфейсу', function(){
      cy.visit('/')
      profilePage.choiceLanguage(1)
    })

    it('INC / Прихід від Постачальника ч/з + ',  function(){
  
    })

   

  })