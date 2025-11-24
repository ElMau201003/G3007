describe('Inicio de sesión', () => {
  it('Redirige al home después de login y permite logout', () => {
    cy.visit('/')
    cy.get('input[placeholder="Correo electrónico"]').type('123@123.com')
    cy.get('input[placeholder="Contraseña"]').type('123456')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/home')
    cy.contains('Bienvenido')

    // Logout
    cy.contains('Logout').click()
    cy.url().should('include', '/')
    cy.get('button[type="submit"]').should('exist')
  })
})