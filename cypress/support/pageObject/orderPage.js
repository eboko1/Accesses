class OrderPage {
    
   createOrder = (idClient) =>{

        cy.get('a > .ant-btn').click(); // add н/з

        cy.wait(3000)
        cy.get('#searchClientQuery').clear().type('Клієнт'+idClient)
        .then(()=>{
            cy.get('.styles-m__clientBlock---1yPc8 > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-content > .ant-table-body > table > .ant-table-tbody > .ant-table-row > :nth-child(1)').first().click({force: true});
        })
        .then(()=>{
        cy.get('.ant-btn').first().click();
        })
        .then(()=>{
        cy.wait(4000)
        cy.log('Ремонт ДОДАНО');
        })
   }

   deleteOrder = (idClient) =>{
        cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
        .then (text => {var codeNZ = text;
            cy.log(codeNZ)
            const numArr = text.split('-')  //[MDR, 594, 12345]
            cy.get('.ant-input-search > .ant-input').last().type(numArr[numArr.length-1])//пошук
        })
        cy.get('.styles-m__title---Nwr2X > span').should('have.text','Нові')
        cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
        cy.get('.anticon-delete').first().click({force: true})
        cy.wait(1000);
        cy.get('.ant-modal').should('be.visible')
        cy.get('.styles-m__submit---20j0q').contains('Так').click({force: true})
        cy.wait(3000); 
        cy.get('.styles-m__title---Nwr2X > span').should('have.text','Відмова')  
        cy.get('.ant-modal-close-x').last().click({force: true})
        cy.wait(1000);
    }

   copyOrder = (idClient) =>{
        cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
        .then (text => {var codeNZ = text;
            cy.log(codeNZ)
            const numArr = text.split('-')  //[MDR, 594, 12345]
            cy.get('.ant-input-search > .ant-input').last().type(numArr[numArr.length-1])//пошук
        })
        cy.wait(4000);
        cy.get('.styles-m__title---Nwr2X > span').should('have.text','Виконані')
        cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
        cy.get('.anticon-copy').last().click({force: true})
        cy.wait(1000);
        cy.get('.ant-modal-confirm-body-wrapper').should('be.visible')
        cy.wait(1000); 
        cy.get('.ant-modal-confirm-btns > .ant-btn-primary').first().click({force: true})
        cy.wait(5000); 
        cy.get('.styles-m__title---Nwr2X > span').should('have.text','Новий')  
        cy.get('.ant-modal-close-x').last().click({force: true})
        cy.wait(1000); 
    }

   addComments = (idClient) =>{
        cy.wait(4000);
        cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
        .then (text => { var codeNZ = text;
        cy.log(codeNZ)
        const numArr = text.split('-')  //[MDR, 594, 12345]
        cy.get('.ant-input-search > .ant-input').last().type(numArr[numArr.length-1])//пошук
        })
        cy.get('.styles-m__title---Nwr2X > span').should('have.text','Ремонти')
        cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
        cy.get('.ant-tabs-nav').contains('Коментарі').click()
        cy.get('.ant-input.styles-m__comment---3QjTs').clear().type('Не заляпать бампер мастилом');
        cy.get(':nth-child(3) > .styles-m__commentInput---2Ptrr').clear().type('Без царапин...'); //Стан автомобіля
        cy.wait(2000);
        cy.get(':nth-child(4) > .styles-m__commentInput---2Ptrr').clear().type('Замінити повітряні фільтри мотора'); 
        cy.get(':nth-child(5) > .styles-m__commentInput---2Ptrr').clear().type('Пройти повторно діагностику');
        cy.wait(1000);
        cy.get('.anticon-save > svg').first().click({force: true});
        cy.wait(4000);
        cy.get('.ant-tabs-nav').contains('Коментарі').click()
        cy.wait(1000);
        cy.get('.ant-input.styles-m__comment---3QjTs').should('not.have.text','Коментарі клієнта');
        cy.get(':nth-child(3) > .styles-m__commentInput---2Ptrr').should('not.have.text','Рекомендації для клієнта');
        cy.get(':nth-child(4) > .styles-m__commentInput---2Ptrr').should('have.text','Замінити повітряні фільтри мотора'); 
        cy.get(':nth-child(5) > .styles-m__commentInput---2Ptrr').contains('Пройти повторно діагностику')   
 }

   createProgress = (idClient) =>{
        cy.wait(3000);
        cy.get('.ant-input-search > .ant-input').type(idClient)//пошук
        cy.wait(2000);
        cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
        cy.log('Вибір Н/З');
        cy.wait(7000);
        cy.log('Переведіть н/з в статус Ремонт');
        cy.get('.styles-m__dropdownTitle---3Vlog > :nth-child(2) > span').click();
        cy.wait(1000);
        cy.get('.ant-dropdown-menu-item').contains('Ремонт').click()
        cy.wait(3000);
    }

   payOrder = (idClient) =>{
        cy.get('.ant-input-search > .ant-input').type(idClient)//пошук
        cy.wait(2000);
        cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
        cy.log('Вибір Н/З');
        cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(1)').click();
        cy.wait(1000);
        cy.log('Модалка Виконати наряд-замовлення?');
        cy.get('#ОВ > .styles-m__mapChildsBlock---1oGYD > :nth-child(3) > .ant-btn').click();
        cy.wait(1000);
        cy.log('Сплатити радіо-кнопка Так');
        cy.get('#withPayment > :nth-child(1) > :nth-child(2)').click();
        cy.wait(1000);
        cy.log('Вибір Каси');
        cy.get('#cashBoxId').click();
        cy.wait(1000);
        cy.get('.ant-select-dropdown-menu-item').eq(0).click();
        cy.wait(1000);
        cy.get('.styles-m__submit---2hKgG > .ant-btn-primary').click();
        cy.wait(9000);
        cy.get('.styles-m__title---Nwr2X').contains('Виконано')
        cy.wait(4000);   
    }

   payOrderStart = (idClient) =>{
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.wait(4000);
        cy.get('.ant-input-search > .ant-input').type(idClient)//пошук
        cy.wait(2000);
        cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
        cy.wait(7000);
        cy.log('Переведіть н/з в статус Завершено');
        cy.get('.styles-m__dropdownTitle---3Vlog > :nth-child(2) > span').click();
        cy.wait(1000);
        cy.get('.ant-dropdown-menu-item').contains('Завершено').click()
        cy.wait(1000); 
        cy.get('.sc-bxivhb > .ant-checkbox > .ant-checkbox-inner').click({force: true})
        cy.get('.ant-btn-primary').contains('Так').click({force: true})
        cy.wait(3000); 
    }

   checkOrder = (idClient) =>{ 
    cy.get('.ant-input-search > .ant-input').type(idClient)
    cy.wait(2000);
    cy.get('.styles-m__ordernLink---T-qWz').first().click({ force: true })
      .then(()=>{
          cy.get('.styles-m__headerColumns---2oOX2 > :nth-child(1)').find('.ant-select-selection').contains('Оберіть пост').should('not.have.text','') 
          cy.get('.ant-form').find('.ant-select-selection-selected-value').eq(0).should('not.have.text','')
          cy.wait(2000);
          cy.get('.ant-form').find('.ant-select-selection-selected-value').eq(1).should('not.have.text','')
          cy.get('.ant-form').find('.ant-select-selection-selected-value').eq(2).should('not.have.text','')
          cy.get('.ant-form').find('.ant-select-selection-selected-value').eq(3).should('not.have.text','')
          cy.get('.ant-form').find('.ant-select-selection-selected-value').eq(4).should('have.text','Готівка')
          cy.wait(2000);
      })
      .then(()=>{
        cy.get('.ant-form').find('.ant-select-selection-selected-value').eq(5).should('not.have.text','')
        cy.wait(2000);
      })
      .then(()=>{
          cy.wait(1000);
          cy.get('.ant-input-number-input').eq(0).should('have.value',7)
          cy.wait(1000);
          cy.get('.styles-m__odometrInput---7BQMj > .ant-input-number-input-wrap > .ant-input-number-input').eq(1).should('have.value',123456) 
          cy.get('#clientRequisite').should('not.have.text','') 
     
      })
      .then(()=>{
          cy.get('.styles-m__headerContorls---2pU_V > .anticon-save').click() // зберегти картку
      })
      .then(()=>{
          cy.log('Процес Збереження н/з ');
          cy.wait(3000);
      })
   }

   editOrder = (idClient) =>{
        cy.get('.ant-input-search > .ant-input').type(idClient)
        cy.wait(2000);
        cy.get('.styles-m__ordernLink---T-qWz').first().click({ force: true });//Нові н/з
        cy.wait(2000)
            .then(()=>{
            cy.log('Відкриття модалки Планувальника');
            cy.get(':nth-child(2) > .ant-form-item-label > .ant-form-item-no-colon > span > .anticon').first().click({ force: true })
            cy.wait(2000);
            cy.get('.timeColumn > :nth-child(2)').should('exist')
            ///Вибір поста
            cy.get(':nth-child(1) > .sc-jtRfpW > .sc-gxMtzJ > :nth-child(9)').trigger('mousedown')
            //cy.get(':nth-child(1) > .sc-jtRfpW > .sc-kTUwUJ > :nth-child(9) > .sc-gGBfsJ').click()
            cy.get(':nth-child(1) > .sc-jtRfpW > .sc-gxMtzJ > :nth-child(9)').invoke('show').click()
            cy.wait(2000);
            cy.log('Закриття модалки Планувальника');
            cy.get('.ant-modal-close').last().click({ force: true })
            cy.wait(2000);
            cy.log('Вибір Механіка');
            cy.get('#employee').type('Механік').first().click({ force: true })
            cy.wait(1000);
            ///////cy.get('.ant-select-dropdown-menu-item-active').click();
        })
      .then(()=>{
          cy.log('Вибір Готівка');
          cy.get('#paymentMethod').click();
          cy.get ('#paymentMethod').should('not.have.text','')
      })
      .then(()=>{
          cy.get('.ant-select-dropdown-menu-item-active').first().click({ force: true })
          cy.log('Вибір Реквізити');
          cy.get ('#requisite').click();
          cy.wait(1000);
          cy.get('.ant-select-dropdown-menu-item-active').first().click({ force: true })
          cy.get ('#requisite').should('not.have.text','')
      })
      .then(()=>{
          cy.wait(1000);
          cy.log('Вибір Запчастист');
          cy.get ('#appurtenanciesResponsible').type('Запчастист').first().click({ force: true })
          cy.wait(3000);
          cy.get(':nth-child(2) > :nth-child(3) > .ant-form-item-control-wrapper > .ant-form-item-control > .ant-form-item-children > .ant-select > .ant-select-selection > .ant-select-selection__rendered > .ant-select-selection-selected-value').should('have.text','Запчастист Vika')
         ///// cy.get('.ant-select-dropdown-menu-item-active')
          cy.wait(1000);
          cy.get('.ant-input-number-input').eq(0).clear().type('7') 
         //
          cy.wait(2000);
          cy.get('.styles-m__odometrInput---7BQMj > .ant-input-number-input-wrap > .ant-input-number-input').eq(1).clear().type('123456') 
      })
      .then(()=>{
          cy.get('.styles-m__headerContorls---2pU_V > .anticon-save').click() // зберегти картку
      })
      .then(()=>{
          cy.get('.ant-input-number-input').eq(0).should('have.value',7)
          cy.get('.styles-m__odometrInput---7BQMj > .ant-input-number-input-wrap > .ant-input-number-input').eq(1).should('have.value',123456)
          cy.log('Процес Збереження н/з ');
          cy.wait(3000);
      })
    }

   getInfoAuto = () => {
        cy.wait(4000);
        cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
        .then (text => {var codeNZ = text;
            cy.log(codeNZ)
            const numArr = text.split('-')  //[MDR, 594, 12345]
            cy.get('.ant-input-search > .ant-input').last().type(numArr[numArr.length-1])//пошук
        })
        cy.wait(2000);
        cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
        cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(1)').click(); /// Вибір Н/З
        cy.wait(1000);
        cy.get('[title="Інфо по автомобілю"] > .anticon > svg').click({force: true})
        cy.wait(4000);
        cy.get('.ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-body').should('exist');
        cy.wait(5000);
        cy.get('.styles-m__tableHeader---1i3oL').should('have.text','Спецификации масел и технических жидкостей')
        cy.get('.ant-modal-close-x').last().click({force: true})
        cy.wait(1000);
        cy.get('.styles-m__title---Nwr2X > span').should('have.text','Запис')
        cy.wait(1000);
    }

    getStatisticOrder = () =>{
        cy.wait(4000);
        cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
        .then (text => {var codeNZ = text;
            cy.log(codeNZ)
            const numArr = text.split('-')  //[MDR, 594, 12345]
            cy.get('.ant-input-search > .ant-input').last().type(numArr[numArr.length-1])//пошук
        })
        cy.wait(2000);
        cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
        cy.log('Вибір Н/З');
        cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(1)').click();
        cy.wait(1000);
        cy.get('.anticon-info-circle').click({force: true})
        cy.wait(3000);
        cy.get('.ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-body').should('exist');
        cy.get('#rcDialogTitle4 > :nth-child(1) > :nth-child(1)').should('have.text','Статистика по н/з')
        cy.get('#rcDialogTitle4 > :nth-child(1)').contains('Завершено').should('exist');
        cy.get('.ant-modal-close-x').last().click({force: true})
        cy.wait(1000);
        cy.get('.styles-m__title---Nwr2X > span').should('have.text','Виконано')
        cy.wait(1000);

    }

    downloadOrder = () =>{ 
        cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
          .then (text => {var codeNZ = text;
            cy.log(codeNZ)
            const numArr = text.split('-')  //[MDR, 594, 12345]
            cy.get('.ant-input-search > .ant-input').last().type(numArr[numArr.length-1])//пошук
        })
        cy.wait(2000);
        cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true});
        cy.log('Вибір Н/З');
        cy.wait(4000);
        cy.get('.anticon-printer > svg').click();
        cy.log('Завантаження Наряд замовлення для Клієнта');
        cy.get('.ant-dropdown-menu-item').eq(5).click({force: true});
        cy.wait(2000); 
    }

   checkDownloadOrder = () =>{ 
        cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
        .then (text => {var codeNZ = text;
            cy.log(codeNZ)
            const numArr = text.split('-')  //[MDR, 594, 12345]
            cy.get('.ant-input-search > .ant-input').last().type(numArr[numArr.length-1])//пошук
        })
        cy.wait(2000);
        cy.get('a.styles-m__ordernLink---T-qWz').first().invoke('text')
            .then (text => {var codeNZ = text;
            cy.log(codeNZ)
            const path = require("path");
            ////  cy.readFile(path.join('cypress/downloads', 'act-'+codeNZ+'.pdf')).should("exist"); // файл Акт прийому-передачі автомобіля
            cy.wait(2000);
            cy.readFile(path.join('cypress/downloads', 'order-'+codeNZ+'.pdf')).should("exist"); // файл Наряд замовлення для Клієнта
        //  // cy.wait(1000);
            //// cy.readFile(path.join('cypress/downloads', 'invoice-'+codeNZ+'.pdf')).should("exist");
        })
    }

     createAppointments = (idClient) =>{ 
        cy.get('.ant-input-search > .ant-input').type(idClient)
        cy.wait(2000);
        cy.get('.styles-m__ordernLink---T-qWz').first().click({ force: true });
        cy.url().should('include', '/order/')
          .then(()=>{
            cy.wait(5000);
            cy.get('.styles-m__dropdownTitle---3Vlog > :nth-child(2) > span').click(); // Статус Запис
        })
        .then(()=>{
            cy.get('.ant-dropdown-menu-item').contains('Запис').first().click({ force: true });
            cy.log('Перевести н/з в статус Запис');
            cy.wait(3000);
        })
    }

    createDiagnostic = (idClient) =>{ 
    
        cy.get('.ant-input-search > .ant-input').type(idClient)
        cy.wait(2000);
        cy.get('a.styles-m__ordernLink---T-qWz').first().click({force: true})
        .then(()=>{
            cy.wait(2000)
            cy.log('Перехід до діагностики');
            cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(2)').click(); //клік на вкладку діагностики
        })
        .then(()=>{
            cy.log('Клік на випливаюче меню');
            cy.get('.styles-m__diagnosticTableHeader---1_8Bu > :nth-child(2) > .ant-select > .ant-select-selection').click();
        })
        .then(()=>{
            cy.log('Вибір діагностики');
            cy.get('.ant-select-dropdown-menu > :nth-child(2)').click();
        })
        .then(()=>{
            cy.log('Клік на +');
            cy.get('.styles-m__diagnosticTableHeader---1_8Bu > :nth-child(3) > :nth-child(1)').click();
            cy.wait(2000)
        })
        .then(()=>{
            cy.log('Клік на  all checkbox');
            cy.get('[style="width: 5%; padding: 5px 15px;"] > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').click();
            cy.wait(2000)
        })
        .then(()=>{
            cy.log('Клік на all OK ');
            cy.get('.styles-m__diagnosticTableHeader---1_8Bu > .styles-m__diagnostic_status_button_wrap---ucmHY > [title="Вузол / все гаразд"]').click();
            cy.wait(5000)
        })
        .then(()=>{
            cy.log('Клік на Редагувати');
            cy.get('[data-row-key="1"] > :nth-child(7) > .styles-m__diagnostic_status_button_wrap---ucmHY > .ant-btn').first().click({force: true});;//редагувати
            cy.wait(2000)
        })
        .then(()=>{
            cy.log('Клік на Критично!');
            cy.get('[data-row-key="1"] > :nth-child(7) > .styles-m__diagnostic_status_button_wrap---ucmHY > .ant-btn-danger').first().click({force: true});
            cy.wait(3000)
        })
        .then(()=>{
            cy.get('[data-row-key="1"] > :nth-child(5) > div > .ant-btn').click(); // click message icon
            cy.wait(2000)
        })
        .then(()=>{
            cy.log('модалка Додати коментар!');
            cy.get(':nth-child(1) > .styles-m__blockButtonsWrap---1vfJT > :nth-child(3)').click(); // Що?
            cy.get(':nth-child(2) > .styles-m__blockButtonsWrap---1vfJT > :nth-child(1)').click(); //Де?
            cy.get('.ant-modal-footer > .ant-btn-primary').click();//зберегти модалка Додати коментар
        })
        .then(()=>{
            cy.log('Створити калькуляцію');
            cy.get('[style="width: 35%; margin-right: 5px;"]').click();//кнопка Створити калькуляцію
        })
        .then(()=>{

        ///// cy.get('.ant-modal-body').find('.ant-btn').contains('авто').first().click({force: true}) 
        ///// cy.get('.styles-m__confirm_diagnostic_modal_row_button---36VYf > [title="Створити роботи і з/ч автоматично"]').click();
        cy.get('.styles-m__confirm_diagnostic_modal_element_title---1wZ-P > .ant-btn').click();
            cy.wait(3000)
        })
        .then(()=>{
            cy.log('Звершити діагностику');
            cy.get('button').contains('Завершити діагностику').click({force: true});
        })
        .then(()=>{
        //// cy.get('.anticon-save').click() // зберегти картку
        })
        .then(()=>{
            cy.log('Процес Збереження н/з ');
            cy.wait(2000)
    })
}

    addLabor = (idClient) =>{ }
    addProduct = (idClient) =>{ }
    
}

export default OrderPage