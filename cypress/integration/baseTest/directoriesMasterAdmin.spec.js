/// <reference types="cypress" />

import DirectoriesPage from '../../support/pageObject/directoriesPage';

const directiries = new DirectoriesPage();

describe ('Directories & Settings|Master|Admin|Desktop|UA|', function(){

  const login = (email, password) =>{
    cy.session([email, password], () => { 
      cy.visit('/directories') 
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
    login(Cypress.env('Kasur'), Cypress.env('pw'))
  })

  it('Контрагенти. Клієнти', function(){
    cy.visit('/directories') 
    directiries.checkHeader('Клієнти', 'Клієнти');
  });

  it('Контрагенти. Автомобілі', function(){
    cy.visit('/directories') 
    directiries.checkHeader('Автомобілі', 'Автомобілі');
  });

  it('Контрагенти. Працівники', function(){
    cy.visit('/directories') 
    directiries.checkHeader('Працівники', 'Працівники'); 
  });

  it('Контрагенти. Постачальники', function(){
    cy.visit('/directories') 
    directiries.checkHeader('Постачальники', 'Постачальники');
  });

  it('Товари.', function(){
    cy.visit('/directories') 
    directiries.checkHeader('Товари', 'Товари');
  });

  it('Товари. Групи товарів', function(){
    cy.visit('/directories') 
    directiries.checkHeader('Групи товарів', 'Групи товарів');
  });
  
  it('Товари. Цінові групи', function(){
    cy.visit('/directories') 
    directiries.checkHeader('Цінові групи', 'Цінові групи');
  });

  // // it('Товари. Повязані групи', function(){
  // //   var nameButton = 'Повязані групи';
  // //    
  // //   directiries.checkButton(nameButton);;
  // // });

  it('Товари. Склади', function(){
    cy.visit('/directories') 
    directiries.checkHeader('Склади', 'Склади');
  });

  it('Товари. Комірки', function(){
    cy.visit('/directories') 
    directiries.checkHeader('Комірки', 'WMS');
  });

  // // it('Товари. Одиниці виміру', function(){
  // //   var nameButton = 'Одиниці виміру';
  // //   directiries.checkButton(nameButton);;
  // // });

  it('Товари. Кросси', function(){
    cy.visit('/directories') 
    directiries.checkHeader('Кросси', 'Кросси');
  });

  it('НЗ. Роботи', function(){
    cy.visit('/directories') 
    directiries.checkHeader('Роботи', 'Роботи');
  });

  it('НЗ. Мої нормативи', function(){
    cy.visit('/directories') 
    directiries.checkHeader('Мої нормативи', 'Мої нормативи');
  });

  // // it('НЗ. Комплекси', function(){
  // //   var nameButton = 'Комплекси';
  // //    
  // //   directiries.checkButton(nameButton);
  // // });

  // // it('НЗ. Повязані роботи', function(){
  // //   var nameButton = 'Повязані роботи';
  // //    
  // //   directiries.checkButton(nameButton);
  // // });

  it('НЗ. Карта ремонту', function(){
    cy.visit('/directories') 
    directiries.checkHeader('Карта ремонту', 'Карта ремонту');
  });

  it('НЗ. Статуси', function(){
    cy.visit('/directories') 
    directiries.checkHeader('Статуси', 'Налаштування статусів запчастини');
  });

  it('НЗ. Локації', function(){
    cy.visit('/directories') 
    directiries.checkHeader('Локації', 'Локації');
  });

  it('НЗ. Діагностика', function(){
    cy.visit('/directories') 
    directiries.checkHeader('Діагностика', 'Шаблони діагностики');
  });

  it('Бухгалтерія. Каси', function(){
    cy.visit('/directories') 
    directiries.checkHeader('Каси', 'Каси');
  });

  it('Бухгалтерія. Реквізити', function(){
    cy.visit('/directories') 
    directiries.checkHeader('Реквізити', 'Реквізити');
  });

  it('Бухгалтерія. Аналітика', function(){
    cy.visit('/directories') 
    directiries.checkHeader('Аналітика', 'Аналітика');
  });

  it('Бухгалтерія. Нумерація', function(){
    cy.visit('/directories') 
    directiries.checkHeader('Нумерація', 'Нумерація');
  });

  it('Налаштування. Прайси постачальників', function(){
    cy.visit('/directories')    
    directiries.checkHeader('Прайси постачал.', 'Налаштування наявності');
  });

  it('Налаштування. API постачальників', function(){
    cy.visit('/directories') 
    directiries.checkHeader('API постачальників', 'API постачальників');
  });

  it('Налаштування.СМС', function(){
    cy.visit('/directories') 
    directiries.checkHeader('СМС', 'Налаштування SMS');
  });

})

