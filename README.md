# react-survey
An email survey composer. For sending "no-reply" mail do various selected emails. Every survey you send out withdraws from your credits on the account on the webpage. When needed you can buy more credits using stripes transaktion function. As it is, you pay with fake money from a fake credit card. Use 4242 4242 4242 4242 and like 10/20 and 123.

# How to install
1 - cd into root folder

    npm install
   
2 - cd into client

    npm install
    
3 - Login to https://console.developers.google.com/apis/dashboard

    Create a new project called example-dev.
    
    After that make sure you are in that project folder.
    
    Go into ENABLE APIS AND SERVICES.
    
    Then search for Google+ API and enable it.
    
    As for credentials, this is where you get the key.
    
    type:Web application
    Name:Web client 1
    Authorized javascript origins:
    http://localhost5000
    or if prod: https://example.com
    
    Authorized redirect URIs:
    http://localhost5000/auth/google/callback
    http://localhost3000/auth/google/callback
    or if prod: https://example.com/auth/google/callback
    
    Then save.
    
3 - Set up a sendgrid account for sending emails

    Go into settings
    
    API Keys
    
    Create API Key
    
    IMPORTANT! Copy the keys and save them somewhere, because you won´t be able to see it again
    
    After that go inte the sub category called Mail Settings.
    
    Go into Event Notification
    
    Edit the HTTP POST URL to:
    https:// random letters and numbers you assign in the sendgrid_webhook.js .localtunnel.me/api/surveys/webhooks
    
    or if prod - https://example.com/api/surveys/webhooks
    
4 - Set up an account at stripe and get the keys

5 - create a file called dev.js inside the config folder
    In the file you want:
    
    module.exports = {
      // Google Client
      googleClientID: 'key',
      googleClientSecret: 'key',
      // Mongo URI
      mongoURI: 'mongodb://user:password@dkey',
      // Cookie key
      cookieKey: 'Use some random numbers and letters',
      // Stripe keys
      stripePublishableKey: 'key',
      stripeSecretKey: 'key',
      // Sendgrid key
      sendGridKey: 'key',
      // Concerning email links redirecting
      redirectDomain: 'http://localhost:3000'
    };
    
6 - npm run dev - if using localhost
