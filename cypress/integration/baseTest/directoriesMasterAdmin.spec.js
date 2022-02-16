/// <reference types="cypress" />

import DirectoriesPage from '../../support/pageObject/directoriesPage';

const directiries = new DirectoriesPage();
const baseUrl = 'https://'+Cypress.env('url')+'my.carbook.pro';

describe ('Directories & Settings|Master|Admin|Desktop|UA|', function(){

  beforeEach('User LogIn ', function(){
    cy.viewport(1240,960)  
    cy.login(baseUrl+'/login', Cypress.env('Kasur'), Cypress.env('pw'))
      .then(()=>{
      cy.wait(3000)
      cy.get('img').eq(0).click({force: true}) //menu
    })
  });

  it('Контрагенти. Клієнти', function(){
    cy.visit(baseUrl+'/directories') 
    directiries.checkHeader('Клієнти', 'Клієнти');
  });

  it('Контрагенти. Автомобілі', function(){
    cy.visit(baseUrl+'/directories')
    directiries.checkHeader('Автомобілі', 'Автомобілі');
  });

  it('Контрагенти. Працівники', function(){
    cy.visit(baseUrl+'/directories') 
    directiries.checkHeader('Працівники', 'Працівники'); 
  });

  it('Контрагенти. Постачальники', function(){
    cy.visit(baseUrl+'/directories')
    directiries.checkHeader('Постачальники', 'Постачальники');
  });

  it('Товари.', function(){
    cy.visit(baseUrl+'/directories')
    directiries.checkHeader('Товари', 'Товари');
  });

  it('Товари. Групи товарів', function(){
    cy.visit(baseUrl+'/directories')
    directiries.checkHeader('Групи товарів', 'Групи товарів');
  });
  
  it('Товари. Цінові групи', function(){
    cy.visit(baseUrl+'/directories')
    directiries.checkHeader('Цінові групи', 'Цінові групи');
  });

  // // it('Товари. Повязані групи', function(){
  // //   var nameButton = 'Повязані групи';
  // //    
  // //   directiries.checkButton(nameButton);;
  // // });

  it('Товари. Склади', function(){
    cy.visit(baseUrl+'/directories')
    directiries.checkHeader('Склади', 'Склади');
  });

  it('Товари. Комірки', function(){
    cy.visit(baseUrl+'/directories')
    directiries.checkHeader('Комірки', 'WMS');
  });

  // // it('Товари. Одиниці виміру', function(){
  // //   var nameButton = 'Одиниці виміру';
  // //   directiries.checkButton(nameButton);;
  // // });

  it('Товари. Кросси', function(){
    cy.visit(baseUrl+'/directories')
    directiries.checkHeader('Кросси', 'Кросси');
  });

  it('НЗ. Роботи', function(){
    cy.visit(baseUrl+'/directories')
    directiries.checkHeader('Роботи', 'Роботи');
  });

  it('НЗ. Мої нормативи', function(){
    cy.visit(baseUrl+'/directories')
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
    cy.visit(baseUrl+'/directories')
    directiries.checkHeader('Карта ремонту', 'Карта ремонту');
  });

  it('НЗ. Статуси', function(){
    cy.visit(baseUrl+'/directories')
    directiries.checkHeader('Статуси', 'Налаштування статусів запчастини');
  });

  it('НЗ. Локації', function(){
    cy.visit(baseUrl+'/directories')
    directiries.checkHeader('Локації', 'Локації');
  });

  it('НЗ. Діагностика', function(){
    cy.visit(baseUrl+'/directories')
    directiries.checkHeader('Діагностика', 'Шаблони діагностики');
  });

  it('Бухгалтерія. Каси', function(){
    cy.visit(baseUrl+'/directories')
    directiries.checkHeader('Каси', 'Каси');
  });

  it('Бухгалтерія. Реквізити', function(){
    cy.visit(baseUrl+'/directories')
    directiries.checkHeader('Реквізити', 'Реквізити');
  });

  it('Бухгалтерія. Аналітика', function(){
    cy.visit(baseUrl+'/directories')
    directiries.checkHeader('Аналітика', 'Аналітика');
  });

  it('Бухгалтерія. Нумерація', function(){
    cy.visit(baseUrl+'/directories')
    directiries.checkHeader('Нумерація', 'Нумерація');
  });

  it('Налаштування. Прайси постачальників', function(){
    cy.visit(baseUrl+'/directories')   
    directiries.checkHeader('Прайси постачал.', 'Налаштування наявності');
  });

  it('Налаштування. API постачальників', function(){
    cy.visit(baseUrl+'/directories')
    directiries.checkHeader('API постачальників', 'API постачальників');
  });

  it('Налаштування.СМС', function(){
    cy.visit(baseUrl+'/directories')
    directiries.checkHeader('СМС', 'Налаштування SMS');
  });

})

