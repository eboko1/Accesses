class LoginPage {

    getUsername =  () => {return cy.get('#login.ant-input')};
    getPassword = () => {return cy.get('#password')};
    getLoginButton = () => {return cy.get('button').click()}  


   
    enterLogin =(username, password) => {
        this.getUsername().type(username).should('have.value', username);
        this.getPassword().type(password,{log: false});
        this.getLoginButton();
        cy.wait(5000)
        cy.get('img').first().click({ force: true })
        cy.get('h1').contains('Календар Завантаження');
     
    }

    checkMessageUsername = (message) => {
  
    }

  
}

export default LoginPage