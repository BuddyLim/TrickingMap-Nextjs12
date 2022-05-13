describe('Homepage', () => {
  beforeEach(() => {
    // Start from the index page
    cy.visit('http://localhost:3000/')
  })

  it('Should display the index page', () => {
    // Find a link with an href attribute containing "about" and click it
    cy.get('h1').contains('Welcome to')
  })  
})