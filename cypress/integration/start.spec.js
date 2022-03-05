/// <reference types="cypress" />

import LoginPage from '../support/pageObject/loginPage';
import OrderPage from '../support/pageObject/orderPage';
import ClientPage from '../support/pageObject/clientPage';
import ProfilePage from '../support/pageObject/profilePage';
import LaborTab from '../support/pageObject/tabsOrder/laborTab';
import ProductTab from '../support/pageObject/tabsOrder/productTab';
import EmploeePage from '../support/pageObject/emploeePage';
import LaborDetails from '../support/pageObject/laborDetails';
import Menu from '../support/pageObject/menu';
import NavigationPage from '../support/pageObject/navigationPage';

const loginPage = new LoginPage();
const orderPage = new OrderPage();
const clientPage = new ClientPage();
const profilePage = new ProfilePage();
const laborTab = new LaborTab();
const productTab = new ProductTab();
const emploeePage = new EmploeePage();
const laborDetails = new LaborDetails();
const menu = new Menu();
const navigationPage = new NavigationPage();

var date = new Date();
var second = parseInt(date.getSeconds())+10
var minute = parseInt(date.getMinutes())+10
///const idClient ='21115'
const idClient =''+date.getDate()+date.getMonth()+date.getMinutes();
const tel =second+'0'+minute+''+second+''+minute;

describe ('Start|Admin|UA|Desktop', function(){

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
    login(Cypress.env('LoginStart'), Cypress.env('pw'))
  })
  
  it('Профіль вибір українського інтерфейсу', function(){
    cy.visit('/profile')
    profilePage.selectUA()
  })

  it('Додавання Клієнта та а/м: '+idClient, function(){
    cy.visit('/add')
    clientPage.createClient(idClient,tel)
  });

  it('Перевірка заповнених полів Картка клієнта '+idClient, function(){
    cy.visit('/client-hot-operations')
    clientPage.checkClient(idClient,tel)
  })

  it('Редагування мобільного номера Клієнта:'+idClient, function(){
    cy.visit('/client-hot-operations')
    clientPage.editClientNumber(idClient,tel)
  })

  it('Додати Н/З, підтягування клієнта через пошук, клієнт: '+idClient, function(){
    cy.visit('/orders/appointments')
    orderPage.createOrder(idClient)
  });

  it('Редагування н/з та додавання Поста, Механіка, Готівки, Реквізити STO, Пробіг', function(){
    cy.visit('/orders/appointments')
    orderPage.openNZ(idClient)
    orderPage.editOrder(idClient)
  });

  it('Перевірка заповнених полів: Поста, Механіка, Готівки, Реквізити STO, Пробіг, Знижка', function(){
    cy.visit('/orders/appointments')
    orderPage.openNZ(idClient)
    orderPage.checkOrder(idClient)
  });

  it('Перевід у статус Запис', function(){
    cy.visit('/orders/appointments')
    orderPage.openNZ(idClient)
    orderPage.createAppointments()
  });

  it('Додавання Робіт через групи Товарів', function(){
    cy.visit('/orders/approve')
    orderPage.openNZ(idClient)
    laborTab.addLaborGroupProduct(idClient)
  })

  it('Додавання Робіт через групи Товарів', function(){
    cy.visit('/orders/approve')
    orderPage.openNZ(idClient)
    laborTab.addLaborGroupProduct()
  })

  it('Редагування ціни для доданої Роботи', function(){
    cy.visit('/orders/approve')
    orderPage.openNZ(idClient)
    laborTab.editLaborDiagnostic()
  });
 
  it('Додавання Робіт через поле Робіт', function(){
    cy.visit('/orders/approve').then(()=>{})
    orderPage.openNZ(idClient)
    laborTab.addLaborPlus()
  })

  it('Додавання Робіт повторно', function(){
    cy.visit('/orders/approve')
    orderPage.openNZ(idClient)
    laborTab.addLaborPlus()
  })

  it('Відображення механіка в табці Роботи  ', function(){
    cy.visit('/orders/approve')
    orderPage.openNZ(idClient)
    laborTab.showMehanicLabor()
  })

  it('Додавання Запчастин ч/з Групу ЗЧ', function(){
    cy.visit('/orders/approve')
    orderPage.openNZ(idClient)
    productTab.addProduct()
  })

  it('Вкладка Запчастини > Пряме редагування', function(){
    cy.visit('/orders/approve')
    orderPage.openNZ(idClient)
    productTab.editProduct()
  });

  it('Вкладка Запчастини > Швидке редагування запчастин', function(){
    cy.visit('/orders/approve')
    orderPage.openNZ(idClient)
    productTab.editProductIcon(idClient)
  });

  it('Інформація по а/м в НЗ', function(){
      cy.visit('/orders/approve')
      orderPage.openNZ(idClient)
      orderPage.getInfoAuto()
  });

  it('Перевід у статус Ремонту', function(){
    cy.visit('/orders/approve')
    orderPage.openNZ(idClient)
    orderPage.createProgress()
  })

  it('Додавання Коментарів', function(){
    cy.visit('/orders/progress');
    orderPage.openNZ(idClient)
    orderPage.addComments()
  });

  it('Перевід НЗ в статус Завершено', function(){  // відсутня оплата в пакеті start
    cy.visit('/orders/progress');
    orderPage.openNZ(idClient)
    cy.get('.ant-dropdown-trigger').eq(1).trigger('mouseover') // Статус Завершено
    cy.get('.ant-dropdown-menu-item').contains('Завершено').click()
    cy.get('[data-qa=button_submit_yes_to_success_form]').click({force: true});//ОК;
    cy.wait(5000);
    cy.get('h1').contains('Виконано')
    cy.wait(4000);   
  });

  it('Відображення модалки Статистики в НЗ', function(){
    cy.visit('/orders/success');
    orderPage.openNZ(idClient)
    orderPage.getStatisticOrder();
  });

  it('Завантаження НЗ для Клієнта', function(){
    cy.visit('/orders/success');
    orderPage.openNZ(idClient)
    orderPage.downloadOrder();
    cy.wait(8000);
  });

  it('Перевірка завантаженних файлів', function(){
    cy.visit('/orders/success');
    orderPage.checkDownloadOrder();
  });

  it('Відсутність $ в пакеті START', function(){
    cy.visit('/orders/success');
    orderPage.openNZ(idClient)
    orderPage.checkDollar();
  });

  it('Копія НЗ', function(){
    cy.visit('/orders/success');
    orderPage.openNZ(idClient)
    orderPage.copyOrder();
  });

  it('Видалення НЗ', function(){
    cy.visit('/orders/appointments')
    orderPage.openNZ(idClient)
    orderPage.deleteOrder();
  });

  it('Вкладка Історія в н/з', function(){
    cy.visit('/orders/success');
    orderPage.openNZ(idClient)
    orderPage.checkHistory();
  });

  it('Вкладка Пост в н/з', function(){
    cy.visit('/orders/success');
    orderPage.openNZ(idClient);
    orderPage.checkTabPost();
  });

  it('Відкриття форми створення Працівника', function(){
    cy.visit('/employees');
    emploeePage.openEmploeeCardForCreate();
  });

  it('Відкриття картки існуючого Працівника', function(){
    cy.visit('/employees');
    emploeePage.openEmploeeCard();
  });

  it('Відкриття сторінки Деталі в Роботі', function(){
    cy.visit('/spare-parts-workplace');
    laborDetails.openPage()
  });
  
  it('Меню / Швидка навігація + Ремонт', function(){
    cy.visit('/') 
    cy.get('.ant-menu-item').contains('Швидка навігація').first().click({force: true})
    cy.get('.anticon-plus').eq(0).click({force: true})
      .then(()=> {
        cy.get('h1').contains('Додати Ремонт').should('exist')
    }) 
  })

  it('Меню / Швидка навігація / Кнопка Ремонти', function(){
    cy.visit('/new-document') 
    navigationPage.openNavigation('Наряд замовлення','Нові')
  })

  it('Меню / Швидка навігація / Кнопка Запис', function() {
    cy.visit('/new-document')
    navigationPage.openNavigation('Запис','Записи')
  })

  it('Меню / Швидка навігація / Кнопка Ремонт', function(){
    cy.visit('/new-document')
    navigationPage.openNavigation('Ремонт','Ремонти')
  })
  it('Меню / Швидка навігація / Кнопка Виконано', function(){
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

  it('Меню / Ремонти', function(){
    cy.visit('/') 
    cy.get('.ant-menu-item').contains('Ремонти').click({force: true})
    cy.get('h1').should('have.text','Нові')
    cy.get('.ant-table-content').should('exist')
    cy.get('a > .ant-btn').contains('Додати').click({force: true})
    cy.wait(3000)
    cy.get('h1').should('have.text','Додати Ремонт')
    cy.get('.styles-m__headerContorls---2pU_V > .anticon > svg').click({force: true})
    cy.get('tr > td > a').first().click({force: true});
    cy.wait(2000)
    cy.get('h1').contains('Новий').should('exist')
  })

  it('Меню / Довідник', function(){
    cy.visit('/') 
    menu.menuOpen('Довідник', 'Довідники', 'Довідники та налаштування')
  })

  it('Меню / Товари / Відображення списку ЗЧ', function(){
    cy.visit('/') 
    menu.menuOpen('Довідник', 'Товари', 'Товари')
  })

  it('Меню / Автомобілі / Відображення списку а/м', function(){
    cy.visit('/') 
    menu.menuOpen('Довідник', 'Автомобілі', 'Автомобілі')
  })

  it('Меню / Клієнти / Відображення списку Клієнтів', function(){
    cy.visit('/') 
    menu.menuOpen('Довідник', 'Клієнти', 'Клієнти')
  })

  it('Меню / Працівники', function(){
    cy.visit('/') 
    menu.menuOpen('Довідник', 'Працівники', 'Працівники')
  })

  it('Загальний пошук', function(){
    cy.visit('/dashboard') 
    cy.get('h1').should('have.text','Календар Завантаження')
    cy.get('.ant-select-selection-search').type('start')
    cy.wait(3000)
    cy.get('h1').should('not.have.text','Помилка')
  })

})