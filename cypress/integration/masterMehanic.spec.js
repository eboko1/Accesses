/// <reference types="cypress" />
import LoginPage from '../support/pageObject/loginPage';
import OrderPage from '../support/pageObject/orderPage';
import ClientPage from '../support/pageObject/clientPage';
import ProfilePage from '../support/pageObject/profilePage';
import LaborTab from '../support/pageObject/tabsOrder/laborTab';
import ProductTab from '../support/pageObject/tabsOrder/productTab';
import LaborDetails from '../support/pageObject/laborDetails';
import Menu from '../support/pageObject/menu';

const loginPage = new LoginPage();
const orderPage = new OrderPage();
const clientPage = new ClientPage();
const profilePage = new ProfilePage();
const laborTab = new LaborTab();
const productTab = new ProductTab();
const laborDetails = new LaborDetails();
const menu = new Menu();

describe ('Master|Mehanic|UA|Desktop|', function(){ 
  const login = (email, password) =>{
    cy.session([email, password], () => { 
      cy.visit('/') 
      cy.get('#loginForm_login').type(email)
      cy.get('#loginForm_password').type(password)
      cy.get('button').click()
      cy.wait(7000)
      cy.getCookie('io')
      cy.get('img').eq(0).click({force: true}) //menu
    })
  }

  beforeEach('User Login ', function(){
    cy.viewport(1240,960) 
    login(Cypress.env('LoginMasterMehanic'), Cypress.env('pw'))
  })

  it('Профіль вибір українського інтерфейсу', function(){
      cy.visit('/profile')
      profilePage.selectUA()
  })

  it('Інформація по а/м в НЗ', function(){
      cy.visit('/orders/approve')
      orderPage.openNZMehanic()
      orderPage.getInfoAuto()
  });

  it('Редагування ціни для Роботи в НЗ', function(){
    cy.visit('/orders/progress')
    orderPage.openNZMehanic()
    cy.log('Вкладка Роботи');
    cy.get('.ant-tabs-nav > :nth-child(1)').contains('Роботи').click();
    cy.wait(1000);
    cy.get(':nth-child(1) > [title="Швидке редагування"]').first().click({force: true})
    cy.wait(1000);
    cy.log('Закупочна ціна');
    cy.get(':nth-child(4) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().type('111');
    cy.wait(1000);
    cy.get('.ant-btn-primary').last().click({force: true})
    cy.wait(1000);
    cy.get('.anticon-save').click() // зберегти картку
    cy.log('Процес Збереження н/з ');
    cy.wait(5000);
  });

  it('Відкриття таб. Роботи', function(){
    cy.visit('/orders/approve')
    cy.wait(2000)
    orderPage.openNZMehanic()
    cy.get('.ant-tabs-nav > :nth-child(1)').contains('Роботи').click()
    cy.wait(2000);
    cy.get('.ant-table-content').should('exist')
  });
  
  it('Відкриття таб. Запчастини', function(){
    cy.visit('/orders/approve')
    cy.wait(2000)
    orderPage.openNZMehanic()
    cy.log('Вкладка Запчастини');
    cy.get('.ant-tabs-nav > :nth-child(1)').contains('Запчастини').click()
    cy.wait(2000);
    cy.get('.ant-table-content').should('exist')
  });

  it('Статистика в НЗ', function(){
    cy.visit('/orders/success');
    cy.wait(2000)
    orderPage.openNZMehanic()
    orderPage.getStatisticOrder()
  });

  it('Додавання Коментарів', function(){
    cy.visit('/orders/progress');
    cy.wait(2000)
    orderPage.openNZMehanic()
    orderPage.addComments();
  })

  it('Відсутність $ ', function(){
    cy.visit('/orders/success');
    orderPage.openNZMehanic()
    orderPage.checkDollar()
  });

  it('Вкладка Пост в н/з', function(){
    cy.visit('/orders/success');
    orderPage.openNZMehanic()
    orderPage.checkTabPost(); 
  });

  it('Відкриття сторінки Деталі в Роботі', function(){
    cy.visit('/spare-parts-workplace');
    laborDetails.openPage();
  });

  it('Меню / Ремонти/ Список Ремонтів', function(){   // connect for start 
    cy.visit('/');
    cy.wait(2000)
    cy.get('.ant-menu-item').contains('Ремонти').click({force: true})
    cy.get('h1').should('have.text','Нові')
    cy.get('.ant-table-content').should('exist')
    cy.get('a > .ant-btn').contains('Додати').click({force: true})
    cy.wait(3000);
    cy.get('h1').should('have.text','Додати Ремонт')
    cy.get('.styles-m__headerContorls---2pU_V > .anticon > svg').click({force: true})
    cy.get('tr > td > a').first().click({force: true});
    cy.wait(2000)
    cy.get('h1').contains('Новий').should('exist')
  })

  it('Меню / Довідник', function() {
    cy.visit('/');
    menu.menuOpen('Довідник', 'Довідники', 'Довідники та налаштування')
  })

  it('Меню / Товари / Список Товарів',   function(){
    cy.visit('/');
    menu.menuOpen('Довідник', 'Товари', 'Товари')
  })

  it('Меню / Автомобілі / Список а/м',   function(){
    cy.visit('/');
    menu.menuOpen('Довідник', 'Автомобілі', 'Автомобілі')
  })

  it('Меню / Клієнти / Список клієнтів',   function(){
    cy.visit('/');
    menu.menuOpen('Довідник', 'Клієнти', 'Клієнти')

  })

  it('Меню / Працівники / Список Працівників',   function(){
    cy.visit('/');
    menu.menuOpen('Довідник', 'Працівники', 'Працівники')
  })

  it('Загальний пошук', function(){
    cy.visit('/dashboard');
    cy.get('h1').should('have.text','Календар Завантаження')
    cy.get('.ant-select-selection-search').type('start')
    cy.wait(3000)
    cy.get('h1').should('not.have.text','Помилка')
  })

})