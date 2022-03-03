/// <reference types="cypress" />
import ProfilePage from '../../support/pageObject/profilePage';
import NavigationPage from '../../support/pageObject/navigationPage';
import Menu from '../../support/pageObject/menu';

const profilePage = new ProfilePage();
const navigationPage = new NavigationPage();
const menu = new Menu();

describe ('Menu|Master|UA|Desktop|', function(){
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
    ///login(Cypress.env('LoginQA'), Cypress.env('pwD'))  //test
    login("my@admin.com", "123456")
})
  
  it('Профіль вибір українського інтерфейсу', function(){
    cy.visit('/')
    profilePage.selectUA()
  })
 
  it('Меню / Швидка навігація + Ремонт',   function(){
    cy.visit('/new-document')
    cy.get('.anticon-plus').eq(0).click({force: true})
    cy.wait(2000)
    cy.get('h1').should('have.text','Додати Ремонт')
  })

  it('Меню / Швидка навігація / Кнопка Ремонти',   function(){
    cy.visit('/new-document') 
    navigationPage.openNavigation('Наряд замовлення','Нові')
  })

  it('Меню / Швидка навігація / Кнопка Запис',   function(){
    cy.visit('/new-document')
    navigationPage.openNavigation('Запис','Записи')
  })

  it('Меню / Швидка навігація / Кнопка Ремонт',   function(){
    cy.visit('/new-document')
    navigationPage.openNavigation('Ремонт','Ремонти')
  })

  it('Меню / Швидка навігація / Кнопка Виконано',   function(){
    cy.visit('/new-document')
    navigationPage.openNavigation('Виконано','Виконані')
  })

  it('Меню / Швидка навігація / Кнопка Відмова',   function(){
    cy.visit('/new-document')
    navigationPage.openNavigation('Відмова','Відмови')
  })

  it('Меню / Швидка навігація / Кнопка Запрошення',   function(){
    cy.visit('/new-document')
    navigationPage.openNavigation('Запрошення','Запрошення')
  })

  it('Меню / Швидка навігація / Кнопка Відгук',   function(){
    cy.visit('/new-document')
    navigationPage.openNavigation('Відгук','Відгуки')
  })

  it('Меню / Ремонти', function() {
    cy.visit('/')
    cy.get('.ant-menu-item').contains('Ремонти').click({force: true})
    cy.get('h1').should('have.text','Нові')
    cy.get('.ant-table-content').should('exist')
    cy.get('a > .ant-btn').contains('Додати').click({force: true})
    cy.wait(2000)
    cy.get('h1').should('have.text','Додати Ремонт')
    cy.get('.anticon-close').first().click({force: true})            // закриття модалки додати ремонт
    cy.get('tr > td > a').first().click({force: true});
    cy.wait(4000)
    cy.get('h1').contains('Новий').should('exist')
  })

  it('Меню / Довідник', function() {
    cy.visit('/')

    cy.get('.ant-menu-submenu-title').contains('Довідник').click({force: true})
    cy.get('.ant-menu-item').contains('Довідники').click({force: true})
    cy.get('h1').should('have.text','Довідники та налаштування')
    cy.wait(2000)
    cy.get('.ant-layout-content').should('exist')             
  })

  it('Меню / Товари', function() {
    cy.visit('/')
    cy.get('.ant-menu-submenu-title').contains('Довідник').click({force: true})
    cy.get('.ant-menu-item').contains('Товари').click({force: true})
    cy.get('h1').should('have.text','Товари')
    cy.wait(2000)
    cy.get('.ant-layout-content').should('exist')      
  })

  it('Меню / Автомобілі', function() {
    cy.visit('/')
    cy.get('.ant-menu-submenu-title').contains('Довідник').click({force: true})
    cy.get('.ant-menu-item').contains('Автомобілі').click({force: true})
    cy.get('h1').should('have.text','Автомобілі')
    cy.wait(2000)
    cy.get('.ant-layout-content').should('exist')      
  })

  it('Меню / Клієнти', function() {
    cy.visit('/')
    cy.get('.ant-menu-submenu-title').contains('Довідник').click({force: true})
    cy.get('.ant-menu-item').contains('Клієнти').click({force: true})
    cy.wait(2000);
    cy.get('h1').should('have.text','Клієнти')
    cy.wait(2000)
    cy.get('.ant-layout-content').should('exist')     
  })

  it('Меню / Працівники', function(){
    cy.visit('/')
    cy.get('.ant-menu-submenu-title').contains('Довідник').click({force: true})
    cy.get('.ant-menu-item').contains('Працівники').click({force: true})
    cy.wait(2000);
    cy.get('h1').should('have.text','Працівники')
    cy.wait(4000)
    cy.get('.ant-layout-content').should('exist')      
  })
})