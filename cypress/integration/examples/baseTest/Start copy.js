/// <reference types="cypress" />

const baseUrl = 'https://'+Cypress.env('url')+'my.carbook.pro';
const appointments = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/appointments';
const approve = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/approve';
const progress = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/progress';
const success = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/success';
const cancel = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/cancel';


var date = new Date();
//const idClient ='28950'
//const idClient =''+date.getDate()+date.getMonth()+date.getMinutes();
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

//   it('Профіль вибір українського інтерфейсу', function(){
//     cy.get('.styles-m__logo---2zDPJ').click()
//     cy.get('.styles-m__userName---h3mg1').click()
//     .then (()=>{
//       cy.get('#language').click()
//       cy.contains('Українська').click();
//       cy.wait(1000)
//     })
//     .then (()=>{
//         cy.get('.ant-btn').first().click({force: true});
//     })
//  })

// it('Інформація по а/м в НЗ', function(){
//     cy.visit(progress);
//     cy.get('.styles-m__logo---2zDPJ').click()
//     cy.wait(4000);
//     cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
//     .then (text => {codeNZ = text;
//         cy.log(codeNZ)
//         const numArr = text.split('-')  //[MDR, 594, 12345]
//         cy.get('.ant-input-search > .ant-input').last().type(numArr[numArr.length-1])//пошук
//     })
//     cy.wait(2000);
//     cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
//     cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(1)').click(); /// Вибір Н/З
//     cy.wait(1000);
//     cy.get('[title="Інфо по автомобілю"] > .anticon > svg').click({force: true})
//     cy.wait(3000);
//     cy.get('.ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-body').should('exist');
//     cy.wait(3000);
//     cy.get('.styles-m__tableHeader---1i3oL').should('have.text','Спецификации масел и технических жидкостей')
//     cy.get('.ant-modal-close-x').last().click({force: true})
//     cy.wait(1000);
//     cy.get('.styles-m__title---Nwr2X > span').should('have.text','Ремонт')
//     cy.wait(1000);
// });

//   it('Статистика в НЗ', function(){
//         cy.visit(success);
//         cy.get('.styles-m__logo---2zDPJ').click()
//         cy.wait(4000);
//         cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
//         .then (text => {codeNZ = text;
//             cy.log(codeNZ)
//             const numArr = text.split('-')  //[MDR, 594, 12345]
//             cy.get('.ant-input-search > .ant-input').last().type(numArr[numArr.length-1])//пошук
//         })
//         cy.wait(2000);
//         cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
//         cy.log('Вибір Н/З');
//         cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(1)').click();
//         cy.wait(1000);
//         cy.get('.anticon-info-circle').click({force: true})
//         cy.wait(3000);
//         cy.get('.ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-body').should('exist');
//         cy.get('#rcDialogTitle4 > :nth-child(1) > :nth-child(1)').should('have.text','Статистика по н/з')
//         cy.get('#rcDialogTitle4 > :nth-child(1)').contains('Завершено').should('exist');
//         cy.get('.ant-modal-close-x').last().click({force: true})
//         cy.wait(1000);
//         cy.get('.styles-m__title---Nwr2X > span').should('have.text','Виконано')
//         cy.wait(1000);
//     });
 

// it('Завантаження НЗ для Клієнта', function(){
//   cy.visit(success);
//   cy.get('.styles-m__logo---2zDPJ').click()
//   cy.wait(3000);
//   cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
//     .then (text => {codeNZ = text;
//       cy.log(codeNZ)
//       const numArr = text.split('-')  //[MDR, 594, 12345]
//       cy.get('.ant-input-search > .ant-input').last().type(numArr[numArr.length-1])//пошук
//   })
//   cy.wait(2000);
//   cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
//   cy.log('Вибір Н/З');
//   cy.wait(4000);
//   cy.get('.anticon-printer > svg').click();
//   cy.log('Завантаження Наряд замовлення для Клієнта');
//   cy.get('.ant-dropdown-menu-item').eq(5).click({force: true});
//   cy.wait(2000);
// });

// it('Перевірка завантаженних файлів', function(){
//   cy.visit(success);
//   cy.get('.styles-m__logo---2zDPJ').click()
//   cy.wait(3000);
//    cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
//     .then (text => {codeNZ = text;
//       cy.log(codeNZ)
//       const numArr = text.split('-')  //[MDR, 594, 12345]
//       cy.get('.ant-input-search > .ant-input').last().type(numArr[numArr.length-1])//пошук
//   })
//   cy.wait(2000);
//   cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
//         .then (text => {codeNZ = text;
//         cy.log(codeNZ)
//         const path = require("path");
//       ////  cy.readFile(path.join('cypress/downloads', 'act-'+codeNZ+'.pdf')).should("exist"); // файл Акт прийому-передачі автомобіля
//         cy.wait(2000);
//         cy.readFile(path.join('cypress/downloads', 'order-'+codeNZ+'.pdf')).should("exist"); // файл Наряд замовлення для Клієнта
//      //  // cy.wait(1000);
//        //// cy.readFile(path.join('cypress/downloads', 'invoice-'+codeNZ+'.pdf')).should("exist");
//   })
// });

  it('Відкриття $ в НЗ', function(){
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
        cy.get('.anticon-dollar').last().click({force: true})
        cy.wait(3000);   
        cy.get('.ant-modal-header').should('have.text','Касовий ордер')  
        cy.get('.ant-modal-close-x').last().click({force: true})
        cy.wait(1000);
        cy.get('.styles-m__title---Nwr2X > span').should('have.text','Ремонт')
        cy.wait(1000);
    });

  // it('Копія НЗ', function(){
  //       cy.visit(progress);
  //       cy.get('.styles-m__logo---2zDPJ').click()
  //       cy.wait(4000);
  //       cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
  //       .then (text => {codeNZ = text;
  //           cy.log(codeNZ)
  //           const numArr = text.split('-')  //[MDR, 594, 12345]
  //           cy.get('.ant-input-search > .ant-input').last().type(numArr[numArr.length-1])//пошук
  //       })
  //       cy.get('.styles-m__title---Nwr2X > span').should('have.text','Ремонти')
  //       cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
  //       cy.get('.anticon-copy').last().click({force: true})
  //       cy.get('.ant-modal-confirm-body-wrapper').should('be.visible')
  //       cy.get('.ant-modal-confirm-btns > .ant-btn-primary').click({force: true})
  //       cy.wait(4000); 
  //       cy.get('.styles-m__title---Nwr2X > span').should('have.text','Новий')  
  //       cy.get('.ant-modal-close-x').last().click({force: true})
  //       cy.wait(1000);
  //   });

  // it('Видалення НЗ', function(){
  //       cy.visit(appointments);
  //       cy.get('.styles-m__logo---2zDPJ').click()
  //       cy.wait(4000);
  //       cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
  //       .then (text => {codeNZ = text;
  //           cy.log(codeNZ)
  //           const numArr = text.split('-')  //[MDR, 594, 12345]
  //           cy.get('.ant-input-search > .ant-input').last().type(numArr[numArr.length-1])//пошук
  //       })
  //       cy.get('.styles-m__title---Nwr2X > span').should('have.text','Нові')
  //       cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
  //       cy.get('.anticon-delete').first().click({force: true})
  //       cy.wait(1000);
  //       cy.get('.ant-modal').should('be.visible')
  //       cy.get('.styles-m__submit---20j0q').contains('Так').click({force: true})
  //       cy.wait(3000); 
  //       cy.get('.styles-m__title---Nwr2X > span').should('have.text','Відмова')  
  //       cy.get('.ant-modal-close-x').last().click({force: true})
  //       cy.wait(1000);
  //   });

  // it('Вкладка Історія в н/з', function(){
  //   cy.visit(success);
  //   cy.get('.styles-m__logo---2zDPJ').click()
  //   cy.wait(3000);
  //   cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
  //   .then (text => {codeNZ = text;
  //       cy.log(codeNZ)
  //       const numArr = text.split('-')  //[MDR, 594, 12345]
  //       cy.get('.ant-input-search > .ant-input').last().type(numArr[numArr.length-1])//пошук
  //   })
  //   cy.get('.styles-m__title---Nwr2X > span').should('have.text','Виконані')
  //   cy.wait(2000);
  //   cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
  //   cy.log('Вибір Запису');
  //   cy.wait(4000);
  //   cy.log('Для нового клієнта історія містить 1 елемент');
  //   cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(7)').click();
  //   cy.get('.ant-table-row > :nth-child(2) > a').should('exist');
  // });

  // it('Вкладка Пост в н/з', function(){
  //   cy.visit(success);
  //   cy.get('.styles-m__logo---2zDPJ').click()
  //   cy.wait(3000);
  //   cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
  //   .then (text => {codeNZ = text;
  //       cy.log(codeNZ)
  //       const numArr = text.split('-')  //[MDR, 594, 12345]
  //       cy.get('.ant-input-search > .ant-input').last().type(numArr[numArr.length-1])//пошук
  //   })
  //   cy.get('.styles-m__title---Nwr2X > span').should('have.text','Виконані')
  //   cy.wait(2000);
  //   cy.wait(2000);
  //   cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
  //   cy.log('Вибір Запису');
  //   cy.wait(4000);
  //   cy.log('Вкладка Пост');
  //   cy.get('.ant-tabs-nav').contains('Пост').click();
  //   cy.get('.styles-m__staticStationLoadsRow---MnLCJ > :nth-child(1)').should('exist');
  // });

  // it('Відкриття форми створення Працівника', function(){
  //   cy.get(':nth-child(2) > .ant-menu-submenu-title').click().should('exist');
  //   cy.contains('Працівники').click()
  //       .then(()=>{
  //           cy.get('.ant-btn').click()
  //           cy.wait(2000)
  //           cy.get('.ant-form').should('exist');
  //           cy.get('#jobTitle').type('Test').should('exist');
  //       })
  // });

  // it('Відкриття картки існуючого Працівника', function(){
  //   cy.get(':nth-child(2) > .ant-menu-submenu-title').click().should('exist');
  //   cy.contains('Працівники').click()
  //       .then(()=>{
  //           cy.get('.styles-m__employeeName---2QyjT').first().click({force: true})
  //           cy.wait(2000)
  //           cy.get('.ant-tabs').should('exist');
  //           cy.wait(2000)
  //           cy.get(':nth-child(1) > .ant-row > .ant-col-18').contains('Менеджерський доступ');
  //       })
  // });

  // it('Відкриття сторінки Деталі в Роботі', function(){
  //   cy.get('.styles-m__logo---2zDPJ').click()
  //   cy.get(':nth-child(5) > a').first().click({force: true})
  //     .then(()=>{
  //       cy.get('.styles-m__minimized---2nM6M > .ant-btn').click() // фільтр дата
  //       cy.wait(2000)
  //       cy.get('.styles-m__filterDateButtons---QBBQy > :nth-child(5)').click() // фільтр Рік
  //       cy.wait(5000)
  //       cy.get('.ant-dropdown-menu > :nth-child(1) > span').first().click({force: true}) // Фільтри поточний рік
  //       cy.get('.styles-m__headerContorls---2pU_V > .ant-radio-group > :nth-child(2)').click()
  //       cy.get('.anticon-sort-ascending').first().click({force: true})
  //       cy.wait(2000)
  //       cy.get('.ant-dropdown-menu > :nth-child(2) > div').first().click({force: true})
  //       cy.wait(2000)
  //       cy.get('.ant-tabs-tabpane-active > .ant-table-wrapper').should('exist');
  //       cy.wait(2000)
  //       cy.get('.anticon-sort-ascending').click() //Сортування за постачальником
  //       cy.get('.ant-dropdown-menu > :nth-child(2) > div > span').click({force: true})
  //       cy.get('[data-row-key] > :nth-child(2)').should('exist');
  //     })
  // });

})