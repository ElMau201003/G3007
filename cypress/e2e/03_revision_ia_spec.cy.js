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
        cy.contains('Revisión IA').click() // 👈 ajustado al texto real
      })

    cy.wait('@revisar', { timeout: 20000 })

    // La URL debe incluir /revision/<id>
    cy.url().should('include', '/revision/')

    // Validar que aparecen las métricas
    cy.contains('Gramática')
    cy.contains('Similitud de plagio')

    // Volver
    cy.contains('Volver').click()

    // Logout desde revisión
    cy.contains('Salir').click() // 👈 ajustado
    cy.url().should('include', '/')
    cy.get('button[type="submit"]').should('exist')
  })
})