describe('Revisión IA', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('input[placeholder="Correo electrónico"]').type('123@123.com')
    cy.get('input[placeholder="Contraseña"]').type('123456')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/home')
  })

  it('Genera revisión IA y permite logout', () => {
    cy.intercept('POST', '/api/revisiones/*').as('revisar')
    cy.contains('Documento prueba')
      .parents('div.bg-white')
      .within(() => {
        cy.contains('Ver Revisión IA').click()
      })
    cy.wait('@revisar', { timeout: 20000 })
    cy.url().should('include', '/revision')
    cy.contains('Gramática')
    cy.contains('Similitud de plagio')
    cy.contains('Volver').click()

    // Logout desde revisión
    cy.contains('Logout').click()
    cy.url().should('include', '/')
    cy.get('button[type="submit"]').should('exist')
  })
})