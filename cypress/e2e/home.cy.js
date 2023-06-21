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
    cy.contains('Login').click();
    cy.location('pathname').should('eq', '/login');
    cy.get('#email').type('perro@mail.com');
    cy.get('#password').type('123');
    cy.get('.ripple').click();
    cy.location('pathname').should('eq', '/profile/5');
    cy.get('.infoAboutUser').should('exist');
    cy.contains('Home').click();
    cy.location('pathname').should('eq', '/');
  });

  it('should be able to create a new user and logout', () => {
    cy.get('[href="/signup"]').click();
    cy.location('pathname').should('eq', '/signup');
    cy.contains('Sign Up Now');
    cy.get('input[type=file]')
      .invoke('show')
      .selectFile('cypress/fixtures/cat.jpeg');
    cy.get('#firstName').type('Top');
    cy.get('#lastName').type('Cat');
    cy.get('#age').type('2');
    cy.get('#email').type('i@mail.com'); // change every test
    cy.get('#password').type('123456');
    cy.get('#infoAboutUser').type('Leader of The Gang');
    cy.get('.ripple').click();
    cy.get(':nth-child(4) > a').click();
    cy.contains(
      "Are you sure you want to log out? You won't be able to add an activities anymore"
    );
    cy.get('a > .ripple').click();
    cy.location('pathname').should('eq', '/');
  });

  it('log in and create a new activity', () => {
    const dayjs = require('dayjs');

    cy.contains('Login').click();
    cy.location('pathname').should('eq', '/login');
    cy.get('#email').type('perro@mail.com');
    cy.get('#password').type('123');
    cy.get('.ripple').click();
    cy.location('pathname').should('eq', '/profile/5');
    cy.get('.infoAboutUser').should('exist');
    cy.get('.btns > div > .ripple').click();
    cy.contains('Add an activity');
    cy.get('#title').type('random activity');
    cy.get('#date').type(dayjs().format('YYYY-MM-DDThh:mm'));
    cy.get('#meetingPoint').type('Pl. de Catalunya');
    cy.get('#typeOfActivity').select('trip').should('have.value', 'trip');
    cy.get('#spots').type(5);
    cy.get('#telegramLink').type('telegram/link');
    cy.get('#aboutActivity').type('Great activity');
    cy.get('.ripple').click();
    cy.location('pathname').should('eq', '/');
  });

  it('filter activities by city', () => {
    cy.get('#meetingPoint').type('barcelona');
    cy.get('.search-button').click();
  });
  it('filter activities by type', () => {
    cy.get('#typeOfActivity').select('hiking').should('have.value', 'hiking');
    cy.get('.search-button').click();
  });
});
