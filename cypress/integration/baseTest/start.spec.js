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
var second = parseInt(date.getSeconds())+10
var minute = parseInt(date.getMinutes())+10
//const idClient ='14120'
const idClient =''+date.getDate()+date.getMonth()+date.getMinutes();
const tel =second+'0'+minute+''+second+''+minute;

describe ('Start|Admin|UA|Desktop', function(){
  beforeEach('User Login ', function(){
    cy.login(baseUrl+'/login', Cypress.env('LoginStart'), Cypress.env('pw'))
      .then(()=>{
        cy.wait(3000)
        cy.get('img').eq(0).click({force: true}) //menu
      })
  });
  
  it('1. Профіль вибір українського інтерфейсу', function(){
    cy.visit(baseUrl+'/profile')
    profilePage.selectUA()
  })

  it('2. Додавання Клієнта та а/м: '+idClient, function(){
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

  it('9. Додавання Робіт через групи Товарів', function(){
    cy.visit(baseUrl+'/orders/approve')
    laborTab.addLaborGroupProduct(idClient)
  })

  it('9.1 Додавання Робіт через групи Товарів', function(){
    cy.visit(baseUrl+'/orders/approve')
    laborTab.addLaborGroupProduct(idClient)
  })

  it('10. Редагування ціни для доданої Роботи', function(){
    cy.visit(baseUrl+'/orders/approve')
    laborTab.editLaborDiagnostic(idClient)
  });
 
  it('11. Додавання Робіт через поле Робіт', function(){
    cy.visit(baseUrl+'/orders/approve')
    laborTab.addLaborFieldLabor(idClient)
  })

  it('12. Додавання Робіт повторно', function(){
    cy.visit(baseUrl+'/orders/approve')
    laborTab.addLaborFieldLabor(idClient)
  })

  it('14. Відображення механіка в табці Роботи  ', function(){
    cy.visit(baseUrl+'/orders/approve')
      laborTab.showMehanicLabor(idClient)
  })

  it('15. Додавання Запчастин ч/з Групу ЗЧ', function(){
    cy.visit(baseUrl+'/orders/approve')
    productTab.addProduct(idClient)
  })

  it('16. Вкладка Запчастини > Пряме редагування', function(){
    cy.visit(baseUrl+'/orders/approve')
    productTab.editProduct(idClient)
  });

  it('17. Вкладка Запчастини > Додавання ЗЧ через ІНФО по автомобілю', function(){
    cy.visit(baseUrl+'/orders/approve')
    productTab.addProductInfoAuto(idClient)
  });

  it('18. Вкладка Запчастини > Швидке редагування запчастин', function(){
    cy.visit(baseUrl+'/orders/approve')
    productTab.editProductIcon(idClient)
  });

  it('19. Інформація по а/м в НЗ', function(){
      cy.visit(baseUrl+'/orders/approve')
      orderPage.getInfoAuto()
  });

  it('20. Перевід у статус Ремонту', function(){
    cy.visit(baseUrl+'/orders/approve')
    orderPage.createProgress(idClient)
  })

  it('21. Додавання Коментарів', function(){
    cy.visit(baseUrl+'/orders/progress');
    orderPage.addComments(idClient)
  });

  it('22. Перевід НЗ в статус Завершено', function(){
    cy.visit(baseUrl+'/orders/progress');
    orderPage.payOrderStart(idClient);
  });

  it('23. Відображення модалки Статистики в НЗ', function(){
    cy.visit(baseUrl+'/orders/success');
    orderPage.getStatisticOrder();
  });

  it('24. Завантаження НЗ для Клієнта', function(){
    cy.visit(baseUrl+'/orders/success');
    orderPage.downloadOrder();
    cy.wait(8000);
  });

  it('25. Перевірка завантаженних файлів', function(){
    cy.visit(baseUrl+'/orders/success');
    orderPage.checkDownloadOrder();
  });

  it('25. Відсутність $ в НЗ', function(){
    cy.visit(baseUrl+'/orders/success');
    orderPage.checkDollar();
  });

  it('26. Копія НЗ', function(){
    cy.visit(baseUrl+'/orders/success');
    orderPage.copyOrder(idClient);
  });

  it('27. Видалення НЗ', function(){
    cy.visit(baseUrl+'/orders/appointments')
    orderPage.deleteOrder(idClient);
  });

  it('28. Вкладка Історія в н/з', function(){
    cy.visit(baseUrl+'/orders/success');
    orderPage.checkHistory();
  });

  it('29. Вкладка Пост в н/з', function(){
    cy.visit(baseUrl+'/orders/success');
    
  });

  it('Відкриття форми створення Працівника', function(){
    cy.visit(baseUrl+'/employees');
    emploeePage.openEmploeeCardForCreate();
  });

  it('Відкриття картки існуючого Працівника', function(){
    cy.visit(baseUrl+'/employees');
    emploeePage.openEmploeeCard();
  });

  it('Відкриття сторінки Деталі в Роботі', function(){
    cy.visit(baseUrl+'/spare-parts-workplace');
    laborDetails.openPage()
  });
  
  it('Меню / Швидка навігація + Ремонт', function(){
    cy.get('.ant-menu-item').contains('Швидка навігація').first().click({force: true})
    cy.get(':nth-child(1) > .styles-m__folderLink---2Myrv > .anticon > svg').first().click({force: true})
      .then(()=> {
        cy.get('h1 > span').should('have.text','Додати Ремонт')
    }) 
  })

  it('Меню / Швидка навігація / Кнопка Ремонти', function(){
    cy.get('.ant-menu-item').contains('Швидка навігація').first().click({force: true})
    cy.get(':nth-child(1) > .styles-m__buttonLink---1D7wr > .ant-btn').first().click({force: true})
    cy.get('h1 > span').should('have.text','Нові')
  })

  it('Меню / Швидка навігація / Кнопка Запис', function() {
    cy.get('.ant-menu-item').contains('Швидка навігація').click({force: true})
    cy.get('.ant-btn').contains('Запис').click({force: true})
    cy.get('h1 > span').should('have.text','Записи')
  })

  it('Меню / Швидка навігація / Кнопка Ремонт', function(){
    cy.get('.ant-menu-item').contains('Швидка навігація').click({force: true})
    cy.get('.ant-btn').contains('Ремонт').click({force: true})
    cy.get('h1 > span').should('have.text','Ремонти')
  })
  it('Меню / Швидка навігація / Кнопка Виконано', function(){
    cy.get('.ant-menu-item').contains('Швидка навігація').click({force: true})
    cy.get('.ant-btn').contains('Виконано').click({force: true})
    cy.get('h1 > span').should('have.text','Виконані')
  })

  it('Меню / Швидка навігація / Кнопка Відмова', function(){
    cy.get('.ant-menu-item').contains('Швидка навігація').click({force: true})
    cy.get('.ant-btn').contains('Відмова').click({force: true})
    cy.get('h1 > span').should('have.text','Відмови')
  })

  it('Меню / Швидка навігація / Кнопка Запрошення', function(){
    cy.get('.ant-menu-item').contains('Швидка навігація').click({force: true})
    cy.get('.ant-btn').contains('Запрошення').click({force: true})
    cy.get('h1 > span').should('have.text','Запрошення')
  })

  it('Меню / Швидка навігація / Кнопка Відгук', function(){
    cy.get('.ant-menu-item').contains('Швидка навігація').click({force: true})
    cy.get('.ant-btn').contains('Відгук').click({force: true})
    cy.get('h1 > span').should('have.text','Відгуки')
  })

  it('Меню / Ремонти', function(){
    cy.get('.ant-menu-item').contains('Ремонти').click({force: true})
    cy.get('h1 > span').should('have.text','Нові')
    cy.get('.ant-table-content').should('exist')
    cy.get('a > .ant-btn').contains('Додати').click({force: true})
    cy.wait(3000)
    cy.get('h1 > span').should('have.text','Додати Ремонт')
    cy.get('.styles-m__headerContorls---2pU_V > .anticon > svg').click({force: true})
    cy.get('tr > td > a').first().click({force: true});
    cy.wait(2000)
    cy.get('h1 > span').should('have.text','Новий')
  })

  it('Меню / Довідник', function(){
    cy.get('.ant-menu-submenu-title').contains('Довідник').click({force: true})
    cy.get('.ant-menu-item').contains('Довідники').click({force: true})
    cy.get('h1 > span').should('have.text','Довідники та налаштування')
    cy.get('.styles-m__paper---3d-H1').should('exist')
  })

  it('Меню / Товари / Відображення списку ЗЧ', function(){
    cy.get('.ant-menu-submenu-title').contains('Довідник').click({force: true})
    cy.get('.ant-menu-item').contains('Товари').click({force: true})
    cy.get('h1 > span').should('have.text','Товари')
    cy.get('.sc-gzVnrw').should('exist')
  })

  it('Меню / Автомобілі / Відображення списку а/м', function(){
    cy.get('.ant-menu-submenu-title').contains('Довідник').click({force: true})
    cy.get('.ant-menu-item').contains('Автомобілі').click({force: true})
    cy.get('h1 > span').should('have.text','Автомобілі')
    cy.get('.styles-m__paper---3d-H1').should('exist')
  })

  it('Меню / Клієнти / Відображення списку Клієнтів', function(){
    cy.get('.ant-menu-submenu-title').contains('Довідник').click({force: true})
    cy.get('.ant-menu-item').contains('Клієнти').click({force: true})
    cy.wait(2000);
    cy.get('h1').should('have.text','Клієнти')
    cy.get('.ant-table-body').should('exist')
  })

  it('Меню / Працівники', function(){
    cy.get('.ant-menu-submenu-title').contains('Довідник').click({force: true})
    cy.get('.ant-menu-item').contains('Працівники').click({force: true})
    cy.wait(2000);
    cy.get('h1 > span').should('have.text','Працівники')
    cy.get('.styles-m__paper---3d-H1').should('exist')
  })

  it('Загальний пошук', function(){
    cy.get('h1 > span').should('have.text','Календар Завантаження')
    cy.get('.ant-select-search__field > .ant-input').type('start')
    cy.wait(3000)
    cy.get('h1 > span').should('not.have.text','Помилка')
  })

})