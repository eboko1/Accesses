/// <reference types="cypress" />
import LoginPage from '../../support/pageObject/loginPage';
import OrderPage from '../../support/pageObject/orderPage';
import ProfilePage from '../../support/pageObject/profilePage';
import PPO from '../../support/pageObject/ppo';

const loginPage = new LoginPage();
const orderPage = new OrderPage();
const profilePage = new ProfilePage();
const ppoPage = new PPO();

const username = Cypress.env('Kasur')
const password = Cypress.env('pw')

const baseUrl = 'https://'+Cypress.env('url')+'my.carbook.pro';
const appointments = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/appointments';
const success = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/success';

const addNZ = 'https://'+Cypress.env('url')+'my.carbook.pro/add';
const listPPO = 'https://'+Cypress.env('url')+'my.carbook.pro/report/cash_orders_logs';
const cashBank = 'https://'+Cypress.env('url')+'my.carbook.pro/cash/bank';


describe ('PPO|Kasur|UA|Desktop|', function(){
  beforeEach('User LogIn ', function(){
    cy.visit(baseUrl)
    loginPage.enterLogin(username,password)
  });

  it('0. Відкриття каси РРО', function(){
    cy.visit(cashBank)  
    ppoPage.openCashPPO()
  })

  it('1. Перевірка відкритої каси РРО', function(){
    cy.visit(listPPO)  
    ppoPage.checkOpenCashPPO()
  })

  it('2. Створення НЗ', function(){
    cy.visit(appointments)
    cy.get('h1').should('have.text','Нові')
    cy.get('.ant-btn').last().click()
  })

  it('3. Заповнення картки по НЗ', function(){
    cy.visit(addNZ)
    cy.get('h1').should('have.text','Додати Ремонт')
    cy.get('#searchClientQuery').type('Vika')
    cy.wait(2000)
    cy.get('tr').eq(1).click()
    cy.get('input').eq(5).click()
    cy.get('.ant-calendar-date').eq(10).click()
    cy.get('input').eq(6).click()
    cy.get('.ant-time-picker-panel-select-option-selected').eq(0).click({ force: true });
    cy.get('.ant-btn').click()
  })

  it('4. Додавання роботи в НЗ', function(){
    cy.visit(appointments) 
    cy.wait(5000)  
    cy.get('tr > td > a')
      .first()
      .click({ force: true }) // Open NZ first in list
    cy.wait(5000)  
    cy.get('.ant-tabs-nav').contains('Роботи').click({ force: true }) // табка Роботи в НЗ
    cy.get('button[title="Додати"]').first().click({ force: true }) // Іконка Додати Роботу
    cy.wait(1000)  
    cy.get('.ant-select-selection').contains('Робота').type('Заміна')
    cy.get('.ant-select-dropdown-menu-item').first().click({force: true});
    cy.get('.ant-modal-footer > div > .ant-btn-primary').contains('Гаразд').click({force: true})
    cy.wait(2000)
  })

  it('5. Часткова оплата ч/з статус Завершено в НЗ', function(){
    cy.visit(appointments)  
    cy.get('tr > td > a')
      .first()
      .click({ force: true }) // Open NZ first in list
    cy.get('.ant-dropdown-trigger').contains('Перевести у статус').click({ force: true })    
    cy.get('.ant-dropdown-menu').contains('Завершено').click({ force: true }); 
    cy.wait(3000);
    cy.get('#withPayment > :nth-child(1)').click({ force: true})
    cy.get('#cashBoxId').click({ force: true });  // Вибір Каси
    cy.get('.ant-select-dropdown-menu  > :nth-child(9)').click({ force: true });// .contains('ГотівкаРРО372')   на dev інша 6
    cy.get('#partialPayment').click({ force: true})                        
    cy.get('#paymentSum').clear().type('100')       // часткова сума 100
    cy.get('.styles-m__submit---2hKgG > .ant-btn-primary').click();
    cy.wait(5000);
    cy.get('.styles-m__title---Nwr2X').contains('Виконано')
    cy.wait(1000)
  })

  it('5.1. Перевірка в НЗ поле Сплачено', function(){
    cy.visit(success)  
    cy.get('tr > td > a')
      .first()
      .click({ force: true }) // Open NZ first in list
      cy.get('.styles-m__sumNumeral---2mcVC').last().should('have.text','100,00'+' грн.')
  })

  it('5.2. Перевірка завантаженого чека (аванс)', function(){
    const nameFile = 'sale'
    const numberFile =''
    ppoPage.checkDownloadSale(nameFile, numberFile)
  })

  it('5.3. Перевірка Авансової оплати в Журналі РРО', function(){
    const type = 'Z_SALE'
    cy.visit(listPPO)  
    ppoPage.checkAvansListPPO(type)
  })

  // it('6. Повна оплата НЗ ч/з ордер (іконка долара)', function(){
  //   cy.visit(success)  
  //   cy.get('tr > td > a').first().click({ force: true }) // Open NZ first in list
  //   cy.get('.anticon-dollar').last().click() // повна оплата суми 
  //   cy.wait(2000)
  //   cy.get('.ant-modal-body > .ant-tabs').find('.ant-select').contains('Каса').click({ force: true }) // вибір select каси
  //   cy.get('.ant-modal-body > .ant-tabs').find('.ant-col').contains('ГотівкаРРО372').click({ force: true }) // каса ГотівкаРРО372
  //   cy.wait(2000)
  //   cy.get('.ant-modal-footer').find('button').contains('Додати').first().click({ force: true }) //9***************
  //   cy.wait(3000)
  // })

 it('7.1 Перевірка Залишку 0 після повної оплати', function(){
    cy.visit(success)  
    cy.get('tr > td > a').first().click({ force: true }) // Open NZ first in list
    cy.get('.styles-m__totalSum---uPrf- > span').should('have.text', '0'+' грн.')
    cy.wait(10000)
  })

  // it('8. Корегуючий ч/з ордер (іконка долара)', function(){
  //   cy.visit(success)  
  //   cy.get('tr > td > a').first().click({ force: true }) // Open NZ first in list
  //   cy.get('.anticon-dollar').last().click() // корегуючий 100 грн 
  //   cy.get('.ant-modal-body > .ant-tabs').find('.ant-select').contains('Прихідний').click({ force: true }) // вибір типу ордера
  //   cy.get('.ant-modal-body > .ant-tabs').find('.ant-col').contains('Коригуючий витратний').click({ force: true }) // Коригуючий витратний
  //   cy.wait(2000)
  //   cy.get('.ant-modal-body > .ant-tabs').find('.ant-select').contains('Каса').click({ force: true }) // вибір select каси
  //   cy.get('.ant-modal-body > .ant-tabs').find('.ant-col').contains('ГотівкаРРО372').click({ force: true }) // каса ГотівкаРРО372
  //   cy.wait(2000)
  //   cy.get('.ant-modal-body > .ant-tabs').find('.ant-input-number-input').clear().type('100')
   
  //   cy.get('.ant-modal-footer').last().find('.ant-btn').click({ multiple: true }) //9***************
  //   cy.wait(3000)
  // })

 it('8.1 Перевірка Залишку після корегуючої оплати 100', function(){
    cy.visit(success)  
    cy.get('tr > td > a').first().click({ force: true }) // Open NZ first in list
    cy.get('.styles-m__totalSum---uPrf- > span').should('have.text', '100,00'+' грн.')
    cy.wait(10000)
  })

it('10. Сервісне внесення', function(){
  cy.visit(cashBank)  
  ppoPage.serviseInputCashPPO()
})

  it('8.1. Перевірка Сервісного внесення в Журналі РРО', function(){
    const type = 'SERVICE_INPUT'
    cy.visit(listPPO)  
    ppoPage.checkServiseInputOutputCashPPO(type)
  })

  it('9. Сервісна видача', function(){
    cy.visit(cashBank)  
    ppoPage.serviseOutputCashPPO()
  })

  it('9.1. Перевірка Сервісної видачі в Журналі РРО', function(){
    const type = 'SERVICE_OUTPUT'
    cy.visit(listPPO)  
    ppoPage.checkServiseInputOutputCashPPO(type)
  })


  it('. Завантаження Х_REPORT для каси  РРО Готівка ', function(){
    cy.visit(cashBank)  
    cy.get('tbody > tr').eq(8).find('button').eq(3).click({ force: true }) 
    cy.wait(3000)
  })

  it('.1. Перевірка X_Звіту в Журналі РРО', function(){
    const type = 'X_REPORT'
    cy.visit(listPPO)  
    ppoPage.checkServiseInputOutputCashPPO(type)
  })

   it('.1. Перевірка завантаження файлу по X_Звіту', function(){
    const nameFile ='x-report'
    const numberFile =''
    ppoPage.checkDownloadSale(nameFile,numberFile)
  })

///////**********************Картка РРО********************** */



////****************** */

закриття каси Z звіт

  it('. Закриття каси / Z_REPORT для каси РРО Готівка ', function(){
    cy.visit(cashBank)  
    cy.get('tbody > tr').eq(8).find('button').eq(4).click({ force: true }) 
    cy.wait(3000)
  })

  it('.1. Перевірка Z_Звіту в Журналі РРО', function(){
    const type = 'Z_REPORT'
    cy.visit(listPPO)  
    ppoPage.checkServiseInputOutputCashPPO(type)
  })

   it('.1. Перевірка завантаження файлу по Z_Звіту', function(){
    const nameFile ='z-report'
    const numberFile =''
    ppoPage.checkDownloadSale(nameFile,numberFile)
  })

})