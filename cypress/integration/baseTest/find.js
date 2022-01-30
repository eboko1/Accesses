/// <reference types="cypress" />
import ProfilePage from '../../support/pageObject/profilePage';

const profilePage = new ProfilePage();
const baseUrl = 'https://'+Cypress.env('url')+'my.carbook.pro';

describe ('Find|Master|UA|Desktop|', function(){
  beforeEach('User Login ', function(){
    cy.login(baseUrl, Cypress.env('LoginMaster'), Cypress.env('pw'))
      .then(()=>{
        cy.url().should('contain', '/dashboard')
        cy.get('img').eq(0).click({force: true}) //menu
      })
  });

  afterEach(() => {
    cy.logout(baseUrl)
  })
  
  it('Профіль вибір українського інтерфейсу', function(){
    cy.visit(baseUrl+'/profile')
    profilePage.selectUA()
  })
 
  it('Пошук по імені Клієнта', function(){
    cy.contains('Довідник').click({force: true})
    cy.contains('Клієнти').click({force: true})
    cy.get('.styles-m__title---Nwr2X').should('have.text','Клієнти')
    cy.wait(6000)
    cy.get('[data-row-key] > :nth-child(2) > .styles-m__clientLink---1JZdU').eq(2).invoke('text')
      .then (text => {var clientName = text;
      cy.get('.ant-select-search__field > .ant-input').type(clientName)
      cy.get('.ant-select-dropdown-menu').contains('Клієнт').click();
      cy.get('.styles-m__clientLink---1JZdU').should('have.text',clientName) 
    })
  })

  it('Пошук по мобільному номеру Клієнта', function(){
    cy.contains('Довідник').click({force: true})
    cy.contains('Клієнти').click({force: true})
    cy.get('.styles-m__title---Nwr2X').should('have.text','Клієнти')
    cy.wait(5000)
    cy.get('[data-row-key] > :nth-child(4) > .styles-m__clientPhone---2q-uc').eq(3).invoke('text')
      .then (text => {var clientName = text;
        cy.get('.ant-select-search__field > .ant-input').type(clientName)
        cy.get('.ant-select-dropdown-menu').contains('Клієнт').click();
        cy.get('[data-row-key] > :nth-child(4) > .styles-m__clientPhone---2q-uc').first().should('have.text',clientName) 
      })
  })

  it('Пошук за повною назвою НЗ', function(){
    cy.contains('Довідник').click({force: true})
    cy.contains('Ремонти').click({force: true})
    cy.get('.styles-m__title---Nwr2X').should('have.text','Нові')
    cy.wait(5000)
    cy.get('[data-row-key] > :nth-child(2) > .styles-m__ordernLink---T-qWz').eq(2).invoke('text')
      .then (text => {var clientName = text;
        cy.get('.ant-select-search__field > .ant-input').type(clientName)
        cy.get('.ant-select-dropdown-menu').contains('Новий').click();
        cy.get('[data-row-key] > :nth-child(2) > .styles-m__ordernLink---T-qWz').should('have.text',clientName) 
      })
  })

  it('Пошук по короткій назві НЗ', function(){
    cy.contains('Довідник').click({force: true})
    cy.contains('Ремонти').click({force: true})
    cy.get('.styles-m__title---Nwr2X').should('have.text','Нові')
    cy.wait(5000)
    cy.get('[data-row-key] > :nth-child(2) > .styles-m__ordernLink---T-qWz').eq(2).invoke('text')
      .then (text => {
      const shotNZ = text.split('-')
        cy.get('.ant-select-search__field > .ant-input').type(shotNZ[shotNZ.length-1])
        cy.get('.ant-select-dropdown-menu').contains('Новий').click();
        cy.get('[data-row-key] > :nth-child(2) > .styles-m__ordernLink---T-qWz').should('have.text',text) 
      })
  })

  it('Пошук по VIN а/м ', function(){
    cy.contains('Довідник').click({force: true})
    cy.contains('Автомобілі').click({force: true})
    cy.get('.styles-m__title---Nwr2X').should('have.text','Автомобілі')
    cy.wait(5000)
    cy.get('[data-row-key] > :nth-child(4)').eq(2).invoke('text')
    .then (text => {
      cy.get('.ant-select-search__field > .ant-input').type(text)
      cy.get('.ant-select-dropdown-menu').contains('Автомобілі').click();
      cy.get('[data-row-key] > :nth-child(4)').should('have.text',text) 
    })
  })

  it('Пошук по Державному Номеру а/м ', function(){
    cy.contains('Довідник').click({force: true})
    cy.contains('Автомобілі').click({force: true})
    cy.get('.styles-m__title---Nwr2X').should('have.text','Автомобілі')
    cy.wait(5000)
    cy.get('[data-row-key] > [style="text-align: center;"]').eq(2).invoke('text')
    .then (text => {
      cy.get('.ant-select-search__field > .ant-input').type(text)
      cy.get('.ant-select-dropdown-menu').contains('Автомобілі').click();
      cy.get('[data-row-key] > [style="text-align: center;"]').should('have.text',text) 
    })
  })

  it('Пошук по коду Товара ', function(){
    cy.contains('Довідник').click({force: true})
    cy.contains('Товари').click({force: true})
    cy.get('.styles-m__title---Nwr2X').should('have.text','Товари')
    cy.wait(5000)
    cy.get('[data-row-key] > :nth-child(1) > :nth-child(1) > a').eq(2).invoke('text')
    .then (text => {
      cy.get('.ant-select-search__field > .ant-input').type(text)
      cy.get('.ant-select-dropdown-menu').contains('Товари').click();
      cy.get('[data-row-key] > :nth-child(1) > :nth-child(1) > a').should('have.text',text) 
    })
  })

  it('Пошук по назві Товара ', function(){
    cy.contains('Довідник').click({force: true})
    cy.contains('Товари').click({force: true})
    cy.get('.styles-m__title---Nwr2X').should('have.text','Товари')
    cy.wait(5000)
    cy.get('[data-row-key] > :nth-child(1) > :nth-child(1) > :nth-child(2)').eq(2).invoke('text')
    .then (text => {
      const nameProduct = text.split(' ')
      cy.get('.ant-select-search__field > .ant-input').type(nameProduct[0])
      cy.get('.ant-select-dropdown-menu').contains('Товари').click();
      cy.get('[data-row-key] > :nth-child(1) > :nth-child(1) > :nth-child(2)').first().should('have.text',text) 
    })
  })

  it('Пошук по короткій назві / Замовлення постачальнику / ORD' , function(){
    const typeDoc ='Замовлення постачальнику'
    cy.contains('Швидка навігація').click({force: true})
    cy.get('.styles-m__title---Nwr2X').should('have.text','Швидка навігація')
    cy.wait(5000)
    cy.get('.styles-m__paper---3d-H1 > :nth-child(2)').contains(typeDoc).click({force: true})
    
    cy.get('[data-row-key] > :nth-child(1) > a').eq(2).invoke('text')
    .then (text => {
      const nameDoc = text.split('-')
      cy.get('.ant-select-search__field > .ant-input').type(nameDoc[nameDoc.length-1])
      cy.get('.ant-select-dropdown-menu').contains(typeDoc).click();
      cy.get('[data-row-key] > :nth-child(1) > a').first().should('have.text',text) 
      cy.get('.ant-table-row > :nth-child(5)').first().contains(typeDoc)
    })  
  })

  it('Пошук за повною назвою / Прихід за замовленням / COM' , function(){
    const typeDoc ='Прихід за замовленням'
    cy.contains('Швидка навігація').click({force: true})
    cy.get('.styles-m__title---Nwr2X').should('have.text','Швидка навігація')
    cy.wait(5000)
    cy.get('.styles-m__paper---3d-H1 > :nth-child(2)').contains(typeDoc).click({force: true})
    
    cy.get('[data-row-key] > :nth-child(1) > a').eq(2).invoke('text')
    .then (text => {
      cy.get('.ant-select-search__field > .ant-input').type(text)
      cy.get('.ant-select-dropdown-menu').contains('Замовлення постачальнику').click();
      cy.get('[data-row-key] > :nth-child(1) > a').first().should('have.text',text) 
      cy.get('.ant-table-row > :nth-child(5)').first().contains(typeDoc)
    }) 
  })

  it('Пошук по короткій назві / Коригування замовлення / BOR' , function(){
    const typeDoc ='Коригування замовлення'
    cy.contains('Швидка навігація').click({force: true})
    cy.get('.styles-m__title---Nwr2X').should('have.text','Швидка навігація')
    cy.wait(2000)
    cy.get('.styles-m__paper---3d-H1 > :nth-child(2)').contains(typeDoc).click({force: true})
    
    cy.get('[data-row-key] > :nth-child(1) > a').eq(2).invoke('text')
    .then (text => {
      const nameDoc = text.split('-')
      cy.get('.ant-select-search__field > .ant-input').type(nameDoc[nameDoc.length-1])
      cy.get('.ant-select-dropdown-menu').contains('Замовлення постачальнику').click();
      cy.get('[data-row-key] > :nth-child(1) > a').first().should('have.text',text) 
      cy.get('.ant-table-row > :nth-child(5)').first().contains(typeDoc)
    })
  })

  it('Пошук за повною назвою / Прихід Товару / INC' , function(){
    const typeDoc ='Прихід товару'
    cy.contains('Швидка навігація').click({force: true})
    cy.get('.styles-m__title---Nwr2X').should('have.text','Швидка навігація')
    cy.wait(2000)
    cy.get('.styles-m__paper---3d-H1 > :nth-child(2)').contains(typeDoc).click({force: true})
    
    cy.get('[data-row-key] > :nth-child(1) > a').eq(2).invoke('text')
    .then (text => {
      cy.get('.ant-select-search__field > .ant-input').type(text)
      cy.get('.ant-select-dropdown-menu').contains('Приходи на склад').click();
      cy.get('[data-row-key] > :nth-child(1) > a').first().should('have.text',text) 
      cy.get('.ant-table-row > :nth-child(7)').first().contains('Прихід від постачальника')
    })
  })

  it('Пошук по короткій назві / Повернення постачальнику / SRT' , function(){
    const typeDoc ='Повернення постачальнику'
    cy.contains('Швидка навігація').click({force: true})
    cy.get('.styles-m__title---Nwr2X').should('have.text','Швидка навігація')
    cy.wait(2000)
    cy.get('.styles-m__paper---3d-H1 > :nth-child(2)').contains(typeDoc).click({force: true})
    
    cy.get('[data-row-key] > :nth-child(1) > a').eq(2).invoke('text')
    .then (text => {
      const nameDoc = text.split('-')
      cy.get('.ant-select-search__field > .ant-input').type(nameDoc[nameDoc.length-1])
      cy.get('.ant-select-dropdown-menu').contains('Витрати зі складу').click();
      cy.get('[data-row-key] > :nth-child(1) > a').first().should('have.text',text) 
      cy.get('.ant-table-row > :nth-child(7)').first().contains(typeDoc)
    })
  })

  it('Пошук за повною назвою / Послуги / SRV' , function(){
    const typeDoc ='Послуги'
    cy.contains('Швидка навігація').click({force: true})
    cy.get('.styles-m__title---Nwr2X').should('have.text','Швидка навігація')
    cy.wait(2000)
    cy.get('.styles-m__paper---3d-H1 > :nth-child(2)').contains(typeDoc).click({force: true})
    
    cy.get('[data-row-key] > :nth-child(1) > a').eq(2).invoke('text')
      .then (text => {
        cy.get('.ant-select-search__field > .ant-input').type(text)
        cy.get('.ant-select-dropdown-menu').contains('Приходи на склад').click();
        cy.get('[data-row-key] > :nth-child(1) > a').first().should('have.text',text) 
        cy.get('.ant-table-row > :nth-child(7)').first().contains(typeDoc)
    })
  })

  it('Пошук по короткій назві / Витрати товару / OUT' , function(){
    const typeDoc ='Витрати товару'
    cy.contains('Швидка навігація').click({force: true})
    cy.get('.styles-m__title---Nwr2X').should('have.text','Швидка навігація')
    cy.wait(2000)
    cy.get('.styles-m__paper---3d-H1 > :nth-child(2)').contains(typeDoc).click({force: true})
    
    cy.get('[data-row-key] > :nth-child(1) > a').eq(2).invoke('text')
    .then (text => {
      const nameDoc = text.split('-')
      cy.get('.ant-select-search__field > .ant-input').type(nameDoc[nameDoc.length-1])
      cy.get('.ant-select-dropdown-menu').contains('Витрати зі складу').click();
      cy.get('[data-row-key] > :nth-child(1) > a').first().should('have.text',text) 
      cy.get('.ant-table-row > :nth-child(7)').first().contains('Продаж')
    })
  })

  it('Пошук за повною назвою / Витрати із н/з / AUT' , function(){
    const typeDoc ='Витрати із н/з'
    cy.contains('Швидка навігація').click({force: true})
    cy.get('.styles-m__title---Nwr2X').should('have.text','Швидка навігація')
    cy.wait(2000)
    cy.get('.styles-m__paper---3d-H1 > :nth-child(2)').contains(typeDoc).click({force: true})
    
    cy.get('[data-row-key] > :nth-child(1) > a').eq(2).invoke('text')
    .then (text => {
      cy.get('.ant-select-search__field > .ant-input').type(text)
      cy.get('.ant-select-dropdown-menu').contains('Витрати зі складу').click();
      cy.get('[data-row-key] > :nth-child(1) > a').first().should('have.text',text) 
      cy.get('.ant-table-row > :nth-child(7)').first().contains('Продаж')
    })
  })

  it('Пошук по короткій назві / Витрати із н/з / AUT' , function(){
    const typeDoc ='Витрати із н/з'
    cy.contains('Швидка навігація').click({force: true})
    cy.get('.styles-m__title---Nwr2X').should('have.text','Швидка навігація')
    cy.wait(2000)
    cy.get('.styles-m__paper---3d-H1 > :nth-child(2)').contains(typeDoc).click({force: true})
    
    cy.get('[data-row-key] > :nth-child(1) > a').eq(2).invoke('text')
    .then (text => {
      const nameDoc = text.split('-')
      cy.get('.ant-select-search__field > .ant-input').type(nameDoc[nameDoc.length-1])
      cy.get('.ant-select-dropdown-menu').contains('Витрати зі складу').click();
      cy.get('[data-row-key] > :nth-child(1) > a').first().should('have.text',text) 
      cy.get('.ant-table-row > :nth-child(7)').first().contains('Продаж')
    })
  })

  it('Пошук по короткій назві / Повернення від клієнта / CRT ' , function(){
    const typeDoc ='Повернення від клієнта'
    cy.contains('Швидка навігація').click({force: true})
    cy.get('.styles-m__title---Nwr2X').should('have.text','Швидка навігація')
    cy.wait(2000)
    cy.get('.styles-m__paper---3d-H1 > :nth-child(2)').contains(typeDoc).click({force: true})
    
    cy.get('[data-row-key] > :nth-child(1) > a').eq(2).invoke('text')
    .then (text => {
      const nameDoc = text.split('-')
      cy.get('.ant-select-search__field > .ant-input').type(nameDoc[nameDoc.length-1])
      cy.get('.ant-select-dropdown-menu').contains('Приходи на склад').click();
      cy.get('[data-row-key] > :nth-child(1) > a').first().should('have.text',text) 
      cy.get('.ant-table-row > :nth-child(7)').first().contains(typeDoc)
    })   
  })
})