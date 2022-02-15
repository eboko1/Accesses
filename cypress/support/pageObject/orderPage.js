

class OrderPage {
    
   createOrder = (idClient) =>{
        cy.get('a > .ant-btn').first().click(); // add н/з
        cy.wait(3000)
        cy.get('#orderForm_searchClientQuery').clear().type('Клієнт'+idClient)
          .then(()=>{
            // //    //// cy.get('.styles-m__clientBlock---1yPc8 > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-content > .ant-table-body > table > .ant-table-tbody > .ant-table-row > :nth-child(1)')
            // //    ///    .first().click({force: true});
              cy.wait(3000)
              cy.get('.ant-table-cell').eq(5).click({force: true});
            })
        .then(()=>{
            cy.get('.ant-btn').first().click();
        })
        .then(()=>{
            cy.wait(2000) ///Ремонт ДОДАНО
        })
   }

   deleteOrder = (idClient) =>{
        cy.get('tr > td > a').first().invoke('text')
        .then (text => {var codeNZ = text;
            cy.log(codeNZ)
            const numArr = text.split('-')  //[MDR, 594, 12345]
            cy.get('.ant-input-wrapper > .ant-input').last().type(numArr[numArr.length-1])//пошук
        })
        cy.get('h1').should('have.text','Нові')
        cy.get('tr > td > a').first().click({force: true});
        cy.get('.anticon-delete').first().click({force: true})
        cy.wait(1000);
        cy.get('.ant-modal').should('be.visible')
        cy.get('.styles-m__submit---20j0q').contains('Так').click({force: true})
        cy.wait(3000); 
        cy.get('h1').contains('Відмова').should('exist') 
        cy.get('.ant-modal-close-x').last().click({force: true})
        cy.wait(1000);
    }

   copyOrder = (idClient) =>{
        cy.get('tr > td > a').first().invoke('text')
        .then (text => {var codeNZ = text;
            cy.log(codeNZ)
            const numArr = text.split('-')  //[MDR, 594, 12345]
            cy.get('.ant-input-wrapper > .ant-input').last().type(numArr[numArr.length-1])//пошук
        })
        cy.wait(4000);
        cy.get('h1').should('have.text','Виконані')
        cy.get('tr > td > a').first().click({force: true});
        cy.get('.anticon-copy').last().click({force: true})
        cy.wait(1000);
        cy.get('.ant-modal-confirm-body-wrapper').should('be.visible')
        cy.wait(1000); 
        cy.get('.ant-modal-confirm-btns > .ant-btn-primary').first().click({force: true})
        cy.wait(5000); 
        cy.get('h1').contains('Новий').should('exist')
        cy.get('.ant-modal-close-x').last().click({force: true})
        cy.wait(1000); 
    }

   addComments = (idClient) =>{
        cy.wait(4000);
        cy.get('tr > td > a').first().invoke('text')
          .then (text => { var codeNZ = text;
            cy.log(codeNZ)
            const numArr = text.split('-')  //[MDR, 594, 12345]
            cy.get('.ant-input-wrapper > .ant-input').last().type(numArr[numArr.length-1])//пошук
        })
        cy.get('h1').should('have.text','Ремонти')
        cy.get('tr > td > a').first().click({force: true});
        cy.get('.ant-tabs-nav').contains('Коментарі').click()
        cy.get('[data-qa=comment_client_order_page]').clear().type('Не заляпать бампер мастилом');
        cy.get('[data-qa=txt_area_comment_order_form_tabs_order_page]').contains('Не заляпать бампер мастилом');

        cy.get('[data-qa=txt_area_comment_vehicle_condition_order_form_tabs_order_page]').clear().type('Без царапин...'); //Стан автомобіля
        cy.wait(2000);
        cy.get('[data-qa=txt_area_business_comment_order_form_tabs_order_page]').clear().type('Замінити повітряні фільтри мотора'); 
        cy.get('[data-qa=txt_area_comment_service_recommendation_order_form_tabs_order_page]').clear().type('Пройти повторно діагностику');
        cy.wait(1000);
        cy.get('.anticon-save > svg').first().click({force: true});
        cy.wait(5000);
        cy.get('.ant-tabs-nav').contains('Коментарі').click()
        cy.wait(1000);
        cy.get('[data-qa=comment_client_order_page]').should('not.have.text','Коментарі клієнта');
        cy.get('[data-qa=txt_area_business_comment_order_form_tabs_order_page]').should('have.text','Замінити повітряні фільтри мотора'); 
        cy.get('[data-qa=txt_area_comment_service_recommendation_order_form_tabs_order_page]').contains('Пройти повторно діагностику')  
        cy.get('[data-qa=txt_area_comment_service_recommendation_order_form_tabs_order_page]').should('not.have.text','Рекомендації для клієнта');
 }

   createProgress = (idClient) =>{
        cy.wait(3000);
        cy.get('.ant-input-wrapper > .ant-input').type(idClient)//пошук
        cy.wait(2000);
        cy.get('tr > td > a').first().click({force: true});
        cy.wait(5000);
        cy.get('.ant-dropdown-trigger').eq(1).trigger('mouseover')////Переведіть н/з в статус Ремонт 
        cy.wait(1000);
        cy.get('.ant-dropdown-menu-item').contains('Ремонт').click()
        cy.wait(5000);
    }

   payOrder = (idClient) =>{
        cy.get('.ant-input-wrapper > .ant-input').type(idClient)//пошук
        cy.wait(2000);
        cy.get('tr > td > a').first().click({force: true});
        cy.log('Вибір Н/З');
        cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(1)').click();
        cy.wait(1000);
        cy.log('Модалка Виконати наряд-замовлення?');
        cy.get('#ОВ > .styles-m__mapChildsBlock---1oGYD > :nth-child(3) > .ant-btn').click();
        cy.get('#withPayment > :nth-child(1) > :nth-child(2)').click();  //Сплатити радіо-кнопка Так
        
        cy.get('#cashBoxId').type('Готівка{enter}');  //Вибір Каси
        cy.get('.ant-btn-primary').last().click({force: true});//ОК;
        cy.wait(5000);
        cy.get('h1').contains('Виконано')
        cy.wait(4000);   
    }

   payOrderStart = (idClient) =>{
        cy.get('.ant-input-wrapper > .ant-input').type(idClient)//пошук
        cy.wait(2000);
        cy.get('tr > td > a').first().click({force: true});
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
    cy.get('.ant-input-wrapper > .ant-input').type(idClient)
    cy.wait(2000);
    cy.get('tr > td > a').first().click({ force: true })
      .then(()=>{
          cy.wait(5000);
          cy.get('[data-qa=select_date_order_page]').should('not.have.value','')  ///select_date_order_page
          cy.get('[data-qa=select_station_order_page]').should('not.have.text','')
          cy.get('[data-qa=provide_time_order_page]').should('not.have.value','')
          cy.get('[data-qa=select_delivery_date_order_page]').should('not.have.value','')
          cy.get('[data-qa=select_manager_order_page]').should('not.have.text','')
          cy.get('[data-qa=select_master_order_page]').should('not.have.text','')
          cy.get('[data-qa=select_appurtenancies_responsible_order_page]').should('not.have.text','')  ///Запчастист
          cy.get('[data-qa=select_payment_method_order_page]').should('have.text','Готівка') 
          cy.get('[data-qa=select_payment_method_order_page]').should('not.have.text','') 
          cy.get('[data-qa=select_business_requisites_order_page]').should('not.have.text','') // Реквізити СТО
          cy.get('[data-qa=select_client_requisites_order_page]').should('not.have.text','')/// Реквізити Клієнта
         
          cy.get('[data-qa=input_total_discount_or_markup_order_page]').should('have.value',7) // Націнка
          cy.get('[data-qa=input_number_client_provide_odometr_order_page]').should('have.value',123456) // Пробіг
      })
   }

   editOrder = (idClient) =>{
        cy.get('.ant-input-wrapper > .ant-input').type(idClient)
        cy.wait(2000);
        cy.get('h1').first().click({ force: true }).then(function(){
            cy.get('tr > td > a').first().click({ force: true })
            cy.wait(5000);
        })    
        cy.get('label').find('span').eq(1).click() // відкриття модалки Планувальника ч/з іконку в НЗ
        cy.wait(2000);
        cy.get('.timeColumn > :nth-child(2)').should('exist') 
        cy.get('.ant-modal-body').find('a').first().click({ force: true }) // Вибір поста клік + 11:00
        cy.get('[data-qa=select_station_order_page]').type('{enter}') 
        cy.wait(2000);
        cy.get('.ant-modal-close').last().click({ force: true })  ///Закриття модалки Планувальника
        cy.get('[data-qa=select_master_order_page]').type('Механік{enter}')
        cy.get('[data-qa=select_appurtenancies_responsible_order_page]').type('Запчастист{enter}')
    
        cy.wait(2000);
        cy.get('[data-qa=select_payment_method_order_page]').type('{enter}') ///Вибір Готівка 
        cy.get('[data-qa=select_business_requisites_order_page]').type('{downarrow}{enter}'); ///Вибір Реквізитів STO
        cy.wait(1000);
        cy.get('.ant-input-number-input').eq(0).clear().type('7') 
        cy.get('[data-qa=input_number_client_provide_odometr_order_page]').clear().type('123456') 
        .then(function(){
            cy.get('[aria-label=save]').click() // зберегти картку
            cy.wait(2000);
        })
    }

   getInfoAuto = () => {
        cy.wait(4000);
        cy.get('tr > td > a').first().invoke('text')
          .then (text => {var codeNZ = text;
            cy.log(codeNZ)
            const numArr = text.split('-')  //[MDR, 594, 12345]
            cy.get('.ant-input-wrapper > .ant-input').last().type(numArr[numArr.length-1])//пошук
        })
        cy.wait(2000);
        cy.get('tr > td > a').first().click({force: true});
        cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(1)').click(); /// Вибір Н/З
        cy.wait(1000);
        cy.get('[title="Інфо по автомобілю"] > .anticon > svg').click({force: true})
        cy.wait(6000);
        cy.get('.ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-body').should('exist');
        cy.wait(6000);
        cy.get('.styles-m__tableHeader---1i3oL').should('have.text','Спецификации масел и технических жидкостей')
        cy.get('.ant-modal-close-x').last().click({force: true})
        cy.wait(1000);
    }

    getStatisticOrder = () =>{
        cy.wait(4000);
        cy.get('tr > td > a').first().invoke('text')
        .then (text => {var codeNZ = text;
            cy.log(codeNZ)
            const numArr = text.split('-')  //[MDR, 594, 12345]
            cy.get('.ant-input-wrapper > .ant-input').last().type(numArr[numArr.length-1])//пошук
        })
        cy.wait(2000);
        cy.get('tr > td > a').first().click({force: true});
        cy.log('Вибір Н/З');
        cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(1)').click();
        cy.wait(1000);
        cy.get('.anticon-info-circle').click({force: true})
        cy.wait(3000);
        cy.get('.ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-body').should('exist');
        cy.get('.ant-modal-header').last().contains('Статистика по н/з').should('exist');
        cy.get('.ant-modal-header').find('span').contains('Завершено').should('exist');
        cy.get('.ant-modal-close-x').last().click({force: true})
        cy.wait(1000);
    }

    downloadOrder = () =>{ 
        cy.get('tr > td > a').first().invoke('text')
          .then (text => {var codeNZ = text;
            cy.log(codeNZ)
            const numArr = text.split('-')  //[MDR, 594, 12345]
            cy.get('.ant-input-wrapper > .ant-input').last().type(numArr[numArr.length-1])//пошук
        })
        cy.wait(2000);
        cy.get('tr > td > a').first().click({force: true});
        cy.wait(4000);
        cy.get('.anticon-printer > svg').click();
        cy.log('Завантаження Наряд замовлення для Клієнта');
        cy.get('.ant-dropdown-menu-item').eq(5).click({force: true});
        cy.wait(4000); 
    }

   checkDownloadOrder = () =>{ 
        cy.get('tr > td > a').first().invoke('text')
        .then (text => {var codeNZ = text;
            cy.log(codeNZ)
            const numArr = text.split('-')  //[MDR, 594, 12345]
            cy.get('.ant-input-wrapper > .ant-input').last().type(numArr[numArr.length-1])//пошук
        })
        cy.wait(2000);
        cy.get('tr > td > a').first().invoke('text')
            .then (text => {var codeNZ = text;
            cy.log(codeNZ)
            const path = require("path");
            cy.wait(2000);
            cy.readFile(path.join('cypress/downloads', 'order-'+codeNZ+'.pdf')).should("exist"); // файл Наряд замовлення для Клієнта
        })
    }

     createAppointments = (idClient) =>{ 
        cy.get('.ant-input-wrapper > .ant-input').type(idClient)
        cy.wait(2000);
        cy.get('tr > td > a').first().click({ force: true });
        cy.url().should('include', '/order/')
          .then(()=>{
            cy.wait(5000);
           //// cy.get('.styles-m__dropdownTitle---3Vlog > :nth-child(2) > span').click(); // Статус Запис
           cy.get('.ant-dropdown-trigger').eq(1).trigger('mouseover') // Статус Запис
           cy.wait(2000);
        }).then(()=>{
            cy.get('.ant-dropdown-menu-item').contains('Запис').first().click({ force: true });
            cy.wait(2000);
        })
    }

    createDiagnostic = (idClient) =>{ 
        cy.get('.ant-input-wrapper > .ant-input').type(idClient)
        cy.wait(2000);
        cy.get('tr > td > a').first().click({force: true})
        .then(()=>{
            cy.wait(2000)
            /////cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(2)').click(); // //клік на вкладку діагностики
            cy.get('#rc-tabs-0-tab-diagnostic').click(); //клік на вкладку діагностики
        })
        .then(()=>{
            cy.log('Клік на випливаюче меню');
            cy.get('.ant-select-selector').eq(11).click();
        })
        .then(()=>{
            cy.log('Вибір діагностики');
            cy.get('.ant-select-item-option-content').eq(2).click();
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
            cy.wait(2000)
        })
        .then(()=>{
            cy.get('[data-row-key] > :nth-child(5) > .styles-m__diagnostic_status_button_wrap---ucmHY > .ant-btn').first().click({force: true}); //редагувати
        })
        .then(()=>{
            cy.wait(2000)
            cy.get('[data-row-key] > :nth-child(5) > .styles-m__diagnostic_status_button_wrap---ucmHY > .ant-btn-danger').first().click({force: true}); // Клік на Критично;
        })
        .then(()=>{
            cy.wait(2000)
            cy.get('tr > td > button').first().click({force: true}); // габургер 
            cy.wait(2000)
            cy.get('.styles-m__actionBlock---1BgjR > :nth-child(2) > .ant-btn').first().click({force: true}); 
        })
        .then(()=>{
            cy.log('модалка Додати коментар!');
            cy.get(':nth-child(1) > .styles-m__blockButtonsWrap---1vfJT > :nth-child(3)').click(); // Що?
            cy.get(':nth-child(2) > .styles-m__blockButtonsWrap---1vfJT > :nth-child(1)').click(); //Де?
            cy.get('.ant-modal-footer > .ant-btn-primary').last().click();//зберегти модалка Додати коментар
        })
        .then(()=>{
            cy.log('Створити калькуляцію');
            cy.get('[style="width: 35%; margin-right: 5px;"]').click();//кнопка Створити калькуляцію
        })
        .then(()=>{
            cy.get('.styles-m__confirm_diagnostic_modal_element_title---1wZ-P > .ant-btn').click();
            cy.wait(3000)
        })
        .then(()=>{
            cy.log('Звершити діагностику');
            cy.get('button').contains('Завершити діагностику').click({force: true});
        })
   }
    checkDollar = () =>{
        cy.get('tr > td > a').first().invoke('text')
        .then (text => {var codeNZ = text;
            cy.log(codeNZ)
            const numArr = text.split('-')  //[MDR, 594, 12345]
            cy.get('.ant-input-wrapper > .ant-input').last().type(numArr[numArr.length-1])//пошук
        })
        cy.get('h1').should('have.text','Виконані')
        cy.get('tr > td > a').first().click({force: true});
        cy.get('.anticon-dollar').should('not.exist')// ел не має на в DOM
    }

    checkHistory = () =>{ 
        cy.get('tr > td > a').first().invoke('text')
        .then (text => {var codeNZ = text;
            cy.log(codeNZ)
            const numArr = text.split('-')  //[MDR, 594, 12345]
            cy.get('.ant-input-wrapper > .ant-input').last().type(numArr[numArr.length-1])//пошук
        })
        cy.get('h1').should('have.text','Виконані')
        cy.wait(2000);
        cy.get('tr > td > a').first().click({force: true});
        cy.log('Вибір Запису');
        cy.wait(4000);
        cy.get('.ant-tabs-nav').contains('Історія').click();  ///Для нового клієнта історія містить 1 елемент
        cy.get('.ant-table-row > :nth-child(2) > a').should('exist');

    }
    checkTabPost = () =>{ 
        cy.get('tr > td > a').first().invoke('text')
        .then (text => {var codeNZ = text;
            cy.log(codeNZ)
            const numArr = text.split('-')  //[MDR, 594, 12345]
            cy.get('.ant-input-wrapper > .ant-input').last().type(numArr[numArr.length-1])//пошук
        })
        cy.get('h1').should('have.text','Виконані')
        cy.wait(2000);
        cy.get('tr > td > a').first().click({force: true});
        cy.log('Вибір Запису');
        cy.wait(4000);
        cy.log('Вкладка Пост');
        cy.get('.ant-tabs-nav').contains('Пост').click();
        cy.get('.styles-m__staticStationLoadsRow---MnLCJ > :nth-child(1)').should('exist');
    
    }

    addLabor = (idClient) =>{ }


    addProduct = (idClient) =>{ }
    
}

export default OrderPage