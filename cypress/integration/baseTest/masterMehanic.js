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

const baseUrl = 'https://'+Cypress.env('url')+'my.carbook.pro';

var date = new Date();
//const idClient ='91140'
const idClient =''+date.getDate()+date.getMonth()+date.getMinutes();
var second = parseInt(date.getSeconds())+10
var minute = parseInt(date.getMinutes())+10
const tel =second+'0'+minute+''+second+''+minute;

describe ('Master|Mehanic|UA|Desktop|', function(){
  beforeEach('User Login ', function(){
    cy.login(baseUrl+'/login', Cypress.env('LoginMasterMehanic'), Cypress.env('pw'))
      .then(()=>{
        cy.url().should('contain', '/dashboard')
        cy.get('img').eq(0).click({force: true}) //menu
      })
  });

  it('Профіль вибір українського інтерфейсу', function(){
    cy.visit(baseUrl+'/profile')
    profilePage.selectUA()
  })

  it('Інформація по а/м в НЗ', function(){
      cy.visit(baseUrl+'/orders/approve')
      orderPage.getInfoAuto()
  });

  it('Редагування ціни для Роботи в НЗ', function(){
    cy.visit(baseUrl+'/orders/approve')
    ///cy.get('.ant-input-search > .ant-input').type(idClient)
    cy.wait(2000);
    cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
    cy.log('Вибір Запису');
    cy.wait(4000);
    cy.log('Вкладка Роботи');
    cy.get('.ant-tabs-nav > :nth-child(1)').contains('Роботи').click();
    /// перевірка доданої роботи з діагностики
    cy.wait(1000);
    cy.get(':nth-child(1) > [title="Швидке редагування"] > div').first().click({force: true})
    cy.wait(1000);
    cy.log('Закупочна ціна');
    cy.get(':nth-child(4) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().type('111');
    cy.wait(1000);
    cy.get('.ant-btn-primary').last().click({force: true})
    cy.wait(1000);
    cy.get('.styles-m__headerContorls---2pU_V > .anticon-save').click() // зберегти картку
    cy.log('Процес Збереження н/з ');
    cy.wait(5000);
  });

  it('Відкриття таб. Роботи', function(){
    cy.visit(baseUrl+'/orders/approve')
    ////////cy.get('.ant-input-search > .ant-input').type(idClient)//пошук
    cy.wait(2000);
    cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
    cy.log('Вибір Запису');
    cy.wait(10000);
    cy.log('Вкладка Запчастини');
    cy.get('.ant-tabs-nav > :nth-child(1)').contains('Роботи').click()
    cy.wait(2000);
    cy.get('.ant-table-content').should('exist')
  });
  
  it('Відкриття таб. Запчастини', function(){
    cy.visit(baseUrl+'/orders/approve')
    ////////cy.get('.ant-input-search > .ant-input').type(idClient)//пошук
    cy.wait(2000);
    cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
    cy.log('Вибір Запису');
    cy.wait(10000);
    cy.log('Вкладка Запчастини');
    cy.get('.ant-tabs-nav > :nth-child(1)').contains('Запчастини').click()
    cy.wait(2000);
    cy.get('.ant-table-content').should('exist')
  });

  it('Статистика в НЗ', function(){
    cy.visit(baseUrl+'/orders/success');
    orderPage.getStatisticOrder()
  });

  it('Додавання Коментарів', function(){
    cy.visit(baseUrl+'/orders/progress');
    orderPage.addComments(idClient)});


  it('Відсутність $ в НЗ', function(){
    cy.visit(baseUrl+'/orders/success');
    orderPage.checkDollar()
  });

  it('Вкладка Історія в н/з', function(){
    cy.visit(baseUrl+'/orders/success');
    orderPage.checkHistory();
  });

  it('Вкладка Пост в н/з', function(){
    cy.visit(baseUrl+'/orders/success');
    orderPage.checkTabPost(); });

  it('Відкриття сторінки Деталі в Роботі', function(){
    cy.visit(baseUrl+'/spare-parts-workplace');
    laborDetails.openPage();
  });


  it('Меню / Ремонти/ Список Ремонтів', function(){
    cy.get('.ant-menu-item').contains('Ремонти').click({force: true})
    cy.get('h1 > span').should('have.text','Нові')
    cy.get('.ant-table-content').should('exist')
    cy.get('a > .ant-btn').contains('Додати').click({force: true})
    cy.get('h1 > span').should('have.text','Додати Ремонт')
    cy.get('.styles-m__headerContorls---2pU_V > .anticon > svg').click({force: true})
    cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
    cy.get('h1 > span').should('have.text','Новий')
  })

  it('Меню / Довідник', function() {
    cy.get('.ant-menu-submenu-title').contains('Довідник').click({force: true})
    cy.get('.ant-menu-item').contains('Довідники').click({force: true})
    cy.get('h1 > span').should('have.text','Довідники та налаштування')
    cy.get('.styles-m__paper---3d-H1').should('exist')
  })

  it('Меню / Товари / Список Товарів',   function(){
    cy.get('.ant-menu-submenu-title').contains('Довідник').click({force: true})
    cy.get('.ant-menu-item').contains('Товари').click({force: true})
    cy.get('h1 > span').should('have.text','Товари')
    cy.get('.sc-gzVnrw').should('exist')
  })

  it('Меню / Автомобілі / Список а/м',   function(){
    cy.get('.ant-menu-submenu-title').contains('Довідник').click({force: true})
    cy.get('.ant-menu-item').contains('Автомобілі').click({force: true})
    cy.get('h1 > span').should('have.text','Автомобілі')
    cy.get('.styles-m__paper---3d-H1').should('exist')
  })

  it('Меню / Клієнти / Список клієнтів',   function(){
    cy.get('.ant-menu-submenu-title').contains('Довідник').click({force: true})
    cy.get('.ant-menu-item').contains('Клієнти').click({force: true})
    cy.wait(2000);
    cy.get('.styles-m__title---Nwr2X').should('have.text','Клієнти')
    cy.get('.ant-table-body').should('exist')
  })

  it('Меню / Працівники / Список Працівників',   function(){
    cy.get('.ant-menu-submenu-title').contains('Довідник').click({force: true})
    cy.get('.ant-menu-item').contains('Працівники').click({force: true})
    cy.wait(2000);
    cy.get('h1 > span').should('have.text','Працівники')
    cy.get('.styles-m__paper---3d-H1').should('exist')
  })


  it('Загальний пошук', function(){
    cy.get('.styles-m__logo---2zDPJ').click()
    cy.get('h1 > span').should('have.text','Календар Завантаження')
    cy.get('.ant-select-search__field > .ant-input').type('start')
    cy.wait(3000)
    cy.get('h1 > span').should('not.have.text','Помилка')
  })

})