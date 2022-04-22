
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Diego')
    cy.get('#lastName').type('Ribeiro')
    cy.get('#email').type('diego@gmail.com')
    cy.get('#open-text-area').type('teste ok')
    cy.contains('button', 'Enviar').click()
})

