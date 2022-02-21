class Menu {


    menuOpen = (nameSubMenu, nameItemMenu, nameOpenPage) => {
        cy.get('.ant-menu-submenu-title').contains(nameSubMenu).click({force: true})
        cy.get('.ant-menu-item').contains(nameItemMenu).click({force: true})
        cy.wait(2000);
        cy.get('h1').should('have.text', nameOpenPage)
        cy.get('.ant-layout-content').should('exist')
    }
}

export default Menu