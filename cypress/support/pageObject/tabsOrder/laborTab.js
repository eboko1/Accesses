class LaborTab {

    editLaborDiagnostic = (idClient) => {
        cy.wait(2000)
        cy.get('.ant-tabs-nav').contains('Роботи').click(); // tab Роботи
        cy.wait(1000);

        cy.get(':nth-child(1) > [title="Швидке редагування"] > div').first().click({force: true}) ////[data-qa=btn_quick_edit_table_order_page]
        cy.get('.ant-table-row > :nth-child(4) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').first().clear().type('111');
        cy.wait(1000); 
        cy.get('.ant-btn-primary').last().click({force: true})
        cy.wait(1000);
        cy.get('[data-qa=input_mark_up_discount_panel_order_page]').clear().type('120') // Надбавка по Нормо годинам
        cy.get('.ant-input-number-input').eq(3).clear().type('20');  // Встановлення знижки таб Роботи
        cy.get('[aria-label=save]').click() // зберегти картку
        cy.wait(3000);
    }

    editLaborSH = () => {
        cy.wait(2000)
        cy.get('tr > td').find('button').first().click({force: true});
        cy.get('.ant-modal').find('input').eq(2).type('{downarrow}{enter}')   //вибір механіка
        cy.get('.ant-modal').find('.ant-input-number').eq(0).clear().type('123.45')   //price
        cy.wait(3000);
        this.addMessagesModal();
        cy.wait(2000);
        cy.get('.ant-modal-footer > .ant-btn-primary').first().click({force: true}) //
    }

    checkMessagesModalSH = () => {
        cy.wait(2000)
        cy.get('tr').contains('пер. міст, вгорі, важіль, по центру; test')
    }

    checkPriceModalSH = () => {
        cy.wait(2000)
        cy.get('tr').contains('123')  
    }

    checkAddedLaborSH = () => {
        cy.wait(2000)
        cy.get('tr').eq(4).should('not.have.text', '') 
    }

    addMessagesModal = () => {
        cy.wait(2000)
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
        cy.wait(2000)
        cy.get('.ant-tabs-nav').contains('Роботи').click();
        cy.wait(3000)
    
        cy.get('.styles-m__headerActions---2S-7g > [title="Додати"]').click()
        cy.wait(3000)
    
        cy.get('.ant-modal-title').contains('Додати роботу')
        cy.wait(2000)
    
        cy.get('.ant-modal-body').find('.ant-select-selector').eq(0).type('Фільтри повітряні');  // група товару
        cy.wait(2000)
        cy.get('.ant-select-tree-title').first().click({force: true})

            cy.get('.ant-modal-body').find('.ant-select-selector').eq(2).click({force: true})
            cy.wait(2000)
            cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click({force: true});
        cy.wait(1000)
        cy.get('.ant-modal-body').last().find('.ant-input-number-input').eq(0).type('222')  ////{backspace}
        cy.get('.ant-modal-body').last().find('.ant-input-number-input').eq(2).type('2')
 
        .then(()=>{
            cy.wait(3000);
            cy.get('.ant-modal-footer > .ant-btn-primary').first().click({force: true})
            cy.wait(2000);
        })
    }

    addLaborPlus = () => {
        cy.wait(2000)
        cy.get('.ant-tabs-nav').contains('Роботи').click();
        cy.get('.styles-m__headerActions---2S-7g > [title="Додати"]').click()  // + 
        cy.wait(2000)
        cy.get('.ant-modal-body').find('.ant-select-selector').eq(2).type('Заміна{enter}')
        cy.wait(3000);
        cy.get('.ant-modal-footer').find('button').last().click({force: true})
        cy.wait(2000);  
    }

    addLaborSH = () => {
        cy.wait(2000)
        cy.get('.ant-modal-body').find('.ant-select-selector').eq(0).type('{downarrow}{enter}')
        cy.wait(3000);
        cy.get('.ant-modal-footer').find('button').last().click({force: true})
        cy.wait(2000);  
    }

    addLaborComplexes = () => {
        cy.wait(3000)
        cy.get('.ant-tabs-nav').contains('Роботи').click();
        cy.wait(2000)
        cy.get('.styles-m__ownIcon---2tsV5').click() /// btn Відкриття модалки Комплекси 
        cy.wait(2000)
        cy.get('.ant-modal-body').find('.ant-select-selection-search').eq(0).type('заміна мастила (оливи) в кпп')
        cy.wait(2000)
        cy.get(':nth-child(2) > .ant-select-tree-node-content-wrapper > .ant-select-tree-title').click({force: true}) ///:nth-child(2) > .ant-select-tree-node-content-wrapper > .ant-select-tree-title
        cy.wait(2000)
        cy.get('.ant-btn-primary').last().click({force: true})
    
    }

    deleteLaborSH = (idClient) => {
        cy.wait(2000)
        cy.get('tr').eq(5).find('[aria-label="delete"]').click({force: true})  // 5 - 3й рядок
        cy.wait(1000)
        cy.get('.ant-popover-inner-content').find('button').last().click({force: true})
    }

    showMehanicLabor = () => { 
        cy.wait(2000)
        cy.get('.ant-tabs-nav').contains('Роботи').click();
        cy.wait(3000)
        cy.get('[data-qa=tree_select_counterparty_employee_services_table_order_page]').eq(0).contains('Механік').should('exist')  ///Механік // робота з Діагностики 
        cy.get('[data-qa=tree_select_counterparty_employee_services_table_order_page]').eq(1).contains('Механік').should('exist')  ///Механік // + з модалки Робота
        cy.get('[data-qa=tree_select_counterparty_employee_services_table_order_page]').eq(2).contains('Механік').should('exist')
        cy.get('[data-qa=tree_select_counterparty_employee_services_table_order_page]').eq(3).contains('Механік').should('exist') ///Механік // + роботи з модалки Комплекси
    }

    addCommentsToLabor = () => {
        cy.wait(2000)
        cy.get('.ant-tabs-nav').contains('Роботи').click()
        cy.get('.styles-m__headerActions---2S-7g > [title="Додати"]').click()
        cy.wait(2000)
        cy.get('.ant-modal-body').find('.ant-select-selector').eq(2).type('Діагностика')
        cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();
        cy.wait(1000);
        cy.get('[data-qa=button_commentary_add_add_service_modal]').first().click({force: true});
        cy.wait(1000);
        cy.get('[data-qa=button_set_comementary_block_commentary_button_add_service_modal]').eq(0).click({force: true});
        cy.wait(1000);
        cy.get('[data-qa=button_set_comementary_block_commentary_button_add_service_modal]').eq(1).click({force: true});
        cy.get('[data-qa=button_set_comementary_block_commentary_button_add_service_modal]').eq(2).click({force: true});
        
        cy.get('[data-qa=text_area_current_commentary_button_add_service_modal]').type(' test')
        cy.get('[data-qa=text_area_current_commentary_button_add_service_modal]').contains('пер. міст, попереду, вгорі; test')
        cy.wait(1000);
        cy.get('.ant-btn-primary').last().click({force: true})
        cy.wait(1000);
        cy.get('.ant-btn-primary').last().click({force: true})
        cy.wait(1000); 
    }

}

export default LaborTab