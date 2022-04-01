class LaborTab {

    editLaborDiagnostic = () => {
        cy.get('.ant-tabs-nav').contains('Роботи').click(); // tab Роботи
        cy.get('[data-qa="btn_quick_edit_table_order_page"]').first().click({force: true}) // nz btn edit
        cy.get('.ant-modal-body').should('be.visible')
        cy.get('[data-qa="input_number_purchasePrice_table_order_page"]').first().clear().type('111').should('have.value','111');
        cy.get('.ant-btn-primary').last().click({force: true}) // OK btn modal edit
        cy.get('[data-qa="btn_show_hamburger_menu_modal_services_table_order_page"]').should('be.visible')
        cy.get('[data-qa=input_mark_up_discount_panel_order_page]').clear().type('120').should('have.value','120%') // Надбавка по Нормо годинам
        cy.get('.ant-input-number-input').eq(3).clear().type('20').should('have.value','20%') ;  // Встановлення знижки таб Роботи
        cy.get('tr > td').contains('111').should('exist')
    }

    editLaborSH = () => {
        cy.get('tr > td').find('button').first().click({force: true});
        cy.get('.ant-modal').find('input').eq(2).type('{downarrow}{enter}')   //вибір механіка
        cy.get('.ant-modal').find('.ant-input-number').eq(0).clear().type('123.45')   //price
        cy.wait(3000);
        this.addMessagesModal();
        cy.wait(2000);
        cy.get('.ant-modal-footer > .ant-btn-primary').first().click({force: true}) //
    }

    checkMessagesModalSH = () => {
        cy.get('tr').contains('пер. міст, вгорі, важіль, по центру; test')
    }

    checkPriceModalSH = () => {
        cy.get('tr').contains('123')  
    }

    checkAddedLaborSH = () => {
        cy.get('tr').eq(4).should('not.have.text', '') 
    }

    addMessagesModal = () => {
        cy.get('.ant-modal').find('[aria-label="message"]').first().click({force: true});
        cy.get('.ant-modal-body').find('button').eq(1).click({force: true});
        cy.get('.ant-modal-body').find('button').eq(3).click({force: true});
        cy.get('.ant-modal-body').find('button').eq(13).click({force: true});
        cy.get('.ant-modal-body').find('button').eq(15).click({force: true});
        cy.get('.ant-modal-body').find('textarea').type(' test')
        cy.get('.ant-modal-footer').find('button').last().click({force: true}); // close
        cy.wait(2000);
    }

    addLaborGroupProduct = () => {
        cy.get('.ant-tabs-nav').contains('Роботи').click();
        cy.wait(3000)

        cy.get('[data-qa="btn_show_service_product_modal_services_table_order_page"]').click()
        cy.get('.ant-modal-body').should('be.visible')
    
        cy.get('.ant-modal-title').contains('Додати роботу')
        cy.get('.ant-modal-body').should('be.visible')
    
        cy.get('.ant-modal-body').find('.ant-select-selector').eq(0).type('Фільтри повітряні');  // група товару
        cy.get('.ant-modal-body').should('be.visible')
        cy.get('.ant-select-tree-title').last().click({force: true})

        cy.get('.ant-modal-body').find('.ant-select-selector').eq(2).click({force: true})
        cy.get('.ant-modal-body').should('be.visible')
        cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click({force: true});
        cy.get('.ant-modal-body').should('be.visible')
        cy.get('.ant-modal-body').find('.ant-input').last().clear()                                  // найменування
        cy.get('.ant-modal-body').find('.ant-input').last().type('заміна+test').should('have.value','заміна+test')  // найменування

        cy.get('.ant-modal-body').last().find('.ant-input-number-input').eq(0).clear()  ////{backspace}                  // Закуп. ціна
        cy.get('.ant-modal-body').last().find('.ant-input-number-input').eq(0).type('222').should('have.value','222')   // Закуп. ціна

        cy.get('.ant-modal-body').last().find('.ant-input-number-input').eq(2).clear()                                 // Кіл-ть
        cy.get('.ant-modal-body').last().find('.ant-input-number-input').eq(2).type('2').should('have.value','2')     // Кіл-ть

        cy.get('.ant-modal-body').should('be.visible')
        cy.get('.ant-modal-footer > .ant-btn-primary').first().click({force: true})
        cy.wait(2000);
        cy.get('tr > td').contains('222')
        cy.get('tr > td').contains('заміна+test')
    
    }

    addLaborPlus = () => {
        cy.get('.ant-tabs-nav').contains('Роботи').click();
        cy.get('[data-qa="btn_show_service_product_modal_services_table_order_page"]').click()
        cy.get('.ant-modal-body').should('be.visible')
        cy.get('.ant-modal-body').find('.ant-select-selector').eq(2).type('Заміна{enter}')
        cy.get('.ant-modal-body').should('be.visible')
        cy.get('.ant-modal-body').find('.ant-select-selector').eq(2).should('contain','Заміна')
        cy.get('.ant-modal-body').last().find('.ant-input-number-input').eq(0).clear().type('333.33').should('have.value','333.33')
        cy.get('.ant-modal-footer').find('button').last().click({force: true})
        cy.wait(2000);  
        cy.get('tr > td').contains('333.33')
    }

    addLaborName = () => {
        cy.get('.ant-tabs-nav').contains('Роботи').click();
        cy.get('[data-qa="btn_show_service_product_modal_services_table_order_page"]').click()
        cy.get('.ant-modal-body').should('be.visible')
        cy.get('.ant-modal-body').find('.ant-select-selector').eq(0).type('1010202');  // вибір групи товару по коду
        cy.get('.ant-select-tree-title').last().click({force: true})

        cy.get('[data-qa="select_labor_id_add_service_modal"]').type('{downarrow}{enter}')
        
        cy.get('.ant-modal-body').find('.ant-input').eq(1).clear().type('test+vika{enter}')
        cy.get('.ant-modal-body').last().find('.ant-input-number-input').eq(0).clear().type('444.44').should('have.value','444.44')
        cy.get('.ant-modal-body').should('be.visible')
        cy.get('[data-qa="input_service_name_add_service_modal"]').should('have.value','test+vika')
        cy.get('.ant-modal-footer').find('button').last().click({force: true})
        cy.wait(2000);  
        cy.get('tr > td').contains('444.44')
        cy.get('tr > td').contains('test+vika')

    }

    addLaborSH = () => {
        cy.get('.ant-modal-body').should('be.visible')
        cy.get('.ant-modal-body').find('.ant-select-selector').eq(0).type('шино{enter}')
        cy.get('.ant-modal-footer').find('button').last().click({force: true})
        cy.wait(2000);  
    }

    addLaborComplexes = () => {
        cy.get('.ant-tabs-nav').contains('Роботи').click();
        cy.get('[data-qa="button_visible_complexes_modal"]').click()
        cy.get('.ant-modal-body').should('be.visible')
        cy.get('.ant-modal-body').find('.ant-select-selection-search').eq(0).type('заміна мастила (оливи) в кпп')
        cy.wait(2000)
        cy.get(':nth-child(2) > .ant-select-tree-node-content-wrapper > .ant-select-tree-title').click({force: true}) ///:nth-child(2) > .ant-select-tree-node-content-wrapper > .ant-select-tree-title
        cy.get('.ant-modal-body').find('.ant-input-disabled').eq(0).should('have.value','Заміна трансмісійного мастила (оливи)')
        cy.wait(2000)
        cy.get('.ant-btn-primary').last().click({force: true})
        cy.get('[data-qa="button_visible_complexes_modal"]').should('be.visible')
        cy.get('tr > td').should('contain','Заміна')
    }

    deleteLaborSH = () => {
        cy.get('tr').eq(5).find('[aria-label="delete"]').click({force: true})  // 5 - 3й рядок
        cy.wait(1000)
        cy.get('.ant-popover-inner-content').find('button').last().click({force: true})
    }

    showMehanicLabor = () => { 
        cy.get('.ant-tabs-nav').contains('Роботи').click();
        cy.wait(3000)
        cy.get('[data-qa=tree_select_counterparty_employee_services_table_order_page]').eq(0).contains('Механік').should('exist')  ///Механік // робота з Діагностики 
        cy.get('[data-qa=tree_select_counterparty_employee_services_table_order_page]').eq(1).contains('Механік').should('exist')  ///Механік // + з модалки Робота
        cy.get('[data-qa=tree_select_counterparty_employee_services_table_order_page]').eq(2).contains('Механік').should('exist')
        cy.get('[data-qa=tree_select_counterparty_employee_services_table_order_page]').eq(3).contains('Механік').should('exist') ///Механік // + роботи з модалки Комплекси
    }

    addCommentsToLabor = () => {
        cy.get('.ant-tabs-nav').contains('Роботи').click()
        cy.get('tr > th').find('button').eq(1).click()   ///  + Додати Роботу

        cy.wait(2000)
        cy.get('.ant-modal-body').find('.ant-select-selector').eq(2).type('Діагностика')
        cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();
        cy.wait(1000);
        cy.get('[data-qa=button_commentary_add_add_service_modal]').first().click({force: true});
        cy.get('.ant-modal-header').should('be.visible')
        cy.get('[data-qa=button_set_comementary_block_commentary_button_add_service_modal]').eq(0).click({force: true});
        cy.get('[data-qa=button_set_comementary_block_commentary_button_add_service_modal]').eq(1).click({force: true});
        cy.get('[data-qa=button_set_comementary_block_commentary_button_add_service_modal]').eq(2).click({force: true});
        cy.get('[data-qa=text_area_current_commentary_button_add_service_modal]').type(' test')

        cy.get('[data-qa=text_area_current_commentary_button_add_service_modal]').contains('пер. міст, попереду, вгорі; test')
        cy.get('.ant-btn-primary').last().click({force: true})
        cy.get('.ant-modal-footer').find('button').eq(1).click({force: true}) // btn Гаразд 
    }

}

export default LaborTab