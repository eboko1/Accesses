

class OrderPage {
    
    openNZ = (idClient) => {
        cy.wait(3000); 
        cy.get('.ant-input-wrapper > .ant-input').type(idClient)
        cy.wait(3000);
        cy.get('h1').first().click({ force: true })
        cy.wait(3000);
        cy.get('tr > td > a').first().click({ force: true })
        cy.wait(3000);
    }

    openNZMehanic = () => {
        cy.wait(7000); 
        cy.get('tr > td > a').first().invoke('text')
        .then (text => {var codeNZ = text;
            cy.log(codeNZ)
            const numArr = text.split('-')  //[MDR, 594, 12345]
            cy.get('.ant-input-wrapper > .ant-input').last().type(numArr[numArr.length-1])//пошук
            cy.get('.ant-input-wrapper > .ant-input').type(codeNZ)
            cy.get('tr > td > a').first().click({ force: true })
            cy.wait(5000);
        })
    }

   createOrder = (idClient) =>{
        cy.wait(4000); 
        cy.get('a > .ant-btn').first().click(); // add н/з
        cy.wait(3000)
        cy.get('#orderForm_searchClientQuery').clear().type('Клієнт'+idClient)
          .then(()=>{
              cy.wait(3000)
              cy.get('.ant-table-cell').eq(5).click({force: true});
            })
        .then(()=>{
        cy.get('.ant-btn').first().click();
        cy.wait(2000) ///Ремонт ДОДАНО
        })
   }

   deleteOrder = () =>{
        cy.wait(4000); 
        cy.get('.anticon-delete').first().click({force: true})
        cy.wait(1000);
        cy.get('.ant-modal').should('be.visible')
        cy.get('.styles-m__submit---20j0q').contains('Так').click({force: true})
        cy.wait(3000); 
        cy.get('h1').contains('Відмова').should('exist') 
        cy.get('.ant-modal-close-x').last().click({force: true})
        cy.wait(1000);
    }

   copyOrder = () =>{
        cy.wait(4000); 
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

   addComments = () =>{
        cy.wait(4000); 
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

    addCommentSH = () =>{
        cy.wait(4000); 
        cy.get('textarea').first().type('Не заляпать бампер мастилом');
        cy.get('[aria-label="save"]').click()
        cy.wait(3000);
        cy.get('textarea').first().should('have.text','Не заляпать бампер мастилом');
    }

    createProgress = () =>{
        cy.wait(4000); 
        cy.get('.ant-dropdown-trigger').eq(1).trigger('mouseover')////Переведіть н/з в статус Ремонт 
        cy.wait(1000);
        cy.get('.ant-dropdown-menu-item').contains('Ремонт').click()
        cy.wait(5000);
    }
    createSuccess= () =>{
        cy.wait(4000); 
        // зняти резерв для ЗЧ
        cy.get('.ant-tabs-nav').contains('Запчастини').click()
        cy.get('tr > td').find('button').contains('1.0').click({force: true});
        // **зняти резерв для ЗЧ
        cy.wait(2000);
        cy.get('.ant-dropdown-trigger').eq(1).trigger('mouseover')////Переведіть н/з в статус Завершено 
        cy.wait(1000);
        cy.get('.ant-dropdown-menu-item').contains('Завершено').click()
      / cy.wait(4000);
        cy.get('.ant-modal-confirm-btns').contains('Гаразд').click()   // модалка не має зарезервованих ЗЧ
        cy.wait(5000);
        cy.get('[data-qa="button_submit_yes_to_success_form"]').click()
        cy.wait(5000);
    }

   payOrderCredit = (nameCash,summ) =>{
        cy.get('.anticon-dollar').click({force: true})
        cy.wait(7000);
        cy.get('[data-qa="select_credit_card"]').type(nameCash+'{enter}');  //Вибір Каси
        cy.wait(2000);
        cy.get('[data-qa="input_sum"]').clear()
        cy.wait(2000);
        cy.get('[data-qa="input_sum"]').type(summ)
        cy.wait(2000);
        cy.get('.ant-btn-primary').last().click({force: true});//ОК;
        cy.wait(1000);   
    }

   payOrderDollar = (nameCash) =>{
        cy.get('.anticon-dollar').last().click() // повна оплата суми 
        cy.wait(6000)
        cy.get('[data-qa="select_credit_card"]').type(nameCash+'{enter}');  //Вибір Каси
        cy.wait(2000)
        cy.get('.ant-modal-footer').last().find('.ant-btn').click({ multiple: true })
        cy.wait(2000)
    }

   checkOrder = () =>{ 
        cy.get('[data-qa=select_date_order_page]').should('not.have.value','')                          ///select_date_order_page
        cy.get('[data-qa=select_station_order_page]').should('not.have.text','Оберіть пост')
        cy.get('[data-qa=provide_time_order_page]').should('not.have.value','')
        cy.get('[data-qa=select_delivery_date_order_page]').should('not.have.value','')
        cy.get('[data-qa=select_manager_order_page]').should('not.have.text','')
        cy.get('[data-qa=select_master_order_page]').should('not.have.text','')
        cy.get('[data-qa=select_appurtenancies_responsible_order_page]').should('not.have.text','Вкажіть Запчастиста')     ///Запчастист
        cy.get('[data-qa=select_payment_method_order_page]').should('not.have.text','Виберіть спосіб розрахунку') 
        cy.get('[data-qa=select_payment_method_order_page]').should('not.have.text','') 
        cy.get('[data-qa=select_business_requisites_order_page]').should('not.have.text','Вкажіть реквізити')            // Реквізити СТО
        cy.get('[data-qa=select_client_requisites_order_page]').should('have.text','Вкажіть реквізити')              /// Реквізити Клієнта
        cy.get('[data-qa=input_total_discount_or_markup_order_page]').should('have.value',7)            // Націнка
        cy.get('[data-qa=input_number_client_provide_odometr_order_page]').should('have.value',123456)  // Пробіг
   }

   checkOrderSH = () =>{ 
        cy.get('.ant-select-selector').eq(1).should('not.have.text','') // ПОСТ
        cy.get('.ant-select-selector').eq(2).should('not.have.text','') // відповідальний
        cy.get('.ant-select-selector').eq(3).should('not.have.text','') // мех
        cy.wait(2000);
        cy.get('.ant-select-selector').eq(4).should('not.have.text','') ///Вибір Готівка 
        cy.wait(1000);
        cy.get('.ant-select-selector').eq(5).should('not.have.text','') // тип заміни
        cy.get('.ant-input-number-input').eq(0).should('have.value',7)  // НАЦІНКА
        cy.get('.ant-select-selector').eq(8).should('not.have.text','') // легковий
        cy.get('.ant-select-selector').eq(9).should('not.have.text','') // тип заміни
    }

   editOrder = () =>{ 
        cy.get('label').find('span').eq(1).click() // відкриття модалки Планувальника ч/з іконку в НЗ
        cy.wait(2000);
        cy.get('.timeColumn > :nth-child(2)').should('exist') 
        cy.get('.ant-modal-body').should('be.visible').find('a').eq(2).click({force: true}) // Вибір поста клік + 11:00
        cy.get('.ant-modal-close').last().click({ force: true })  ///Закриття модалки Планувальника
       
        cy.get('[data-qa=select_station_order_page]').should('be.visible').type('{downarrow}{enter}') 
        cy.get('[data-qa=select_master_order_page]').type('Механік{enter}')
        cy.get('[data-qa=select_appurtenancies_responsible_order_page]').type('Запчастист{enter}')
        cy.get('[data-qa=select_payment_method_order_page]').type('{enter}') ///Вибір Готівка 
        cy.get('[data-qa=select_business_requisites_order_page]').type('{downarrow}{enter}'); ///Вибір Реквізитів STO
        cy.get('.ant-input-number-input').eq(0).clear()
        cy.get('.ant-input-number-input').eq(0).type('7') 
        cy.get('[data-qa=input_number_client_provide_odometr_order_page]').clear()
        cy.get('[data-qa=input_number_client_provide_odometr_order_page]').type('123456')  
        cy.get('[data-icon="save"]').click({force: true})  ///.should('be.visible').last()
        cy.wait(4000);
    }

    editOrderSH = () =>{ 
        cy.wait(5000); 
        cy.get('.ant-select-selector').eq(1).type('{downarrow}{enter}')
        cy.get('.ant-select-selector').eq(2).type('Vika{downarrow}{enter}') // відповідальний
        cy.get('.ant-select-selector').eq(3).type('Vika{downarrow}{enter}')  // мех
        cy.wait(2000);
        cy.get('.ant-select-selector').eq(4).type('{downarrow}{enter}') ///Вибір Готівка 
        cy.wait(1000);
        cy.get('.ant-select-selector').eq(5).type('{downarrow}{enter}') // тип заміни
        cy.get('.ant-input-number-input').eq(0).clear().type('7') 
        cy.get('.ant-select-selector').eq(8).type('{downarrow}{enter}') // легковий
        cy.get('.ant-select-selector').eq(9).type('{downarrow}{enter}') // тип заміни
          .then(function(){
            cy.get('[aria-label=save]').click() // зберегти картку
            cy.wait(2000);
        })
    }

   getInfoAuto = () => {
        cy.get('.anticon-question-circle').first().click({force: true})
        /////cy.get('[title="Інфо по автомобілю"] > .anticon').click({force: true})
        cy.wait(8000);
        cy.get('.ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-body').should('exist');
        cy.wait(2000);
        cy.get('.ant-table-cell').should('not.have.text','')
        cy.wait(1000);
    }

    getStatisticOrder = () =>{
        cy.get('.anticon-info-circle').click({force: true})
        cy.wait(3000);
        cy.get('.ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-body').should('exist');
        cy.get('.ant-modal-header').last().contains('Статистика по н/з').should('exist');
        cy.get('.ant-modal-header').find('span').contains('Завершено').should('exist');
        cy.get('.ant-modal-close-x').last().click({force: true})
        cy.wait(1000);
    }

    downloadOrder = () =>{ 
        cy.get('.anticon-printer').click();  /// Завантаження Наряд замовлення для Клієнта
        cy.get('.ant-dropdown-menu-item').eq(5).click({force: true});
        cy.wait(5000); 
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
            cy.wait(4000);
            cy.readFile(path.join('cypress/downloads', 'order-'+codeNZ+'.pdf')).should("exist"); // файл Наряд замовлення для Клієнта
        })
    }

     createAppointments = () =>{  
        cy.get('.ant-dropdown-trigger').eq(1).trigger('mouseover') // Статус Запис
        cy.wait(2000);
        cy.get('.ant-dropdown-menu-item').contains('Запис').first().click({ force: true });
        cy.wait(3000);
    }

    createDiagnostic = () =>{ 
        cy.get('.ant-tabs-nav').contains('Діагностика').click(); //клік на вкладку діагностики
        cy.wait(2000);
        cy.log('Клік на випливаюче меню');
        cy.get('.ant-select-selector').eq(11).click();
        cy.wait(2000);
        cy.log('Вибір діагностики');
        cy.get('.ant-select-item-option-content').eq(2).click()
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
            ////cy.get('.styles-m__diagnosticTableHeader---1_8Bu > .styles-m__diagnostic_status_button_wrap---ucmHY > [title="Вузол / все гаразд"]').click();
            cy.get('[data-qa="btn_ok_title_diagnostic_table_order_page"]').first().click({force: true})
            cy.wait(5000)
        })
        .then(()=>{
            cy.wait(5000)
            cy.get('tr > td').find('button').contains('Редагувати').first().click({force: true}); //редагувати
        })
        .then(()=>{
            cy.wait(3000)
            cy.get('[data-row-key] > :nth-child(5) > .styles-m__diagnostic_status_button_wrap---ucmHY > .ant-btn-danger').first().click({force: true}); // Клік на Критично;
        })
        .then(()=>{
            cy.wait(2000)
            cy.get('tr > td > button').first().click({force: true}); // габургер 
            cy.wait(2000)
            cy.get('.styles-m__actionBlock---1BgjR > :nth-child(2) > .ant-btn').first().click({force: true}); 
            cy.wait(3000)
        })
        .then(()=>{
            cy.log('модалка Додати коментар!');
            cy.get(':nth-child(1) > .styles-m__blockButtonsWrap---1vfJT > :nth-child(3)').click(); // Що?
            cy.get(':nth-child(2) > .styles-m__blockButtonsWrap---1vfJT > :nth-child(1)').click(); //Де?
            cy.get('.ant-modal-footer > .ant-btn-primary').last().click();//зберегти модалка Додати коментар
            cy.wait(4000)
        })
        .then(()=>{
            cy.log('Створити калькуляцію');
            cy.get('.ant-btn').contains('Створити калькуляцію').click();//кнопка Створити калькуляцію
        })
        .then(()=>{
            cy.get('.styles-m__confirm_diagnostic_modal_element_title---1wZ-P > .ant-btn').click();
            cy.wait(4000)
        })
        .then(()=>{
            cy.log('Звершити діагностику');
            cy.get('button').contains('Завершити діагностику').click({force: true});
            cy.wait(4000)
        })
   }
    checkDollar = () =>{
        cy.get('.anticon-dollar').should('not.exist')// ел не має на в DOM
    }

    checkHistory = () =>{ 
        cy.wait(4000);
        cy.get('.ant-tabs-nav').contains('Історія').click();  
        cy.get('.ant-table-tbody').should('exist') // Для нового клієнта історія містить 1 елемент
    }
    
    checkTabPost = () =>{ 
        cy.wait(2000);
        cy.log('Вкладка Пост');
        cy.get('.ant-tabs-nav').contains('Пост').click();
        cy.get('.styles-m__staticStationLoadsRow---MnLCJ > :nth-child(1)').should('exist');
    }


    btnAddLaborPlus = () => {
        cy.get('.styles-m__headerActions---2S-7g > [title="Додати"]').click()
    }

    btnAddLaborPlusSH = () => {
        cy.get('[title="Додати / редагувати роботу"]').last().click({force: true});
    }
}

export default OrderPage