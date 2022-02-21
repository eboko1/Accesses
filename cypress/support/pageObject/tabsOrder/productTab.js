class ProductTab {

    addProduct = () => {
        cy.get('.ant-tabs-nav').contains('Запчастини').click()
        cy.get('.ant-input-number-input').eq(7).clear().type('15')
        cy.get('[data-qa="btn_header_actions_details_table_order_page"]').click()
        cy.get('[data-qa=tree_select_storeGroupId_detail_product_modal]').type('Мастила (оливи) моторні{enter}')
        .then(()=>{
            cy.get('.ant-select-tree-treenode').last().click() // додавання групи ЗЧ остання в списку
            cy.get('.ant-modal-body').find('.ant-input-number-input').eq(0).clear().type('333{enter}')
            cy.get('.ant-modal-body').find('.ant-input-number-input').eq(1).clear().type('350{enter}')
            cy.get('.ant-modal-body').find('.ant-input-number-input').eq(2).clear().type('1.6{enter}')
            cy.get('.ant-modal-body').find('.ant-checkbox-wrapper').last().click({force: true})  //пов'язані ЗЧ
            cy.get('.ant-modal-body').find('.ant-table-container').eq(2).should('exist')
        })
        .then(()=>{
            cy.wait(1000);
            cy.get('.ant-btn-primary').last().click({force: true})
            cy.wait(2000);
        })
    }

    editProduct = () => {
        cy.get('.ant-tabs-nav').contains('Запчастини').click();  ////Вкладка Запчастини
        cy.wait(2000);
        cy.get('[data-qa=btn_header_actions_details_table_order_page]').click() // btn + ЗЧ
        cy.wait(1000);
        cy.get('.ant-tabs-tab').contains('Пряме редагування').click({force: true});
        cy.get('[data-qa=input_detailName_detail_product_modal]').type('компоненти генератора')
        cy.get('[data-qa=select_supplierName_detail_product_modal]').type('Exist{enter}'); ////Вибір Постачальника

        cy.get('.ant-modal-body').find('.ant-input-number-input').eq(0).clear().type('400')
        cy.get('.ant-modal-body').find('.ant-input-number-input').eq(1).clear().type('599');
        cy.get('.ant-modal-body').find('.ant-input-number-input').eq(2).clear().type('3');
        cy.wait(2000);
        cy.get('.ant-btn-primary').last().click({force: true});//ОК;
        cy.wait(3000);
    }

    checkModalVIN = () => {
        cy.get('.ant-tabs-nav').contains('Запчастини').click();
        cy.get('[data-qa=btn_header_actions_details_table_order_page]').click() // btn + ЗЧ
        cy.get('[data-qa=button_setModal_vin_detail_product_modal]').click(); ///btn Вибір VIN
        cy.wait(4000);
        cy.get('[style="display: flex; justify-content: space-between; margin: -16px 0px 8px;"] > .ant-radio-group > :nth-child(2)').click();
        cy.get('.ant-modal-root > .ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-body').contains('ДВИГАТЕЛЬ').click({force: true});
        ////cy.wait(1000);
        /////cy.get('.styles-m__categoryList').should('exist')
        /////cy.get('[style="display: flex; justify-content: space-between; margin: -16px 0px 8px;"] > .ant-radio-group > :nth-child(1)').click()
        ///cy.get('.styles-m__previewBLock---q-AEd > :nth-child(1) > img').click()
        ////cy.get('.styles-m__listWrap---2EuIo > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-content > .ant-table-body > table > .ant-table-tbody > [data-row-key="0"] > :nth-child(1)').click()
        ///cy.get('[style="display: flex; justify-content: flex-end; margin: -16px 0px 8px;"] > .ant-btn-primary').click()
        cy.wait(1000);
        cy.get('.ant-modal-content').find('.ant-modal-close').last().click({force: true}) //закриття модалки
        cy.wait(1000);
    }

    addProductInfoAuto = () => {
        cy.get('.ant-tabs-nav').contains('Запчастини').click();
        cy.wait(1000);
        cy.get('[aria-label=question-circle]').first().click({force: true})
        cy.wait(10000);
        ///////cy.get('.ant-tabs-tabpane').contains('Спецификации масел и технических жидкостей').should('exist')
        cy.get('tr[data-row-key="0"] > td > .ant-btn').last().click({force: true}) // btn додати
        cy.wait(5000);
        cy.get('.ant-modal-header').contains('Масла і рідини').should('exist')  //модалка масла та рідини
        cy.get('tr[data-row-key="0"] > td  > .ant-btn').last().click({force: true})
        cy.wait(3000);   
        cy.get('[data-qa="input_detailName_detail_product_modal"]').should('not.have.value','') /// cy.get('.ant-modal-body').find('.ant-input').eq(2).should('not.have.value','') 
        cy.wait(1000);
        cy.get('.ant-btn-primary').eq(2).click({force: true}); // Гаразд
        cy.wait(1000);
        cy.get('.ant-table-tbody').find('.ant-table-cell').contains('Мастила (оливи)').should('exist') // перевірка в табі ЗЧ 
    }
    
    editProductIcon = () => {
        /// якщо ЗЧ не зарезервована
        cy.get('.ant-tabs-nav').contains('Запчастини').click();
        cy.wait(1000);
        cy.get('[data-qa=button_quick_edit_modal_details_table_order_page]').first().click({force: true});
        cy.get('.ant-modal-body').find('.ant-input-number-input').eq(0).clear().type('400')
        cy.get('.ant-modal-body').find('.ant-input-number-input').eq(1).clear().type('599');
        cy.get('.ant-modal-body').find('.ant-input-number-input').eq(2).clear().type('3');
        cy.wait(2000);
        cy.get('.ant-btn-primary').last().click({force: true});//ОК;
        cy.wait(1000);
    }

    addProductPlus = () => {
        cy.get('.ant-tabs-nav').contains('Запчастини').click()
        cy.get('[data-qa="btn_header_actions_details_table_order_page"]').click()
 
        cy.get('.ant-tabs-tab').contains('Пряме редагування').click({force: true});
        cy.get('[data-qa=input_detailName_detail_product_modal]').should('have.text','')
        cy.get('[data-qa=input_detailName_detail_product_modal]').clear().type('Моторне мастило')

        cy.get('[data-qa=select_brandId_detail_product_modal]').type('ABEX{enter}')  // бренд
        cy.get('[data-qa=select_supplierName_detail_product_modal]').type('АНД{enter}') //Постачальник
        cy.wait(2000);

        cy.get('.ant-modal-body').find('.ant-input-number-input').eq(0).clear().type('123.45')
        cy.get('.ant-modal-body').find('.ant-input-number-input').eq(1).clear().type('102.8')
        cy.get('.ant-modal-body').find('.ant-input-number-input').eq(2).clear().type('1.5')
        cy.wait(1000);
        cy.get('.ant-btn-primary').last().click({force: true})
        cy.wait(2000);
        cy.get('.ant-table-tbody').find('.ant-table-cell').contains('Моторне мастило') // перевірка в табі ЗЧ 
    }
}

export default ProductTab