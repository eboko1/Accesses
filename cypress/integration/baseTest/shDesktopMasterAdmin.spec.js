/// <reference types="cypress" />

import LoginPage from '../../support/pageObject/loginPage';
import OrderPage from '../../support/pageObject/orderPage';
import ClientPage from '../../support/pageObject/clientPage';
import ProfilePage from '../../support/pageObject/profilePage';
import LaborTab from '../../support/pageObject/tabsOrder/laborTab';
import ProductTab from '../../support/pageObject/tabsOrder/productTab';
import EmploeePage from '../../support/pageObject/emploeePage';
import LaborDetails from '../../support/pageObject/laborDetails';

const loginPage = new LoginPage();
const orderPage = new OrderPage();
const clientPage = new ClientPage();
const profilePage = new ProfilePage();
const laborTab = new LaborTab();
const productTab = new ProductTab();
const emploeePage = new EmploeePage();
const laborDetails = new LaborDetails();

var date = new Date();
const idClient ='21122'
////const idClient =''+date.getDate()+date.getMonth()+date.getMinutes();
var second = parseInt(date.getSeconds())+10
var minute = parseInt(date.getMinutes())+10
const tel = minute+minute+second+minute+second+minute;


describe ('SH|Desktop|Master|Admin|UA', function(){

    const login = (email, password) =>{
        cy.session([email, password], () => {
          cy.visit('/')
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
        login(Cypress.env('LoginSHTest'), Cypress.env('pwSH'))
    })

    it('Профіль вибір українського інтерфейсу', function(){
        cy.visit('/profile')
        profilePage.selectUA()
    })

    // // it(`Додавання Клієнта та а/м ч/з ${idClient}`, function(){
    // //     cy.visit('/add')
    // //     cy.wait(5000)
    // //     clientPage.createClient(idClient,tel)
    // // });

    it(`Перевірка заповнених полів Картка клієнта ${idClient}`, function(){
        cy.visit('/client-hot-operations')
        clientPage.checkClient(idClient,tel)
    })

    it(`Редагування мобільного номера Клієнта: ${idClient}`, function(){
        cy.visit('/client-hot-operations')
        clientPage.editClientNumber(idClient,tel)
    })

    it(`Додати Н/З, підтягування клієнта через пошук, клієнт:${idClient}`, function(){
        cy.visit('/orders/appointments')
        orderPage.createOrder(idClient)
    });

    it('Редагування н/з та додавання Поста, Механіка, Готівки, Реквізити STO, Націнка, Пробіг', function(){
        cy.visit('/orders/appointments')
        orderPage.openNZ(idClient)
        orderPage.editOrderSH(idClient)
    });

    it('Перевірка заповнених полів: Поста, Механіка, Готівки, Реквізити STO, Націнка, Пробіг', function(){
        cy.visit('/orders/appointments')
        orderPage.openNZ(idClient)
        orderPage.checkOrderSH(idClient)
    });

    it('Перевід у статус Запис', function(){
        cy.visit('/orders/appointments')
        orderPage.openNZ(idClient)
        orderPage.createAppointments()
    });

    it('Вкладка Роботи > Додавання Роботи ч/з Комплекси', function(){
        cy.visit('/orders/approve')
        laborTab.addLaborComplexes(idClient)
    });

    it('Редагування ціни, механіка, коментів для доданої Роботи ', function(){
        cy.visit('/orders/approve')
        orderPage.openNZ(idClient)
        laborTab.editLaborSH(idClient)
    });

    it('Перевірка відображення ціни, механіка, коментів для доданої Роботи ', function(){
        cy.visit('/orders/approve')
        orderPage.openNZ(idClient)
        laborTab.checkMessagesModalSH()
        laborTab.checkPriceModalSH()
    });

    it('Вкладка Роботи > Додавання Роботи ч/з найменування', function(){
        cy.visit('/orders/approve')
        orderPage.openNZ(idClient)
        orderPage.btnAddLaborPlusSH() // btn add labor
        laborTab.addLaborSH()
    });

    it('Відображення доданої Роботи в НЗ ', function(){
        cy.visit('/orders/approve')
        orderPage.openNZ(idClient)
        laborTab.checkAddedLaborSH()  //перевірка 2 горядока
    });

    it('Вкладка Роботи > Додавання Роботи повторно', function(){
        cy.visit('/orders/approve')
        orderPage.openNZ(idClient)
        orderPage.btnAddLaborPlusSH() // btn add labor
        laborTab.addLaborSH()
    });

    it('Видалення Роботи', function(){
        cy.visit('/orders/approve')
        orderPage.openNZ(idClient)
        laborTab.deleteLaborSH()
    });

    it('Вкладка Історія в н/з', function(){
        cy.visit('/orders/approve');
        orderPage.openNZ(idClient)
        orderPage.checkHistory();
    });

    it('Перевід у статус Ремонту', function(){
        cy.visit('/orders/approve')
        orderPage.openNZ(idClient)
        orderPage.createProgress()
    })

    it('Додавання Коментарів', function(){
        cy.visit('/orders/progress');
        orderPage.openNZ(idClient)
        orderPage.addCommentSH()
    });

    it('Часткова оплата ч/з статус завершено', function(){
        cy.visit('/orders/progress');
        orderPage.openNZ(idClient)
        orderPage.payOrderCredit('{downarrow}{enter}')
    });

    it('Перевірка поля Сплачено', function(){
        cy.visit('/orders/success');
        orderPage.openNZ(idClient)
        cy.get('.ant-row').eq(7).find('span').eq(2).contains('12,30 грн.') // сплачено Грн -> грн
    });

    it('Повна оплата ч/з $', function(){
        cy.visit('/orders/success');
        orderPage.openNZ(idClient)
        orderPage.payOrderDollar('Готівкова')
    });

    it('Перевірка поля Залишок', function(){
        cy.visit('/orders/success');
        orderPage.openNZ(idClient)
        cy.get('.ant-row').eq(7).find('span').eq(5).contains('0 грн.') // Залишок Грн -> грн
    });

    it('Відкриття форми створення Працівника', function(){
        cy.visit('/employees');
        cy.wait(3000)
        emploeePage.openEmploeeCardForCreate();
    });

    it('Відкриття картки існуючого Працівника', function(){
        cy.visit('/employees');
        emploeePage.openEmploeeCard();
    });
})