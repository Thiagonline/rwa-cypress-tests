// cypress/e2e/transfer.cy.js (ou transfer.spec.js)

describe("Funcionalidade de Transferência de Dinheiro", () => {
  // Antes de cada teste de transferência, precisaremos:
  // 1. Fazer login com um usuário válido (que tenha saldo para testar)
  // 2. Navegar para a página de nova transação

  beforeEach(() => {
    // ATENÇÃO: Use as credenciais de um usuário que você sabe que funciona e que tem saldo.
    // Você pode usar 'Dina20'/'s3cret' ou 'Heath93'/'s3cret' se eles tiverem saldo.
    // A melhor prática seria logar via API ou garantir um estado conhecido do DB.
    cy.visit("/signin"); // Visita a página de login
    cy.get('[data-test="signin-username"]').type("Dina20"); // Exemplo: Usuário válido com saldo
    cy.get('[data-test="signin-password"]').type("s3cret"); // Exemplo: Senha do usuário
    cy.get('[data-test="signin-submit"]').click(); // Clica para logar

    // Verifica se o login foi bem-sucedido antes de continuar para a transação
    cy.url().should("include", "/"); // Deve ir para a dashboard
    cy.get('[data-test="sidenav-user-balance"]').should("be.visible"); // Confirma que está logado

    // Agora, navega para a página de nova transação
    // Seletores comuns: [data-test="nav-top-new-transaction"] ou [data-test="nav-top-new-transaction-link"]
    cy.get('[data-test="nav-top-new-transaction"]').click(); // Clica no botão/link de nova transação
    cy.url().should("include", "/transaction/new"); // Verifica se está na página de nova transação
  });

  // --- Caso de Teste 1: Enviar dinheiro com saldo suficiente ---
  it("CT06: Deve enviar dinheiro com sucesso quando o saldo é suficiente", () => {
    // Implemente os passos do caso de teste aqui:
    // 1. Selecionar um contato/amigo para enviar dinheiro
    // 2. Inserir o valor da transação
    // 3. Inserir uma descrição/nota
    // 4. Clicar no botão de pagamento
    // 5. Verificar se a transação foi bem-sucedida (mensagem de sucesso, redirecionamento)
  });

  // --- Caso de Teste 2: Enviar dinheiro com saldo insuficiente ---
  it("CT07: Deve exibir mensagem de erro ao tentar enviar dinheiro com saldo insuficiente", () => {
    // Implemente os passos do caso de teste aqui:
    // 1. Selecionar um contato/amigo para enviar dinheiro
    // 2. Inserir um valor MAIOR que o saldo disponível
    // 3. Inserir uma descrição/nota
    // 4. Clicar no botão de pagamento
    // 5. Verificar se a mensagem de erro de saldo insuficiente é exibida
  });
});
