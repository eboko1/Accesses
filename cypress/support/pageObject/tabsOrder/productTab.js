class ProductTab {

    addProduct = (idClient) => {
        cy.get('.styles-m__logo---2zDPJ').click()
        .then(()=>{
            cy.get('.ant-input-search > .ant-input').type(idClient)//пошук
            cy.wait(2000);
            cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
            cy.log('Вибір Запису');
        })
        .then(()=>{
            cy.log('Вкладка Запчастин');
            cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(4)').click()
        })
        .then(()=>{
            cy.get('#detailsDiscount').clear().type('15')
        })
        .then(()=>{
            cy.get('[style="width: min-content;"] > :nth-child(1) > [title="Додати"]').click()
        })

        .then(()=>{
           cy.get('.ant-table-content > .ant-table-body > table > .ant-table-tbody > .ant-table-row > :nth-child(2) > .ant-select > .ant-select-selection').click()
        })
        .then(()=>{
            cy.get('.ant-select-dropdown-search > .ant-select-search__field__wrap > .ant-select-search__field').type('Мастила (оливи) моторні')
            cy.get('.ant-select-tree-child-tree-open').eq(1).click()
        })
        .then(()=>{
            cy.get(':nth-child(10) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().type('333')
            cy.get(':nth-child(11) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().type('350')
        })
        .then(()=>{
            cy.wait(3000);
            cy.get('.ant-modal-footer > div > .ant-btn-primary').last().click({force: true})
            cy.wait(2000);
        })
    }

    editProduct = (idClient) => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.wait(3000);
        cy.get('.ant-input-search > .ant-input').type(idClient)//пошук
        cy.wait(2000);
        cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
        cy.log('Вибір Запису');
        cy.wait(10000);
        cy.log('Вкладка Запчастини');
        cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(4)').click();
        cy.wait(2000);
        cy.log('Пряме редагування');
        cy.get('[style="width: min-content;"] > :nth-child(1) > [title="Додати"]').click()
        cy.wait(1000);
        cy.get('.ant-radio-group > :nth-child(2)').click(); //радіо кнопка
        cy.wait(1000);
        cy.get('.ant-table-row > :nth-child(4) > .ant-input').clear().type('генератор')
        cy.wait(3000);
        cy.log('Вибір Постачальника');
        cy.get('[style="display: flex;"] > .ant-select > .ant-select-selection').click();
        cy.wait(1000);
        cy.get('.ant-select-dropdown-menu-item').contains('Exist').click();//вибір постачальника з випливаючого списка
        cy.wait(3000);
        cy.get(':nth-child(10) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().type('400');
        cy.wait(1000);
        cy.get(':nth-child(11) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().type('600');
        cy.wait(1000);
        cy.get(':nth-child(12) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear();
        cy.wait(1000);
        cy.get(':nth-child(12) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').type('3');
        cy.wait(2000);
        cy.get('.ant-btn-primary').last().click({force: true});//ОК;
        cy.wait(3000);
    }
    addProductVIN = (idClient) => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.wait(3000);
        cy.get('.ant-input-search > .ant-input').type(idClient)//пошук
        cy.wait(2000);
        cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
        cy.log('Вкладка Запчастини');
        cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(4)').click();
        cy.wait(2000);
        cy.log('Модалка Деталь');
        cy.get('[style="width: min-content;"] > :nth-child(1) > [title="Додати"]').click()
        cy.wait(2000);
        cy.log('Вибір VIN');
        cy.get('.ant-table-row > :nth-child(3) > .ant-btn').click();
        cy.wait(5000);
        cy.get('[style="display: flex; justify-content: space-between; margin: -16px 0px 8px;"] > .ant-radio-group > :nth-child(2)').click();
        cy.wait(1000);
        cy.get('.styles-m__categoryList---3A9pG').should('exist')
        cy.wait(1000);
        cy.get('[style="display: flex; justify-content: space-between; margin: -16px 0px 8px;"] > .ant-radio-group > :nth-child(1)').click()
        cy.get('.styles-m__previewBLock---q-AEd > :nth-child(1) > img').click()
        cy.wait(1000);
        cy.get('.styles-m__listWrap---2EuIo > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-content > .ant-table-body > table > .ant-table-tbody > [data-row-key="0"] > :nth-child(1)').click()
        cy.wait(1000);
        cy.get('[style="display: flex; justify-content: flex-end; margin: -16px 0px 8px;"] > .ant-btn-primary').click()
        cy.wait(2000);
        cy.get('.ant-modal-footer > div > .ant-btn-primary').last().click({force: true}) //ok
        cy.wait(3000);
    }

    addProductInfoAuto = (idClient) => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.wait(3000);
        cy.get('.ant-input-search > .ant-input').type(idClient)//пошук
        cy.wait(2000);
        cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
        cy.log('Вибір Запису');
        cy.wait(10000);
        cy.log('Вкладка Запчастини');
        cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(4)').click();
        cy.wait(1000);
        cy.get('[title="Інфо по автомобілю"] > .anticon').click()
        cy.wait(2000);
        cy.get('[data-row-key="0"] > :nth-child(6) > .ant-btn').first().click({force: true})
        cy.wait(3000);
        cy.get('[data-row-key="0"] > :nth-child(10) > .ant-btn').first().click({force: true})
        cy.wait(2000);  
        cy.get('.ant-modal-footer > div > .ant-btn-primary').last().click({force: true}) //ok
        cy.wait(3000);
    }
    
    editProductIcon = (idClient) => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.wait(3000);
        cy.get('.ant-input-search > .ant-input').type(idClient)//пошук
        cy.wait(2000);
        cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
        cy.log('Вибір Запису');
        cy.wait(10000);
        cy.log('Вкладка Запчастини');
        cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(4)').click();
        cy.wait(1000);
        cy.log('Швидке редагування запчастин');
        cy.get(':nth-child(4) > .ant-btn > div').first().click({force: true});
        cy.log('Вибір Запису');
        cy.wait(1000);
        cy.get(':nth-child(4) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().type('111');
        cy.wait(1000);
        cy.get(':nth-child(5) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().type('222');
        cy.wait(1000);
        cy.get(':nth-child(6) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().type('2');
        cy.wait(2000);
        cy.get('.ant-modal-footer > div > .ant-btn-primary').last().click({force: true}) //ok
        cy.wait(3000);
        cy.get('.styles-m__headerContorls---2pU_V > .anticon-save').click() // зберегти картку
        cy.log('Процес Збереження н/з ');
        cy.wait(5000);
    }
}

export default ProductTab