/// <reference types="cypress" />
import LoginPage from '../support/pageObject/loginPage';
import OrderPage from '../support/pageObject/orderPage';
import ClientPage from '../support/pageObject/clientPage';
import ProfilePage from '../support/pageObject/profilePage';
import LaborTab from '../support/pageObject/tabsOrder/laborTab';
import ProductTab from '../support/pageObject/tabsOrder/productTab';
import EmploeePage from '../support/pageObject/emploeePage';
import LaborDetails from '../support/pageObject/laborDetails';

const loginPage = new LoginPage();
const orderPage = new OrderPage();
const clientPage = new ClientPage();
const profilePage = new ProfilePage();
const laborTab = new LaborTab();
const productTab = new ProductTab();
const emploeePage = new EmploeePage();
const laborDetails = new LaborDetails();


var date = new Date();
const idClient = '91113'   //'19350'
//const idClient =''+date.getDate()+date.getMonth()+date.getMinutes();
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
    login(Cypress.env('LoginMaster'), Cypress.env('pw'))  //test 
  })

  // it('Профіль вибір українського інтерфейсу', function(){
  //   cy.visit('/') 
  //   profilePage.selectUA()
  // })

  // it(`Додавання Клієнта та а/м ч/з + : ${idClient}`, function(){
  //   cy.visit('/add')
  //   cy.wait(5000)
  //   clientPage.createClient(idClient,tel)
  // });

  // it(`Перевірка заповнених полів Картка клієнта ${idClient}`, function(){
  //   cy.visit('/client-hot-operations')
  //   clientPage.checkClient(idClient,tel)
  // })

  // it(`Редагування мобільного номера Клієнта: ${idClient}`, function(){
  //   cy.visit('/client-hot-operations')
  //   clientPage.editClientNumber(idClient,tel)
  // })

  // it(`Додати Н/З, підтягування клієнта через пошук, клієнт:${idClient}`, function(){
  //   cy.visit('/orders/appointments')
  //   orderPage.createOrder(idClient)
  // });

  // it('Редагування н/з та додавання Поста, Механіка, Готівки, Реквізити STO, Націнка, Пробіг', function(){
  //   cy.visit('/orders/appointments')
  //   orderPage.openNZ(idClient)
  //   orderPage.editOrder(idClient)
  // });

  // it('Перевірка заповнених полів: Поста, Механіка, Готівки, Реквізити STO, Націнка, Пробіг', function(){
  //   cy.visit('/orders/appointments')
  //   orderPage.openNZ(idClient)
  //   orderPage.checkOrder()
  // });

  // it('Перевід у статус Запис', function(){
  //   cy.visit('/orders/appointments')
  //   orderPage.openNZ(idClient)
  //   orderPage.createAppointments()
  // });

  // it('Створення Діагностики', function(){
  //   cy.visit('/orders/approve')
  //   orderPage.openNZ(idClient)
  //   orderPage.createDiagnostic()
  // });

  // it('Редагування ціни для доданої Роботи з Діагностики', function(){
  //   cy.visit('/orders/approve')
  //   orderPage.openNZ(idClient)
  //   laborTab.editLaborDiagnostic()
  // });

  // it('Додавання Робіт по найменуваню Групи Товарів', function(){
  //   cy.visit('/orders/approve')
  //   orderPage.openNZ(idClient)
  //   laborTab.addLaborGroupProduct() 
  // })

  // it('Додавання Робіт через поле Робіт', function(){
  //   cy.visit('/orders/approve')
  //   orderPage.openNZ(idClient)
  //   laborTab.addLaborPlus()
  // })

  // it('Додавання Робіт по коду Групи Товарів', function(){
  //   cy.visit('/orders/approve')
  //   orderPage.openNZ(idClient)
  //   laborTab.addLaborName(idClient)
  // })

  // it('Вкладка Роботи > Додавання Роботи ч/з Комплекси', function(){
  //   cy.visit('/orders/approve')
  //   orderPage.openNZ(idClient)
  //   laborTab.addLaborComplexes()
  // });

  // it('Додавання коментарів до Роботи', function(){
  //   cy.visit('/orders/approve')
  //   orderPage.openNZ(idClient)
  //   laborTab.addCommentsToLabor()
  // });

  // it('Перевірка доданих коментарів', function(){
  //   cy.visit('/orders/approve')
  //   orderPage.openNZ(idClient)
  //   cy.get('.ant-table-cell').contains('пер. міст, попереду, вгорі; test').should('exist')   
  // });

  // it('Відображення механіка в табці Роботи  ', function(){
  //   cy.visit('/orders/approve')
  //   orderPage.openNZ(idClient)
  //   laborTab.showMehanicLabor()
  // }) 

  // it('Додавання Запчастин ч/з +', function(){
  //   cy.visit('/orders/approve')
  //   orderPage.openNZ(idClient)
  //   productTab.addProductPlus()
  // });

  // it('Додавання Запчастин ч/з Групу ЗЧ', function(){
  //   cy.visit('/orders/approve')
  //   orderPage.openNZ(idClient)
  //   productTab.addProduct()
  // })

  // it('Вкладка Запчастини > Пряме редагування', function(){
  //   cy.visit('/orders/approve')
  //   orderPage.openNZ(idClient)
  //   productTab.editProduct()
  // });

  it('Вкладка Запчастини > + ЗЧ по VIN', function(){
    cy.visit('/orders/approve')
    orderPage.openNZ(idClient)
    productTab.addDetailVIN()
  });

  it('Вкладка Запчастини > Швидке редагування запчастин', function(){
    cy.visit('/orders/approve')
    orderPage.openNZ(idClient)
    productTab.editProductIcon()
  });

  it('Вкладка Запчастини > Додати Деталь > Пошук по авто', function(){
    cy.visit('/orders/approve')
    orderPage.openNZ(idClient)
    productTab.searchByCar()
  });

  it('Вкладка Запчастини > Додати Деталь > Пошук по Складу', function(){
    cy.visit('/orders/approve')
    orderPage.openNZ(idClient)
    productTab.searchByStorage()
  });

  it('Вкладка Запчастини > Додати Деталь > Пошук олив ', function(){
    cy.visit('/orders/approve')
    orderPage.openNZ(idClient)
    productTab.searchByOil()
  });

  it('Вкладка Запчастини > Додавання ЗЧ через ІНФО по автомобілю', function(){ ///не підтягує дані 
    cy.visit('/orders/approve')
    orderPage.openNZ(idClient)
    productTab.addProductInfoAuto()
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

  it('Додавання Коментарів в НЗ', function(){
    cy.visit('/orders/progress');
    orderPage.openNZ(idClient);
    orderPage.addComments();
  });

 it('Перевід у статус Завершено', function(){
    cy.visit('/orders/progress')
    orderPage.openNZ(idClient)
    orderPage.createSuccess()
  })

  it('Часткова оплата', function(){
    cy.visit('/orders/success');
    orderPage.openNZ(idClient);
    orderPage.payOrderCredit();
  });

  it('Перевірка поля Сплачено', function(){
    cy.visit('/orders/success');
    orderPage.openNZ(idClient);
    cy.get('.styles-m__sumWrapper---1Ulp6').find('span').eq(2).contains('12,30 грн.') // сплачено Грн -> грн
  });

  it('Повна оплата ч/з $', function(){
    cy.visit('/orders/success');
    orderPage.openNZ(idClient);
    orderPage.payOrderDollar('Готівкова');
  });

  it('Перевірка поля Залишок', function(){
    cy.visit('/orders/success');
    orderPage.openNZ(idClient);
    cy.get('.styles-m__total---JSKrk').find('span').eq(1).contains('0 грн.'); // Залишок Грн -> грн
  });

  it('Перевірка Залишка в списку НЗ', function(){
    cy.visit('/orders/success');
    orderPage.openNZ(idClient);
    cy.get('[data-icon="close"]').first().click({force: true})
    cy.get('.ant-input-wrapper > .ant-input').type(idClient)
    cy.wait(20000)
    cy.get('tr >td').eq(7).should('have.text', ' грн.')
   // cy.get('.styles-m__total---JSKrk').find('span').eq(1).contains('0 грн.'); // Залишок Грн -> грн
  });

  it('Статистика в НЗ', function(){
    cy.visit('/orders/success');
    orderPage.openNZ(idClient);
    orderPage.getStatisticOrder();
  });

  it('Друк НЗ для Клієнта', function(){
    cy.visit('/orders/success');
    orderPage.openNZ(idClient);
    orderPage.downloadOrder();
  });

  it('Перевірка завантаженних файлів', function(){
    cy.visit('/orders/success');
    orderPage.checkDownloadOrder();
  });

  it('Копія НЗ', function(){
    cy.visit('/orders/success');
    orderPage.openNZ(idClient);
    orderPage.copyOrder();
  });

  it('Видалення НЗ / відмова', function(){
    cy.visit('/orders/appointments');
    orderPage.openNZ(idClient);
    orderPage.deleteOrder();
  });

  it('Вкладка Історія в н/з', function(){
    cy.visit('/orders/success');
    orderPage.openNZ(idClient);
    orderPage.checkHistory();
  });

  it('Вкладка Пост в н/з', function(){
    cy.visit('/orders/success');
    orderPage.openNZ(idClient);
    orderPage.checkTabPost();
  });

  it('Відкриття форми створення Працівника', function(){
    cy.visit('/employees');
    cy.wait(3000);
    emploeePage.openEmploeeCardForCreate();
  });

  it('Відкриття картки існуючого Працівника', function(){
    cy.visit('/employees');
    emploeePage.openEmploeeCard();
  });

  it('Відкриття сторінки Деталі в Роботі', function(){
    cy.visit('/spare-parts-workplace');
    laborDetails.openPage();
  })  
})