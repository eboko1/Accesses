class LaborTab {

    editLaborDiagnostic = (idClient) => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.wait(3000);
        cy.get('.ant-input-search > .ant-input').type(idClient)
        cy.wait(2000);
        cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
        cy.log('Вибір Запису');
        cy.wait(4000);
        cy.log('Вкладка Роботи');
        cy.get('.ant-tabs-nav > :nth-child(1)').contains('Роботи').click();
        /// перевірка доданої роботи з діагностики
        cy.wait(1000);
        cy.get(':nth-child(1) > [title="Швидке редагування"] > div').first().click({force: true})
        cy.wait(1000);
        cy.log('Закупочна ціна');
        cy.get(':nth-child(4) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().type('111');
        cy.wait(1000);
        cy.get('.ant-btn-primary').last().click({force: true})
        cy.wait(1000);
        cy.log('Встановлення знижки на роботи');
        cy.get('#servicesDiscount').clear().type('20');
        cy.wait(2000);
        cy.get('.styles-m__servicesMarkup---3myJY > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().type('120');
        cy.wait(1000);
        cy.get('.styles-m__headerContorls---2pU_V > .anticon-save').click() // зберегти картку
        cy.log('Процес Збереження н/з ');
        cy.wait(5000);
    }

    addLaborGroupProduct = (idClient) => {
        cy.wait(2000);
        cy.get('.styles-m__logo---2zDPJ').click()
        .then(()=>{
            cy.get('.ant-input-search > .ant-input').type(idClient)
            cy.wait(2000);
            cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
            cy.log('Вибір Запису');
        })
        .then(()=>{
            cy.log('Вкладка Роботи');
            cy.get('.ant-tabs-nav > :nth-child(1)').contains('Роботи').click();
            cy.wait(2000)
        })
        .then(()=>{
            cy.get('.styles-m__headerActions---2S-7g > [title="Додати"]').click()
        })
        .then(()=>{
            cy.get('.styles-m__modalSectionTitle---3iMcZ > div > span').contains('Робота')
            cy.wait(1000)
        })
        .then(()=>{
            cy.get('.ant-table-content > .ant-table-body > table > .ant-table-tbody > .ant-table-row > :nth-child(2) > .ant-select > .ant-select-selection').click();
            cy.wait(1000)
        })
        .then(()=>{
            cy.get('.ant-select-dropdown-search > .ant-select-search__field__wrap > .ant-select-search__field').type('Фільтри повітряні')
            cy.get('.ant-select-tree-child-tree-open').eq(1).click()
        })
        .then(()=>{
            cy.get('.ant-table-content > .ant-table-body > table > .ant-table-tbody > .ant-table-row > :nth-child(4) > .ant-select > .ant-select-selection').click()
            cy.get('.ant-select-dropdown-menu-item-active').click();
            cy.wait(1000)
        })
        .then(()=>{
            cy.get(':nth-child(8) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().type('222')
            cy.wait(1000)
            cy.get(':nth-child(10) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().type('2')
            //додати механіка
        })
        .then(()=>{
            cy.wait(3000);
            cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true})
            cy.wait(2000);
        })
    }

    addLaborFieldLabor = (idClient) => {
        cy.get('.styles-m__logo---2zDPJ').click()
        .then(()=>{
            cy.get('.ant-input-search > .ant-input').type(idClient)
            cy.wait(2000);
            cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
            cy.log('Вибір Запису');
        })
        .then(()=>{
            cy.log('Вкладка Роботи');
            cy.get('.ant-tabs-nav > :nth-child(1)').contains('Роботи').click();
            cy.wait(2000)
        })
        .then(()=>{
            cy.get('.styles-m__headerActions---2S-7g > [title="Додати"]').click()
        })
        .then(()=>{
            cy.get('.ant-table-content > .ant-table-body > table > .ant-table-tbody > .ant-table-row > :nth-child(4) > .ant-select > .ant-select-selection').type('Заміна')
            cy.wait(4000)
            cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true});
        })
        .then(()=>{
            cy.wait(3000);
            cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true})
            cy.wait(2000);
        })      
    }

    addLaborComplexes = (idClient) => {
        cy.get('.styles-m__logo---2zDPJ').click()
        .then(()=>{
            cy.get('.ant-input-search > .ant-input').type(idClient)//пошук
            cy.wait(2000);
            cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
            cy.log('Вибір Запису');
        })
        .then(()=>{
            cy.log('Вкладка Роботи');
            cy.get('.ant-tabs-nav > :nth-child(1)').contains('Роботи').click();
            cy.wait(2000)
        })
        .then(()=>{
            cy.log('Відкриття модалки Комплекси');
            cy.get('.styles-m__ownIcon---2tsV5').click()
            cy.wait(2000)
            cy.get('.styles-m__laborsList---3qgUM > .styles-m__listRow---2lt3h > .styles-m__nameField---3rhCH > .ant-select > .ant-select-selection').click()
            cy.wait(2000)
            cy.get('.ant-select-dropdown-menu-item-active').click()
            cy.wait(2000)
            cy.get('.ant-btn-primary').last().click({force: true})
        })
    }

    showMehanicLabor = (idClient) => {
        cy.get('.styles-m__logo---2zDPJ').click()
        .then(()=>{
            cy.get('.ant-input-search > .ant-input').type(idClient)//пошук
            cy.wait(2000);
            cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
            cy.log('Вибір Запису');
        })
        .then(()=>{
            cy.log('Вкладка Роботи');
            cy.get('.ant-tabs-nav > :nth-child(1)').contains('Роботи').click();
            cy.wait(2000)
        })
        .then(()=>{
            cy.log('Механік // робота з Діагностики');
            cy.get('[data-row-key="0"] > :nth-child(6) > .ant-select > .ant-select-selection').contains('Механік').should('exist')
            cy.wait(1000)
            cy.log('Механік // + з модалки Робота');
            cy.get('[data-row-key="1"] > :nth-child(6) > .ant-select > .ant-select-selection').contains('Механік').should('exist')
            cy.wait(1000)
            cy.get('[data-row-key="2"] > :nth-child(6) > .ant-select > .ant-select-selection').contains('Механік').should('exist')
            cy.wait(1000)
            cy.log('Механік // + роботи з модалки Комплекси');
            cy.get('[data-row-key="3"] > :nth-child(6) > .ant-select > .ant-select-selection').contains('Механік').should('exist')
    
        })

    }
    addCommentsToLabor = () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.wait(4000);
        cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
        .then (text => {var codeNZ = text;
          cy.log(codeNZ)
          const numArr = text.split('-')  //[MDR, 594, 12345]
          cy.get('.ant-input-search > .ant-input').last().type(numArr[numArr.length-1])//пошук
        })
        cy.get('.styles-m__title---Nwr2X > span').should('have.text','Ремонти')
        cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
        cy.get('.ant-tabs-nav').contains('Роботи').click()
        cy.get('.styles-m__headerActions---2S-7g > [title="Додати"]').click()
        cy.get('.ant-table-content > .ant-table-body > table > .ant-table-tbody > .ant-table-row > :nth-child(4) > .ant-select > .ant-select-selection').type('Діагностика')
        cy.wait(1000)
        cy.get('.ant-select-dropdown-menu-item-active').first().click({force: true});
        cy.wait(1000);
        cy.get('.ant-table-content > .ant-table-body > table > .ant-table-tbody > .ant-table-row > :nth-child(7) > div > .ant-btn').first().click({force: true});
        cy.wait(1000);
        cy.get('.styles-m__blockButtonsWrap---1eB6I > :nth-child(1)').first().click({force: true});
        cy.wait(1000);
        cy.get('.styles-m__blockButtonsWrap---1eB6I > :nth-child(2)').first().click({force: true});
        cy.get('.styles-m__blockButtonsWrap---1eB6I > :nth-child(3)').first().click({force: true});
        cy.get('.ant-modal-body > :nth-child(2) > .ant-input').contains('попереду, вгорі;')
        cy.get('.ant-modal-footer > .ant-btn-primary').first().click({force: true});
        cy.wait(1000);
        cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true}) /// кнопка Гаразд
        cy.get('.ant-tabs-tabpane-active > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-content').contains('попереду, вгорі;')       

    }

}

export default LaborTab