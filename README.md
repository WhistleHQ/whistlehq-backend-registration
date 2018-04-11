# WhistleHQ Registration Backend

The backend code used to handle the email and registration of users for our WhistleHQ prototype. A different server handles the API requests.

## Requirements

- Node.js >= 6
- npm or yarn
- SendGrid API key
- Firebase Admin Credentials

Note: If you changed your default Python version on OS X you will have to change it back to it's default (Python 2.7)

## Installation

1. Install dependencies using `npm install` or `yarn install`.

2. Register for a API key on [Sendgrid](sendgrid.com) and add the key value to line 2 of `signup/mailer.js` in the project

3. Register for an account on [Firebase](https://firebase.google.com/) and create a new project.

4. Get a new private key for the project by clicking in the gear icon and going to Project Settings > Service Accounts and clicking new private key.

5. In the firebase console, add two new collections to firestore. One called `tokens` and one called `userdata`.

6. In the realtime database ad a new key called domain. Value can be any string.

7. Place the private key in the root of the project and replace the path in the require statement on line 4 of `users.js` with the path to your private key. (Don't forget to .gitignore it and do not upload it publicly)

8. Start the application locally using by running `node app.js` from the project root.
