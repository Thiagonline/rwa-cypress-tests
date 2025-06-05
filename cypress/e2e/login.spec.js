describe("Login", () => {
  it("Abre a página inicial", () => {
    cy.visit("/signin"); // já usa o baseUrl do config
    cy.contains("Sign In", { timeout: 10000 }).should("be.visible"); // ✅ espera o texto aparecer;
  });

  // ... resto dos testes usando rotas relativas, sem repetir URL completa

  it("Abre a página inicial", () => {
    cy.visit("/");
    cy.contains("Sign In"); // ou qualquer texto visível na tela inicial
  });

  it("Deve fazer login com sucesso", () => {
    cy.visit("/signin");
    cy.get('input[name="username"]').type("dev1");
    cy.get('input[name="password"]').type("s3cret");
    cy.get('button[type="submit"]').click();

    // Confirma que redirecionou para a dashboard
    cy.url().should("not.include", "/signin");
    cy.contains("Get Started").should("exist");
  });

  it("Não deve logar com senha inválida", () => {
    cy.visit("/signin");
    cy.get('input[name="username"]').type("dev1");
    cy.get('input[name="password"]').type("senhaErrada");
    cy.get('button[type="submit"]').click();

    cy.contains("Username or password is invalid").should("be.visible");
  });

  it("Deve redirecionar para página de cadastro", () => {
    cy.visit("/signin");
    cy.contains("Don't have an account? Sign Up").click();
    cy.url().should("include", "/signup");
    cy.contains("Create Your Account", { timeout: 10000 }).should("be.visible");
  });
});
