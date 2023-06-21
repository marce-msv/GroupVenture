describe('home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('home page', () => {
    cy.contains(
      'To access detailed information about activities, please log in to your account. Log in or Sign up to get started.'
    );
  });

  it('should go to login and back home', () => {
    cy.get('#login-btn').click();
    cy.location('pathname').should('eq', '/login');
    cy.get('#email').type('perro@mail.com');
    cy.get('#password').type('123');
    cy.get('.ripple').click();
    cy.location('pathname').should('eq', '/profile/5');
    cy.get('.infoAboutUser').should('exist');
    cy.get('#home-btn').click();
    cy.location('pathname').should('eq', '/');
  });

  it('should be able to create a new user', () => {
    cy.get('[href="/signup"]').click();
    cy.location('pathname').should('eq', '/signup');
    // cy.get('#avatar').selectFile('../public/cat.jpeg');
    cy.get('#firstName').type('Top');
    cy.get('#lastName').type('Cat');
    cy.get('#age').type('2');
    cy.get('#email').type('topcat@mail.com');
    cy.get('#password').type('123456');
    cy.get('#infoAboutUser').type('Leader of The Gang');
    cy.get('.ripple').click();
    cy.location('pathname').should('eq', '/login'); // This route should be redirected to home
  });
});
