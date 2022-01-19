/// <reference types="cypress" />
import ProfilePage from '../../support/pageObject/profilePage';
const profilePage = new ProfilePage();
const baseUrl = 'https://'+Cypress.env('url')+'my.carbook.pro';

describe ('Menu|Master|UA|Desktop|', function(){

  beforeEach('User LogIn ', function(){
    cy.login(baseUrl, Cypress.env('LoginMaster'), Cypress.env('pw'))
  });

  it('Профіль вибір українського інтерфейсу', function(){
    cy.visit(baseUrl+'/profile')
    profilePage.selectUA()
  })
 
  it('Меню / Швидка навігація + Ремонт',   function(){
    cy.get('.ant-menu-item').contains('Швидка навігація').first().click({force: true})
    cy.get(':nth-child(1) > .styles-m__folderLink---2Myrv > .anticon > svg').first().click({force: true})
    cy.get('h1').should('have.text','Додати Ремонт')
  })

  it('Меню / Швидка навігація / Кнопка Ремонти',   function(){
    cy.get('.ant-menu-item').contains('Швидка навігація').first().click({force: true})
    cy.get(':nth-child(1) > .styles-m__buttonLink---1D7wr > .ant-btn').first().click({force: true})
    cy.get('h1').should('have.text','Нові')
  })

  it('Меню / Швидка навігація / Кнопка Запис',   function(){
    cy.get('.ant-menu-item').contains('Швидка навігація').click({force: true})
    cy.get('.ant-btn').contains('Запис').click({force: true})
    cy.get('h1').should('have.text','Записи')
  })

  it('Меню / Швидка навігація / Кнопка Ремонт',   function(){
    cy.get('.ant-menu-item').contains('Швидка навігація').click({force: true})
    cy.get('.ant-btn').contains('Ремонт').click({force: true})
    cy.get('h1').should('have.text','Ремонти')
  })
  it('Меню / Швидка навігація / Кнопка Виконано',   function(){
    cy.get('.ant-menu-item').contains('Швидка навігація').click({force: true})
    cy.get('.ant-btn').contains('Виконано').click({force: true})
    cy.get('h1').should('have.text','Виконані')
  })

  it('Меню / Швидка навігація / Кнопка Відмова',   function(){
    cy.get('.ant-menu-item').contains('Швидка навігація').click({force: true})
    cy.get('.ant-btn').contains('Відмова').click({force: true})
    cy.get('h1').should('have.text','Відмови')
  })

  it('Меню / Швидка навігація / Кнопка Запрошення',   function(){
    cy.get('.ant-menu-item').contains('Швидка навігація').click({force: true})
    cy.get('.ant-btn').contains('Запрошення').click({force: true})
    cy.get('h1').should('have.text','Запрошення')
  })

  it('Меню / Швидка навігація / Кнопка Відгук',   function(){
    cy.get('.ant-menu-item').contains('Швидка навігація').click({force: true})
    cy.get('.ant-btn').contains('Відгук').click({force: true})
    cy.get('h1').should('have.text','Відгуки')
  })

  it('Меню / Ремонти',   function(){
    cy.get('.ant-menu-item').contains('Ремонти').click({force: true})
    cy.get('h1').should('have.text','Нові')
    cy.get('.ant-table-content').should('exist')
    cy.get('a > .ant-btn').contains('Додати').click({force: true})
    cy.get('h1').should('have.text','Додати Ремонт')
    cy.get('.styles-m__headerContorls---2pU_V > .anticon > svg').click({force: true})
    cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
    cy.get('h1 > span').should('have.text','Новий')
  })

  it('Меню / Довідник',   function(){
    cy.get('.ant-menu-submenu-title').contains('Довідник').click({force: true})
    cy.get('.ant-menu-item').contains('Довідники').click({force: true})
    cy.get('h1').should('have.text','Довідники та налаштування')
    cy.get('.styles-m__paper---3d-H1').should('exist')
  })

  it('Меню / Товари',   function(){
    cy.get('.ant-menu-submenu-title').contains('Довідник').click({force: true})
    cy.get('.ant-menu-item').contains('Товари').click({force: true})
    cy.get('h1').should('have.text','Товари')
    cy.get('.sc-gzVnrw').should('exist')
  })

  it('Меню / Автомобілі',   function(){
    cy.get('.ant-menu-submenu-title').contains('Довідник').click({force: true})
    cy.get('.ant-menu-item').contains('Автомобілі').click({force: true})
    cy.get('h1').should('have.text','Автомобілі')
    cy.get('.styles-m__paper---3d-H1').should('exist')
  })

  it('Меню / Клієнти',   function(){
    cy.get('.ant-menu-submenu-title').contains('Довідник').click({force: true})
    cy.get('.ant-menu-item').contains('Клієнти').click({force: true})
    cy.wait(2000);
    cy.get('h1').should('have.text','Клієнти')
    cy.get('.ant-table-body').should('exist')
  })

  it('Меню / Працівники',   function(){
    cy.get('.ant-menu-submenu-title').contains('Довідник').click({force: true})
    cy.get('.ant-menu-item').contains('Працівники').click({force: true})
    cy.wait(2000);
    cy.get('h1').should('have.text','Працівники')
    cy.get('.styles-m__paper---3d-H1').should('exist')
  })
})