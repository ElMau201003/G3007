describe('Eliminar documento', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('input[placeholder="Correo electrónico"]').type('123@123.com')
    cy.get('input[placeholder="Contraseña"]').type('123456')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/home')
  })

  it('Elimina documento y permite logout', () => {
    cy.on('window:confirm', () => true)
    cy.contains('Documento prueba')
      .parents('div.bg-white')
      .within(() => {
        cy.contains('Eliminar').click()
      })
    cy.contains('Documento prueba').should('not.exist')

    // Logout
    cy.contains('Logout').click()
    cy.url().should('include', '/')
    cy.get('button[type="submit"]').should('exist')
  })
})