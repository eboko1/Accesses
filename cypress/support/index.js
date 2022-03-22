// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import addContext from 'mochawesome/addContext'
require('cypress-commands');

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on('uncaught:exception', (err, runnable) => {
    console.log(err);
    return false;
  })

Cypress.on("test:after:run", (test, runnable) => {

    let videoName = Cypress.spec.name
    videoName = videoName.replace('/.js.*', '.js')
    const videoUrl = 'videos/' + videoName + '.mp4'
    addContext({ test }, videoUrl)

    //if (test.state === "failed") {    
        // example to-do app 15/03/22 23:37 -- displays two todo items by default (failed).png  
        //const screenshot =`screenshots/${Cypress.spec.name}/${runnable.parent.title.replaceAll('/', '').replaceAll(':', '')} -- ${test.title} (failed).png`;    
        
    const screenshot =`screenshots/${Cypress.spec.name}/${runnable.parent.title.replaceAll(/[/]|[:]/g, '')} -- ${test.title} (failed).png`;
    addContext({ test }, screenshot); 
   // }
});