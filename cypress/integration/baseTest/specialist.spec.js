/// <reference types="cypress" />
import LoginPage from '../../support/pageObject/loginPage';
import OrderPage from '../../support/pageObject/orderPage';
import ClientPage from '../../support/pageObject/clientPage';
import ProfilePage from '../../support/pageObject/profilePage';
import LaborTab from '../../support/pageObject/tabsOrder/laborTab';
import ProductTab from '../../support/pageObject/tabsOrder/productTab';
import EmploeePage from '../../support/pageObject/emploeePage';
import LaborDetails from '../../support/pageObject/laborDetails';

const loginPage = new LoginPage();
const orderPage = new OrderPage();
const clientPage = new ClientPage();
const profilePage = new ProfilePage();
const laborTab = new LaborTab();
const productTab = new ProductTab();
const emploeePage = new EmploeePage();
const laborDetails = new LaborDetails();

const baseUrl = 'https://'+Cypress.env('url')+'my.carbook.pro';

var date = new Date();
//const idClient ='30022'
const idClient =''+date.getDate()+date.getMonth()+date.getMinutes();
var second = parseInt(date.getSeconds())+10
var minute = parseInt(date.getMinutes())+10
const tel =second+'0'+minute+''+second+''+minute;

describe ('Specialist|Admin|UA|Desktop|', function(){
  beforeEach('User Login ', function(){
    cy.login(baseUrl+'/login', Cypress.env('LoginSpec'), Cypress.env('pw'))
      .then(()=>{
        cy.wait(3000)
        cy.get('img').eq(0).click({force: true}) //menu
      })
  });
  
  it('Профіль вибір українського інтерфейсу', function(){
    cy.visit(baseUrl+'/profile')
    profilePage.selectUA()
  })

  it('Додавання Клієнта та а/м: '+idClient, function(){
    cy.visit(baseUrl+'/add');
    clientPage.createClient(idClient,tel);
  });

  it('Перевірка заповнених полів Картка клієнта '+idClient, function(){
    cy.visit(baseUrl+'/client-hot-operations');
    clientPage.checkClient(idClient,tel);
  })

  it('Редагування мобільного номера Клієнта:'+idClient, function(){
    cy.visit(baseUrl+'/client-hot-operations');
    clientPage.editClientNumber(idClient,tel);
  })

  it('Додати Н/З, підтягування клієнта через пошук, клієнт: '+idClient, function(){
    cy.visit(baseUrl+'/orders/appointments');
    orderPage.createOrder(idClient);
  });

  it('Редагування н/з та додавання Поста, Механіка, Готівки, Реквізити STO, Пробіг', function(){
    cy.visit(baseUrl+'/orders/appointments');
    orderPage.editOrder(idClient);
  });

  it('Перевірка заповнених полів: Поста, Механіка, Готівки, Реквізити STO, Пробіг, Знижка', function(){
    cy.visit(baseUrl+'/orders/appointments')
    orderPage.checkOrder(idClient)
  });

  it('Перевід у статус Запис', function(){
    cy.visit(baseUrl+'/orders/appointments');
    orderPage.createAppointments(idClient);
  });

  it('Створення Діагностики', function(){
    cy.visit(baseUrl+'/orders/approve');
    orderPage.createDiagnostic(idClient);
  });

  it('Редагування ціни для доданої Роботи з діагностики', function(){
    cy.visit(baseUrl+'/orders/approve');
    laborTab.editLaborDiagnostic(idClient);
  });

  it('Додавання Робіт через групи Товарів', function(){
    cy.visit(baseUrl+'/orders/approve');
    laborTab.addLaborGroupProduct(idClient);
  })

  it('Додавання Робіт через поле Робіт', function(){
    cy.visit(baseUrl+'/orders/approve');
    laborTab.addLaborFieldLabor(idClient);
  })

  it('Додавання Робіт повторно', function(){
    cy.visit(baseUrl+'/orders/approve');
    laborTab.addLaborFieldLabor(idClient);
  })

  it('Вкладка Роботи > Додавання Роботи ч/з Комплекси', function(){
    cy.visit(baseUrl+'/orders/approve');
    laborTab.addLaborComplexes(idClient);
  });

  it('Додавання коментарів до Роботи ч/з +', function(){
    cy.visit(baseUrl+'/orders/approve');
    laborTab.addCommentsToLabor();
  });

  it('Додавання Запчастин ч/з +', function(){
    cy.visit(baseUrl+'/orders/approve');
    productTab.addProductPlus();
  });

  it('Відображення механіка в табці Роботи  ', function(){
    cy.visit(baseUrl+'/orders/approve');
    laborTab.showMehanicLabor(idClient);
  })

  it('Додавання Запчастин ч/з Групу ЗЧ', function(){
    cy.visit(baseUrl+'/orders/approve');
    productTab.addProduct(idClient);
  })

  it('Вкладка Запчастини > Пряме редагування', function(){
    cy.visit(baseUrl+'/orders/approve');
    productTab.editProduct(idClient)
  });

  it('Вкладка Запчастини > Додавання ЗЧ по VIN', function(){
    cy.visit(baseUrl+'/orders/approve');
    productTab.addProductVIN(idClient);
  });

  it('Вкладка Запчастини > Додавання ЗЧ через ІНФО по автомобілю', function(){
    cy.visit(baseUrl+'/orders/approve');
    productTab.addProductInfoAuto(idClient);
  });

  it('Вкладка Запчастини > Швидке редагування запчастин', function(){
    cy.visit(baseUrl+'/orders/approve');
    productTab.editProductIcon(idClient)
  });

  it('Інформація по а/м в НЗ', function(){
      cy.visit(baseUrl+'/orders/approve');
      orderPage.getInfoAuto()
  });

  it('Перевід у статус Ремонту', function(){
    cy.visit(baseUrl+'/orders/approve');
    orderPage.createProgress(idClient)
  })

  it('Додавання Коментарів', function(){
    cy.visit(baseUrl+'/orders/progress');
    orderPage.addComments(idClient);
  });

  it('Оплата і видача (ОВ)', function(){
    cy.visit(baseUrl+'/orders/progress');
    orderPage.payOrder(idClient);
  });

  it('Статистика в НЗ', function(){
    cy.visit(baseUrl+'/orders/success');
    orderPage.getStatisticOrder();
  });

  it('Завантаження НЗ для Клієнта', function(){
    cy.visit(baseUrl+'/orders/success');
    orderPage.downloadOrder();
  });

  it('Перевірка завантаженних файлів', function(){
    cy.visit(baseUrl+'/orders/success');
    orderPage.checkDownloadOrder()
  });

  it('Відсутність $ в НЗ', function(){
    cy.visit(baseUrl+'/orders/success');
    orderPage.checkDollar()
  });

  it('Копія НЗ', function(){
    cy.visit(baseUrl+'/orders/success');
    orderPage.copyOrder(idClient)
  });

  it('Видалення НЗ', function(){
    cy.visit(baseUrl+'/orders/appointments')
    orderPage.deleteOrder(idClient)
  });

  it('Вкладка Історія в н/з', function(){
    cy.visit(baseUrl+'/orders/success');
    orderPage.checkHistory();
  });

  it('Вкладка Пост в н/з', function(){
    cy.visit(baseUrl+'/orders/success');
    orderPage.checkTabPost();
  });

  it('Відкриття форми створення Працівника', function(){
    cy.visit(baseUrl+'/employees');
    orderPage.checkTabPost();
  });

  it('Відкриття картки існуючого Працівника', function(){
    cy.visit(baseUrl+'/employees');
    emploeePage.openEmploeeCard();
  });

  it('Відкриття сторінки Деталі в Роботі', function(){
    cy.visit(baseUrl+'/spare-parts-workplace');
    laborDetails.openPage();
  });
})