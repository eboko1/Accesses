class ProfilePage {


    selectUA = () => {
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.get('.styles-m__userName---h3mg1').click()
        .then (()=>{
        cy.get('#language').click()
        cy.contains('Українська').click();
        cy.wait(1000)
        })
        .then (()=>{
            cy.get('.ant-btn').first().click({force: true});
        })
    }

    selectEN = () => {
     
    }
}

export default ProfilePage