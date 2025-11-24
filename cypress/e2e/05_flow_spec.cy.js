describe('Flujo completo de usuario', () => {
  const email = '123@123.com'
  const password = '123456'
  const titulo = 'Documento prueba'
  const archivo = 'ejemplo.txt'

  it('Login, subir, revisar IA, eliminar y logout', () => {
    cy.visit('/')
    cy.get('input[placeholder="Correo electrónico"]').type(email)
    cy.get('input[placeholder="Contraseña"]').type(password)
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/home')

    cy.get('input[type="file"]').attachFile({ filePath: archivo, mimeType: 'application/pdf' })
    cy.get('input[placeholder="Título del documento"]').type(titulo)
    cy.contains('button', 'Subir').click()
    cy.contains(titulo).should('exist')

    cy.intercept('POST', '/api/revisiones/*').as('revisar')
    cy.contains(titulo)
      .parents('div.bg-white')
      .within(() => {
        cy.contains('Ver Revisión IA').click()
      })
    cy.wait('@revisar')
    cy.url({ timeout: 20000 }).should('include', '/revision')
    cy.contains('Gramática')
    cy.contains('Similitud de plagio')

    cy.visit('/home')
    cy.on('window:confirm', () => true)
    cy.contains(titulo)
      .parents('div.bg-white')
      .within(() => {
        cy.contains('Eliminar').click()
      })
    cy.contains(titulo).should('not.exist')

    // Logout
    cy.contains('Logout').click()
    cy.url().should('include', '/')
    cy.get('button[type="submit"]').should('exist')
  })
})