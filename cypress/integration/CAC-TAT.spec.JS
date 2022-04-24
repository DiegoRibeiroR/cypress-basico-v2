/// <reference types="Cypress" />


describe('Centarl de atendiemnto ao Cliente TAT', function(){
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function(){
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    })
    it('preencher os campos obrigatórios e enviar o formulário', function(){
        const longText = 'kjalkjasdkljasdjaksdjlakjsdklajdklajdlkajdlkajsdlkjakdjalksdjakldjalkjsdkajdklajd'
        cy.get('#firstName').type('Diego')
        cy.get('#lastName').type('Ribeiro')
        cy.get('#email').type('diego@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button','Enviar').click()

        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formato inválido', function () {
        cy.get('#firstName').type('Diego')
        cy.get('#lastName').type('Ribeiro')
        cy.get('#email').type('diegogmail.com')
        cy.get('#open-text-area').type('teste ok')
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })
    it('campo telefone continua vazio quando preenchido com valor não numérico', function(){
        cy.get('#phone')
        .type('ksjakdjla')
        .should('have.value', '')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', function(){
        cy.get('#firstName').type('Diego')
        cy.get('#lastName').type('Ribeiro')
        cy.get('#email').type('diego@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste ok')
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })
    it('preenche e limpa os campos: nome, sobrenome, email, telefone e área de texto', function(){
        cy.get('#firstName')
          .type('Diego')
          .should('have.value', 'Diego')
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type('Ribeiro')
          .should('have.value', 'Ribeiro')
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type('diego@gmail.com')
          .should('have.value', 'diego@gmail.com')
          .clear()
          .should('have.value', '')
        cy.get('#phone-checkbox').check()
        cy.get('#phone')
          .type('992387757')
          .should('have.value', '992387757')
          .clear()
          .should('have.value', '')
        cy.get('#open-text-area')
          .type('teste ok')
          .should('have.value', 'teste ok')
          .clear()
          .should('have.value', '')
    })
    it('exibe mensagem de erro ao submeter formulário sem preencher os campos', function(){
        cy.clock()

        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(3000)

        cy.get('.error').should('not.be.visible')
    })
    it('envia formulário com sucesso usando comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })
    it('Selecionando um prdouto pelo texto', function(){
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')
    })
    it('selecionar um produto pelo valor (value)', function(){
        cy.get('#product')
          .select('mentoria')
          .should('have.value', 'mentoria')

    })
    it('selecionar um produto por seu indice', function(){
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')

    })
    it('marcar o tipo de antendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('have.value', 'feedback')
    })
    it('marcar cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
    })
  })
    it('marcar os dois checkboxes e desmarcar o último', function(){
      cy.get('input[type="checkbox"]')
        .check()
        .last()
        .uncheck()
        .should('not.be.checked')
    })
    it('seleciona arquivo da pasta fixtures', function(){
      cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo simuilando um drag-and-drop', function(){
      cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
    })
  })
    it('seleciona um arquivo utilizadno uma fixture para a qual foi dada um alias', function(){
      cy.fixture('example.json').as('sampleFile')
      cy.get('#file-upload')
        .selectFile('@sampleFile')
        .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
          })
      
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank' )
    
    })
    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
      
      cy.contains('Talking About Testing').should('be.visible')
    
    })
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
      cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
      cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    })
    it('preenche a área de texto usando o comando invoke', function(){
      const longText = Cypress._.repeat('0123456789', 20)

      cy.get('#open-text-area')
        .invoke('val', longText)
        .should('have.value', longText)
    })
    it('fazer uma requisição HTTP', function(){
      cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .should(function(response){
        const { status, statusText, body } = response
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        expect(body).to.include('CAC TAT')
      })
    })
})