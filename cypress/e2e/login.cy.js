describe('Login Page', () => {
  beforeEach(() => {
    // Visita a página de login antes de cada teste
    cy.visit('http://localhost:5173');
  });

  it('should display the login page correctly', () => {
    // Verifica se a página de login é exibida corretamente
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button').contains('Acessar').should('be.visible');
  });

  it('should show error if email or password is empty', () => {
    // Envia o formulário com os campos vazios
    cy.get('button[type="submit"]').click();

    // Verifica se a mensagem de erro é exibida
    cy.contains('Preencha todos os campos.').should('be.visible');
  });

  it('should show error for invalid credentials', () => {
    // Preenche os campos com credenciais inválidas
    cy.get('input[type="email"]').type('invaliduser@example.com');
    cy.get('input[type="password"]').type('wrongpassword');

    // Envia o formulário
    cy.get('button[type="submit"]').click();

    // Verifica se a mensagem de erro é exibida para credenciais inválidas
    cy.contains('Credenciais inválidas. Verifique seu e-mail e senha.').should('be.visible');
  });

  it('should successfully login with valid credentials', () => {
    // Preenche os campos com credenciais válidas (substitua pelas credenciais reais de teste)
    cy.get('input[type="email"]').type('email@gmail.com');
    cy.get('input[type="password"]').type('123456');

    // Envia o formulário
    cy.get('button[type="submit"]').click();

    // Verifica se o login foi bem-sucedido e se a navegação ocorreu
    cy.url().should('include', '/inicio');
    cy.contains('Login realizado com sucesso!').should('be.visible');
  });

  it('should navigate to forgot password page when "Esqueceu a senha?" link is clicked', () => {
    // Clica no link de "Esqueceu a senha?"
    cy.get('span').contains('Esqueceu a senha?').click();

    // Verifica se a URL mudou para a página de esqueci minha senha
    cy.url().should('include', '/esqueceu-senha');
  });

  it('should check the "Manter conectado" checkbox', () => {
    // Marca o checkbox de "Manter conectado"
    cy.get('input[type="checkbox"]').check().should('be.checked');
  });

  it('should uncheck the "Manter conectado" checkbox', () => {
    // Desmarca o checkbox de "Manter conectado"
    cy.get('input[type="checkbox"]').uncheck().should('not.be.checked');
  });
});
