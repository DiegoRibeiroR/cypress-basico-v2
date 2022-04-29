 # cy-data-test

 Projeto de automação de testes com Cypress'cy.dataTest'.

 ## Pré requisitos

 É necessário ter o Node.js e o npm instalados para executar este projeto.

 > Usei as versões `v16.13.2` do Node.js e `8.1.2` do npm. Sugiro que você use as mesmas versões ou versões posteriores.

 ## Instalação
Baixar o node.js  `https://nodejs.org/download/release/v14.18.1/`
 Execute `npm` install (ou npm i para a versão curta) para instalar as dependências dev.

 ## Testes

 Para abrir o cypress run, digite no terminal: `npx cypress open`

 Os testes podem simular a visualização desktop e mobile
 
 > Para desktop:
 Execute `npm test` (ou `npm t` para a versão curta) para executar o teste no modo headless.
 Ou execute `npm run cy:open` para executar o Cypress no modo interativo.

 > Para mobile:
 Execute `npm run test:mobile` para executar o teste no modo headless.
 Ou execute `npm run cy:open:mobile` para abrir o Cypress no modo interativo.
