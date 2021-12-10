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

const username = Cypress.env('LoginMasterMehanic')
const password = Cypress.env('pw')

const baseUrl = 'https://'+Cypress.env('url')+'my.carbook.pro';
const appointments = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/appointments';
const approve = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/approve';
const progress = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/progress';
const success = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/success';
const cancel = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/cancel';

var date = new Date();
//const idClient ='91140'
const idClient =''+date.getDate()+date.getMonth()+date.getMinutes();
var second = parseInt(date.getSeconds())+10
var minute = parseInt(date.getMinutes())+10
const tel =second+'0'+minute+''+second+''+minute;

describe ('Master|Mehanic|UA|Desktop|', function(){
  beforeEach('User LogIn ', () => {
    cy.visit(baseUrl)
    loginPage.enterLogin(username,password)
  });

  it('Профіль вибір українського інтерфейсу', function(){
    profilePage.selectUA()
  })

  it('Інформація по а/м в НЗ', function(){
      cy.visit(approve);
      orderPage.getInfoAuto()
  });

  it('Додавання Робіт в НЗ через групи Товарів', function(){
    cy.visit(approve)
    cy.get('.styles-m__logo---2zDPJ').click()
        .then(()=>{
            //////cy.get('.ant-input-search > .ant-input').type(idClient)
            cy.wait(2000);
            cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
            cy.log('Вибір Запису');
        })
        .then(()=>{
            cy.log('Вкладка Роботи');
            cy.get('.ant-tabs-nav > :nth-child(1)').contains('Роботи').click();
            cy.wait(2000)
        })
        .then(()=>{
            cy.get('.styles-m__headerActions---2S-7g > [title="Додати"]').click()
        })
        .then(()=>{
            cy.get('.styles-m__modalSectionTitle---3iMcZ > div > span').contains('Робота')
            cy.wait(1000)
        })
        .then(()=>{
            cy.get('.ant-table-content > .ant-table-body > table > .ant-table-tbody > .ant-table-row > :nth-child(2) > .ant-select > .ant-select-selection').click();
            cy.wait(1000)
        })
        .then(()=>{
            cy.get('.ant-select-dropdown-search > .ant-select-search__field__wrap > .ant-select-search__field').type('Фільтри повітряні')
            cy.get('.ant-select-tree-child-tree-open').eq(1).click()
        })
        .then(()=>{
            cy.get('.ant-table-content > .ant-table-body > table > .ant-table-tbody > .ant-table-row > :nth-child(4) > .ant-select > .ant-select-selection').click()
            cy.get('.ant-select-dropdown-menu-item-active').click();
            cy.wait(1000)
        })
        .then(()=>{
            cy.get(':nth-child(8) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().type('222')
            cy.wait(1000)
            cy.get(':nth-child(10) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().type('2')
            //додати механіка
        })
        .then(()=>{
            cy.wait(3000);
            cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true})
            cy.wait(2000);
        })
  })

  it('Редагування ціни для Роботи в НЗ', function(){
    cy.visit(approve);
    cy.get('.styles-m__logo---2zDPJ').click()
    cy.wait(3000);
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

  it('Додавання Робіт в НЗ через поле Робіт', function(){
    cy.visit(approve)
    cy.get('.styles-m__logo---2zDPJ').click()
        .then(()=>{
            ////////cy.get('.ant-input-search > .ant-input').type(idClient)
            cy.wait(2000);
            cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
            cy.log('Вибір Запису');
        })
        .then(()=>{
            cy.log('Вкладка Роботи');
            cy.get('.ant-tabs-nav > :nth-child(1)').contains('Роботи').click();
            cy.wait(2000)
        })
        .then(()=>{
            cy.get('.styles-m__headerActions---2S-7g > [title="Додати"]').click()
        })
        .then(()=>{
            cy.get('.ant-table-content > .ant-table-body > table > .ant-table-tbody > .ant-table-row > :nth-child(4) > .ant-select > .ant-select-selection').type('Заміна')
            cy.wait(4000)
            cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true});
        })
        .then(()=>{
            cy.wait(3000);
            cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true})
            cy.wait(2000);
        })
    })

    it('Додавання Робіт повторно', function(){
        cy.visit(approve)
        cy.get('.styles-m__logo---2zDPJ').click()
            .then(()=>{
                //////cy.get('.ant-input-search > .ant-input').type(idClient)//пошук
                cy.wait(2000);
                cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
                cy.log('Вибір Запису');
            })
            .then(()=>{
                cy.log('Вкладка Роботи');
                cy.get('.ant-tabs-nav > :nth-child(1)').contains('Роботи').click();
                cy.wait(2000)
            })
            .then(()=>{
                cy.get('.styles-m__headerActions---2S-7g > [title="Додати"]').click()
            })
            .then(()=>{
                cy.get('.ant-table-content > .ant-table-body > table > .ant-table-tbody > .ant-table-row > :nth-child(4) > .ant-select > .ant-select-selection').type('Діагностика')
                cy.wait(4000)
                cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true});
            })
            .then(()=>{
                cy.wait(3000);
                cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true})
                cy.wait(2000);
            })
        })

    it('Відображення механіка в табці Роботи  ', function(){
        cy.visit(approve)
        cy.get('.styles-m__logo---2zDPJ').click()
        .then(()=>{
            //////cy.get('.ant-input-search > .ant-input').type(idClient)//пошук
            cy.wait(2000);
            cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
            cy.log('Вибір Запису');
        })
        .then(()=>{
            cy.log('Вкладка Роботи');
            cy.get('.ant-tabs-nav > :nth-child(1)').contains('Роботи').click();
            cy.wait(2000)
        })
        .then(()=>{
            cy.log('Механік // робота з Діагностики');
            cy.get('[data-row-key="0"] > :nth-child(6) > .ant-select > .ant-select-selection').contains('Механік').should('exist')
            cy.wait(1000)
            cy.log('Механік // + з модалки Робота');
            cy.get('[data-row-key="1"] > :nth-child(6) > .ant-select > .ant-select-selection').contains('Механік').should('exist')
            cy.wait(1000)
            cy.get('[data-row-key="2"] > :nth-child(6) > .ant-select > .ant-select-selection').contains('Механік').should('exist')
            cy.wait(1000)
            cy.log('Механік // + роботи з модалки Комплекси');
            cy.get('[data-row-key="3"] > :nth-child(6) > .ant-select > .ant-select-selection').contains('Механік').should('exist')

        })
    })

  
  it('Відкриття таб. Запчастини', function(){
    cy.visit(approve);
    cy.get('.styles-m__logo---2zDPJ').click()
    cy.wait(3000);
    ////////cy.get('.ant-input-search > .ant-input').type(idClient)//пошук
    cy.wait(2000);
    cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
    cy.log('Вибір Запису');
    cy.wait(10000);
    cy.log('Вкладка Запчастини');
    cy.get('.ant-tabs-nav > :nth-child(1)').contains('Запчастини').click()
    cy.wait(2000);
    cy.log('Пряме редагування');
    cy.get('[style="width: min-content;"] > :nth-child(1) > [title="Додати"]').click()
  });

  it('Статистика в НЗ', function(){
    cy.visit(success);
    orderPage.getStatisticOrder()
  });

  it('Додавання Коментарів', function(){
    cy.visit(progress);
    cy.get('.styles-m__logo---2zDPJ').click()
    cy.wait(4000);
   //// cy.get('.ant-input-search > .ant-input').type(idClient)//пошук
    cy.wait(2000);
    cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
    cy.log('Вибір Н/З');
    cy.wait(4000);
    cy.get('#ОВ > .styles-m__mapChildsBlock---1oGYD > :nth-child(2) > .ant-btn').click();
    cy.wait(1000);
    cy.get('.ant-input.styles-m__comment---3QjTs').clear().type('Не заляпать бампер мастилом');
    cy.get(':nth-child(3) > .styles-m__commentInput---2Ptrr').clear().type('Без царапин...'); //Стан автомобіля
    cy.wait(2000);
    cy.get(':nth-child(4) > .styles-m__commentInput---2Ptrr').clear().type('Замінити повітряні фільтри мотора'); 
    cy.get(':nth-child(5) > .styles-m__commentInput---2Ptrr').clear().type('Пройти повторно діагностику');
    cy.wait(1000);
    cy.get('.anticon-save > svg').first().click({force: true});
    cy.wait(4000);
    cy.wait(4000);
    cy.get('#ОВ > .styles-m__mapChildsBlock---1oGYD > :nth-child(2) > .ant-btn').click();
    cy.wait(1000);
    cy.get('.ant-input.styles-m__comment---3QjTs').should('not.have.text','Коментарі клієнта');
    cy.get(':nth-child(3) > .styles-m__commentInput---2Ptrr').should('not.have.text','Рекомендації для клієнта');
    cy.get(':nth-child(4) > .styles-m__commentInput---2Ptrr').should('have.text','Замінити повітряні фільтри мотора'); 
    cy.get(':nth-child(5) > .styles-m__commentInput---2Ptrr').contains('Пройти повторно діагностику')
});


  it('Відсутність $ в НЗ', function(){
    cy.visit(success);
    cy.get('.styles-m__logo---2zDPJ').click()
    cy.wait(4000);
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


  it('Меню / Ремонти/ Список Ремонтів', () => {
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

  it('Меню / Товари / Список Товарів', () => {
    cy.get('.ant-menu-submenu-title').contains('Довідник').click({force: true})
    cy.get('.ant-menu-item').contains('Товари').click({force: true})
    cy.get('.styles-m__title---Nwr2X > span').should('have.text','Товари')
    cy.get('.sc-gzVnrw').should('exist')
  })

  it('Меню / Автомобілі / Список а/м', () => {
    cy.get('.ant-menu-submenu-title').contains('Довідник').click({force: true})
    cy.get('.ant-menu-item').contains('Автомобілі').click({force: true})
    cy.get('.styles-m__title---Nwr2X > span').should('have.text','Автомобілі')
    cy.get('.styles-m__paper---3d-H1').should('exist')
  })

  it('Меню / Клієнти / Список клієнтів', () => {
    cy.get('.ant-menu-submenu-title').contains('Довідник').click({force: true})
    cy.get('.ant-menu-item').contains('Клієнти').click({force: true})
    cy.wait(2000);
    cy.get('.styles-m__title---Nwr2X').should('have.text','Клієнти')
    cy.get('.ant-table-body').should('exist')
  })

  it('Меню / Працівники / Список Працівників', () => {
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