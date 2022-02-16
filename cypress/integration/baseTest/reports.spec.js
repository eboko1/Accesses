/// <reference types="cypress" />

const path = require("path");

import ReportsPage from '../../support/pageObject/reportsPage';

const reportsPage = new ReportsPage();

const baseUrl = 'https://'+Cypress.env('url')+'my.carbook.pro';


var date = new Date();

describe ('Reports|Master|Admin|Desktop|UA|', function(){
  beforeEach('User LogIn ', function(){
        cy.viewport(1240,960)  
        cy.login(baseUrl+'/login', Cypress.env('Kasur'), Cypress.env('pw'))
          .then(()=>{
            cy.wait(3000)
            cy.get('img').eq(0).click({force: true}) //menu
        })
    });

    it('Товари. Універсальний / Звіт по НЗ', function(){
        cy.visit(baseUrl+'/reports')
        cy.get('.ant-btn').contains('Універсальний').click({force: true})
        cy.get('.ant-modal-body').should('exist')
        cy.get('.ant-modal-footer > .ant-btn-primary').last().click({force: true})
        cy.wait(4000)
        cy.readFile(path.join('cypress/downloads', 'Orders report'+'.xlsx')).should("exist")
    })

    it('Товари. Залишки по товарам', function(){
        cy.visit(baseUrl+'/reports')
        reportsPage.checkDownloadFile('Залишки по товарам', 'Залишки по товарам', 'balance_by_products_without_detailing')
    })

    it('Товари. Залишки по складам', function(){
        cy.visit(baseUrl+'/reports')
        reportsPage.checkDownloadFile('Залишки по складам', 'Залишки по складам', 'balance_by_warehouses_without_detailing')
    })

    it('Товари. Залишки по коміркам', function(){
        cy.visit(baseUrl+'/reports')
        reportsPage.checkDownloadFile('Залишки по коміркам', 'Залишки по коміркам', 'balance_by_cells_without_detailing')
    })

    it('Товари. Рух по товару', function(){
        cy.visit(baseUrl+'/reports')
        reportsPage.checkDownloadFile('Рух по товару', 'Рух по товару', 'products_movement_without_detailing')
    })

    it('Товари. Інвентаризація', function(){
        cy.visit(baseUrl+'/reports')
        reportsPage.checkDownloadFile('Інвентаризація', 'Інвентаризація', 'balance_stocktaking_blind')
    })

    it('Товари. Закупівлі за пост.', function(){
        cy.visit(baseUrl+'/reports')
        reportsPage.checkDownloadFile('Закупівлі за пост.', 'Закупівлі за пост.', 'purchases_by_supplier_without_detailing')
    })

    // // it('Товари. Списання', function(){
    // //     cy.contains('Звіти').first().click({force: true})
    // //     cy.wait(1000)
    // //     cy.get('.ant-menu-item').contains('Звіти').click({force: true})
    // //     cy.get('.ant-btn').contains('Списання').click({force: true})
    // //     cy.wait(1000)
    // //     cy.get('.ant-modal-header').should('exist')
    // //     cy.get('.ant-modal-header').should('have.text', 'Списання')
    // //     cy.get('.ant-modal-footer > div > .ant-btn-primary').last().click({force: true})
    // //     cy.readFile(path.join('cypress/downloads', ''+'.xlsx')).should("exist")
    // // })

    it('НЗ. Універсальний по н/з', function(){
        cy.visit(baseUrl+'/reports')
        reportsPage.checkDownloadFile('Універсальний по н/з', 'Універсальний по н/з', 'orders_report_universal')
    })

    it('НЗ. Універсальний по роботам', function(){
        cy.visit(baseUrl+'/reports')
        reportsPage.checkDownloadFile('Універсальний по роботам', 'Універсальний по роботам', 'orders_report_universal_by_labors')
    })

    it('НЗ. Універсальний по з/ч', function(){
        cy.visit(baseUrl+'/reports')
        reportsPage.checkDownloadFile('Універсальний по з/ч', 'Універсальний по з/ч', 'orders_report_universal_by_products')
    })

    it('НЗ. Зведений по н/з', function(){
        cy.visit(baseUrl+'/reports')
        reportsPage.checkDownloadFile('Зведений по н/з', 'Зведений по н/з', 'orders_summary_report')
    })

    it('НЗ. Звіт по продажі по днях', function(){
        cy.visit(baseUrl+'/reports')
        reportsPage.checkDownloadFile('По днях', 'Звіт по продажі по днях', 'orders_by_date_without_detailing')
    })

    it('НЗ. Звіт по продажі по працівникам', function(){
        cy.visit(baseUrl+'/reports')
        reportsPage.checkDownloadFile('По працівникам', 'Звіт по продажі по працівникам', 'orders_by_employees_without_detailing')
    })

    it('НЗ. Звіт по продажі за статусами', function(){
        cy.visit(baseUrl+'/reports')
        reportsPage.checkDownloadFile('За статусами', 'Звіт по продажі за статусами', 'orders_by_statuses_without_detailing')
    })

    it('НЗ. Звіт по продажі по клієнтах', function(){
        cy.visit(baseUrl+'/reports')
        reportsPage.checkDownloadFile('За клієнтами', 'Звіт по продажі по клієнтах', 'orders_by_clients_without_detailing')
    })

    it('НЗ. Звіт по продажі по а/м', function(){
        cy.visit(baseUrl+'/reports')
        reportsPage.checkDownloadFile('За автомобілями', 'Звіт по продажі по а/м', 'orders_by_vehicles_without_detailing')
    })

    it('НЗ. Звіт по продажі за постами', function(){
        cy.visit(baseUrl+'/reports')
        reportsPage.checkDownloadFile('За постами', 'Звіт по продажі за постами', 'orders_by_stations_without_detailing')
    })

    it('НЗ. Звіт по продажі по роботам', function(){
        cy.visit(baseUrl+'/reports')
        reportsPage.checkDownloadFile('Роботи', 'Звіт по продажі по роботам', 'orders_by_labors_without_detailing')
    })

    it('НЗ. Звіт по продажі по групам товарів', function(){
        cy.visit(baseUrl+'/reports')
        reportsPage.checkDownloadFile('Групи товарів', 'Звіт по продажі по групам товарів', 'orders_by_product_groups_without_detailing')
    })

    it('НЗ. Звіт по продажі по брендам', function(){
        cy.visit(baseUrl+'/reports')
        reportsPage.checkDownloadFile('Бренди', 'Звіт по продажі по брендам', 'orders_by_brands_without_detailing')
        cy.pause()
    })

    it('НЗ. Звіт по продажі по товарах', function(){
        cy.visit(baseUrl+'/reports')
        reportsPage.checkDownloadFile('Товари', 'Звіт по продажі по товарах', 'orders_by_products_without_detailing')
    })

    it('Бухгалтерія. Універсальний по оплатам', function(){
        cy.visit(baseUrl+'/reports')
        reportsPage.checkDownloadFile('Універсальний по оплатам', 'Універсальний по оплатам', 'balance_by_store_docs')
    })

    it('Бухгалтерія. Звіт по дебіторці', function(){
        cy.visit(baseUrl+'/reports')
        reportsPage.checkDownloadFile('Дебіторка', 'Звіт по дебіторці', 'accounts_receivable_report_without_detailing')
    })

    it('Бухгалтерія. Звіт по кредиторці', function(){
        cy.visit(baseUrl+'/reports')
        reportsPage.checkDownloadFile('Кредиторка', 'Звіт по кредиторці', 'accounts_payable_repor')
    })

    it('Бухгалтерія. Звіт по касам', function(){
        cy.visit(baseUrl+'/reports')
        reportsPage.checkDownloadFile('Каси', 'Звіт по касам', 'orders_by_cash_box_without_detailing')
    })

    it('Бухгалтерія. Грошовий потік', function(){
        cy.visit(baseUrl+'/reports')
        reportsPage.checkDownloadFile('Грошовий потік', 'Грошовий потік', 'cash_flow_report')
    })

    it('Бухгалтерія. Звіт по продажі по товарах', function(){
        cy.visit(baseUrl+'/reports')
        cy.get('.ant-btn').contains('Зарплати').click({force: true})
        cy.wait(1000)
        cy.readFile(path.join('cypress/downloads', 'Employees salaries report from'+'.xlsx')).should('not.exist')
    })

})

