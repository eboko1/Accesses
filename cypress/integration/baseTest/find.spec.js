/// <reference types="cypress" />
import ProfilePage from '../../support/pageObject/profilePage';
import BaseStorage from '../../support/pageObject/storage/baseStorage';

const profilePage = new ProfilePage();
const baseStorage = new BaseStorage();

  describe ('Find|Master|UA|Desktop|', function(){
      const login = (email, password) =>{
        cy.session([email, password], () => { 
          cy.visit('/')
          cy.get('#loginForm_login').type(email)
          cy.get('#loginForm_password').type(password)
          cy.get('button').click()
          cy.wait(7000)
          cy.getCookie('io')
        })
      }

      beforeEach('User Login ', function(){
        cy.viewport(1240,960) 
        login(Cypress.env('Kasur'), Cypress.env('pw'))
      })

      
      it('Профіль вибір українського інтерфейсу', function(){
        cy.visit('/')
        cy.get('img').eq(0).click({force: true}) //menu
        profilePage.selectUA()
      })
    
      it('Пошук по імені Клієнта', function(){
        cy.visit('/')
        cy.contains('Довідник').click({force: true})
        cy.contains('Клієнти').click({force: true})
        cy.get('h1').should('have.text','Клієнти')
        cy.wait(3000)
        cy.get('tr > td > a').first().invoke('text')
          .then (text => {var clientName = text;
            cy.get('.ant-select-selection-search').first().type(clientName)
            cy.wait(2000)
            cy.get('.ant-select-item').contains('Клієнт').click({force: true});
            cy.get('tr > td > a').first().should('have.text', clientName) 
        })
      })

      it('Пошук по мобільному номеру Клієнта', function(){
        cy.visit('/')
        cy.contains('Довідник').click({force: true})
        cy.contains('Клієнти').click({force: true})
        cy.get('h1').should('have.text','Клієнти')
        cy.wait(3000)
        cy.get('tr > td > a').eq(1).invoke('text')
          .then (text => {var clientName = text;
            cy.get('.ant-select-selection-search').first().type(clientName)
            cy.wait(2000)
            cy.get('.ant-select-item').contains('Клієнт').click({force: true});
            cy.get('tr > td > a').eq(1).should('have.text',clientName) 
          })
      })

      it('Пошук за повною назвою НЗ', function(){
        cy.visit('/')
        cy.contains('Довідник').click({force: true})
        cy.contains('Ремонти').click({force: true})
        cy.get('h1').should('have.text','Нові')
        cy.wait(3000)
        cy.get('tr > td > a').eq(2).invoke('text')
          .then (text => {var clientName = text;
            cy.get('.ant-select-selection-search').first().type(clientName)
            cy.wait(2000)
            cy.get('.ant-select-item').contains('Новий').click({force: true});
            cy.get('tr > td > a').should('have.text', clientName) 
          })
      })

      it('Пошук по короткій назві НЗ', function(){
        cy.visit('/')
        cy.contains('Довідник').click({force: true})
        cy.contains('Ремонти').click({force: true})
        cy.get('h1').should('have.text','Нові')
        cy.wait(3000)
        cy.get('tr > td > a').eq(2).invoke('text')
          .then (text => {
          const shotNZ = text.split('-')
            cy.get('.ant-select-selection-search').first().type(shotNZ[shotNZ.length-1])
            cy.wait(2000)
            cy.get('.ant-select-item').contains('Новий').click();
            cy.get('tr > td > a').should('have.text',text) 
          })
      })

      it('Пошук по VIN а/м ', function(){
        cy.visit('/')
        cy.contains('Довідник').click({force: true})
        cy.contains('Автомобілі').click({force: true})
        cy.get('h1').should('have.text','Автомобілі')
        cy.wait(3000)
        cy.get('tr > td').eq(3).invoke('text')
          .then (text => {
            cy.get('.ant-select-selection-search').first().type(text)
            cy.wait(2000)
            cy.get('.ant-select-item').contains('Автомобілі').click();
            cy.get('.ant-table-row > :nth-child(4)').should('have.text',text) 
          })
      })

      it('Пошук по Державному Номеру а/м ', function(){
        cy.visit('/')
        cy.contains('Довідник').click({force: true})
        cy.contains('Автомобілі').click({force: true})
        cy.get('h1').should('have.text','Автомобілі')
        cy.wait(3000)
        cy.get('tr > td').eq(2).invoke('text')
          .then (text => {
            cy.get('.ant-select-selection-search').first().type(text)
            cy.wait(2000)
            cy.get('.ant-select-item').contains('Автомобілі').click();
            cy.wait(2000)
            cy.get('.ant-table-row > :nth-child(3)').should('have.text',text) 
        })
      })

      it('Пошук по коду Товара ', function(){
        cy.visit('/')
        cy.contains('Довідник').click({force: true})
        cy.contains('Товари').click({force: true})
        cy.get('h1').should('have.text','Товари')
        cy.wait(3000)
        cy.get('[data-row-key] > :nth-child(1) > :nth-child(1) > a > div').first().invoke('text')
          .then (text => {
            cy.get('.ant-select-selection-search').first().type(text)
            cy.wait(2000)
            cy.get('.ant-select-item').contains('Товари').click();
            cy.get('[data-row-key] > :nth-child(1) > :nth-child(1) > a > div').first().should('have.text',text) 
        })
      })

      it('Пошук по назві Товара ', function(){
        cy.visit('/')
        cy.contains('Довідник').click({force: true})
        cy.contains('Товари').click({force: true})
        cy.get('h1').should('have.text','Товари')
        cy.wait(3000)
        cy.get('[data-row-key] > :nth-child(1) > :nth-child(1) > :nth-child(2)').eq(2).invoke('text')
        .then (text => {
          const nameProduct = text.split(' ')
          cy.get('.ant-select-selection-search').first().type(nameProduct[0])
          cy.wait(2000)
          cy.get('.ant-select-item').contains('Товари').click();
          cy.get('[data-row-key] > :nth-child(1) > :nth-child(1) > :nth-child(2)').first().should('have.text',text) 
        })
      })

      it('Пошук по короткій назві / Замовлення постачальнику / ORD' , function(){
        cy.visit('/')
        baseStorage.openDocsBtn(7)
        cy.get('tr > td > a').eq(2).invoke('text')
        .then (text => {
          const nameDoc = text.split('-')
          cy.get('.ant-select-selection-search').first().type(nameDoc[nameDoc.length-1])
          cy.wait(2000)
          cy.get('.ant-select-item').contains('Замовлення постачальнику').click();
          cy.wait(2000)
          cy.get('tr > td > a').first().should('have.text',text) 
          cy.get('.ant-table-row > :nth-child(5)').first().contains('Замовлення постачальнику')
        })  
      })

      it('Пошук за повною назвою / Прихід за замовленням / COM' , function(){
        cy.visit('/')
        baseStorage.openDocsBtn(8)
        cy.get('tr > td > a').eq(2).invoke('text')
          .then (text => {
            cy.get('.ant-select-selection-search').first().type(text)
            cy.wait(2000)
            cy.get('.ant-select-item').contains('Замовлення постачальнику').click();
            cy.wait(2000)
            cy.get('tr > td > a').first().should('have.text',text) 
            cy.get('.ant-table-row > :nth-child(5)').first().contains('Прихід за замовленням')
          }) 
      })

      it('Пошук по короткій назві / Коригування замовлення / BOR' , function(){
        cy.visit('/')
        baseStorage.openDocsBtn(9)
        cy.get('tr > td > a').eq(2).invoke('text')
          .then (text => {
            const nameDoc = text.split('-')
            cy.get('.ant-select-selection-search').first().type(nameDoc[nameDoc.length-1])
            cy.wait(2000)
            cy.get('.ant-select-item').contains('Замовлення постачальнику').click();
            cy.wait(2000)
            cy.get('tr > td > a').first().should('have.text',text) 
            cy.get('.ant-table-row > :nth-child(5)').first().contains('Коригування замовлення')
          })
      })

      it('Пошук за повною назвою / Прихід Товару / INC' , function(){
        cy.visit('/')
        baseStorage.openDocsBtn(10);
        cy.get('tr > td > a').eq(2).invoke('text')
          .then (text => {
            cy.get('.ant-select-selection-search').first().type(text)
            cy.wait(2000)
            cy.get('.ant-select-item').contains('Приходи на склад').click();
            cy.wait(2000)
            cy.get('tr > td > a').first().should('have.text',text) 
            cy.get('.ant-table-row > :nth-child(7)').first().contains('Прихід від постачальника')
          })
      })

      it('Пошук по короткій назві / Повернення постачальнику / SRT' , function(){
        cy.visit('/')
        baseStorage.openDocsBtn(12);
        cy.get('tr > td > a').eq(2).invoke('text')
          .then (text => {
            const nameDoc = text.split('-')
            cy.get('.ant-select-selection-search').first().type(nameDoc[nameDoc.length-1])
            cy.wait(2000)
            cy.get('.ant-select-item').contains('Витрати зі складу').click();
            cy.wait(2000)
            cy.get('tr > td > a').first().should('have.text',text) 
            cy.get('.ant-table-row > :nth-child(7)').first().contains('Повернення постачальнику')
          })
      })

      it('Пошук за повною назвою / Послуги / SRV' , function(){
        cy.visit('/')
        baseStorage.openDocsBtn(11);
        cy.get('tr > td > a').eq(2).invoke('text')
          .then (text => {
            cy.get('.ant-select-selection-search').first().type(text)
            cy.wait(2000)
            cy.get('.ant-select-item').contains('Приходи на склад').click();
            cy.get('tr > td > a').first().should('have.text',text) 
            cy.get('.ant-table-row > :nth-child(7)').first().contains('Послуги')
        })
      })

      it('Пошук по короткій назві / Витрати товару / OUT' , function(){
        cy.visit('/')
        baseStorage.openDocsBtn(15);
        cy.get('tr > td > a').eq(2).invoke('text')
          .then (text => {
            const nameDoc = text.split('-')
            cy.get('.ant-select-selection-search').first().type(nameDoc[nameDoc.length-1])
            cy.wait(2000)
            cy.get('.ant-select-item').contains('Витрати зі складу').click();
            cy.get('tr > td > a').first().should('have.text',text) 
            cy.get('.ant-table-row > :nth-child(7)').first().contains('Продаж') // тип документа в таблиці
          })
      })

      it('Пошук за повною назвою / Витрати з НЗ / AUT' , function(){
        cy.visit('/')
        baseStorage.openDocsBtn(16);
        cy.get('tr > td > a').eq(2).invoke('text')
        .then (text => {
          cy.get('.ant-select-selection-search').first().type(text)
          cy.wait(2000)
          cy.get('.ant-select-item').contains('Витрати зі складу').click();
          cy.get('tr > td > a').first().should('have.text',text) 
          cy.get('.ant-table-row > :nth-child(7)').first().contains('Продаж')
        })
      })

      it('Пошук по короткій назві / Витрати з НЗ / AUT' , function(){
        cy.visit('/')
        baseStorage.openDocsBtn(16);
        cy.get('tr > td > a').eq(2).invoke('text')
        .then (text => {
          const nameDoc = text.split('-')
          cy.get('.ant-select-selection-search').first().type(nameDoc[nameDoc.length-1])
          cy.wait(2000)
          cy.get('.ant-select-item').contains('Витрати зі складу').click();
          cy.get('tr > td > a').first().should('have.text',text) 
          cy.get('.ant-table-row > :nth-child(7)').first().contains('Продаж')
        })
      })

      it('Пошук по короткій назві / Повернення від клієнта / CRT ' , function(){
        cy.visit('/')
        baseStorage.openDocsBtn(17);
        cy.get('tr > td > a').eq(2).invoke('text')
        .then (text => {
          const nameDoc = text.split('-')
          cy.get('.ant-select-selection-search').first().type(nameDoc[nameDoc.length-1])
          cy.wait(2000)
          cy.get('.ant-select-item').contains('Приходи на склад').click();
          cy.get('tr > td > a').first().should('have.text',text) 
          cy.get('.ant-table-row > :nth-child(7)').first().contains('Повернення від клієнта')
        })   
      })
  })