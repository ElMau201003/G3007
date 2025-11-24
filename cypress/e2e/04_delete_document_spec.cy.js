describe('Eliminar documento', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('input[placeholder="Correo electrónico"]').type('123@123.com')
    cy.get('input[placeholder="Contraseña"]').type('123456')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/home')
  })

  it('Elimina documento y permite logout', () => {
    // Aceptar confirmación de eliminación
    cy.on('window:confirm', () => true)

    // Buscar documento y eliminarlo
    cy.contains('Documento prueba')
      .parents('div.bg-white')
      .within(() => {
        cy.contains('Eliminar').click()
      })

    // Validar que ya no existe
    cy.contains('Documento prueba').should('not.exist')

    // Logout
    cy.contains('Salir').click()
    cy.url().should('include', '/')
    cy.get('button[type="submit"]').should('exist')
  })
})