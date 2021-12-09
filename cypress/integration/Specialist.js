/// <reference types="cypress" />
import LoginPage from '../support/pageObject/loginPage';
import OrderPage from '../support/pageObject/orderPage';
import ClientPage from '../support/pageObject/clientPage';
import ProfilePage from '../support/pageObject/profilePage';

import LaborTab from '../support/pageObject/tabsOrder/laborTab';
import ProductTab from '../support/pageObject/tabsOrder/productTab';

const loginPage = new LoginPage();
const orderPage = new OrderPage();
const clientPage = new ClientPage();
const profilePage = new ProfilePage();
const laborTab = new LaborTab();
const productTab = new ProductTab();

const username = Cypress.env('LoginSpec')
const password = Cypress.env('pw')

const baseUrl = 'https://'+Cypress.env('url')+'my.carbook.pro';
const appointments = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/appointments';
const approve = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/approve';
const progress = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/progress';
const success = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/success';
const cancel = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/cancel';

var date = new Date();
//const idClient ='81139'
const idClient =''+date.getDate()+date.getMonth()+date.getMinutes();
var second = parseInt(date.getSeconds())+10
var minute = parseInt(date.getMinutes())+10
const tel =second+'0'+minute+''+second+''+minute;

describe ('Specialist|Admin|UA|Desktop|', function(){
  beforeEach('User LogIn ', () => {
    cy.visit(baseUrl)
    loginPage.enterLogin(username,password)
  });

    it('1. Профіль вибір українського інтерфейсу', function(){
      profilePage.selectUA()
    })

    it('2. Додавання Клієнта та а/м: '+idClient, function(){
      clientPage.createClient(idClient,tel)
    });

    it('3. Перевірка заповнених полів Картка клієнта '+idClient, function(){
      clientPage.checkClient(idClient,tel)
    })

    it('4. Редагування мобільного номера Клієнта:'+idClient, function(){
      clientPage.editClientNumber(idClient,tel)
    })

    it('5. Додати Н/З, підтягування клієнта через пошук, клієнт: '+idClient, function(){
      orderPage.createOrder(idClient)
    });

    it('6. Редагування н/з та додавання Поста, Механіка, Готівки, Реквізити STO, Пробіг', function(){
      orderPage.editOrder(idClient)
    });

    it('7. Перевірка заповнених полів: Поста, Механіка, Готівки, Реквізити STO, Пробіг, Знижка', function(){
      orderPage.checkOrder(idClient)
    });

    it('8. Перевід у статус Запис', function(){
      orderPage.createAppointments(idClient)
    });

    it('9. Створення Діагностики', function(){
      cy.visit(approve)
      orderPage.createDiagnostic(idClient)
    });

    it('10. Редагування ціни для доданої Роботи з діагностики', function(){
      cy.visit(approve);
      laborTab.editLaborDiagnostic(idClient)
    });

    it('11. Додавання Робіт через групи Товарів', function(){
      cy.visit(approve)
      laborTab.addLaborGroupProduct(idClient)
    })

    it('12. Додавання Робіт через поле Робіт', function(){
      cy.visit(approve)
      laborTab.addLaborFieldLabor(idClient)
    })

    it('12.1 Додавання Робіт повторно', function(){
      cy.visit(approve)
      laborTab.addLaborFieldLabor(idClient)
    })

    it('13. Вкладка Роботи > Додавання Роботи ч/з Комплекси', function(){
      cy.visit(approve)
      laborTab.addLaborComplexes(idClient)
    });

  it('Додавання коментарів до Роботи ч/з +', function(){
    cy.visit(progress);
    laborTab.addCommentsToLabor()
  });

  it('Додавання Запчастин ч/з +', function(){
    cy.visit(progress);
    productTab.addProductPlus()
  });
    it('14. Відображення механіка в табці Роботи  ', function(){
      cy.visit(approve)
      laborTab.showMehanicLabor(idClient)
    })

    it('15. Додавання Запчастин ч/з Групу ЗЧ', function(){
      cy.visit(approve)
      productTab.addProduct(idClient)
    })

  it('16. Вкладка Запчастини > Пряме редагування', function(){
    cy.visit(approve);
    productTab.editProduct(idClient)
  });

  it('17. Вкладка Запчастини > Додавання ЗЧ по VIN', function(){
    cy.visit(approve);
    productTab.addProductVIN(idClient)
  });

  it('18. Вкладка Запчастини > Додавання ЗЧ через ІНФО по автомобілю', function(){
    cy.visit(approve);
    productTab.addProductInfoAuto(idClient)
  });

  it('19. Вкладка Запчастини > Швидке редагування запчастин', function(){
    cy.visit(approve);
    productTab.editProductIcon(idClient)
  });

  it('20. Інформація по а/м в НЗ', function(){
      cy.visit(approve);
      orderPage.getInfoAuto()
  });

  it('21. Перевід у статус Ремонту', function(){
    cy.visit(approve);
    orderPage.createProgress(idClient)
  })

  it('22. Додавання Коментарів', function(){
    cy.visit(progress);
    orderPage.addComments(idClient)
  });

  it('23. Оплата і видача (ОВ)', function(){
    cy.visit(progress);
    orderPage.payOrder(idClient)
  });

  it('24. Статистика в НЗ', function(){
    cy.visit(success);
    orderPage.getStatisticOrder()
  });

  it('25. Завантаження НЗ для Клієнта', function(){
    cy.visit(success);
    orderPage.downloadOrder()
  });

  it('Перевірка завантаженних файлів', function(){
    cy.visit(success);
    orderPage.checkDownloadOrder()
  });

  it('Відсутність $ в НЗ', function(){
    cy.visit(progress);
    cy.get('.styles-m__logo---2zDPJ').click()
    cy.wait(4000);
    cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
    .then (text => {var codeNZ = text;
        cy.log(codeNZ)
        const numArr = text.split('-')  //[MDR, 594, 12345]
        cy.get('.ant-input-search > .ant-input').last().type(numArr[numArr.length-1])//пошук
    })
    cy.get('.styles-m__title---Nwr2X > span').should('have.text','Ремонти')
    cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
    cy.get('.anticon-dollar').should('not.exist')// ел не має на в DOM
    });

  it('Копія НЗ', function(){
    cy.visit(progress);
    orderPage.copyOrder(idClient)
  });

  it('Видалення НЗ', function(){
    cy.visit(appointments);
    orderPage.deleteOrder(idClient)
  });

  it('Вкладка Історія в н/з', function(){
    cy.visit(success);
    cy.get('.styles-m__logo---2zDPJ').click()
    cy.wait(3000);
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

  it('Вкладка Пост в н/з', function(){
    cy.visit(success);
    cy.get('.styles-m__logo---2zDPJ').click()
    cy.wait(3000);
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
    cy.get('.ant-tabs-nav').contains('Пост').click();
    cy.get('.styles-m__staticStationLoadsRow---MnLCJ > :nth-child(1)').should('exist');
  });

  it('Відкриття форми створення Працівника', function(){
    cy.get(':nth-child(2) > .ant-menu-submenu-title').click().should('exist');
    cy.contains('Працівники').click()
        .then(()=>{
            cy.get('.ant-btn').click()
            cy.wait(2000)
            cy.get('.ant-form').should('exist');
            cy.get('#jobTitle').type('Test').should('exist');
        })
  });

  it('Відкриття картки існуючого Працівника', function(){
    cy.get(':nth-child(2) > .ant-menu-submenu-title').click().should('exist');
    cy.contains('Працівники').click()
        .then(()=>{
            cy.get('.styles-m__employeeName---2QyjT').first().click({force: true})
            cy.wait(2000)
            cy.get('.ant-tabs').should('exist');
            cy.wait(2000)
            cy.get(':nth-child(1) > .ant-row > .ant-col-18').contains('Менеджерський доступ');
        })
  });

  it('Відкриття сторінки Деталі в Роботі', function(){
    cy.get('.styles-m__logo---2zDPJ').click()
    cy.get(':nth-child(5) > a').first().click({force: true})
      .then(()=>{
        cy.get('.styles-m__minimized---2nM6M > .ant-btn').click() // фільтр дата
        cy.wait(2000)
        cy.get('.styles-m__filterDateButtons---QBBQy > :nth-child(5)').click() // фільтр Рік
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
  
  it('Перевідка вмісту Вкладка Історія в НЗ', function(){
    cy.visit(success);
    cy.get('.styles-m__logo---2zDPJ').click()
    cy.wait(3000);
    cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
    .then (text => {codeNZ = text;
      cy.log(codeNZ)
      const numArr = text.split('-')  //[MDR, 594, 12345]
      cy.get('.ant-input-search > .ant-input').last().type(numArr[numArr.length-1])//пошук
    })
    cy.wait(2000);
    cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
    cy.log('Вибір Запису');
    cy.wait(4000);
    cy.log('Для нового клієнта історія містить 1 елемент');
    cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(7)').click();
    cy.get('.ant-table-row > :nth-child(2) > a').should('exist');
  });

  it('Вкладка Пост в НЗ', function(){
    cy.visit(success);
    cy.get('.styles-m__logo---2zDPJ').click()
    cy.wait(3000);
    cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
    .then (text => {codeNZ = text;
      cy.log(codeNZ)
      const numArr = text.split('-')  //[MDR, 594, 12345]
      cy.get('.ant-input-search > .ant-input').last().type(numArr[numArr.length-1])//пошук
    })
    cy.wait(2000);
    cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
    cy.log('Вибір Запису');
    cy.wait(4000);
    cy.log('Вкладка Пост');
    cy.get('.ant-tabs-nav').contains('Пост').click()
    cy.get('.styles-m__staticStationLoadsRow---MnLCJ > :nth-child(1)').should('exist');
  });

  it('Меню / Швидка навігація + Ремонт', () => {
    cy.get('.ant-menu-item').contains('Швидка навігація').first().click({force: true})
    cy.get(':nth-child(1) > .styles-m__folderLink---2Myrv > .anticon > svg').first().click({force: true})
    cy.get('.styles-m__title---Nwr2X > span').should('have.text','Додати Ремонт')
  })

  it('Меню / Швидка навігація / Кнопка Ремонти', () => {
    cy.get('.ant-menu-item').contains('Швидка навігація').first().click({force: true})
    cy.get(':nth-child(1) > .styles-m__buttonLink---1D7wr > .ant-btn').first().click({force: true})
    cy.get('.styles-m__title---Nwr2X > span').should('have.text','Нові')
  })

  it('Меню / Швидка навігація / Кнопка Запис', () => {
    cy.get('.ant-menu-item').contains('Швидка навігація').click({force: true})
    cy.get('.ant-btn').contains('Запис').click({force: true})
    cy.get('.styles-m__title---Nwr2X > span').should('have.text','Записи')
  })

  it('Меню / Швидка навігація / Кнопка Ремонт', () => {
    cy.get('.ant-menu-item').contains('Швидка навігація').click({force: true})
    cy.get('.ant-btn').contains('Ремонт').click({force: true})
    cy.get('.styles-m__title---Nwr2X > span').should('have.text','Ремонти')
  })
  it('Меню / Швидка навігація / Кнопка Виконано', () => {
    cy.get('.ant-menu-item').contains('Швидка навігація').click({force: true})
    cy.get('.ant-btn').contains('Виконано').click({force: true})
    cy.get('.styles-m__title---Nwr2X > span').should('have.text','Виконані')
  })

  it('Меню / Швидка навігація / Кнопка Відмова', () => {
    cy.get('.ant-menu-item').contains('Швидка навігація').click({force: true})
    cy.get('.ant-btn').contains('Відмова').click({force: true})
    cy.get('.styles-m__title---Nwr2X > span').should('have.text','Відмови')
  })

  it('Меню / Швидка навігація / Кнопка Запрошення', () => {
    cy.get('.ant-menu-item').contains('Швидка навігація').click({force: true})
    cy.get('.ant-btn').contains('Запрошення').click({force: true})
    cy.get('.styles-m__title---Nwr2X > span').should('have.text','Запрошення')
  })

  it('Меню / Швидка навігація / Кнопка Відгук', () => {
    cy.get('.ant-menu-item').contains('Швидка навігація').click({force: true})
    cy.get('.ant-btn').contains('Відгук').click({force: true})
    cy.get('.styles-m__title---Nwr2X > span').should('have.text','Відгуки')
  })

  it('Меню / Ремонти', () => {
    cy.get('.ant-menu-item').contains('Ремонти').click({force: true})
    cy.get('.styles-m__title---Nwr2X > span').should('have.text','Нові')
    cy.get('.ant-table-content').should('exist')
    cy.get('a > .ant-btn').contains('Додати').click({force: true})
    cy.get('.styles-m__title---Nwr2X > span').should('have.text','Додати Ремонт')
    cy.get('.styles-m__headerContorls---2pU_V > .anticon > svg').click({force: true})
    cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
    cy.get('.styles-m__title---Nwr2X > span').should('have.text','Новий')
  })

  it('Меню / Довідник', () => {
    cy.get('.ant-menu-submenu-title').contains('Довідник').click({force: true})
    cy.get('.ant-menu-item').contains('Довідники').click({force: true})
    cy.get('.styles-m__title---Nwr2X > span').should('have.text','Довідники та налаштування')
    cy.get('.styles-m__paper---3d-H1').should('exist')
  })

  it('Меню / Товари', () => {
    cy.get('.ant-menu-submenu-title').contains('Довідник').click({force: true})
    cy.get('.ant-menu-item').contains('Товари').click({force: true})
    cy.get('.styles-m__title---Nwr2X > span').should('have.text','Товари')
    cy.get('.sc-gzVnrw').should('exist')
  })

  it('Меню / Автомобілі', () => {
    cy.get('.ant-menu-submenu-title').contains('Довідник').click({force: true})
    cy.get('.ant-menu-item').contains('Автомобілі').click({force: true})
    cy.get('.styles-m__title---Nwr2X > span').should('have.text','Автомобілі')
    cy.get('.styles-m__paper---3d-H1').should('exist')
  })

  it('Меню / Клієнти', () => {
    cy.get('.ant-menu-submenu-title').contains('Довідник').click({force: true})
    cy.get('.ant-menu-item').contains('Клієнти').click({force: true})
    cy.wait(2000);
    cy.get('.styles-m__title---Nwr2X').should('have.text','Клієнти')
    cy.get('.ant-table-body').should('exist')
  })

  it('Меню / Працівники', () => {
    cy.get('.ant-menu-submenu-title').contains('Довідник').click({force: true})
    cy.get('.ant-menu-item').contains('Працівники').click({force: true})
    cy.wait(2000);
    cy.get('.styles-m__title---Nwr2X > span').should('have.text','Працівники')
    cy.get('.styles-m__paper---3d-H1').should('exist')
  })


  it('Загальний пошук', function(){
    cy.get('.styles-m__logo---2zDPJ').click()
    cy.get('.styles-m__title---Nwr2X > span').should('have.text','Календар Завантаження')
    cy.get('.ant-select-search__field > .ant-input').type('start')
    cy.wait(3000)
    cy.get('.styles-m__title---Nwr2X > span').should('not.have.text','Помилка')
  })

})