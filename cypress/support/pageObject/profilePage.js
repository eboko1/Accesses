class ProfilePage {


    selectUA = () => {
        cy.get('.ant-select-selector').last().click({force: true})
        cy.contains('Українська').click({force: true});
        cy.wait(1000)
        .then (()=>{
            cy.get('.ant-btn').first().click({force: true});
        })
    }

    selectEN = () => {
     
    }
}

export default ProfilePage