/// <reference types="cypress" />

const baseUrl = 'https://'+Cypress.env('url')+'my.carbook.pro';
const appointments = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/appointments';
const approve = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/approve';
const progress = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/progress';
const success = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/success';
const cancel = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/cancel';


var date = new Date();
var second = parseInt(date.getSeconds())+10
var minute = parseInt(date.getMinutes())+10
var codeNZ =''




describe ('Start|Desktop|UA|', function(){
  beforeEach('User LogIn ', () => {
    cy.visit(baseUrl)
    cy.get('#login.ant-input').type(Cypress.env('Login'));  
    cy.get('#password').type(Cypress.env('Password'));
    cy.get('button').click()
    cy.intercept('GET', baseUrl+'/dashboard')
    cy.get('.styles-m__title---Nwr2X').contains('Календар Завантаження');
  });

  it('Профіль вибір українського інтерфейсу', function(){
    cy.get('.styles-m__logo---2zDPJ').click()
    cy.get('.styles-m__userName---h3mg1').click()
    .then (()=>{
      cy.get('#language').click()
      cy.contains('Українська').click();
      cy.wait(1000)
    })
    .then (()=>{
        cy.get('.ant-btn').first().click({force: true});
    })
 })

  it('Загальний пошук', function(){
    cy.get('.styles-m__logo---2zDPJ').click()
    cy.get('.styles-m__title---Nwr2X > span').should('have.text','Календар Завантаження')
    cy.get('.ant-select-search__field > .ant-input').type('start')
    cy.wait(3000)
    cy.get('.styles-m__title---Nwr2X > span').should('not.have.text','Помилка')
  })

it('Інформація по а/м в НЗ', function(){
    cy.visit(progress);
    cy.get('.styles-m__logo---2zDPJ').click()
    cy.wait(4000);
    cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
    .then (text => {codeNZ = text;
        cy.log(codeNZ)
        const numArr = text.split('-')  //[MDR, 594, 12345]
        cy.get('.ant-input-search > .ant-input').last().type(numArr[numArr.length-1])//пошук
    })
    cy.wait(2000);
    cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
    cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(1)').click(); /// Вибір Н/З
    cy.wait(1000);
    cy.get('[title="Інфо по автомобілю"] > .anticon > svg').click({force: true})
    cy.wait(3000);
    cy.get('.ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-body').should('exist');
    cy.wait(3000);
    cy.get('.styles-m__tableHeader---1i3oL').should('have.text','Спецификации масел и технических жидкостей')
    cy.get('.ant-modal-close-x').last().click({force: true})
    cy.wait(1000);
    cy.get('.styles-m__title---Nwr2X > span').should('have.text','Ремонт')
    cy.wait(1000);
});

  it('Статистика в НЗ', function(){
        cy.visit(success);
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.wait(4000);
        cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
        .then (text => {codeNZ = text;
            cy.log(codeNZ)
            const numArr = text.split('-')  //[MDR, 594, 12345]
            cy.get('.ant-input-search > .ant-input').last().type(numArr[numArr.length-1])//пошук
        })
        cy.wait(2000);
        cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
        cy.log('Вибір Н/З');
        cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(1)').click();
        cy.wait(1000);
        cy.get('.anticon-info-circle').click({force: true})
        cy.wait(3000);
        cy.get('.ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-body').should('exist');
        cy.get('#rcDialogTitle4 > :nth-child(1) > :nth-child(1)').should('have.text','Статистика по н/з')
        cy.get('#rcDialogTitle4 > :nth-child(1)').contains('Завершено').should('exist');
        cy.get('.ant-modal-close-x').last().click({force: true})
        cy.wait(1000);
        cy.get('.styles-m__title---Nwr2X > span').should('have.text','Виконано')
        cy.wait(1000);
    });
 

it('Завантаження НЗ для Клієнта', function(){
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
  cy.log('Вибір Н/З');
  cy.wait(4000);
  cy.get('.anticon-printer > svg').click();
  cy.log('Завантаження Наряд замовлення для Клієнта');
  cy.get('.ant-dropdown-menu-item').eq(5).click({force: true});
  cy.wait(2000);
});

it('Перевірка завантаженних файлів', function(){
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
  cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
        .then (text => {codeNZ = text;
        cy.log(codeNZ)
        const path = require("path");
      ////  cy.readFile(path.join('cypress/downloads', 'act-'+codeNZ+'.pdf')).should("exist"); // файл Акт прийому-передачі автомобіля
        cy.wait(2000);
        cy.readFile(path.join('cypress/downloads', 'order-'+codeNZ+'.pdf')).should("exist"); // файл Наряд замовлення для Клієнта
     //  // cy.wait(1000);
       //// cy.readFile(path.join('cypress/downloads', 'invoice-'+codeNZ+'.pdf')).should("exist");
  })
});

  it('Відсутність $ в НЗ', function(){
        cy.visit(progress);
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.wait(4000);
        cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
        .then (text => {codeNZ = text;
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
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.wait(4000);
        cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
        .then (text => {codeNZ = text;
            cy.log(codeNZ)
            const numArr = text.split('-')  //[MDR, 594, 12345]
            cy.get('.ant-input-search > .ant-input').last().type(numArr[numArr.length-1])//пошук
        })
        cy.get('.styles-m__title---Nwr2X > span').should('have.text','Ремонти')
        cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
        cy.get('.anticon-copy').last().click({force: true})
        cy.get('.ant-modal-confirm-body-wrapper').should('be.visible')
        cy.get('.ant-modal-confirm-btns > .ant-btn-primary').click({force: true})
        cy.wait(4000); 
        cy.get('.styles-m__title---Nwr2X > span').should('have.text','Новий')  
        cy.get('.ant-modal-close-x').last().click({force: true})
        cy.wait(1000);
    });

  it('Видалення НЗ', function(){
        cy.visit(appointments);
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.wait(4000);
        cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
        .then (text => {codeNZ = text;
            cy.log(codeNZ)
            const numArr = text.split('-')  //[MDR, 594, 12345]
            cy.get('.ant-input-search > .ant-input').last().type(numArr[numArr.length-1])//пошук
        })
        cy.get('.styles-m__title---Nwr2X > span').should('have.text','Нові')
        cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
        cy.get('.anticon-delete').first().click({force: true})
        cy.wait(1000);
        cy.get('.ant-modal').should('be.visible')
        cy.get('.styles-m__submit---20j0q').contains('Так').click({force: true})
        cy.wait(3000); 
        cy.get('.styles-m__title---Nwr2X > span').should('have.text','Відмова')  
        cy.get('.ant-modal-close-x').last().click({force: true})
        cy.wait(1000);
    });

  it('Вкладка Історія в н/з', function(){
    cy.visit(success);
    cy.get('.styles-m__logo---2zDPJ').click()
    cy.wait(3000);
    cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
    .then (text => {codeNZ = text;
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
    .then (text => {codeNZ = text;
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
  
  it('Додавання роботи ч/з +, коментар до Роботи', function(){
    cy.visit(progress);
    cy.get('.styles-m__logo---2zDPJ').click()
    cy.wait(4000);
    cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
    .then (text => {codeNZ = text;
      cy.log(codeNZ)
      const numArr = text.split('-')  //[MDR, 594, 12345]
      cy.get('.ant-input-search > .ant-input').last().type(numArr[numArr.length-1])//пошук
    })
    cy.get('.styles-m__title---Nwr2X > span').should('have.text','Ремонти')
    cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
    cy.get('.ant-tabs-nav').contains('Роботи').click()
    cy.get('.styles-m__headerActions---2S-7g > [title="Додати"]').click()
    cy.get('.ant-table-content > .ant-table-body > table > .ant-table-tbody > .ant-table-row > :nth-child(4) > .ant-select > .ant-select-selection').type('Діагностика')
    cy.wait(1000)
    cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true});
    cy.wait(1000);
    cy.get(':nth-child(7) > div > .ant-btn').first().click({force: true});
    cy.get('.styles-m__blockButtonsWrap---1eB6I > :nth-child(1)').first().click({force: true});
    cy.get('.styles-m__blockButtonsWrap---1eB6I > :nth-child(2)').first().click({force: true});
    cy.get('.styles-m__blockButtonsWrap---1eB6I > :nth-child(3)').first().click({force: true});
    cy.get('.ant-modal-body > :nth-child(2) > .ant-input').contains('попереду, вгорі;')
    cy.get('.ant-modal-footer > .ant-btn-primary').first().click({force: true});
    cy.wait(1000);
    cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true}) /// кнопка Гаразд
    cy.get('.ant-tabs-tabpane-active > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-content').contains('попереду, вгорі;')
  });

  it('Додавання Запчастин ч/з +', function(){
    cy.visit(progress);
    cy.get('.styles-m__logo---2zDPJ').click()
    cy.wait(4000);
    cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
    .then (text => {codeNZ = text;
      cy.log(codeNZ)
      const numArr = text.split('-')  //[MDR, 594, 12345]
      cy.get('.ant-input-search > .ant-input').last().type(numArr[numArr.length-1])//пошук
    })
    cy.get('.styles-m__title---Nwr2X > span').should('have.text','Ремонти')
    cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
    cy.get('.ant-tabs-nav').contains('Запчастини').click()
    cy.get('.styles-m__headerActions---29OlS > [title="Додати"]').click()
    cy.get(':nth-child(2) > .ant-radio > .ant-radio-inner').click({force: true});

    cy.get('.ant-table-row > :nth-child(4) > .ant-input').should('have.text','')
    cy.get('.ant-table-row > :nth-child(4) > .ant-input').clear().type('Моторне мастило')
    cy.get('.styles-m__brandColumn---3m8NH > .ant-select > .ant-select-selection').type('ABEX')
    cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true});

    cy.get('[style="display: flex;"] > .ant-select > .ant-select-selection').type('АНД')
    cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true});
    cy.get(':nth-child(10) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().type('123.45')
    cy.get(':nth-child(12) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().type('102.8')
    cy.wait(1000);
    cy.get('.ant-modal-footer > div > .ant-btn-primary').last().click({force: true}) /// кнопка Гаразд

    cy.get('.ant-tabs-tabpane-active > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-content').contains('Моторне мастило')
  });

  it('Додавання Коментів', function(){
    cy.visit(progress);
    cy.get('.styles-m__logo---2zDPJ').click()
    cy.wait(4000);
    cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
    .then (text => {codeNZ = text;
      cy.log(codeNZ)
      const numArr = text.split('-')  //[MDR, 594, 12345]
      cy.get('.ant-input-search > .ant-input').last().type(numArr[numArr.length-1])//пошук
    })
    cy.get('.styles-m__title---Nwr2X > span').should('have.text','Ремонти')
    cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
    cy.get('.ant-tabs-nav').contains('Коментарі').click()
    cy.get('.ant-input.styles-m__comment---3QjTs').clear().type('Не заляпать бампер мастилом');
    cy.get(':nth-child(3) > .styles-m__commentInput---2Ptrr').clear().type('Без царапин...'); //Стан автомобіля
    cy.wait(2000);
    cy.get(':nth-child(4) > .styles-m__commentInput---2Ptrr').clear().type('Замінити повітряні фільтри мотора'); 
    cy.get(':nth-child(5) > .styles-m__commentInput---2Ptrr').clear().type('Пройти повторно діагностику');
    cy.wait(1000);
    cy.get('.anticon-save > svg').first().click({force: true});
    cy.wait(4000);
    cy.get('.ant-tabs-nav').contains('Коментарі').click()
    cy.wait(1000);
    cy.get('.ant-input.styles-m__comment---3QjTs').should('not.have.text','Коментарі клієнта');
    cy.get(':nth-child(3) > .styles-m__commentInput---2Ptrr').should('not.have.text','Рекомендації для клієнта');
    cy.get(':nth-child(4) > .styles-m__commentInput---2Ptrr').should('have.text','Замінити повітряні фільтри мотора'); 
    cy.get(':nth-child(5) > .styles-m__commentInput---2Ptrr').contains('Пройти повторно діагностику')   
  });
  
  it('Вкладка Історія в НЗ', function(){
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
    cy.get('.ant-menu-item').contains('Швидка навігація').click({force: true})
    cy.get(':nth-child(1) > .styles-m__folderLink---2Myrv > .anticon > svg').click({force: true})
    cy.get('.styles-m__title---Nwr2X > span').should('have.text','Додати Ремонт')
  })

  it('Меню / Швидка навігація / Кнопка Ремонти', () => {
    cy.get('.ant-menu-item').contains('Швидка навігація').click({force: true})
    cy.get(':nth-child(1) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
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

  it('Меню /Ремонти', () => {
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


})