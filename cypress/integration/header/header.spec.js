describe('Header', () => {
    beforeEach(() => {
      // Start from the index page
      cy.visit('http://localhost:3000/')
    })
  
    it('Should start at Tricking Map', () => {
      // Find a link with an href attribute containing "about" and click it
      cy.get('.dropdown-toggle').contains('Tricking Map')
      cy.get('.dropdown-toggle').click()
      cy.get('.dropdown-item').contains('Tricking Builder')
      cy.get('.dropdown-item').contains('Tricking Map').should('not.exist')
      cy.location().should((loc) =>{
          expect(loc.pathname).to.eq('/tricking-map')
      })
    })
    
    it('Should navigate to Tricking Builder', () =>{
        cy.get('.dropdown-toggle').contains('Tricking Map')
        cy.get('.dropdown-toggle').click()
        cy.get('.dropdown-item').contains('Tricking Builder').click()

        cy.location().should((loc) =>{
            expect(loc.pathname).to.eq('/tricking-builder')
        })

        cy.get('.dropdown-toggle').contains('Tricking Builder')
        cy.get('.dropdown-toggle').click()
        cy.get('.dropdown-item').contains('Tricking Map')
        cy.get('.dropdown-item').contains('Tricking Builder').should('not.exist')
    })
  })