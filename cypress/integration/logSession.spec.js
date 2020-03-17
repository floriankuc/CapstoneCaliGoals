describe('Log a training session', () => {
  it('submits a session', () => {
    cy.visit('http://localhost:3000/sessions')
    cy.get('[data-cy="exerciseDiv"]').click()
    cy.get('input[type="number"]').type(10)
    cy.get('form').submit()
  })
})
