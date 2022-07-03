/// <reference types="cypress" />
import ProfilePage from '../support/pageObject/profilePage';
import BaseStorage from '../support/pageObject/storage/baseStorage';

const profilePage = new ProfilePage();
const baseStorage = new BaseStorage();

const idProduct ='DEB'+'8989'
const supplierSystem = 'АСГ S'
const supplierNew = 'NewSupplier'

describe ('CopyStorageDocs|Master|UA|Desktop|', function(){
  const login = (email, password) => {
    cy.session([email, password], () => {
      cy.visit('/')
      cy.get('#loginForm_login').type(email)
      cy.get('#loginForm_password').type(password)
      cy.get('button').click()
      cy.wait(7000)
      cy.get('img').eq(0).click({force: true}) //menu
      cy.getCookie('io')
    })
  }

  beforeEach('User Login ', function(){
    cy.viewport(1240,960)
    login(Cypress.env('LoginMaster'), Cypress.env('pw')) //присутні: доступи до пошуку, реквізити Постачальника з ПДВ та без ПДВ supplierSystem,
  })

  it('Профіль вибір українського інтерфейсу', function(){
    cy.visit('/');
    profilePage.choiceLanguage(1);
  })

  it('ORD to ORD',  function(){
    cy.visit('/new-document');
    baseStorage.openDocsBtn(7);
    baseStorage.openListDocs();   
    baseStorage.copyStoreDoc('ORD');
  })

  it('ORD to BOR',  function(){
    cy.visit('/new-document');
    baseStorage.openDocsBtn(7);
    baseStorage.openListDocs();   
    baseStorage.copyStoreDoc('BOR');
  })

  it('ORD to COM',  function(){
    cy.visit('/new-document');
    baseStorage.openDocsBtn(7);
    baseStorage.openListDocs();   
    baseStorage.copyStoreDoc('COM');
  })

  it('BOR to BOR',  function(){
    cy.visit('/new-document');
    baseStorage.openDocsBtn(9);
    baseStorage.openListDocs();   
    baseStorage.copyStoreDoc('BOR');
  })
  
  it('BOR to ORD',  function(){
    cy.visit('/new-document');
    baseStorage.openDocsBtn(9);  
    baseStorage.openListDocs();   
    baseStorage.copyStoreDoc('ORD'); 
  })

  it('BOR to COM',  function(){
    cy.visit('/new-document');
    baseStorage.openDocsBtn(9); 
    baseStorage.openListDocs();   
    baseStorage.copyStoreDoc('COM'); 
  })

  it('COM to COM',  function(){
    cy.visit('/new-document');
    baseStorage.openDocsBtn(8);
    baseStorage.openListDocs();   
    baseStorage.copyStoreDoc('COM');
  })
  
  it('COM to BOR',  function(){
    cy.visit('/new-document');
    baseStorage.openDocsBtn(8);  
    baseStorage.openListDocs();   
    baseStorage.copyStoreDoc('BOR'); 
  })

  it('COM to ORD',  function(){
    cy.visit('/new-document');
    baseStorage.openDocsBtn(8); // COM
    baseStorage.openListDocs();   
    baseStorage.copyStoreDoc('ORD'); 
  })

  it('INC to INC',  function(){
    cy.visit('/new-document');
    baseStorage.openDocsBtn(10);
    baseStorage.openListDocs();   
    baseStorage.copyStoreDoc('INC');
  })

  it('INC to SRT',  function(){
    cy.visit('/new-document');
    baseStorage.openDocsBtn(10);
    baseStorage.openListDocs();   
    baseStorage.copyStoreDoc('SRT');
  })

  it('SRT to SRT',  function(){
    cy.visit('/new-document');
    baseStorage.openDocsBtn(12);
    baseStorage.openListDocs();   
    baseStorage.copyStoreDoc('SRT');
  })

  it('SRT to INC',  function(){
    cy.visit('/new-document');
    baseStorage.openDocsBtn(12);
    baseStorage.openListDocs();   
    baseStorage.copyStoreDoc('INC');
  })

  it('OUT to OUT',  function(){
    cy.visit('/new-document');
    baseStorage.openDocsBtn(15);
    baseStorage.openListDocs();   
    baseStorage.copyStoreDoc('OUT');
  })

  it('OUT to CRT',  function(){
    cy.visit('/new-document');
    baseStorage.openDocsBtn(15);
    baseStorage.openListDocs();   
    baseStorage.copyStoreDoc('CRT');
  })

  it('CRT to CRT',  function(){
    cy.visit('/new-document');
    baseStorage.openDocsBtn(17);
    baseStorage.openListDocs();   
    baseStorage.copyStoreDoc('CRT');
  })

  it('CRT to OUT',  function(){
    cy.visit('/new-document');
    baseStorage.openDocsBtn(17);
    baseStorage.openListDocs();   
    baseStorage.copyStoreDoc('OUT');
  })

  it('STP to STP',  function(){
    cy.visit('/new-document');
    baseStorage.openDocsBtn(14);
    baseStorage.openListDocs();   
    baseStorage.copyStoreDoc('STP');
  })

  it('STP to STM',  function(){
    cy.visit('/new-document');
    baseStorage.openDocsBtn(14);
    baseStorage.openListDocs();   
    baseStorage.copyStoreDoc('STM');
  })

  it('STM to STM',  function(){
    cy.visit('/new-document');
    baseStorage.openDocsBtn(19);
    baseStorage.openListDocs();   
    baseStorage.copyStoreDoc('STM');
  })

  it('STM to STP',  function(){
    cy.visit('/new-document');
    baseStorage.openDocsBtn(19);
    baseStorage.searchDoc('STM');
    baseStorage.openListDocs();   
    baseStorage.copyStoreDoc('STP');
  })

  it('SRV to SRV',  function(){
    cy.visit('/new-document');
    baseStorage.openDocsBtn(11);
    baseStorage.openListDocs();   
    baseStorage.copyStoreDoc('SRV');
  })

  it('SRV to VRT',  function(){
    cy.visit('/new-document');
    baseStorage.openDocsBtn(11);
    baseStorage.openListDocs();   
    baseStorage.copyStoreDoc('VRT');
  })

  // // it('VRT to VRT | VRT to SRV',  function(){
  // //   cy.visit('/new-document');
  // //   baseStorage.openDocsBtn(!!!!);  // VRT
  // //   baseStorage.openListDocs();   
  // //   baseStorage.copyStoreDoc('VRT') // VRT to VRT
  // //   baseStorage.copyStoreDoc('SRV') // VRT to SRV 
  // // })

  it('TOL to TOL',  function(){
    cy.visit('/new-document');
    baseStorage.openDocsBtn(22);
    baseStorage.openListDocs();   
    baseStorage.copyStoreDoc('TOL');
  })

  it('TOL to TOR',  function(){
    cy.visit('/new-document');
    baseStorage.openDocsBtn(22);
    baseStorage.openListDocs();  
    baseStorage.copyStoreDoc('TOR');
  })

  it('TOR to TOR',  function(){
    cy.visit('/new-document');
    baseStorage.openDocsBtn(23);
    baseStorage.openListDocs();   
    baseStorage.copyStoreDoc('TOR');
  })

  it('TOR to TOL',  function(){
    cy.visit('/new-document');
    baseStorage.openDocsBtn(23);
    baseStorage.openListDocs();   
    baseStorage.copyStoreDoc('TOL');
  })

  it('CST to CST',  function(){
    cy.visit('/new-document');
    baseStorage.openDocsBtn(21);
    baseStorage.openListDocs();
    baseStorage.copyStoreDoc('CST');
  })
    
  it('TSF to TSF',  function(){
    cy.visit('/new-document');
    baseStorage.openDocsBtn(20);
    baseStorage.searchDoc('TSF');
    baseStorage.openListDocs();   
    baseStorage.copyStoreDoc('TSF');
  })

      // // it('COPY | KPP to KPP | TOL to TOR | TOR to TOR | TOR to TOL',  function(){
      // //   cy.visit('/new-document')
      // //   baseStorage.openDocsBtn()  // SRV
      // //   baseStorage.openListDocs();   
      // //   baseStorage.copyStoreDoc('KPP') // KPP to KPP
      // //   baseStorage.copyStoreDoc('KPP') // KPP to KPM
      // //   baseStorage.copyStoreDoc('KPM') // KPM to KPM
      // //   baseStorage.copyStoreDoc('KPP') // KPM to KPP 
})