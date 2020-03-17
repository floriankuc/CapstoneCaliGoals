describe('Delete a path', () => {
  it('deletes a training path', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-cy="navbutton"]').click()
    cy.get('[data-cy="deleteButton"]').click()
  })
})
