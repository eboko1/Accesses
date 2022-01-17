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

const username = Cypress.env('LoginMaster')
const password = Cypress.env('pw')

const baseUrl = 'https://'+Cypress.env('url')+'my.carbook.pro';

var date = new Date();
//const idClient ='17054'
const idClient =''+date.getDate()+date.getMonth()+date.getMinutes();
var second = parseInt(date.getSeconds())+10
var minute = parseInt(date.getMinutes())+10
const tel =second+'0'+minute+''+second+''+minute;

describe ('Master|Admin|UA|Desktop|', function(){
  beforeEach('User Login ', function(){
    cy.login(baseUrl, Cypress.env('LoginMaster'), Cypress.env('pw'))
    cy.get('img').eq(0).click({force: true}) //menu
  });

  it('1. Профіль вибір українського інтерфейсу', function(){
    cy.visit(baseUrl+'/profile')
    profilePage.selectUA()
  })

  it('2. Додавання Клієнта та а/м ч/з '+idClient, function(){
    cy.visit(baseUrl+'/add')
    clientPage.createClient(idClient,tel)
  });

  it('3. Перевірка заповнених полів Картка клієнта '+idClient, function(){
    cy.visit(baseUrl+'/client-hot-operations')
    clientPage.checkClient(idClient,tel)
  })

  it('4. Редагування мобільного номера Клієнта:'+idClient, function(){
    cy.visit(baseUrl+'/client-hot-operations')
    clientPage.editClientNumber(idClient,tel)
  })

  it('5. Додати Н/З, підтягування клієнта через пошук, клієнт: '+idClient, function(){
    cy.visit(baseUrl+'/orders/appointments')
    orderPage.createOrder(idClient)
  });

  it('6. Редагування н/з та додавання Поста, Механіка, Готівки, Реквізити STO, Пробіг', function(){
    cy.visit(baseUrl+'/orders/appointments')
    orderPage.editOrder(idClient)
  });

  it('7. Перевірка заповнених полів: Поста, Механіка, Готівки, Реквізити STO, Пробіг, Знижка', function(){
    cy.visit(baseUrl+'/orders/appointments')
    orderPage.checkOrder(idClient)
  });

  it('8. Перевід у статус Запис', function(){
    cy.visit(baseUrl+'/orders/appointments')
    orderPage.createAppointments(idClient)
  });

  it('9. Створення Діагностики', function(){
    cy.visit(baseUrl+'/orders/approve')
    orderPage.createDiagnostic(idClient)
  });

  it('10. Редагування ціни для доданої Роботи з діагностики', function(){
    cy.visit(baseUrl+'/orders/approve')
    laborTab.editLaborDiagnostic(idClient)
  });

  it('11. Додавання Робіт через групи Товарів', function(){
    cy.visit(baseUrl+'/orders/approve')
    laborTab.addLaborGroupProduct(idClient)
  })

  it('12. Додавання Робіт через поле Робіт', function(){
    cy.visit(baseUrl+'/orders/approve')
    laborTab.addLaborFieldLabor(idClient)
  })

  it('12.1 Додавання Робіт повторно', function(){
    cy.visit(baseUrl+'/orders/approve')
    laborTab.addLaborFieldLabor(idClient)
  })

  it('13. Вкладка Роботи > Додавання Роботи ч/з Комплекси', function(){
    cy.visit(baseUrl+'/orders/approve')
    laborTab.addLaborComplexes(idClient)
  });

  it('14. Додавання коментарів до Роботи ч/з +', function(){
    cy.visit(baseUrl+'/orders/approve')
    laborTab.addCommentsToLabor()
  });

  it('15. Додавання Запчастин ч/з +', function(){
    cy.visit(baseUrl+'/orders/approve')
    productTab.addProductPlus()
  });

  it('16. Відображення механіка в табці Роботи  ', function(){
    cy.visit(baseUrl+'/orders/approve')
    laborTab.showMehanicLabor(idClient)
  })

  it('17. Додавання Запчастин ч/з Групу ЗЧ', function(){
    cy.visit(baseUrl+'/orders/approve')
    productTab.addProduct(idClient)
  })

  it('18. Вкладка Запчастини > Пряме редагування', function(){
    cy.visit(baseUrl+'/orders/approve')
    productTab.editProduct(idClient)
  });

  it('19. Вкладка Запчастини > Додавання ЗЧ по VIN', function(){
    cy.visit(baseUrl+'/orders/approve')
    productTab.addProductVIN(idClient)
  });

  it('20. Вкладка Запчастини > Додавання ЗЧ через ІНФО по автомобілю', function(){
    cy.visit(baseUrl+'/orders/approve')
    productTab.addProductInfoAuto(idClient)
  });

  it('21. Вкладка Запчастини > Швидке редагування запчастин', function(){
    cy.visit(baseUrl+'/orders/approve')
    productTab.editProductIcon(idClient)
  });

  it('22. Інформація по а/м в НЗ', function(){
    cy.visit(baseUrl+'/orders/approve')
    orderPage.getInfoAuto()
  });

  it('23. Перевід у статус Ремонту', function(){
    cy.visit(baseUrl+'/orders/approve')
    orderPage.createProgress(idClient)
  })

  it('24. Додавання Коментарів', function(){
    cy.visit(baseUrl+'/orders/progress');
    orderPage.addComments(idClient)
  });

  it('25. Оплата і видача (ОВ)', function(){
    cy.visit(baseUrl+'/orders/progress');
    orderPage.payOrder(idClient)
  });

  it('26. Статистика в НЗ', function(){
    cy.visit(baseUrl+'/orders/success');
    orderPage.getStatisticOrder()
  });

  it('27. Завантаження НЗ для Клієнта', function(){
    cy.visit(baseUrl+'/orders/success');
    orderPage.downloadOrder()
  });

  it('28. Перевірка завантаженних файлів', function(){
    cy.visit(baseUrl+'/orders/success');
    orderPage.checkDownloadOrder()
  });

  it('29. Відсутність $ в НЗ', function(){
    cy.visit(baseUrl+'/orders/success');
    cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
    .then (text => {var codeNZ = text;
        cy.log(codeNZ)
        const numArr = text.split('-')  //[MDR, 594, 12345]
        cy.get('.ant-input-search > .ant-input').last().type(numArr[numArr.length-1])//пошук
    })
    cy.get('.styles-m__title---Nwr2X > span').should('have.text','Виконані')
    cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
    cy.get('.anticon-dollar').should('not.exist')// ел не має на в DOM
  });

  it('30. Копія НЗ', function(){
    cy.visit(baseUrl+'/orders/success');
    orderPage.copyOrder(idClient)
  });

  it('31. Видалення НЗ', function(){
    cy.visit(baseUrl+'/orders/appointments')
    orderPage.deleteOrder(idClient)
  });

  it('32. Вкладка Історія в н/з', function(){
    cy.visit(baseUrl+'/orders/success');
    cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
    .then (text => {var codeNZ = text;
        cy.log(codeNZ)
        const numArr = text.split('-')  //[MDR, 594, 12345]
        cy.get('.ant-input-search > .ant-input').last().type(numArr[numArr.length-1])//пошук
    })
    cy.get('.styles-m__title---Nwr2X > span').should('have.text','Виконані')
    cy.wait(2000);
    cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
    cy.log('Вибір Запису');
    cy.wait(4000);
    cy.log('Для нового клієнта історія містить 1 елемент');
    cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(7)').click();
    cy.get('.ant-table-row > :nth-child(2) > a').should('exist');
  });

  it('33. Вкладка Пост в н/з', function(){
    cy.visit(baseUrl+'/orders/success');
    cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
    .then (text => { var codeNZ = text;
        cy.log(codeNZ)
        const numArr = text.split('-')  //[MDR, 594, 12345]
        cy.get('.ant-input-search > .ant-input').last().type(numArr[numArr.length-1])//пошук
    })
    cy.get('.styles-m__title---Nwr2X > span').should('have.text','Виконані')
    cy.wait(2000);
    cy.wait(2000);
    cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
    cy.log('Вибір Запису');
    cy.wait(4000);
    cy.log('Вкладка Пост');
    cy.get('.ant-tabs-nav').contains('Пост').click({force: true});
    cy.get('.styles-m__staticStationLoadsRow---MnLCJ > :nth-child(1)').should('exist');
  });

  it('34. Відкриття форми створення Працівника', function(){
    cy.visit(baseUrl+'/employees');
    cy.get('.ant-btn').click({force: true})
    cy.wait(2000)
    cy.get('.ant-form').should('exist');
    cy.get('#jobTitle').type('Test').should('exist');
  });

  it('35. Відкриття картки існуючого Працівника', function(){
    cy.visit(baseUrl+'/employees');
    cy.get('.styles-m__employeeName---2QyjT').first().click({force: true})
    cy.wait(2000)
    cy.get('.ant-tabs').should('exist');
    cy.wait(2000)
    cy.get(':nth-child(1) > .ant-row > .ant-col-18').contains('Менеджерський доступ');
  });

  it('36. Відкриття сторінки Деталі в Роботі', function(){
    cy.visit(baseUrl+'/spare-parts-workplace');
    cy.get(':nth-child(5) > a').first().click({force: true})
      .then(()=>{
        cy.get('.styles-m__minimized---2nM6M > .ant-btn').click() // фільтр дата /spare-parts-workplace
        cy.wait(2000)
        cy.get('.styles-m__filterDateButtons---QBBQy > :nth-child(5)').click({force: true}) // фільтр Рік
        cy.wait(5000)
        cy.get('.ant-dropdown-menu > :nth-child(1) > span').first().click({force: true}) // Фільтри поточний рік
        cy.get('.styles-m__headerContorls---2pU_V > .ant-radio-group > :nth-child(2)').click()
        cy.get('.anticon-sort-ascending').first().click({force: true})
        cy.wait(2000)
        cy.get('.ant-dropdown-menu > :nth-child(2) > div').first().click({force: true})
        cy.wait(2000)
        cy.get('.ant-tabs-tabpane-active > .ant-table-wrapper').should('exist');
        cy.wait(2000)
        cy.get('.anticon-sort-ascending').click() //Сортування за постачальником
        cy.get('.ant-dropdown-menu > :nth-child(2) > div > span').click({force: true})
        cy.get('[data-row-key] > :nth-child(2)').should('exist');
      })
  });
})