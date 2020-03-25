describe('Login', () => {
  it('logs into app with test account', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-cy="loginbutton"]').click()
    cy.get('input[type="email"]').type('test@test.de')
    cy.get('input[type="password"]').type('test123')
    cy.get('[data-cy="loginsubmit"]').click()
  })
})
