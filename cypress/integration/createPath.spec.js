describe('Creates a new training path', () => {
  it('creates a path', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-cy="createpath"]').click()
    cy.get('[data-cy="categorybutton"]')
      .first()
      .click()
    cy.get('[data-cy="optionbutton"]')
      .first()
      .click()
    cy.get('[data-cy="exerciseListItem"]')
      .first()
      .click()
    cy.get('input[type="number"]').type('10')
    cy.get('form').submit()
  })
})
