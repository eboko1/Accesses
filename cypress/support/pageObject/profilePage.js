class ProfilePage {


    selectUA = () => {
        cy.get('[href="/profile"]').click()
        cy.get('.ant-tabs').find('.ant-select-selector').eq(0).click({force: true})
        cy.get('.ant-select-item').eq(1).click({force: true})
        cy.wait(1000)
        cy.get('.ant-tabs').find('.ant-btn').first().click({force: true});
    }

    selectEN = () => {
     
    }
    selectSH = () => {
         cy.get('[href="/profile"]').click()
         cy.get('.ant-tabs').find('.ant-select-selector').last().click({force: true})
         cy.get('.ant-select-item').last().click({force: true})
         cy.wait(1000)
         cy.get('.ant-tabs').find('.ant-btn').first().click({force: true});
         cy.wait(3000)
    }

    logout = () => {
        cy.get('[data-icon="appstore"]').click({force: true})
        cy.wait(1000)
        cy.get('[aria-label="poweroff"]').click({force: true})
        cy.wait(1000)
    }
}

export default ProfilePage