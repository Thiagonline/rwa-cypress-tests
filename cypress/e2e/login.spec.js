// cypress/e2e/login.spec.js

describe('Funcionalidades de Autenticação (Login e Registro)', () => {
  beforeEach(() => {
    cy.visit('/signin');
  });

  // --- Testes de Login ---

  it('CT01: Deve fazer login com sucesso com credenciais válidas', () => {
    const usernameValido = 'Dina20'; // Ou 'Heath93'
    const passwordValida = 's3cret';

    cy.log(`CT01: Tentando login com ${usernameValido}/${passwordValida}`);
    cy.get('[data-test="signin-username"]').type(usernameValido);
    cy.get('[data-test="signin-password"]').type(passwordValida);
    cy.get('[data-test="signin-submit"]').click();

    cy.url().should('include', '/');
    cy.get('[data-test="sidenav-user-balance"]').should('be.visible');
  });

  it('CT02: Deve exibir mensagem de erro ao tentar fazer login com credenciais inválidas', () => {
    cy.get('[data-test="signin-username"]').type('usuario.invalido@example.com');
    cy.get('[data-test="signin-password"]').type('senhaerrada');
    cy.get('[data-test="signin-submit"]').click();

    cy.get('[data-test="signin-error"]')
      .should('be.visible')
      .and('contain', 'Username or password is invalid');
    cy.url().should('include', '/signin');
  });

  it('CT03: Deve redirecionar para a página de registro ao clicar no link "Sign Up"', () => {
    cy.get('[data-test="signup"]').click();
    cy.url().should('include', '/signup');
    cy.get('[data-test="signup-title"]').should('be.visible').and('contain', 'Sign Up');
  });

  // --- Testes de Registro de Usuário ---

  it('CT04: Deve registrar um novo usuário com sucesso com informações válidas', () => {
    cy.visit('/signup');

    const timestamp = new Date().getTime();
    const newFirstName = `Novo${timestamp}`;
    const newLastName = `Teste${timestamp}`;
    const newUsername = `usuario.${timestamp}@example.com`;
    const newPassword = 'SenhaSegura123!';

    cy.get('[data-test="signup-first-name"]').type(newFirstName);
    cy.get('[data-test="signup-last-name"]').type(newLastName);
    cy.get('[data-test="signup-username"]').type(newUsername);
    cy.get('[data-test="signup-password"]').type(newPassword);
    cy.get('[data-test="signup-confirmPassword"]').type(newPassword);

    cy.get('[data-test="signup-submit"]').click();

    cy.url().should('include', '/signin');
    cy.contains('Sign In').should('be.visible');
  });

  it('CT05: Deve manter o botão de registro desabilitado quando campos obrigatórios não forem preenchidos', () => {
    cy.visit('/signup');

    // Preenche só o primeiro campo
    cy.get('[data-test="signup-first-name"]').type('Incompleto');

    // Verifica se o botão está desabilitado
    cy.get('[data-test="signup-submit"]').should('be.disabled');

    // Garante que continua na mesma página
    cy.url().should('include', '/signup');
  });
});
