const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  '261918443088-40mkl2rmuref44p4nv5gkagdq70fr4in.apps.googleusercontent.com',
  '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',
  'http://127.0.0.1:8000/'
);

const authorizeUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: 'https://www.googleapis.com/auth/gmail.modify',
});

console.log('Visit the following URL to authorize the app:');
// console.log(authorizeUrl);

// After receiving the authorization code in the callback URL
const authorizationCode = 'YOUR_AUTHORIZATION_CODE';

oauth2Client.getToken(authorizationCode, (err, token) => {
  if (err) {
    console.error('Error while exchanging authorization code:', err);
    return;
  }

  var refreshToken = token.refresh_token;
  console.log('Refresh Token:', refreshToken);
 
});


