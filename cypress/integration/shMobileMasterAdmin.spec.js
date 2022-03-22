/// <reference types="cypress" />

const appointments = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/appointments';
const approve = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/approve';
const progress = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/progress';
const success = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/success';
const cancel = 'https://'+Cypress.env('url')+'my.carbook.pro/orders/cancel';


var date = new Date();
const idClient ='2117'
///const idClient =''+date.getDate()+date.getMonth()+date.getMinutes();
var second = parseInt(date.getSeconds())+10
var minute = parseInt(date.getMinutes())+10
var mehanic=''



describe ('Mobile|SH|Admin|UA', function(){ 
 
    const login = (email, password) =>{
        cy.session([email, password], () => { 
          cy.visit('/') 
          cy.get('#loginForm_login').type(email)
          cy.get('#loginForm_password').type(password)
          cy.get('button').click()
          cy.wait(7000)
          cy.getCookie('io')
          cy.get('.drawer-handle').click() // close menu
        })
    }
    
    beforeEach('User Login ', function(){
        cy.viewport('iphone-x')
        login(Cypress.env('LoginSH'), Cypress.env('pw'))  // test  super@admin.com
    })
    
    it('Календар Завантажень', function(){
        cy.visit('/') 
        cy.get('.withScroll').should('exist');
        cy.get('h1').should('have.text','Календар Завантаження');
    })

   it('Створення Клієнта ч/з планувальник + '+idClient, function(){
        cy.visit('/') 
        cy.get('[mode="calendar"]').find('.anticon-plus').first().click({ force: true })
        cy.wait(2000)
        cy.get('.ant-btn').eq(3).click({ force: true })
        cy.get('#name').type('V')
        cy.get('#surname').type('БазовийMobi'+idClient)
        cy.wait(2000)
        cy.get('.ant-input-number-input').type('683781977')
        
        cy.get('.ant-modal-confirm-btns > .ant-btn').first().click({ force: true }) //модалка цей номер вже існує
        
        cy.get('#comment').type('Коментар в Картці Клієнта')
        cy.get('#comment').should('have.text','Коментар в Картці Клієнта')
        
        cy.get('.ant-table-content').contains('Вiдсутнi Данi').should('exist')
        cy.wait(1000)/// cy.log('Додавання а/м')
        cy.get('.styles-m__addVehicleButtonCont---Y1h26 > .ant-btn').first().click({ force: true })
        cy.get('#vehicle_add_from_number').type(idClient)
        cy.get('#vehicle_add_from_vin').type('MDHFBUK13U0107589')
        cy.wait(1000)
        cy.get(':nth-child(3) > .ant-col-12').click().type('2011{enter}') // Рік авто
        cy.wait(1000)
        cy.get(':nth-child(4) > .ant-col-12').click().type('NISSAN{enter}') //Марка авто
        cy.wait(2000)
        cy.get(':nth-child(5) > .ant-col-12').click().type('MICRA IV (K13){downarrow}{enter}') //Модель авто

        cy.wait(1000)
        cy.get(':nth-child(6) > .ant-col-12').click().type('1.2{enter}') //Модифікація авто
    
        cy.wait(1000)
        cy.get(':nth-child(7) > .ant-col-12').click().type('{downarrow}{enter}') //Модифікація авто
        cy.wait(1000)
        cy.get('#vehicle_add_from_wheelRadius').click().type('{downarrow}{enter}')
        cy.get(':nth-child(8) > .ant-col-12').click().type('Чорний{enter}')
        cy.wait(1000)
        cy.get('.ant-btn').contains('Гаразд').click({ force: true }) ///ОК Додавання Авто
        cy.wait(2000)  

        cy.get('#comment').should('have.text','Коментар в Картці Клієнта')
        cy.get('.ant-table-row > :nth-child(1)').should('be.visible')
        cy.get('.ant-modal-footer > .ant-btn-primary').click({ force: true }) // Додати Клієнта
        cy.wait(2000)  
        cy.get('.ant-select-selection-item').eq(0).contains('БазовийMobi'+idClient).should('exist')
        cy.wait(4000)   
    })

    it('Додавання ремонту ч/з +|Планувальник', function(){
        cy.visit('/') 
        cy.get('[mode="calendar"]').find('.anticon-plus').first().click({ force: true })
        cy.wait(2000)
        cy.get('.ant-select-selector').eq(0).type('БазовийMobi'+idClient+'{enter}')
        cy.wait(2000)
        cy.get('.ant-select-selector').eq(1).type('{enter}')
        cy.wait(2000)
        cy.get('.ant-modal-body > .ant-btn').first().click({ force: true }) ///додати Ремонт
        cy.wait(4000)
    })   

    it('Перевірка заповнених полів в НЗ: тип Авто, Радіус, Тип Заміни, Коментар Клієнта', function(){
        cy.visit('/') 
        cy.get('.anticon-menu-unfold > svg').click()
        cy.get('.ant-menu-item').contains('Ремонти').click()
        cy.wait(4000)
        cy.get('.ant-input').type(idClient)   //пошук
        cy.wait(4000)
        cy.get('tr > td > a').first().click({ force: true })
        cy.wait(4000)
        cy.get('.ant-select-selector').eq(4).type('{enter}')  // тип заміни
        cy.get('.ant-select-selector').eq(9).type('{enter}')  // Механік

        cy.get(' #comment').type('Коментар Клієнта в НЗ: не заляпать авто')
        cy.get('.ant-select-selector').eq(2).should('have.text','Легковий')
        cy.get('.ant-select-selector').eq(3).should('have.text','13R')
        cy.get('.ant-select-selector').eq(4).should('have.text','Купив в Autodoc')
        cy.get(' #comment').should('have.text','Коментар Клієнта в НЗ: не заляпать авто')
    })  

    it('Перевід у статус Запис', function(){
    cy.visit('/') 
    cy.get('.anticon-menu-unfold > svg').click()
    cy.get('.ant-menu-item').contains('Ремонти').click()
    cy.wait(3000)
    cy.get('.ant-input').type(idClient)   //пошук
    cy.wait(3000)
    cy.get('tr > td > a').first().click({ force: true })
    cy.wait(3000)
    cy.get('.ant-select-selector').eq(9).invoke('text')// отримати механіка
        .then (text => {
            mehanic = text;
            cy.log(mehanic)
        })
        cy.get('.ant-select-selector').eq(9).type('{enter}')  // Механік
        cy.wait(1000)
        cy.get('#comment').type('Комент НЗ не заляпать салон)')
        cy.wait(1000)
        cy.get('#comment').should('have.text','Комент НЗ не заляпать салон)')
        cy.get('.anticon-save ').first().click({ force: true })
        cy.wait(3000)
        cy.get('.styles-m__headerContorlsShowIcon---6gTgk > .anticon > svg').click()
        cy.wait(2000)
        cy.get('.styles-m__hiddenHeaderContorls---1N6ed > .styles-m__dropdownTitle---3Vlog > .anticon').click()
        cy.wait(3000)
        cy.get('.ant-dropdown-menu').contains('Запис').first().click({ force: true })
        cy.wait(5000)
    })

    it('Перевірка НЗ в статусі Запису', function(){
        cy.visit('/orders/appointments') 
        cy.get('.ant-select-selector').eq(0).type('{uparrow}{enter}')  // записи
        cy.get('.ant-input').type(idClient)   //пошук        
        cy.wait(2000)
        cy.get('tr > td > a').first().click({ force: true })
          .then(function(){
            cy.get('.ant-tabs-tab').eq(1).click({ force: true }) // табка роботи в НЗ
            cy.wait(3000)
            cy.get('h1').contains('Запис').should('exist')
            cy.wait(2000)
        })
    })

    it('Додавання Робіт', function(){
        cy.visit('/orders/appointments') 
        cy.get('.ant-select-selector').eq(0).type('{uparrow}{enter}')  // записи
        cy.get('.ant-input').type(idClient)   //пошук        
        cy.wait(2000)
        cy.get('tr > td > a').first().click({ force: true })

        cy.get('.ant-tabs-tab').eq(1).click({ force: true }) // табка роботи в НЗ
        cy.wait(3000)
        cy.get('button').contains('Додати').click({ force: true })// Додати
        cy.wait(2000)

        cy.get('.ant-modal-body').find('.ant-select-selector').eq(0).type('{enter}') // вибір Роботи
        cy.get(':nth-child(1) > div > .ant-btn').click({ force: true })
        cy.get('.styles-m__blockButtonsWrap---2oTAz > :nth-child(1)').click({ force: true }) // comments
        cy.get('.styles-m__blockButtonsWrap---2oTAz > :nth-child(15)').click({ force: true })// comments
        cy.wait(2000)
        cy.get('.ant-modal-footer > .ant-btn-primary').last().click({ force: true })
        cy.wait(2000)
        cy.get(':nth-child(6) > :nth-child(2) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().type(222)
        cy.wait(2000)
        cy.get('.ant-input-number').eq(3).clear().clear().type(3)  // кільк. год. 
        cy.wait(2000)
        cy.get('.ant-modal-footer > .ant-btn-primary').last().click({ force: true })
        cy.wait(1000)
        cy.get('[data-row-key="0"] > :nth-child(1)').should('exist')
        cy.wait(1000)
    })  

    it('Додавання Робіт через Комплекси', function(){
        cy.visit('/orders/appointments') 
        cy.get('.ant-select-selector').eq(0).type('{uparrow}{enter}')  // записи
        cy.get('.ant-input').type(idClient)   //пошук        
        cy.wait(2000)
        cy.get('tr > td > a').first().click({ force: true })

        cy.get('.ant-tabs-tab').eq(1).click({ force: true }) // табка роботи в НЗ
        cy.wait(3000)

        cy.get('[data-qa=button_visible_complexes_modal]').click() // кнопка комплекси
          
        cy.get('.ant-modal-body').find('.ant-select-selector').eq(0).type('Діагностика{downarrow}{downarrow}{enter}')
        cy.wait(3000)
        cy.get('.ant-btn-primary').last().click({force: true})
        cy.wait(3000)
        cy.get('.ant-table-cell').should('not.have.text','')
        cy.wait(1000)
    })  

    it('Перевірка відображення працівника та найменування Роботи', function(){
        cy.visit('/orders/appointments') 
        cy.get('.ant-select-selector').eq(0).type('{uparrow}{enter}')  // записи
        cy.get('.ant-input').type(idClient)   //пошук        
        cy.wait(2000)
        cy.get('tr > td > a').first().click({ force: true })

        cy.get('.ant-tabs-tab').eq(1).click({ force: true }) // табка роботи в НЗ
        cy.wait(3000)

        cy.get('.ant-table-row').first().click({ force: true })  // клік перший рядок таб робіт


        cy.get('.ant-modal-body').find('.ant-select-selector').eq(1).contains('Легкові') 
        cy.wait(1000)
        cy.get('.ant-btn-primary').contains('Зберегти').click({ force: true })
        cy.wait(3000)
        cy.get('.styles-m__headerContorlsShowIcon---6gTgk > .anticon > svg').click()
        cy.wait(3000)
        cy.get('.styles-m__hiddenHeaderContorls---1N6ed > .styles-m__dropdownTitle---3Vlog > .anticon').click()
        cy.wait(3000)
        cy.get('.ant-dropdown-menu').contains('Ремонт').click()
    })

    it('Перевірка статуса НЗ / Ремонт', function(){
        cy.visit('/orders/progress') 
        cy.get('.ant-select-selector').eq(0).type('{enter}')  // записи
        cy.get('.ant-input').type(idClient)   //пошук        
        cy.wait(2000)
        cy.get('tr > td > a').first().click({ force: true })
        cy.get('.ant-tabs-tab').eq(1).click({ force: true }) // табка роботи в НЗ
        cy.wait(3000)
        cy.get('h1').contains('Ремонт').should('exist')   
    })

    it('Додавання Запчастин', function(){
        cy.visit('/orders/progress') 
        cy.get('.ant-select-selector').eq(0).type('{enter}')  // записи
        cy.get('.ant-input').type(idClient)   //пошук        
        cy.wait(2000)
        cy.get('tr > td > a').first().click({ force: true })

        cy.get('.ant-tabs-tab').eq(2).click({ force: true }) // табка роботи в НЗ
        cy.wait(3000)

        cy.get('.ant-btn').last().click({ force: true }) // додати тб ЗЧ
        cy.wait(3000)
        cy.get('.ant-modal-body').find('.ant-select-selector').eq(0).type('Мастила (оливи){downarrow}{enter}')
        cy.wait(3000)
        cy.get(':nth-child(4) > :nth-child(2) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().type(1234)
        cy.get('.ant-input-number').eq(3).clear().clear().type(1.6)
        cy.get('.ant-btn-primary').click({ force: true })
        cy.wait(2000) 
        cy.get('.ant-table-tbody > .ant-table-row > :nth-child(1)').should('exist')
        cy.wait(2000) 
    })

    // // it('Видалення Запчастин', function(){
    // //     cy.visit('/orders/progress') 
    // //     cy.get('.ant-select-selector').eq(0).type('{enter}')  // записи
    // //     cy.get('.ant-input').type(idClient)   //пошук        
    // //     cy.wait(2000)
    // //     cy.get('tr > td > a').first().click({ force: true })

    // //     cy.get('.ant-tabs-tab').eq(2).click({ force: true }) // табка роботи в НЗ
    // //     cy.wait(3000)

    // //     cy.get('.ant-table-row').first().click({ force: true })  // клік перший рядок таб робіт
    // //     cy.get('.ant-modal-footer').find('.ant-btn-danger').click({ force: true })
    // //     cy.wait(1000)  
    // //     cy.get('.ant-table-tbody > .ant-table-row > :nth-child(2)').should('exist')
    // // })

    // // it('Відображення табки Історії ремонту', function(){
    // //      cy.visit('/progress') 
    // //     .then(function(){
    // //         cy.get('.ant-input').type(idClient)   //пошук        
    // //     })
    // //     cy.get('tr > td > a').first().click({ force: true })
    // //     .then(function(){
    // //         cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(4)').click({ force: true }) // табка роботи в НЗ
    // //         cy.get('.ant-tabs-tabpane-active').should('exist')
    // //         cy.wait(2000)
    // //     })
    // // })

    // // it('Перевірка відкриття Ордера / іконка $', function(){
    // //      cy.visit('/progress') 
    // //     .then(function(){
    // //         cy.get('.ant-input').type(idClient)   //пошук        
    // //     })
    // //     cy.get('tr > td > a').first().click({ force: true })
    // //     .then(function(){
    // //         cy.wait(3000)
    // //         cy.get('.styles-m__headerContorlsShowIcon---6gTgk > .anticon > svg').click()
    // //         cy.wait(3000)
    // //         cy.get('.styles-m__hiddenHeaderContorls---1N6ed > .anticon-dollar').click()
    // //         cy.get('.ant-modal-header').contains('Касовий ордер')
    // //         cy.get('.ant-modal-body').should('exist')
    // //         cy.wait(3000)
    // //     })
    // // })

    // // it('Завершення ремонту, оплата', function(){
    // //      cy.visit('/progress') 
    // //     .then(function(){
    // //         cy.get('.ant-input').type(idClient)   //пошук        
    // //     })
    // //     cy.get('tr > td > a').first().click({ force: true })
    // //     .then(function(){
    // //         cy.wait(3000)
    // //         cy.get('.styles-m__headerContorlsShowIcon---6gTgk > .anticon > svg').click()
    // //         cy.wait(3000)
    // //         cy.get('.styles-m__hiddenHeaderContorls---1N6ed > .styles-m__dropdownTitle---3Vlog > .anticon').click()
    // //         cy.wait(3000)
    // //         cy.get('.ant-dropdown-menu').contains('Завершено').click()
    // //         if( cy.get('.ant-dropdown-menu').contains('Завершено')){

    // //         }
    // //         else {
    // //             cy.get('#withPayment > :nth-child(1)').click()
    // //             cy.get('.ant-checkbox').last().click()
    // //             cy.get('.ant-btn-primary').click()
    // //             cy.wait(3000)
    // //         }
    // //     })
    // // })

    // // it(' Перевірка Відкриття модалки створення Каси', function(){
    // //     cy.visit('/') 
    // //     cy.get('.anticon-menu-unfold > svg').click()
    // //     cy.get('.ant-menu-submenu-title').contains('Довідник').click()
    // //     cy.get('.ant-menu-item').contains('Каси').click()
    // //     cy.wait(3000)
    // //     cy.get('[data-row-key] > :nth-child(1)').should('exist')
    // //     cy.get('.ant-btn').contains('Додати').first().click({force: true})
    // //     cy.get('.ant-select-selection-selected-value').should('have.text','Готівка')
    // //     cy.get('.ant-modal-close-x').click()
    // //     cy.get('.ant-table-content').should('exist')
    // // })

    // // it(' Перевірка Відкриття сторінки Каса і Банк та перехід на Рух Грошей, перевірка фільтра по переходу до каси', function(){
    // //     cy.visit('/') 
    // //     cy.get('.anticon-menu-unfold > svg').click()
    // //     cy.get('.ant-menu-submenu-title').contains('Бухгалтерія').click()
    // //     cy.get('.ant-menu-item').contains('Каса і Банк').click()
    // //     cy.wait(3000)
    // //     cy.get('[data-row-key] > :nth-child(1)').should('exist')
    // //     cy.get('[data-row-key] > :nth-child(1) > div > a').first().invoke('text')
    // //     .then (text => { // отримати назву першої каси в таблиці 
    // //         cy.log(text)
    // //         cy.get('[data-row-key] > :nth-child(1) > div > a').first().click({force: true})// перехід на Рух Грошей
    // //         cy.wait(3000)
    // //         cy.get('.ant-select-selection-selected-value').should('have.text',text)
    // //     })
    // //     cy.get('[data-row-key] > :nth-child(2)').should('exist')
    // // })

    // // it('Перевірка картки Працівника', function(){
    // //     cy.visit('/') 
    // //     cy.get('.anticon-menu-unfold > svg').click()
    // //     cy.get('.ant-menu-submenu-title').contains('Довідник').click()
    // //     cy.get('.ant-menu-item').contains('Працівники').click()
    // //     cy.wait(1000)
    // //     cy.get('.styles-m__employeeName---2QyjT').first().click({ force: true })
    // //     cy.wait(1000)
    // //     cy.get('.styles-m__employeeSection---17Lh6').should('exist')
    // //     cy.wait(3000)
    // // })

    // // // додати перевірка кнопок копіювання
    // // it('Створення копії НЗ', function(){
    // //      cy.visit('/progress') 
    // //     .then(function(){
    // //         cy.get('.ant-input').type(idClient)   //пошук        
    // //     })
    // //     cy.get('tr > td > a').first().click({ force: true })
    // //     .then(function(){
    // //         cy.wait(3000)
    // //         cy.get('.styles-m__headerContorlsShowIcon---6gTgk > .anticon > svg').click()
    // //         cy.wait(3000)
    // //         cy.get('.styles-m__hiddenHeaderContorls---1N6ed > .anticon-copy').click()
    // //         cy.wait(3000)
    // //         cy.get('h1 > span').should('have.text','Новий')
    // //     })
          
    // // })

  
})