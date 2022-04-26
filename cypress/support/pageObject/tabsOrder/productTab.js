class ProductTab {
  
    addProduct = () => {
        cy.get('.ant-tabs-nav').should('be.visible').contains('Запчастини').click()
        cy.get('.ant-input-number-input').eq(7).clear().type('15').should('have.value','15%')
        cy.get('[data-qa="btn_header_actions_details_table_order_page"]').eq(0).click()
        cy.get('[data-qa=tree_select_storeGroupId_detail_product_modal]').type('Мастила (оливи) моторні{enter}')
        cy.get('.ant-select-tree-treenode').last().click() // додавання групи ЗЧ остання в списку

        cy.get('[data-qa="select_brandId_order_detail_edit_modal"]').should('not.be.empty')
        ///cy.get('[data-qa="input_detailCode_order_detail_edit_modal"]').should('not.be.empty')

        cy.get('[data-qa="input_number_purchasePrice_order_detail_edit_modal"]').clear().type('333.1').should('have.value','333.1')
        cy.get('[data-qa="input_number_price_order_detail_edit_modal"]').clear().type('333.2').should('not.be.NaN')
        cy.get('[data-qa="input_number_count_order_detail_edit_modal"]').clear().type('3.3').should('not.be.NaN')
        cy.get('.ant-modal-body').find('.ant-checkbox-wrapper').last().click({force: true})  //пов'язані ЗЧ
    
        cy.wait(1000);
        cy.get('.ant-btn-primary').eq(2).click({force: true})
        cy.wait(2000);
    }

    editDetailDiagnostic = () => {
        cy.get('.ant-tabs-nav').should('be.visible').contains('Запчастини').click();  ////Вкладка Запчастини
        cy.get('[data-qa=btn_header_actions_details_table_order_page]').should('be.visible')
        cy.get('[data-qa="button_quick_edit_modal_details_table_order_page"]').eq(0).click() // btn Каталог
        cy.get('.ant-modal-title').last().should('have.text','Додати деталь')

        cy.get('[data-qa="input_detailName_detail_product_modal"]').should('exist')
        cy.get('[data-qa="select_brandId_order_detail_edit_modal"]').should('not.be.empty')  
        cy.get('[data-qa="input_detailCode_order_detail_edit_modal"]').should('exist')

       
        cy.get('[data-qa="select_brandId_order_detail_edit_modal"]').type('ABEX{enter}').should('not.be.empty')  
        cy.get('[data-qa="input_detailCode_order_detail_edit_modal"]').clear().type('123456').should('have.value','123456')

        cy.get('[data-qa="input_number_purchasePrice_order_detail_edit_modal"]').clear().type('111.1').should('have.value','111.1')
        cy.get('[data-qa="input_number_price_order_detail_edit_modal"]').clear().type('111.2').should('not.be.NaN')
        cy.get('[data-qa="input_number_count_order_detail_edit_modal"]').clear().type('1.3').should('not.be.NaN')
        cy.wait(2000);
        cy.get('[data-qa="select_supplierName_order_detail_edit_modal"]').type('Exist{enter}').should('contain','Exist') ////Вибір Постачальника 
        cy.wait(2000);
        cy.get('.ant-btn-primary').eq(2).click({force: true});//ОК;
        cy.wait(3000);
        cy.get('tr > td').should('contain','Exist')
    }

    editProduct = () => {
        cy.get('.ant-tabs-nav').should('be.visible').contains('Запчастини').click();  ////Вкладка Запчастини
        cy.get('[data-qa=btn_header_actions_details_table_order_page]').should('be.visible')
        cy.get('[data-qa=btn_header_actions_details_table_order_page]').eq(1).click() // btn Каталог
        ///cy.get('.ant-modal-body').should('be.visible')
        cy.get('.ant-modal-title').last().should('have.text','Додати деталь')

        cy.get('[data-qa="button_handle_ok_select_order_detail_modal"]').first().click({force:true})
        cy.get('.ant-modal-body').should('be.visible')
        cy.get('.ant-modal-title').last().should('have.text','Додати деталь')

        cy.get('[data-qa="input_detailName_detail_product_modal"]').should('exist')
        cy.get('[data-qa="select_brandId_order_detail_edit_modal"]').should('not.be.empty')  
        cy.get('[data-qa="input_detailCode_order_detail_edit_modal"]').should('exist')
        cy.wait(2000);
        cy.get('[data-qa="select_supplierName_order_detail_edit_modal"]').type('Exist{enter}').should('contain','Exist') ////Вибір Постачальника 
        cy.wait(2000);
        cy.get('.ant-btn-primary').eq(2).click({force: true});//ОК;
        cy.wait(3000);
        cy.get('tr > td').should('contain','Exist')
    }

    addDetailVIN = () => {
        cy.get('.ant-tabs-nav').should('be.visible').contains('Запчастини').click();
        cy.get('[data-qa=btn_header_actions_details_table_order_page]').eq(1).click() // btn + ЗЧ
        cy.get('[data-qa="btn_add_form_vin_order_detail_modal"]').click(); ///btn Вибір VIN"
        cy.wait(4000)
        cy.get('.ant-modal-content').should('be.visible')
        cy.get('.ant-modal-header').last().should('have.text','VIN-код')
        cy.get('.ant-modal-content').find('.ant-select-selector').should('be.visible').last().type('1020200{enter}')
        cy.get('.ant-select-tree-treenode').eq(3).click()                  // додавання групи ЗЧ остання в списку
        cy.wait(5000)
        cy.get('.styles-m__vinModal---3rARV').should('be.visible')
        cy.get('tr > td').find('span').contains('15208').click({force: true})
        cy.get('.ant-btn-primary').last().click({force: true})
        cy.wait(3000)
        cy.get('[data-qa="table_detail_code_input_order_detail_modal"]').should('have.value','152081HC0A')
        cy.get('[data-qa="button_handle_ok_select_order_detail_modal"]').first().click({force: true})
        cy.wait(2000)
        cy.get('.ant-modal > .ant-modal-content > .ant-modal-footer > .ant-btn-primary').last().click({force: true})            //btn Гаразд;
        cy.wait(10000)
    }

    searchByCar = () => {
        cy.get('.ant-tabs-nav').should('be.visible').contains('Запчастини').click();
        cy.get('[data-qa=btn_header_actions_details_table_order_page]').eq(1).click() // btn + ЗЧ
        cy.get('[data-qa="btn_selection_by_product_code_order_detail_modal"]').click(); ///btn Каталог
        cy.get('.ant-modal-content').should('be.visible')
        cy.get('.ant-modal-header').last().should('have.text','Додати деталь')
        cy.get('.ant-dropdown-menu-item').first().click({force: true}) // Пошук по авто
        cy.get('.ant-modal-content').should('be.visible')
        cy.get('.ant-modal-header').last().should('have.text','Виберіть групу запчастини')
        cy.get('[data-qa="tree_select_storeGroupId_order_detail_modal"]').type('Фільтри повітряні{enter}') // Модалка Виберіть групу ЗЧ
        cy.get('.ant-select-tree-treenode').last().click() // дcy.get('.ant-btn-primary').last().click({force: true})одавання групи ЗЧ остання в списку
        cy.wait(3000)
        cy.get('tr').contains('Фільтр').should('exist')
    }

    searchByStorage = () => {
        cy.get('.ant-tabs-nav').should('be.visible').contains('Запчастини').click();
        cy.get('[data-qa=btn_header_actions_details_table_order_page]').eq(1).click() // btn + ЗЧ
        cy.get('[data-qa="btn_selection_by_product_code_order_detail_modal"]').click(); ///btn Каталог
        cy.get('.ant-modal-content').should('be.visible')
        cy.get('.ant-modal-header').last().should('have.text','Додати деталь')
        cy.get('.ant-dropdown-menu-item').eq(1).click({force: true}) // Пошук по авто
        cy.wait(3000)
        cy.get('tr').contains('Мастила').should('exist')
    }

    searchByOil = () => {
        cy.get('.ant-tabs-nav').should('be.visible').contains('Запчастини').click();
        cy.get('[data-qa=btn_header_actions_details_table_order_page]').eq(1).click() // btn + ЗЧ
        cy.get('[data-qa="btn_selection_by_product_code_order_detail_modal"]').click(); ///btn Каталог
        cy.get('.ant-modal-content').should('be.visible')
        cy.get('.ant-modal-header').last().should('have.text','Додати деталь')
        cy.get('.ant-dropdown-menu-item').eq(2).click({force: true}) // Пошук по авто
        cy.wait(3000)
        cy.get('.ant-modal-content').should('be.visible')
        cy.get('.ant-modal-header').last().should('have.text','Масла і рідини')
        cy.get('tr').contains('Engine').should('exist')
    }

    addProductInfoAuto = () => {
        cy.get('.ant-tabs-nav').should('be.visible').contains('Запчастини').click();
        cy.wait(1000);
        cy.get('[aria-label=question-circle]').first().click({force: true})
        cy.wait(4000)
        cy.get('tr[data-row-key="0"] > td ').should('be.visible')
        cy.get('.ant-tabs-tabpane').should('contain', 'Спецификации масел и технических жидкостей')
        cy.get('tr[data-row-key="0"] > td > .ant-btn').last().click({force: true}) // btn додати
        cy.wait(5000)
        cy.get('.ant-modal-header').should('be.visible') //модалка Додати Деталь фільтр масла та рідини
        //cy.get('[data-qa="button_handle_ok_select_order_detail_modal"]').should('be.visible')
        //cy.get('[data-qa="button_handle_ok_select_order_detail_modal"]').first().click({force: true})
        ///cy.get('[data-qa="input_detailName_detail_product_modal"]').should('not.be.empty') /// cy.get('.ant-modal-body').find('.ant-input').eq(2).should('not.have.value','') 
        cy.get('.ant-btn-primary').eq(2).click({force: true}); // Гаразд
        cy.get('.ant-table-tbody').should('be.visible')
    }
    
    editProductIcon = () => {
        /// якщо ЗЧ не зарезервована
        cy.get('.ant-tabs-nav').should('be.visible').contains('Запчастини').click();
        cy.get('[data-qa=button_quick_edit_modal_details_table_order_page]').should('be.visible').last().click({force: true});
        cy.wait(4000);
        cy.get('[data-qa="input_detailName_detail_product_modal"]').should('be.visible')
       //// cy.get('[data-qa="input_detailName_detail_product_modal"]').should('not.be.empty')
        cy.get('[data-qa="select_brandId_order_detail_edit_modal"]').should('not.be.empty')  
        cy.get('[data-qa="input_detailCode_order_detail_edit_modal"]').should('have.value', '152081HC0A')

        cy.get('[data-qa="input_number_purchasePrice_order_detail_edit_modal"]').clear().type('444.1').should('have.value','444.1')
        cy.get('[data-qa="input_number_price_order_detail_edit_modal"]').clear().type('4.2').should('not.be.NaN')
        cy.get('[data-qa="input_number_count_order_detail_edit_modal"]').clear().type('4.3').should('not.be.NaN')

        cy.get('.ant-btn-primary').last().click({force: true});//ОК;
        cy.wait(1000);
    }

    addProductPlus = () => {
        cy.get('.ant-tabs-nav').should('be.visible').contains('Запчастини').click()
        cy.get('[data-qa="btn_header_actions_details_table_order_page"]').eq(0).click()
        cy.get('[data-qa=input_detailName_detail_product_modal]').should('have.text','')
        cy.get('[data-qa=input_detailName_detail_product_modal]').clear().type('Моторне мастило')
        // cy.get('[data-qa=select_brandId_order_detail_edit_modal]').type('ABEX{enter}').should('contain','ABEX')     // бренд 
        // cy.get('[data-qa=select_supplierName_order_detail_edit_modal]').type('АНД{enter}').should('contain','АНД') //Постачальник 
        cy.get('[data-qa="input_number_purchasePrice_order_detail_edit_modal"]').clear().type('222.1').should('have.value','222.1')
        cy.get('[data-qa="input_number_price_order_detail_edit_modal"]').clear().type('222.2').should('not.be.NaN')
        cy.get('[data-qa="input_number_count_order_detail_edit_modal"]').clear().type('2.3').should('not.be.NaN')
        cy.wait(1000);
        cy.get('.ant-btn-primary').eq(2).click({force: true})
        cy.wait(2000);
        cy.get('.ant-table-tbody').find('.ant-table-cell').contains('Моторне мастило') // перевірка в табі ЗЧ 
    }
}
export default ProductTab