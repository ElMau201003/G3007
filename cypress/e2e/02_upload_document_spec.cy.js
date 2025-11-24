describe('Subida de documento', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('input[placeholder="Correo electrónico"]').type('123@123.com')
    cy.get('input[placeholder="Contraseña"]').type('123456')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/home')
  })

  it('Sube un PDF y lo muestra en la lista', () => {
    cy.get('input[type="file"]').attachFile({
      filePath: 'ejemplo.txt',
    })
    cy.get('input[placeholder="Título del documento"]').type('Documento prueba')
    cy.contains('button', 'Subir').click()
    cy.contains('Documento prueba').should('exist')

    // Logout
    cy.contains('Logout').click()
    cy.url().should('include', '/')
    cy.get('button[type="submit"]').should('exist')
  })
})