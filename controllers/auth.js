const route = require('../routes/route');
const { google } = require('googleapis');

module.exports.auth = async function(req,res){
  try {
    const CLIENT_ID = '261918443088-40mkl2rmuref44p4nv5gkagdq70fr4in.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://127.0.0.1:8000/';
const SCOPES = ['email', 'profile'];

// Step 1: Create the OAuth2 client
const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Step 2: Generate the authentication URL
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
});

console.log(`Please visit the following URL to authorize the application: \n${authUrl}\n`);

// Step 3: Handle the callback from Google
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the authorization code: ', (code) => {
  rl.close();

  // Step 4: Exchange the authorization code for tokens
  oauth2Client.getToken(code, (err, tokens) => {
    if (err) {
      console.error('Error exchanging authorization code for tokens:', err);
      return;
    }

    oauth2Client.setCredentials(tokens);

    // Step 5: Use the tokens to authenticate the user
    // You can make further requests to the Google API using the oauth2Client

    console.log('Tokens:', tokens);
   
  });
});
    res.status(200).json(authUrl);
  } catch (error) {
    console.log(error);
    res.status(200).json(authUrl);
  }
}