describe('Inicio de sesión', () => {
  it('Redirige al home después de login y permite logout', () => {
    cy.visit('/')
    cy.get('input[placeholder="Correo electrónico"]').type('123@123.com')
    cy.get('input[placeholder="Contraseña"]').type('123456')
    cy.get('button[type="submit"]').click()

    // Verifica que entró al Dashboard
    cy.url().should('include', '/home')
    cy.contains('Panel') // título del Dashboard

    // Logout
    cy.contains('Salir').click()
    cy.url().should('include', '/')
    cy.get('button[type="submit"]').should('exist')
  })
})