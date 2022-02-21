class ClientPage {

    createClient = (idClient,tel) => {   
        cy.get('.anticon-plus').click()      // Додати клієнта через + 
        .then(()=>{
            cy.log('Модалка Додати Клієнта')
            cy.get('#name').type('БазовийКлієнт' + idClient)
            cy.wait(2000)
            cy.get('#patronymic').type('Побатькові')
            cy.get('#surname').type('Прізвище')

            .then(()=>{
                cy.get('#type').click({ force: true })
                cy.get('.ant-select-item-option-content').eq(0).click({ force: true });
            })
            .then(()=>{
                cy.get('#status').click();
                cy.contains('Постійний').click();
            })
            .then(()=>{
                cy.get('#source').click();
                cy.contains('CarBook').click();
            })
            .then(()=>{
                cy.get('#sex').click();
                cy.contains('Чоловіча').click();
            })
            .then(()=>{
                cy.wait(1000)
                cy.get('#comment').click({ force: true }).type('Комент Постійний Клієнт)))')
            })
            .then(()=>{
                cy.get('.ant-modal-body').find('.ant-input-number-input').first().type('05025351'+tel)
            })
            .then(()=>{
                cy.wait(2000)
                cy.get('.ant-modal-body').find('.ant-input').last().clear().type('eboko1@gmail.com')
            })
            .then(()=>{
                cy.get('#paymentRespite').first().clear().type('5');
            })
            .then(()=>{
                cy.wait(1000)
                cy.log('Додавання АВТО');
                cy.get('.styles-m__addVehicleButtonCont---Y1h26 > .ant-btn').first().click({ force: true }) //{ force: true }
            })
            .then(()=>{
                cy.get('#vehicle_add_from_number').clear().type('АО6028ВО') // Додавання Держ.номера а/м
            })
            .then(()=>{
                cy.get('#vehicle_add_from_vin').type('MDHFBUK13U0107588'); // VIN авто
                cy.wait(2000)
            })
            .then(()=>{
                cy.get(':nth-child(3) > .ant-col-12').click().type('2011{enter}') // Рік авто
            })
            .then(()=>{
                cy.get(':nth-child(4) > .ant-col-12').click().type('NISSAN{enter}') //Марка авто
                cy.wait(2000)
            })
            .then(()=>{
                cy.get(':nth-child(5) > .ant-col-12').click().type('MICRA IV (K13){downarrow}{enter}') //Модель авто
                cy.wait(2000)
            })
            .then(()=>{
                cy.get(':nth-child(6) > .ant-col-12').click().type('1.2{enter}') //Модифікація авто
                cy.wait(2000)
            })
            .then(()=>{
                cy.get(':nth-child(7) > .ant-col-12').click().type('Чорний{enter}') //Колір
            })
            .then(()=>{
                cy.wait(2000)
                cy.log('Кнопка ОК');
                cy.get('.ant-btn-primary').eq(5).click()  // first()      .first().click({ force: true })
            })
            })
            .then(()=>{
                cy.log('АВТО ДОДАНО');
                cy.wait(3000)
            })
            .then(()=>{
            cy.get('.ant-btn-primary').eq(4).click();
            cy.get('.ant-btn-primary').contains('Додати').click({force: true} )
            cy.wait(3000)
            })
    }

    createClientPageClient = (idClient,tel) => {    
        cy.wait(2000);
        cy.get('h1').should('have.text','Клієнти')
        cy.get('.ant-table-body').should('exist')
        .then(()=>{
            cy.wait(3000)
            cy.log('Додати клієнта через +');
            cy.get('.anticon-plus').click()

        })
        .then(()=>{
            cy.log('Модалка Додати Клієнта')
            cy.get('#name').type('БазовийКлієнт' + idClient)
            cy.wait(2000)
            cy.get('#patronymic').type('Побатькові')
            cy.get('#surname').type('Прізвище')

            .then(()=>{
                cy.get('#type').click({ force: true })
                cy.get('.ant-select-dropdown-menu-item').eq(0).click({ force: true });
            //// cy.get('#sex').click();
            //// cy.contains('Чоловіча').click();
            })
            .then(()=>{
                cy.get('#status').click();
                cy.contains('Постійний').click();
            })
            .then(()=>{
                cy.get('#source').click();
                cy.contains('CarBook').click();
                cy.get('#source').should('have.text','CarBook');
            })
            .then(()=>{
            cy.get('#sex').click();
            cy.contains('Чоловіча').click();
            })
            .then(()=>{
                cy.log('Дата народження клієнта ');
                cy.get('#birthday').click();
                cy.contains('10').click();
            })
            .then(()=>{
                cy.wait(1000)
                cy.get(':nth-child(3) > :nth-child(3) > .ant-row > .ant-form-item-control-wrapper > .ant-form-item-control > .ant-form-item-children > #comment').click({ force: true }).type('Комент Постійний Клієнт)))')
            })
            .then(()=>{
                cy.get('.ant-modal-body').find('.ant-input-number-input').first().clear().type(tel)
            })
            .then(()=>{
                cy.get('.ant-modal-body').find('.ant-input').last().clear().type('eboko1@gmail.com')
            })
            .then(()=>{
                cy.get('#paymentRespite').first().clear().type('5');
            })
            .then(()=>{
                cy.wait(1000)
                cy.log('Додавання АВТО');
                cy.get('.styles-m__addVehicleButtonCont---Y1h26 > .ant-btn').first().click({ force: true }) //{ force: true }
            })
            .then(()=>{
                cy.get('#vehicle_add_from_number').clear().type('АО6028ВО') // Додавання Держ.номера а/м
            })
            .then(()=>{
                cy.get('#vehicle_add_from_vin').type('MDHFBUK13U0107589'); // VIN авто
                cy.wait(2000)
            })
            .then(()=>{
                cy.get(':nth-child(3) > .ant-col-12').click().type('2014') // Рік авто
                cy.wait(2000)
                cy.get('.ant-select-dropdown-menu-item-active').click()
                cy.wait(2000)
            })
            .then(()=>{
                cy.get(':nth-child(4) > .ant-col-12').click().type('NISSAN') //Марка авто
                cy.wait(2000)
                cy.get('.ant-select-dropdown-menu-item-active').click()
                cy.wait(3000)
            })
            .then(()=>{
                cy.get(':nth-child(5) > .ant-col-12').click().type('MICRA')  //Модель авто
                cy.wait(2000)
                cy.get('.ant-select-dropdown-menu-item-active').click()
                cy.wait(2000)
            })
            .then(()=>{
                cy.get(':nth-child(6) > .ant-col-12').click().type('1.4 16V')  //Модифікація авто
                cy.wait(2000)
                cy.get('.ant-select-dropdown-menu-item-active').click({force: true})
                cy.wait(2000)

            })
            .then(()=>{
                cy.get(':nth-child(7) > .ant-col-12').click({force: true}).type('Чорний') //Колір
                cy.wait(2000)
                cy.get('.ant-select-dropdown-menu-item-active').click({force: true})
            })
            .then(()=>{
                cy.wait(2000)
                cy.log('Кнопка ОК');
                cy.get('.ant-btn-primary').eq(5).click({force: true})  // first()      .first().click({ force: true })
            })
            })
            .then(()=>{
                cy.log('АВТО ДОДАНО');
                cy.wait(3000)
            })
            .then(()=>{
            cy.get('.ant-btn-primary').eq(4).click({force: true});
            cy.get('.ant-btn-primary').contains('Додати').click({force: true})
            cy.wait(3000)
            })
    }

    checkClient = (idClient,tel) => {
        cy.wait(5000)
        cy.log('Пошук клієнта');
        cy.get('.ant-input').last().type('БазовийКлієнт'+idClient)
        cy.wait(5000)
        .then(()=>{
            cy.get('tr > td > a').first().click({force: true})
        })
        cy.wait(5000)
        cy.get('.ant-select-selection-item').eq(2).should('have.text','CarBook') 
    }

    editClientNumber = (idClient,tel) => {      
        cy.wait(3000)
        cy.log('Пошук клієнта');
        cy.get('.ant-input').last().type('БазовийКлієнт'+idClient)  //
        cy.wait(4000)
        .then(()=>{
            cy.get('tr > td > a').first().click({force: true})
            cy.wait(4000)
        })
        .then(()=>{
            cy.get('.ant-input-number-input').first().clear().type('683781977')
            //cy.get('.ant-form > :nth-child(4) > :nth-child(1)').find('.ant-input-number-input').focus().clear().type('683781977')
            cy.wait(2000)
        })
        .then(()=>{
            cy.get('.ant-modal-confirm-title').should('exist');
            cy.get('.ant-modal-confirm-btns > .ant-btn').click({force: true})
            cy.wait(2000)
            cy.get('.styles-m__editClientForm---2hdWi > .ant-btn').click({force: true})
            cy.wait(2000)
        })
    }

    deleteClient = (idClient,tel) => {
        
    }



}

export default ClientPage