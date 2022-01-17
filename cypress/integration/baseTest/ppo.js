/// <reference types="cypress" />
import PPO from '../../support/pageObject/ppo';

const ppoPage = new PPO();
const baseUrl = 'https://'+Cypress.env('url')+'my.carbook.pro';

describe ('PPO|Kasur|UA|Desktop|', function(){
  beforeEach('User LogIn ', function(){
    cy.login(baseUrl, Cypress.env('Kasur'), Cypress.env('pw'))
    cy.get('img').eq(0).click({ force: true })
  });

  it('0. Відкриття каси РРО', function(){
    cy.visit(baseUrl+'/cash/bank')  
    ppoPage.openCashPPO()
  })

  it('1. Перевірка відкритої каси РРО', function(){
    cy.visit(baseUrl+'/report/cash_orders_logs')  
    ppoPage.checkOpenCashPPO()
  })

  it('2. Створення НЗ', function(){
    cy.visit(baseUrl+'/orders/appointments')
    cy.get('h1').should('have.text','Нові')
    cy.get('.ant-btn').last().click({ force: true })
  })

  it('3. Заповнення картки по НЗ', function(){
    cy.visit(baseUrl+'/add')
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
    cy.visit(baseUrl+'/orders/appointments')
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
    cy.visit(baseUrl+'/orders/appointments')
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
    cy.visit(baseUrl+'/orders/success') 
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
    cy.visit(baseUrl+'/report/cash_orders_logs')  
    const type = 'Z_SALE'
    ppoPage.checkAvansListPPO(type)
  })

  it('6. Повна оплата НЗ ч/з ордер (іконка долара)', function(){
    cy.visit(baseUrl+'/orders/success')  
    cy.get('tr > td > a').first().click({ force: true }) // Open NZ first in list
    cy.get('.anticon-dollar').last().click() // повна оплата суми 
    cy.wait(2000)
    cy.get('.ant-modal-body > .ant-tabs').find('.ant-select').contains('Каса').click({ force: true }) // вибір select каси
    cy.get('.ant-modal-body > .ant-tabs').find('.ant-col').contains('ГотівкаРРО372').click({ force: true }) // каса ГотівкаРРО372
    cy.wait(2000)
    cy.get('.ant-modal-footer').find('button').contains('Додати').first().click({ force: true }) //9***************
    cy.wait(3000)
  })

 it('7.1 Перевірка Залишку 0 після повної оплати', function(){
  cy.visit(baseUrl+'/orders/success')   
    cy.get('tr > td > a').first().click({ force: true }) // Open NZ first in list
    cy.get('.styles-m__totalSum---uPrf- > span').should('have.text', '0'+' грн.')
    cy.wait(10000)
  })

  it('8. Корегуючий ч/з ордер (іконка долара)', function(){
    cy.visit(baseUrl+'/orders/success')   
    cy.get('tr > td > a').first().click({ force: true }) // Open NZ first in list
    cy.get('.anticon-dollar').last().click() // корегуючий 100 грн 
    cy.get('.ant-modal-body > .ant-tabs').find('.ant-select').contains('Прихідний').click({ force: true }) // вибір типу ордера
    cy.get('.ant-modal-body > .ant-tabs').find('.ant-col').contains('Коригуючий витратний').click({ force: true }) // Коригуючий витратний
    cy.wait(2000)
    cy.get('.ant-modal-body > .ant-tabs').find('.ant-select').contains('Каса').click({ force: true }) // вибір select каси
    cy.get('.ant-modal-body > .ant-tabs').find('.ant-col').contains('ГотівкаРРО372').click({ force: true }) // каса ГотівкаРРО372
    cy.wait(2000)
    cy.get('.ant-modal-body > .ant-tabs').find('.ant-input-number-input').clear().type('100')
   
    cy.get('.ant-modal-footer').last().find('.ant-btn').click({ multiple: true }) //9***************
    cy.wait(3000)
  })

 it('8.1 Перевірка Залишку після корегуючої оплати 100', function(){
  cy.visit(baseUrl+'/orders/success')  
    cy.get('tr > td > a').first().click({ force: true }) // Open NZ first in list
    cy.get('.styles-m__totalSum---uPrf- > span').should('have.text', '100,00'+' грн.')
    cy.wait(10000)
  })

  it('10. Сервісне внесення', function(){
    cy.visit(baseUrl+'/cash/bank')  
    ppoPage.serviseInputCashPPO()
  })

  it('8.1. Перевірка Сервісного внесення в Журналі РРО', function(){
    const type = 'SERVICE_INPUT'
    cy.visit(baseUrl+'/report/cash_orders_logs')  
    ppoPage.checkServiseInputOutputCashPPO(type)
  })

  it('9. Сервісна видача', function(){
    cy.visit(baseUrl+'/cash/bank')  
    ppoPage.serviseOutputCashPPO()
  })

  it('9.1. Перевірка Сервісної видачі в Журналі РРО', function(){
    const type = 'SERVICE_OUTPUT'
    cy.visit(baseUrl+'/report/cash_orders_logs')  
    ppoPage.checkServiseInputOutputCashPPO(type)
  })

  it('10. Завантаження Х_REPORT для каси  РРО Готівка ', function(){
    cy.visit(baseUrl+'/cash/bank')  
    cy.get('tbody > tr').eq(8).find('button').eq(3).click({ force: true }) 
    cy.wait(3000)
  })

  it('10.1. Перевірка X_Звіту в Журналі РРО', function(){
    const type = 'X_REPORT'
    cy.visit(baseUrl+'/report/cash_orders_logs')  
    ppoPage.checkServiseInputOutputCashPPO(type)
  })

   it('10.2. Перевірка завантаження файлу по X_Звіту', function(){
    const nameFile ='x-report'
    const numberFile =''
    ppoPage.checkDownloadSale(nameFile,numberFile)
  })

  it('Створення документа / Продаж Клієнту OUT /',  function(){
    cy.visit(baseUrl+'/new-document') 
    cy.get(':nth-child(11) > .styles-m__folderLink---2Myrv').click({force: true})
    cy.get(':nth-child(1) > :nth-child(2) > .ant-select > .ant-select-selection').should('have.text','Продаж')
    cy.get('.ant-select > .ant-select-selection').eq(3).type('Vika')
    cy.wait(2000);
    cy.get('.ant-select-dropdown-menu-item').first().click({force: true})
    cy.wait(2000);
    cy.get('.ant-input').eq(3).clear().type('Коментарій Продаж Клієнту').should('have.text','Коментарій Продаж Клієнту')
    cy.get(':nth-child(3) > .ant-input').type('OUT'+'v8989')
    cy.get(':nth-child(3) > :nth-child(1) > .ant-select > .ant-select-selection').click()
    cy.wait(2000);
    cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
    cy.wait(2000);
    cy.get('.ant-badge > .anticon').last().click({force: true}) // дискетка 
    cy.wait(2000);
    cy.get('.styles-m__title---Nwr2X > :nth-child(1) > span').should('have.text','Нов.')
  })

  it('Додавання ЗЧ  / Продаж Клієнту OUT / ', function(){
    cy.visit(baseUrl+'/new-document') 
    cy.get(':nth-child(11) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
    cy.wait(2000)
    cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
    cy.wait(2000);
    cy.get('.styles-m__headerActions---2KdHm > :nth-child(2)').first().click({force: true})
    cy.wait(2000);
    cy.get('.ant-input').eq(0).should('have.text','')
    cy.get('.ant-modal-body').find('.ant-input').first().type('v8989') 
    cy.get('.ant-modal-body').find('.ant-input-number').first().type('111.11') 
    cy.get('.ant-modal-body').find('.ant-input').eq(2).click({force: true})           ///комірка
    cy.get('[data-row-key] > :nth-child(8) > .ant-btn').first().click({force: true}) ///комірка
    cy.wait(2000);
    cy.get('.ant-modal-body').find('.ant-input-number-input').eq(1).clear().type('1.22')
    cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true})
    cy.wait(2000);
  })

  it('Часткова Оплата / Продаж Клієнту OUT /',  function() {
    cy.visit(baseUrl+'/new-document') 
    cy.get(':nth-child(11) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
    cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
    cy.wait(2000);
    cy.get('div.ant-dropdown-trigger > span').click() /////////
    cy.wait(2000);
    cy.get('.ant-dropdown-menu-item').contains('Врах.').click()
    cy.wait(2000);
    cy.get(':nth-child(1) > .ant-radio > .ant-radio-inner').first().click({force: true})
    cy.wait(2000);
    cy.get('#cashBoxId > .ant-select-selection').click({ force: true });  // Вибір Каси
    cy.get('.ant-select-dropdown-menu  > :nth-child(9)').click({ force: true });  //////////////каса Готівка
    cy.get('.sc-bxivhb > .ant-checkbox > .ant-checkbox-inner').click({ force: true })
    cy.get('#paymentSum').clear().type(55)
    cy.get('.ant-modal-body').contains('Так').click({force: true})
    cy.wait(4000);
    cy.get('h1').contains('Врах.').should('exist')
    cy.wait(1000);
  })

  it('Перевірка поля сплаченого авансу /Продаж Клієнту OUT/',  function() {
    cy.visit(baseUrl+'/new-document') 
    cy.get('.styles-m__paper---3d-H1').children().eq(1).find(':nth-child(11) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
    cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
    cy.wait(2000);
    cy.get('nobr').eq(2).should('have.text','55,00 грн.')
    cy.get('.styles-m__header---2z2EP').find('.anticon-close').click()
  })

  it('Повна оплата / Продаж Клієнту OUT /',  function() {
    cy.visit(baseUrl+'/new-document') 
    cy.get(':nth-child(11) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
    cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
    cy.wait(2000);
    cy.get('div.ant-dropdown-trigger > span').click() /////////
    cy.wait(2000);
    cy.get('.ant-dropdown-menu-item').contains('Врах.').click()
    cy.wait(2000);
    cy.get(':nth-child(1) > .ant-radio > .ant-radio-inner').first().click({force: true})
    cy.wait(2000);
    cy.get('#cashBoxId > .ant-select-selection').click({ force: true });  // Вибір Каси
    cy.get('.ant-select-dropdown-menu  > :nth-child(9)').click({ force: true });  //////////////каса Готівка
    cy.get('.ant-modal-body').contains('Так').click({force: true})
    cy.wait(4000);
    cy.get('h1').contains('Врах.').should('exist')
    cy.wait(1000);
  })

  it('Перевірка нульового Залишка після повної оплати',  function() {
    cy.visit(baseUrl+'/new-document') 
    cy.get('.styles-m__paper---3d-H1').children().eq(1).find(':nth-child(11) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
    cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
    cy.wait(2000);
    cy.get('.styles-m__sumNumeral---KAUvr > span').should('have.text','0 грн.')
    cy.get('.styles-m__header---2z2EP').find('.anticon-close').click()
  })

  it('Повернення від Клієнта /Прихід Товару CRT/',  function(){
    cy.visit(baseUrl+'/new-document') 
    cy.get(':nth-child(13) > .styles-m__folderLink---2Myrv').click({force: true})
    cy.get(':nth-child(1) > :nth-child(2) > .ant-select > .ant-select-selection').should('have.text','Повернення від клієнта')
    cy.get('.ant-select > .ant-select-selection').eq(3).type('Vika')
    cy.wait(2000);
    cy.get('.ant-select-dropdown-menu-item').first().click({force: true})
    cy.wait(2000);
    cy.get('.ant-input').eq(3).clear().type('Коментарій Повернення від клієнта').should('have.text','Коментарій Повернення від клієнта')
    cy.get(':nth-child(3) > .ant-input').type('CRT'+'v8989')
    cy.get(':nth-child(3) > :nth-child(1) > .ant-select > .ant-select-selection').click()
    cy.wait(2000);
    cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true})
    cy.get('.ant-badge > .anticon').last().click({force: true}) // дискетка 
    cy.wait(2000);
    cy.get('.styles-m__title---Nwr2X > :nth-child(1) > span').should('have.text','Нов.')
})

it('Додавання ЗЧ /Прихід Товару CRT/',  function() {
    cy.visit(baseUrl+'/new-document') 
    cy.get(':nth-child(13) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
    cy.wait(2000)
    cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
    cy.wait(2000);
    cy.get('.styles-m__headerActions---2KdHm > :nth-child(2)').first().click({force: true})
    cy.wait(2000);
    cy.get('.ant-input').eq(0).should('have.text','')
    cy.get('.ant-modal-body').find('.ant-input').first().type('v8989') 
    cy.get('.ant-modal-body').find('.ant-input-number').first().type('111.11') 
    cy.get('.ant-modal-body').find('.ant-input-number-input').eq(1).clear().type('1.22')
    cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true})
    cy.wait(2000);
})

it('Перевід в статус враховано /Прихід Товару CRT /  ',  function() {
  cy.visit(baseUrl+'/new-document') 
  cy.get(':nth-child(13) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
  cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
  cy.wait(2000);
  cy.get('div.ant-dropdown-trigger > span').click() /////////
  cy.wait(2000);
  cy.get('.ant-dropdown-menu-item').contains('Врах.').click()
  cy.wait(2000);
  cy.get('.styles-m__title---Nwr2X').contains('Врах.').should('exist')
})

  it('Повна оплата /Прихід Товару CRT/',  function() {
    cy.visit(baseUrl+'/new-document') 
    cy.get(':nth-child(13) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
    cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
    cy.wait(2000);
    cy.get('div.ant-dropdown-trigger > span').click() /////////
    cy.wait(2000);
    cy.get('.ant-dropdown-menu-item').contains('Врах.').click()
    cy.wait(2000);
    cy.get(':nth-child(1) > .ant-radio > .ant-radio-inner').first().click({force: true})
    cy.wait(2000);
    cy.get('#cashBoxId > .ant-select-selection').click({ force: true });  // Вибір Каси
    cy.get('.ant-select-dropdown-menu  > :nth-child(9)').click({ force: true });  //////////////каса Готівка
    cy.get('.ant-modal-body').contains('Так').click({force: true})
    cy.wait(4000);
    cy.get('h1').contains('Врах.').should('exist')
    cy.wait(1000);
  })

  it('Перевірка нульового Залишка після повної оплати CRT',  function() {
    cy.visit(baseUrl+'/new-document') 
    cy.get('.styles-m__paper---3d-H1').children().eq(1).find(':nth-child(13) > .styles-m__buttonLink---1D7wr > .ant-btn').click({force: true})
    cy.get('[data-row-key] > :nth-child(1) > a').first().click({force: true})
    cy.wait(2000);
    cy.get('.styles-m__sumNumeral---KAUvr > span').should('have.text','0 грн.')
    cy.get('.styles-m__header---2z2EP').find('.anticon-close').click()
  })

//////////**********************Картка РРО********************** *





////////////закриття каси Z звіт

  it('. Закриття каси / Z_REPORT для каси РРО Готівка ', function(){
    cy.visit(baseUrl+'/cash/bank')  
    cy.get('tbody > tr').eq(8).find('button').eq(4).click({ force: true }) 
    cy.wait(3000)
  })

  it('.1. Перевірка Z_Звіту в Журналі РРО', function(){
    const type = 'Z_REPORT'
    cy.visit(baseUrl+'/report/cash_orders_logs')  
    ppoPage.checkServiseInputOutputCashPPO(type)
  })

   it('.1. Перевірка завантаження файлу по Z_Звіту', function(){
    const nameFile ='z-report'
    const numberFile =''
    ppoPage.checkDownloadSale(nameFile,numberFile)
  })

})