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


var date = new Date();
//const idClient ='18111'
const idClient =''+date.getDate()+date.getMonth()+date.getMinutes();
var second = parseInt(date.getSeconds())+10
var minute = parseInt(date.getMinutes())+10
const tel = minute+minute+second+minute+second+minute;

describe ('Master|Admin|UA|Desktop|', function(){ 
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
    login(Cypress.env('LoginMaster'), Cypress.env('pw'))
  })

  it('1. Профіль вибір українського інтерфейсу', function(){
    cy.visit('/') 
    profilePage.selectUA()
  })

  it(`2. Додавання Клієнта та а/м ч/з ${idClient}`, function(){
    cy.visit('/add')
    cy.wait(5000)
    clientPage.createClient(idClient,tel)
  });

  it(`3. Перевірка заповнених полів Картка клієнта ${idClient}`, function(){
    cy.visit('/client-hot-operations')
    clientPage.checkClient(idClient,tel)
  })

  it(`4. Редагування мобільного номера Клієнта: ${idClient}`, function(){
    cy.visit('/client-hot-operations')
    clientPage.editClientNumber(idClient,tel)
  })

  it(`5. Додати Н/З, підтягування клієнта через пошук, клієнт:${idClient}`, function(){
    cy.visit('/orders/appointments')
    orderPage.createOrder(idClient)
  });

  it('6. Редагування н/з та додавання Поста, Механіка, Готівки, Реквізити STO, Націнка, Пробіг', function(){
    cy.visit('/orders/appointments')
    orderPage.editOrder(idClient)
  });

  it('7. Перевірка заповнених полів: Поста, Механіка, Готівки, Реквізити STO, Націнка, Пробіг', function(){
    cy.visit('/orders/appointments')
    orderPage.checkOrder(idClient)
  });

  it('8. Перевід у статус Запис', function(){
    cy.visit('/orders/appointments')
    orderPage.createAppointments(idClient)
  });

  it('9. Створення Діагностики', function(){
    cy.visit('/orders/approve')
    orderPage.createDiagnostic(idClient)
  });

  it('10. Редагування ціни для доданої Роботи з діагностики', function(){
    cy.visit('/orders/approve')
    laborTab.editLaborDiagnostic(idClient)
  });

  it('11. Додавання Робіт через групи Товарів', function(){
    cy.visit('/orders/approve')
    laborTab.addLaborGroupProduct(idClient) 
  })

  it('12. Додавання Робіт через поле Робіт', function(){
    cy.visit('/orders/approve')
    laborTab.addLaborFieldLabor(idClient)
  })

  it('12.1 Додавання Робіт повторно', function(){
    cy.visit('/orders/approve')
    laborTab.addLaborFieldLabor(idClient)
  })

  it('13. Вкладка Роботи > Додавання Роботи ч/з Комплекси', function(){
    cy.visit('/orders/approve')
    laborTab.addLaborComplexes(idClient)
  });

  it('14. Додавання коментарів до Роботи ч/з +', function(){
    cy.visit('/orders/approve')
    laborTab.addCommentsToLabor()
  });

  it('15. Відображення механіка в табці Роботи  ', function(){
    cy.visit('/orders/approve')
    laborTab.showMehanicLabor(idClient)
  }) 

  it('16. Додавання Запчастин ч/з +', function(){
    cy.visit('/orders/approve')
    productTab.addProductPlus()
  });

  it('17. Додавання Запчастин ч/з Групу ЗЧ', function(){
    cy.visit('/orders/approve')
    productTab.addProduct(idClient)
  })

  it('18. Вкладка Запчастини > Пряме редагування', function(){
    cy.visit('/orders/approve')
    productTab.editProduct(idClient)
  });

  it('19. Вкладка Запчастини > Відкриття модалки VIN', function(){
    cy.visit('/orders/approve')
    productTab.checkModalVIN(idClient)
  });

  it('20. Вкладка Запчастини > Додавання ЗЧ через ІНФО по автомобілю', function(){ ///не підтягує дані 
    cy.visit('/orders/approve')
    productTab.addProductInfoAuto(idClient)
  });

  it('21. Вкладка Запчастини > Швидке редагування запчастин', function(){
    cy.visit('/orders/approve')
    productTab.editProductIcon(idClient)
  });

  it('22. Інформація по а/м в НЗ', function(){
    cy.visit('/orders/approve')
    orderPage.getInfoAuto()
  });

  it('23. Перевід у статус Ремонту', function(){
    cy.visit('/orders/approve')
    orderPage.createProgress(idClient)
  })

  it('24. Додавання Коментарів', function(){
    cy.visit('/orders/progress');
    orderPage.addComments(idClient)
  });

  it('25. Оплата і видача (ОВ)', function(){
    cy.visit('/orders/progress');
    orderPage.payOrder(idClient)
  });

  it('26. Статистика в НЗ', function(){
    cy.visit('/orders/success');
    orderPage.getStatisticOrder()
  });

  it('27. Завантаження НЗ для Клієнта', function(){
    cy.visit('/orders/success');
    orderPage.downloadOrder()
  });

  it('28. Перевірка завантаженних файлів', function(){
    cy.visit('/orders/success');
    orderPage.checkDownloadOrder()
  });

  it('29. Відсутність $ в НЗ', function(){
    cy.visit('/orders/success');
    orderPage.checkDollar()
  });

  it('30. Копія НЗ', function(){
    cy.visit('/orders/success');
    orderPage.copyOrder(idClient)
  });

  it('31. Видалення НЗ', function(){
    cy.visit('/orders/appointments')
    orderPage.deleteOrder(idClient)
  });

  it('32. Вкладка Історія в н/з', function(){
    cy.visit('/orders/success');
    orderPage.checkHistory();
  });

  it('33. Вкладка Пост в н/з', function(){
    cy.visit('/orders/success');
    orderPage.checkTabPost();
  });

  it('34. Відкриття форми створення Працівника', function(){
    cy.visit('/employees');
    cy.wait(3000)
    emploeePage.openEmploeeCardForCreate();
  });

  it('35. Відкриття картки існуючого Працівника', function(){
    cy.visit('/employees');
    emploeePage.openEmploeeCard();
  });

  it('36. Відкриття сторінки Деталі в Роботі', function(){
    cy.visit('/spare-parts-workplace');
    laborDetails.openPage();
  })  
})