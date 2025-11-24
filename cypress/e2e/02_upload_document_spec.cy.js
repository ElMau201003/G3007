describe('Subida de documento', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('input[placeholder="Correo electrónico"]').type('123@123.com')
    cy.get('input[placeholder="Contraseña"]').type('123456')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/home')
  })

  it('Sube un documento y lo muestra en la lista', () => {
    // Adjuntar archivo desde fixtures
    cy.get('input[type="file"]').attachFile('ejemplo.txt') // asegúrate de tener este archivo en cypress/fixtures

    // Completar título
    cy.get('input[placeholder="Título del documento"]').type('Documento prueba')

    // Click en subir
    cy.contains('button', 'Subir').click()

    // Verificar que aparece en la lista
    cy.contains('Documento prueba').should('exist')

    // Logout
    cy.contains('Salir').click() // 👈 corregido
    cy.url().should('include', '/')
    cy.get('button[type="submit"]').should('exist')
  })
})