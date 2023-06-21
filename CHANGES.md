# GroupVenture (List of changes - Legacy)
- [ ] Instructions (README file) added

<br />

# BE
### General
- [x] TypeScript added
- [x] Env files added for development and test environments containing server port, secret key for session and database name, credentials and port
- [x] Index.js splitted into index.js and app.js

### Router
- [x] Endpoints sorted by type (User, activity, userActivity)
- [x] New endpoint for getActivity instead of "/:id"

### Controllers
- [x] Refactored; Consistency across the functions; console.error when an error is caught
- [x] Controllers for updating the models return updated version

### Tests
- [x] Added tests for user controllers
- [x] Added tests for activity controllers

<br />

# FE
### General
- [x] TypeScript amended by removing the any types

### Visual
- [x] App has now a title and favicon
- [ ] Navbar amended, elements centered. Clicking on logo redirects to homepage.
- [x] Some buttons are hard to identify or read because (low contrast ratio with background). Style updated

### Sign Up / Log In / Log Out
- [x] When signing up, it logs you automatically and redirects you to the profile(?) page
- [x] Logout asks for confirmation. Clicking 'No' redirects you back to profile(?) page
- [x] Once user is logged out, navbar updates the Log Out / Log In button

### Profile
- [x] Edit password in the profile page does not show you the encrypted password as a string
- [x] Edit password encrypts new password
- [x] Once you edit the profile, the user information shows the updated data
- [x] Edit profile change picture working

### Activities
- [x] Add activity pages redirects you to home page

### Tests
- [x] Added tests for Log In page
- [x] Added tests for Sign Up page
